import { Character } from "@/api/routes/list-characters";
import type { CharacterExtras } from "@/lib/character-extras";
import { getCharacterDisplayName } from "@/lib/character-name";
import { CharacterCard } from "./character-card";
import { Pagination } from "../pagination";

interface CharacterGridProps {
  characters: Character[];
  extrasByName: Record<string, CharacterExtras | null>;
  page: number;
  hasNextPage: boolean;
}

export const CharacterGrid = ({
  characters,
  extrasByName,
  page,
  hasNextPage,
}: CharacterGridProps) => {
  return (
    <>
      <div className="grid cursor-pointer grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            extras={extrasByName[getCharacterDisplayName(character.name)]}
          />
        ))}
      </div>

      <Pagination currentPage={page} hasNextPage={hasNextPage} />
    </>
  );
};
