import { z } from "zod";

const UPSTREAM_BASE_URL = "https://api.api-onepiece.com/v2";
const REQUEST_TIMEOUT_MS = 10_000;
const REVALIDATE_SECONDS = 86_400;
const MATCH_THRESHOLD = 0.5;

const UpstreamCrewSchema = z
	.object({
		name: z.string().nullable().optional(),
		roman_name: z.string().nullable().optional(),
		is_yonko: z.boolean().optional(),
		total_prime: z.string().nullable().optional(),
	})
	.loose();

const UpstreamFruitSchema = z
	.object({
		name: z.string().nullable().optional(),
		roman_name: z.string().nullable().optional(),
		type: z.string().nullable().optional(),
		description: z.string().nullable().optional(),
	})
	.loose();

const UpstreamCharacterSchema = z
	.object({
		name: z.string(),
		job: z.string().nullable().optional(),
		crew: UpstreamCrewSchema.nullable().optional(),
		fruit: UpstreamFruitSchema.nullable().optional(),
	})
	.loose();

export interface CharacterExtras {
	job: string | null;
	crew: {
		name: string | null;
		romanName: string | null;
		isYonko: boolean;
		totalPrime: string | null;
	} | null;
	fruit: {
		name: string | null;
		romanName: string | null;
		type: string | null;
		description: string | null;
	} | null;
}

const FRUIT_TYPE_LABELS: Record<string, string> = {
	paramecia: "Paramecia",
	logia: "Logia",
	zoan: "Zoan",
	"zoan mythique": "Zoan Mítico",
	"zoan ancien": "Zoan Ancestral",
};

const mapFruitType = (type: string | null | undefined) => {
	if (!type) return null;

	return FRUIT_TYPE_LABELS[type.trim().toLowerCase()] ?? type;
};

const buildNameQueries = (name: string) => {
	const trimmed = name.trim();
	const withoutPunctuation = trimmed
		.replace(/[.'’]/g, " ")
		.replace(/\s+/g, " ")
		.trim();

	const tokens = withoutPunctuation.split(" ").filter(Boolean);
	const lastToken = tokens[tokens.length - 1];

	const queries = [trimmed, withoutPunctuation];

	if (lastToken && !queries.includes(lastToken)) {
		queries.push(lastToken);
	}

	return queries;
};

const tokenize = (value: string) =>
	value
		.toLowerCase()
		.replace(/[.'’-]/g, " ")
		.split(/\s+/)
		.filter(Boolean);

const scoreMatch = (source: string, candidate: string) => {
	const sourceTokens = tokenize(source);
	const candidateTokens = new Set(tokenize(candidate));

	if (sourceTokens.length === 0) return 0;

	const overlap = sourceTokens.filter((token) =>
		candidateTokens.has(token),
	).length;

	return overlap / sourceTokens.length;
};

const searchUpstream = async (query: string) => {
	const searchParams = new URLSearchParams({ name: query });

	const response = await fetch(
		`${UPSTREAM_BASE_URL}/characters/en/search?${searchParams.toString()}`,
		{
			next: {
				revalidate: REVALIDATE_SECONDS,
			},
			signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
		},
	).catch(() => null);

	if (!response?.ok) {
		return [];
	}

	let data: unknown;

	try {
		data = await response.json();
	} catch {
		return [];
	}

	if (!Array.isArray(data)) {
		return [];
	}

	return data.flatMap((item) => {
		const result = UpstreamCharacterSchema.safeParse(item);

		return result.success ? [result.data] : [];
	});
};

const findBestMatch = async (name: string) => {
	for (const query of buildNameQueries(name)) {
		const candidates = await searchUpstream(query);

		const best = candidates.reduce<{
			character: (typeof candidates)[number];
			score: number;
		} | null>((acc, character) => {
			const score = scoreMatch(name, character.name);

			if (!acc || score > acc.score) {
				return { character, score };
			}

			return acc;
		}, null);

		if (best && best.score >= MATCH_THRESHOLD) {
			return best.character;
		}
	}

	return null;
};

const buildExtras = (character: {
	job?: string | null | undefined;
	crew?: z.infer<typeof UpstreamCrewSchema> | null | undefined;
	fruit?: z.infer<typeof UpstreamFruitSchema> | null | undefined;
}): CharacterExtras | null => {
	if (!character.crew && !character.fruit && !character.job) {
		return null;
	}

	return {
		job: character.job ?? null,
		crew: character.crew
			? {
					name: character.crew.name ?? null,
					romanName: character.crew.roman_name ?? null,
					isYonko: character.crew.is_yonko ?? false,
					totalPrime: character.crew.total_prime ?? null,
				}
			: null,
		fruit: character.fruit
			? {
					name: character.fruit.name ?? null,
					romanName: character.fruit.roman_name ?? null,
					type: mapFruitType(character.fruit.type),
					description: character.fruit.description ?? null,
				}
			: null,
	};
};

export const findCharacterExtras = async (
	name: string,
): Promise<CharacterExtras | null> => {
	const match = await findBestMatch(name.trim());

	return match ? buildExtras(match) : null;
};

export const getCharacterExtrasForPage = async (
	names: string[],
): Promise<Record<string, CharacterExtras | null>> => {
	const uniqueNames = [
		...new Set(names.map((name) => name.trim()).filter(Boolean)),
	];

	const results = await Promise.allSettled(
		uniqueNames.map((name) => findCharacterExtras(name)),
	);

	const extrasByName: Record<string, CharacterExtras | null> = {};

	uniqueNames.forEach((name, index) => {
		const result = results[index];

		extrasByName[name] =
			result?.status === "fulfilled" ? result.value : null;
	});

	return extrasByName;
};
