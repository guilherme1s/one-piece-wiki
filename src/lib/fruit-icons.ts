import {
	Circle,
	Flame,
	PawPrint,
	Puzzle,
	type LucideIcon,
} from "lucide-react";
import type { DevilFruitType } from "@/api/routes/list-devil-fruits";

export const FRUIT_TYPE_ICON_MAP: Record<DevilFruitType, LucideIcon> = {
	Paramecia: Puzzle,
	Logia: Flame,
	Zoan: PawPrint,
	Unknown: Circle,
};
