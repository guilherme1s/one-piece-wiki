import type { Character } from "@/api/routes/list-characters";
import type { CharacterExtras } from "@/lib/character-extras";
import { getCharacterDisplayName } from "@/lib/character-name";
import { getCrewDisplayName } from "@/lib/crew-names";
import { getFruitTypeBadgeColor } from "@/lib/fruit-type";
import { getLabels } from "@/lib/labels";
import { UserRound } from "lucide-react";
import Image from "next/image";
import { Badge } from "../../badge";
import { StatCard } from "./stat-card";
import { STATUS_LABELS_PT } from "@/lib/character-status";

interface CharacterOverviewProps {
  character: Character;
  extras: CharacterExtras | null;
}

export const CharacterOverview = ({
  character,
  extras,
}: CharacterOverviewProps) => {
  const { name, age, height, status, image_url, extra_data, bounties } =
    character;

  const displayName = getCharacterDisplayName(name);

  const altNames = [name?.romaji, name?.jp].filter(Boolean).join(" • ");

  const description = [extra_data?.epithet, altNames]
    .filter(Boolean)
    .join(" • ");

  const affiliations = getLabels(extra_data?.affiliation);
  const crew = extras?.crew ?? null;
  const crewLabel = getCrewDisplayName(crew) ?? affiliations[0] ?? null;

  const fruit = extras?.fruit ?? null;

  const activeBounty = bounties.find(
    (bounty) => bounty.is_active && bounty.amount != null,
  );

  const statusLabel = STATUS_LABELS_PT[status] ?? status;

  const statusBadgeColor =
    status === "Alive"
      ? "green"
      : status === "Dead" || status === "Deceased"
        ? "red"
        : "neutral";

  return (
    <section className="grid gap-10 lg:grid-cols-[320px_1fr]">
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl border border-border bg-bg-card">
        {image_url ? (
          <Image
            src={image_url}
            alt={displayName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 320px"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <UserRound className="h-24 w-24 text-text-dim" />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge color={statusBadgeColor}>{statusLabel}</Badge>

          {crew?.isYonko && <Badge color="red">Yonko</Badge>}

          {fruit?.type && (
            <Badge color={getFruitTypeBadgeColor(fruit.type)}>
              {fruit.type}
            </Badge>
          )}

          {crewLabel && <Badge color="gold">{crewLabel}</Badge>}
        </div>

        <h1 className="font-heading text-4xl font-bold uppercase leading-[1.1] tracking-wide sm:text-5xl">
          {displayName}
        </h1>

        {description && (
          <p className="text-base leading-relaxed text-text-muted">
            {description}
          </p>
        )}

        {activeBounty?.amount != null && (
          <div className="flex flex-col">
            <span className="font-heading text-4xl font-bold text-gold">
              ₿ {activeBounty.amount.toLocaleString("pt-BR")}
            </span>

            <span className="text-sm font-normal uppercase tracking-[0.08em] text-text-dim">
              Prêmio de cabeça
            </span>
          </div>
        )}

        <div className="mt-1 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="Idade" value={age != null ? String(age) : "—"} />

          <StatCard
            label="Altura"
            value={height != null ? `${height}cm` : "—"}
          />

          <StatCard
            label="Status"
            value={statusLabel}
            className={status === "Alive" ? "text-living" : undefined}
          />

          {crew?.memberCount != null && (
            <StatCard label="Tripulantes" value={String(crew.memberCount)} />
          )}
        </div>
      </div>
    </section>
  );
};
