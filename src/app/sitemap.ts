import type { MetadataRoute } from "next";
import { z } from "zod";
import { SITE_URL } from "@/lib/site";

const MAX_CHARACTER_PAGES = 15;
const CHARACTER_PAGE_LIMIT = 50;

const CharacterIdListSchema = z.array(z.object({ id: z.string() }));

export const revalidate = 86400;

const collectCharacterUrls = async (): Promise<string[]> => {
	const baseUrl = process.env.ONE_PIECE_API_URL;

	if (!baseUrl) return [];

	const urls: string[] = [];

	for (let page = 1; page <= MAX_CHARACTER_PAGES; page++) {
		let ids: string[];

		try {
			const response = await fetch(
				`${baseUrl}/characters?page=${page}&limit=${CHARACTER_PAGE_LIMIT}`,
				{ next: { revalidate: 86400 } },
			);

			if (!response.ok) break;

			const result = CharacterIdListSchema.safeParse(await response.json());

			if (!result.success || result.data.length === 0) break;

			ids = result.data.map((character) => character.id);

			urls.push(...ids.map((id) => `${SITE_URL}/characters/${id}`));

			if (ids.length < CHARACTER_PAGE_LIMIT) break;
		} catch {
			break;
		}
	}

	return urls;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const lastModified = new Date();

	const entries: MetadataRoute.Sitemap = [
		{
			url: SITE_URL,
			lastModified,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${SITE_URL}/characters`,
			lastModified,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${SITE_URL}/fruits`,
			lastModified,
			changeFrequency: "weekly",
			priority: 0.8,
		},
	];

	try {
		const characterUrls = await collectCharacterUrls();

		entries.push(
			...characterUrls.map((url) => ({
				url,
				lastModified,
				changeFrequency: "monthly" as const,
				priority: 0.6,
			})),
		);
	} catch {
		// API indisponível: mantém as URLs estáticas
	}

	return entries;
}
