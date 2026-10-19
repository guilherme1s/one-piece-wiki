"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Coins, UserRound } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Character } from "@/api/routes/list-characters";
import type { CharacterExtras } from "@/lib/character-extras";
import { formatBirthday } from "@/lib/character-birthday";
import { getCharacterDisplayName } from "@/lib/character-name";
import { getCrewDisplayName } from "@/lib/crew-names";
import { getFruitTypeBadgeColor } from "@/lib/fruit-type";
import { getLabels } from "@/lib/labels";
import { Badge } from "../badge";
import { Dialog } from "../dialog";
import { Button } from "../button";

type CharacterExtrasResponse = {
  extras: CharacterExtras | null;
};

const extrasCache = new Map<string, CharacterExtras | null>();

type CharacterContentDialogProps = Character;

interface DialogFieldProps {
  label: string;
  value: ReactNode;
  className?: string;
}

const DialogField = ({ label, value, className }: DialogFieldProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">
      {label}
    </span>
    <span className={twMerge("text-sm text-text", className)}>{value}</span>
  </div>
);

export const CharacterContentDialog = ({
  id,
  name,
  age,
  birthday,
  blood_type,
  height,
  image_url,
  extra_data,
  bounties,
}: CharacterContentDialogProps) => {
  const displayName = getCharacterDisplayName(name);
  const [extras, setExtras] = useState<CharacterExtras | null | undefined>(() =>
    extrasCache.get(displayName),
  );

  const altNames = [name?.romaji, name?.jp].filter(Boolean).join(" • ");
  const epithet = extra_data?.epithet ?? null;
  const description = [epithet, altNames].filter(Boolean).join(" • ");
  const formattedBirthday = formatBirthday(birthday);
  const origin = extra_data?.origin ?? null;
  const firstAppearance = extra_data?.first_appearance ?? null;
  const activeBounty = bounties.find(
    (bounty) => bounty.is_active && bounty.amount != null,
  );
  const affiliations = getLabels(extra_data?.affiliation);
  const occupations = getLabels(extra_data?.occupation);

  const crewLabel = getCrewDisplayName(extras?.crew) ?? affiliations[0] ?? null;
  const jobLabel = extras?.job ?? occupations[0] ?? null;
  const fruitLabel = extras?.fruit
    ? [
        extras.fruit.romanName ?? extras.fruit.name,
        extras.fruit.type ? `(${extras.fruit.type})` : null,
      ]
        .filter(Boolean)
        .join(" ")
    : null;

  useEffect(() => {
    if (extrasCache.has(displayName)) return;

    let active = true;

    const searchParams = new URLSearchParams({ name: displayName });

    fetch(`/api/character-extras?${searchParams.toString()}`)
      .then((response) =>
        response.ok
          ? (response.json() as Promise<CharacterExtrasResponse>)
          : null,
      )
      .then((data) => {
        if (data === null) {
          if (active) setExtras(null);
          return;
        }

        extrasCache.set(displayName, data.extras);

        if (active) setExtras(data.extras);
      })
      .catch(() => {
        if (active) setExtras(null);
      });

    return () => {
      active = false;
    };
  }, [displayName]);

  return (
    <>
      <Dialog.Header>
        <Dialog.Title>{displayName}</Dialog.Title>

        {description && <Dialog.Description>{description}</Dialog.Description>}
      </Dialog.Header>

      <Dialog.Body className="gap-5">
        <div className="grid gap-5 sm:grid-cols-[180px_1fr]">
          <div className="relative aspect-3/4 w-full max-w-45 overflow-hidden rounded-lg border border-border bg-bg-elevated">
            {image_url ? (
              <Image
                src={image_url}
                alt={displayName}
                fill
                sizes="180px"
                className="object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <UserRound className="h-16 w-16 text-text-dim" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {extras?.crew?.isYonko && <Badge color="red">Yonko</Badge>}

              {extras?.fruit?.type && (
                <Badge color={getFruitTypeBadgeColor(extras.fruit.type)}>
                  {extras.fruit.type}
                </Badge>
              )}
            </div>

            {extras === undefined && (
              <div className="flex flex-col gap-2" aria-busy="true">
                <div className="h-3 w-24 animate-pulse rounded bg-bg-elevated" />
                <div className="h-3 w-40 animate-pulse rounded bg-bg-elevated" />
              </div>
            )}

            <div className="grid gap-4">
              {jobLabel && <DialogField label="Profissão" value={jobLabel} />}

              {crewLabel && (
                <DialogField label="Tripulação" value={crewLabel} />
              )}

              {fruitLabel && (
                <DialogField label="Akuma no Mi" value={fruitLabel} />
              )}

              {activeBounty?.amount != null && (
                <DialogField
                  label="Prêmio de cabeça"
                  value={
                    <span className="inline-flex items-center gap-1.5 font-heading text-lg font-semibold text-gold">
                      <Coins className="h-4 w-4" />
                      {activeBounty.amount.toLocaleString("pt-BR")}
                    </span>
                  }
                />
              )}
            </div>

            {extras?.fruit?.description && (
              <p className="text-xs leading-relaxed text-text-muted">
                {extras.fruit.description}
              </p>
            )}

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">
                Informações
              </span>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <DialogField
                  label="Idade"
                  value={age != null ? `${age} anos` : "—"}
                />
                <DialogField
                  label="Aniversário"
                  value={formattedBirthday ?? "—"}
                />
                <DialogField label="Tipo sanguíneo" value={blood_type || "—"} />
                <DialogField
                  label="Altura"
                  value={height != null ? `${height} cm` : "—"}
                />

                {origin && <DialogField label="Origem" value={origin} />}
                {firstAppearance && (
                  <DialogField
                    label="Primeira aparição"
                    value={firstAppearance}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Dialog.Body>

      <Dialog.Footer>
        <Dialog.Close asChild>
          <Link href={`/characters/${id}`} className="cursor-pointer">
            <Button variant="primary">Ver mais detalhes</Button>
          </Link>
        </Dialog.Close>
      </Dialog.Footer>
    </>
  );
};
