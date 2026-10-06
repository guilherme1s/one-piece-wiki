import { Character } from "@/api/routes/list-characters";
import { Card } from "./card";
import { Coins, UserRound } from "lucide-react";
import { Badge } from "./badge";
import { Pagination } from "./pagination";

const getLabels = (value: unknown) => {
  const values = typeof value === "string"
    ? value.split(";")
    : Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];

  return values.map((item) => item.trim()).filter(Boolean);
};

interface CharacterGridProps {
  characters: Character[];
  page: number;
  hasNextPage: boolean;
}

export const CharacterGrid = ({
  characters,
  page,
  hasNextPage,
}: CharacterGridProps) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {characters.map((character) => {
          const name =
            character.name?.en ??
            character.name?.romaji ??
            character.name?.jp ??
            "Desconhecido";

          const bounty = character.bounties.find(
            (bounty) => bounty.is_active,
          );
          const affiliations = getLabels(character.extra_data?.affiliation);
          const occupations = getLabels(character.extra_data?.occupation);

          return (
            <Card.Root key={character.id} href={`/characters/${character.id}`}>
              <Card.Image src={character.image_url ?? undefined} alt={name}>
                <UserRound className="h-20 w-20 text-text-dim" />
              </Card.Image>

              <Card.Body>
                <Card.Title>{name}</Card.Title>

                <Card.Content>
                  {bounty?.amount && (
                    <span className="inline-flex items-center gap-1 font-heading text-sm font-semibold text-gold">
                      <Coins className="h-4 w-4" />

                      {bounty.amount.toLocaleString("pt-BR")}
                    </span>
                  )}
                </Card.Content>
              </Card.Body>

              <Card.Footer className="items-start">
                {affiliations.slice(0, 2).map((affiliation) => (
                  <Badge
                    key={`crew-${affiliation}`}
                    color="crew"
                    title={`Tripulação: ${affiliation}`}
                    className="truncate"
                  >
                    <span className="mr-1 opacity-70">Tripulação</span>
                    {affiliation}
                  </Badge>
                ))}
                {occupations.slice(0, 2).map((occupation) => (
                  <Badge
                    key={`role-${occupation}`}
                    color="gold"
                    title={`Cargo: ${occupation}`}
                    className="truncate"
                  >
                    <span className="mr-1 opacity-70">Cargo</span>
                    {occupation}
                  </Badge>
                ))}
                <Badge color="muted" className="ml-auto">
                  {character.status}
                </Badge>
              </Card.Footer>
            </Card.Root>
          );
        })}
      </div>

      <Pagination currentPage={page} hasNextPage={hasNextPage} />
    </>
  );
};
