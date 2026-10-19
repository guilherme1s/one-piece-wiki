import { z } from "zod";

export const DevilFruitNameSchema = z.object({
	en: z.string().nullable().optional(),
	jp: z.string().nullable().optional(),
	romaji: z.string().nullable().optional(),
});

export const DevilFruitModelSchema = z
	.object({
		en: z.string().nullable().optional(),
		romaji: z.string().nullable().optional(),
	})
	.nullable();

export const DevilFruitSchema = z.object({
	id: z.string(),
	created_at: z.string(),
	type: z.string(),
	name: DevilFruitNameSchema.nullable(),
	model: DevilFruitModelSchema,
	sub_type: z.string().nullable(),
	image_url: z.string().nullable(),
});

export type DevilFruit = z.infer<typeof DevilFruitSchema>;
export type DevilFruitName = z.infer<typeof DevilFruitNameSchema>;

export const DEVIL_FRUIT_TYPES = [
	"Paramecia",
	"Logia",
	"Zoan",
	"Unknown",
] as const;

export type DevilFruitType = (typeof DEVIL_FRUIT_TYPES)[number];

export const isDevilFruitType = (value: string): value is DevilFruitType =>
	(DEVIL_FRUIT_TYPES as readonly string[]).includes(value);

const REQUEST_TIMEOUT_MS = 15_000;
const REVALIDATE_SECONDS = 3600;
const PAGE_SIZE = 12;
const API_PAGE_LIMIT = 100;

const fetchDevilFruitsPage = async (
	baseUrl: string,
	page: number,
): Promise<DevilFruit[]> => {
	const searchParams = new URLSearchParams({
		page: String(page),
		limit: String(API_PAGE_LIMIT),
	});

	const response = await fetch(
		`${baseUrl}/devil-fruits?${searchParams.toString()}`,
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
		throw new Error(`A One Piece API respondeu ${response.status}`);
	}

	let data: unknown;

	try {
		data = await response.json();
	} catch {
		throw new Error("A One Piece API retornou uma resposta inválida");
	}

	const result = z.array(DevilFruitSchema).safeParse(data);

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

	return result.data;
};

export const getAllDevilFruits = async (): Promise<DevilFruit[]> => {
	const baseUrl = process.env.ONE_PIECE_API_URL;

	if (!baseUrl) {
		throw new Error(
			"ONE_PIECE_API_URL não configurada no .env",
		);
	}

	const [page1, page2] = await Promise.all([
		fetchDevilFruitsPage(baseUrl, 1),
		fetchDevilFruitsPage(baseUrl, 2),
	]);

	return [...page1, ...page2];
};

interface ListDevilFruitsParams {
	q?: string;
	type?: DevilFruitType;
	page?: number;
}

export const listDevilFruits = async ({
	q,
	type,
	page = 1,
}: ListDevilFruitsParams = {}) => {
	const all = await getAllDevilFruits();

	const normalizedQuery = q?.toLowerCase();

	const filtered = all.filter((fruit) => {
		const matchesType = !type || fruit.type === type;

		const matchesQuery =
			!normalizedQuery ||
			[
				fruit.name?.romaji,
				fruit.name?.en,
				fruit.name?.jp,
				fruit.model?.en,
				fruit.model?.romaji,
				fruit.type,
				fruit.sub_type,
			]
				.filter(Boolean)
				.some((field) => field!.toLowerCase().includes(normalizedQuery));

		return matchesType && matchesQuery;
	});

	const startIndex = (page - 1) * PAGE_SIZE;
	const fruits = filtered.slice(startIndex, startIndex + PAGE_SIZE);

	const counts = Object.fromEntries(
		DEVIL_FRUIT_TYPES.map((fruitType) => [
			fruitType,
			all.filter((fruit) => fruit.type === fruitType).length,
		]),
	) as Record<DevilFruitType, number>;

	return {
		fruits,
		total: filtered.length,
		totalAll: all.length,
		counts,
		page,
		hasNextPage: startIndex + PAGE_SIZE < filtered.length,
	};
};
