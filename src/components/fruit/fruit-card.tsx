"use client";

import type { DevilFruit } from "@/api/routes/list-devil-fruits";
import { getFruitDisplayName } from "@/lib/fruit-name";
import { getFruitTypeBadgeColor } from "@/lib/fruit-type";
import { Badge } from "../badge";
import { Card } from "../card";
import { Dialog } from "../dialog";
import { FruitContentDialog } from "./fruit-content-dialog";
import { FruitPlaceholder } from "./fruit-placeholder";

interface FruitCardProps {
  fruit: DevilFruit;
}

export const FruitCard = ({ fruit }: FruitCardProps) => {
  const name = getFruitDisplayName(fruit.name);
  const englishName = fruit.name?.en ?? null;
  const modelLabel = fruit.model?.en ?? fruit.model?.romaji ?? null;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Card.Root className="cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-border-hover hover:bg-bg-card-hover hover:shadow-lg">
          <Card.Image
            src={fruit.image_url ?? undefined}
            alt={name}
            ratio="square"
          >
            <FruitPlaceholder type={fruit.type} iconClassName="h-16 w-16" />
          </Card.Image>

          <Card.Body>
            <Card.Title>{name}</Card.Title>

            {englishName && <Card.Subtitle>{englishName}</Card.Subtitle>}

            <Card.Content>
              <Badge color={getFruitTypeBadgeColor(fruit.type)}>
                {fruit.type}
              </Badge>

              {fruit.sub_type && (
                <Badge color="neutral" className="italic">
                  {fruit.sub_type}
                </Badge>
              )}
            </Card.Content>
          </Card.Body>

          {modelLabel && (
            <Card.Footer className="justify-between">
              <span className="truncate text-xs text-text-dim">
                Modelo: {modelLabel}
              </span>
            </Card.Footer>
          )}
        </Card.Root>
      </Dialog.Trigger>

      <Dialog.Content>
        <FruitContentDialog fruit={fruit} />
      </Dialog.Content>
    </Dialog.Root>
  );
};
