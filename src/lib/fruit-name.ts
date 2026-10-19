import type { DevilFruitName } from "@/api/routes/list-devil-fruits";

export const getFruitDisplayName = (
	name: DevilFruitName | null | undefined,
): string => name?.romaji ?? name?.en ?? name?.jp ?? "Desconhecido";
