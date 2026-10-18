import type { CharacterExtras } from "./character-extras";

type Crew = NonNullable<CharacterExtras["crew"]>;

const CREW_NAMES_PT: Record<string, string> = {
	"Mugiwara no Ichimi": "Piratas do Chapéu de Palha",
	"Nise Mugiwara no Ichimi": "Piratas Falsos do Chapéu de Palha",
	"Mugiwara Dai-sendan": "Grande Frota do Chapéu de Palha",
	"Akagami Kaizokudan": "Piratas do Ruivo",
	"Biggu Mamu Kaizokudan": "Piratas do Big Mom",
	"Hyakujū Kaizokudan": "Piratas das Mil Feras",
	"Shirohige Kaizokudan": "Piratas do Barba Branca",
	"Kurohige Kaizokudan": "Piratas do Barba Negra",
	"Rojā Kaizoku Dan": "Piratas do Roger",
	"Hāto no Kaizokudan": "Piratas do Coração",
	"Taiyō no Kaizokudan": "Piratas do Sol",
	"Kuja Kaizokudan": "Piratas Kuja",
	"Donkihōte Kaizokudan": "Piratas do Donquixote",
	"Kiddo Kaizokudan": "Piratas do Kid",
};

export const getCrewDisplayName = (
	crew: Crew | null | undefined,
): string | null => {
	if (!crew) return null;

	if (crew.romanName) {
		return CREW_NAMES_PT[crew.romanName] ?? crew.romanName;
	}

	return crew.name;
};
