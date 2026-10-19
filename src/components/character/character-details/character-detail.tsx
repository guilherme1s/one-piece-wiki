import type { Character } from "@/api/routes/list-characters";
import type { CharacterExtras, CrewMember } from "@/lib/character-extras";
import { getCrewDisplayName } from "@/lib/crew-names";
import { getLabels } from "@/lib/labels";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CharacterOverview } from "./character-overview";
import { CharacterFruitSection } from "./character-fruit-section";
import { CharacterInfoSection } from "./character-info-section";
import { CharacterCrewSection } from "./character-crew-section";

interface CharacterDetailProps {
  character: Character;
  extras: CharacterExtras | null;
  members: CrewMember[];
}

export const CharacterDetail = ({
  character,
  extras,
  members,
}: CharacterDetailProps) => {
  const { extra_data } = character;

  const affiliations = getLabels(extra_data?.affiliation);
  const occupations = getLabels(extra_data?.occupation);

  const crew = extras?.crew ?? null;
  const crewLabel = getCrewDisplayName(crew) ?? affiliations[0] ?? null;

  const jobLabel = extras?.job ?? occupations[0] ?? null;
  const fruit = extras?.fruit ?? null;

  return (
    <div className="flex flex-col gap-12 pb-8">
      <CharacterOverview character={character} extras={extras} />

      {fruit && <CharacterFruitSection fruit={fruit} />}

      <CharacterInfoSection character={character} jobLabel={jobLabel} />

      {crew && (
        <CharacterCrewSection
          crew={crew}
          crewLabel={crewLabel}
          members={members}
        />
      )}

      <div>
        <Link
          href="/characters"
          className="inline-flex items-center gap-2 rounded-lg border border-border-hover bg-bg-elevated px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-bg-card-hover"
        >
          <ArrowLeft size={16} />
          Voltar para personagens
        </Link>
      </div>
    </div>
  );
};
