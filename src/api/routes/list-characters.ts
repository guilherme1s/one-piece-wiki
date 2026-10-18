import { z } from "zod";

export const BountySchema = z.object({
	id: z.string(),
	created_at: z.string(),
	amount: z.number().nullable(),
	character_id: z.string().nullable(),
	is_active: z.boolean(),
});

export const CharacterNameSchema = z.object({
	en: z.string().nullable().optional(),
	jp: z.string().nullable().optional(),
	romaji: z.string().nullable().optional(),
});

export const CharacterBirthdaySchema = z.object({
	day: z.number().nullable().optional(),
	month: z.number().nullable().optional(),
	label: z
		.object({
			en: z.string().nullable().optional(),
			jp: z.string().nullable().optional(),
			pt: z.string().nullable().optional(),
		})
		.nullable()
		.optional(),
	trivia: z
		.object({
			en: z.string().nullable().optional(),
			pt: z.string().nullable().optional(),
		})
		.nullable()
		.optional(),
});

export const CharacterExtraDataSchema = z.looseObject({
	origin: z.string().nullable().optional(),
	epithet: z.string().nullable().optional(),
	occupation: z.string().nullable().optional(),
	affiliation: z.string().nullable().optional(),
	first_appearance: z.string().nullable().optional(),
});

export const CharacterSchema = z.object({
	id: z.string(),
	created_at: z.string(),
	name: CharacterNameSchema.nullable(),
	age: z.number().nullable(),
	birthday: CharacterBirthdaySchema.nullable(),
	blood_type: z.string(),
	height: z.number().nullable(),
	status: z.string(),
	image_url: z.string().nullable(),
	extra_data: CharacterExtraDataSchema.nullable(),
	bounties: z.array(BountySchema),
});

export const CharactersQuerySchema = z.object({
	q: z.string().optional(),
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(50).default(12),
});

export type Character = z.infer<typeof CharacterSchema>;
export type Bounty = z.infer<typeof BountySchema>;
export type CharacterBirthday = z.infer<typeof CharacterBirthdaySchema>;
export type CharacterExtraData = z.infer<typeof CharacterExtraDataSchema>;

export interface ListCharactersParams {
	q?: string;
	page?: number;
	limit?: number;
}

export interface CharactersListResponse {
	characters: Character[];
	page: number;
	limit: number;
	hasNextPage: boolean;
}

const REQUEST_TIMEOUT_MS = 15_000;
const REVALIDATE_SECONDS = 3600;

const sanitizeParams = (
	params: ListCharactersParams,
) => {
	return CharactersQuerySchema.parse(params);
};

interface CharactersPageResult {
	items: Character[] | null;
	status: number;
}

const getCharactersPage = async (
	baseUrl: string,
	page: number,
	limit: number,
	query?: string,
): Promise<CharactersPageResult> => {
	const searchParams = new URLSearchParams({
		page: String(page),
		limit: String(limit),
	});

	if (query) {
		searchParams.set("q", query);
	}

	const response = await fetch(
		`${baseUrl}/characters?${searchParams.toString()}`,
		{
			next: {
				revalidate: REVALIDATE_SECONDS,
			},
			signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
		},
	).catch(() => null);

	if (!response) {
		throw new Error("A One Piece API não respondeu");
	}

	if (!response.ok) {
		return {
			items: null,
			status: response.status,
		};
	}

	let data: unknown;

	try {
		data = await response.json();
	} catch {
		throw new Error(
			"A One Piece API retornou uma resposta inválida",
		);
	}

	const result = z
		.array(CharacterSchema)
		.safeParse(data);

	if (!result.success) {
		const details = result.error.issues
			.slice(0, 5)
			.map(
				(issue) =>
					`${issue.path.join(".") || "root"}: ${issue.message}`,
			)
			.join("; ");

		throw new Error(
			`Resposta inválida da One Piece API: ${details}`,
		);
	}

	return {
		items: result.data,
		status: response.status,
	};
};

export async function listCharacters(
	params: ListCharactersParams = {},
): Promise<CharactersListResponse> {
	const { q, page, limit } =
		sanitizeParams(params);

	const baseUrl = process.env.ONE_PIECE_API_URL;

	if (!baseUrl) {
		throw new Error(
			"ONE_PIECE_API_URL não configurada no .env",
		);
	}

	const { items, status } = await getCharactersPage(
		baseUrl,
		page,
		limit + 1,
		q,
	);

	if (!items) {
		throw new Error(`A One Piece API respondeu ${status}`);
	}

	const hasNextPage = items.length > limit;

	return {
		characters: items.slice(0, limit),
		page,
		limit,
		hasNextPage,
	};
}
