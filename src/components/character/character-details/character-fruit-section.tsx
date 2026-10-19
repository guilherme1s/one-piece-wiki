import type { CharacterExtras } from "@/lib/character-extras";
import { FRUIT_TYPE_COLORS, getFruitTypeBadgeColor } from "@/lib/fruit-type";
import { Cherry } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Badge } from "../../badge";
import { SectionTitle } from "./section-title";

interface CharacterFruitSectionProps {
  fruit: NonNullable<CharacterExtras["fruit"]>;
}

export const CharacterFruitSection = ({
  fruit,
}: CharacterFruitSectionProps) => {
  const fruitName = fruit.romanName ?? fruit.name;

  return (
    <section>
      <SectionTitle>Akuma no Mi</SectionTitle>

      <div className="grid gap-6 md:grid-cols-[200px_1fr]">
        <div className="flex aspect-square w-full max-w-50 items-center justify-center overflow-hidden rounded-xl border border-border bg-bg-card md:max-w-none">
          <Cherry
            className={twMerge(
              "h-16 w-16 text-text-muted",
              fruit.type ? FRUIT_TYPE_COLORS[fruit.type] : undefined,
            )}
          />
        </div>

        <div className="flex flex-col gap-3">
          {fruit.type && (
            <div className="flex flex-wrap gap-2">
              <Badge color={getFruitTypeBadgeColor(fruit.type)}>
                {fruit.type}
              </Badge>
            </div>
          )}

          {fruitName && (
            <h3 className="font-heading text-2xl font-semibold text-text">
              {fruitName}
            </h3>
          )}

          {fruit.description && (
            <p className="leading-relaxed text-text-muted">
              {fruit.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
