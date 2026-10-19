import { z } from "zod";
import {
	Character,
	CharacterSchema,
} from "./list-characters";

const CharacterIdSchema = z.uuid();

const REQUEST_TIMEOUT_MS = 15_000;
const REVALIDATE_SECONDS = 3600;

export async function getCharacterById(
	id: string,
): Promise<Character | null> {
	const parsedId = CharacterIdSchema.safeParse(id);

	if (!parsedId.success) {
		return null;
	}

	const baseUrl = process.env.ONE_PIECE_API_URL;

	if (!baseUrl) {
		throw new Error(
			"ONE_PIECE_API_URL não configurada no .env",
		);
	}

	const response = await fetch(
		`${baseUrl}/characters/${parsedId.data}`,
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
		return null;
	}

	let data: unknown;

	try {
		data = await response.json();
	} catch {
		throw new Error(
			"A One Piece API retornou uma resposta inválida",
		);
	}

	const result = CharacterSchema.safeParse(data);

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
}
