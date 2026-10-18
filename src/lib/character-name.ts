import type { Character } from "@/api/routes/list-characters";

export const getCharacterDisplayName = (name: Character["name"]) =>
	name?.en ?? name?.romaji ?? name?.jp ?? "Desconhecido";
