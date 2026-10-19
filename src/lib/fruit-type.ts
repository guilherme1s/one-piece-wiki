import type { BadgeColor } from "@/components/badge";

export const FRUIT_TYPE_COLORS: Record<string, BadgeColor> = {
	Paramecia: "purple",
	Logia: "green",
	Zoan: "blue",
	"Zoan Mítico": "orange",
	"Zoan Ancestral": "violet",
	Smile: "gold",
	Unknown: "neutral",
};

export const getFruitTypeBadgeColor = (
	type: string | null | undefined,
): BadgeColor => (type ? FRUIT_TYPE_COLORS[type] ?? "neutral" : "neutral");
