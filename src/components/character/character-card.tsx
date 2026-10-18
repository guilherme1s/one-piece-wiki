"use client";

import { Coins, UserRound } from "lucide-react";
import { Character } from "@/api/routes/list-characters";
import type { CharacterExtras } from "@/lib/character-extras";
import { getCharacterDisplayName } from "@/lib/character-name";
import { getCrewDisplayName } from "@/lib/crew-names";
import { getFruitTypeBadgeColor } from "@/lib/fruit-type";
import { getLabels } from "@/lib/labels";
import { Badge } from "../badge";
import { Card } from "../card";
import { Dialog } from "../dialog";
import { CharacterContentDialog } from "./character-content-dialog";

interface CharacterCardProps {
  character: Character;
  extras?: CharacterExtras | null;
}

export const CharacterCard = ({ character, extras }: CharacterCardProps) => {
  const name = getCharacterDisplayName(character.name);

  const bounty = character.bounties.find(
    (item) => item.is_active && item.amount != null,
  );
  const affiliations = getLabels(character.extra_data?.affiliation);
  const occupations = getLabels(character.extra_data?.occupation);

  const crewLabel = getCrewDisplayName(extras?.crew) ?? affiliations[0] ?? null;
  const jobLabel = extras?.job ?? occupations[0] ?? null;
  const subtitle = [jobLabel, crewLabel].filter(Boolean).join(" • ");
  const hasFooter =
    Boolean(extras) || Boolean(crewLabel) || occupations.length > 0;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Card.Root>
          <Card.Image src={character.image_url ?? undefined} alt={name}>
            <UserRound className="h-20 w-20 text-text-dim" />
          </Card.Image>

          <Card.Body>
            <Card.Title>{name}</Card.Title>

            {subtitle && <Card.Subtitle>{subtitle}</Card.Subtitle>}

            <Card.Content>
              {bounty?.amount != null && (
                <span className="inline-flex items-center gap-1 font-heading text-sm font-semibold text-gold">
                  <Coins className="h-4 w-4" />

                  {bounty.amount.toLocaleString("pt-BR")}
                </span>
              )}

              {extras?.crew?.isYonko && <Badge color="red">Yonko</Badge>}
            </Card.Content>
          </Card.Body>

          {hasFooter && (
            <Card.Footer>
              {extras?.fruit ? (
                <Badge color={getFruitTypeBadgeColor(extras.fruit.type)}>
                  {extras.fruit.type ?? "Akuma no Mi"}
                </Badge>
              ) : (
                extras && <Badge color="neutral">Sem Akuma no Mi</Badge>
              )}

              {crewLabel && (
                <Badge color="gold" title={`Tripulação: ${crewLabel}`}>
                  {crewLabel}
                </Badge>
              )}

              {!extras && occupations[0] && (
                <Badge color="neutral" className="truncate">
                  {occupations[0]}
                </Badge>
              )}
            </Card.Footer>
          )}
        </Card.Root>
      </Dialog.Trigger>

      <Dialog.Content size="lg">
        <CharacterContentDialog {...character} />
      </Dialog.Content>
    </Dialog.Root>
  );
};
