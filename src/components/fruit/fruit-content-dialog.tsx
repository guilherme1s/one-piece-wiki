"use client";

import Image from "next/image";
import type { DevilFruit } from "@/api/routes/list-devil-fruits";
import { getFruitDisplayName } from "@/lib/fruit-name";
import { getFruitTypeBadgeColor } from "@/lib/fruit-type";
import { Badge } from "../badge";
import { Dialog } from "../dialog";
import { FruitPlaceholder } from "./fruit-placeholder";

interface FruitContentDialogProps {
  fruit: DevilFruit;
}

interface DialogFieldProps {
  label: string;
  value: string;
  className?: string;
}

const DialogField = ({ label, value, className }: DialogFieldProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">
      {label}
    </span>
    <span className={className ?? "text-sm text-text"}>{value}</span>
  </div>
);

export const FruitContentDialog = ({ fruit }: FruitContentDialogProps) => {
  const name = getFruitDisplayName(fruit.name);
  const englishName = fruit.name?.en ?? null;
  const japaneseName = fruit.name?.jp ?? null;
  const modelLabel = fruit.model?.en ?? fruit.model?.romaji ?? null;

  const description = [englishName, japaneseName].filter(Boolean).join(" • ");

  return (
    <>
      <Dialog.Header>
        <Dialog.Title>{name}</Dialog.Title>

        {description && <Dialog.Description>{description}</Dialog.Description>}
      </Dialog.Header>

      <Dialog.Body className="gap-5">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-bg-card">
          {fruit.image_url ? (
            <Image
              src={fruit.image_url}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 448px"
              className="object-contain p-6"
            />
          ) : (
            <FruitPlaceholder type={fruit.type} iconClassName="h-20 w-20" />
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge color={getFruitTypeBadgeColor(fruit.type)}>{fruit.type}</Badge>

          {fruit.sub_type && (
            <Badge color="neutral" className="italic">
              {fruit.sub_type}
            </Badge>
          )}
        </div>

        <div className="grid gap-4">
          <DialogField label="Nome Romaji" value={name} />

          {englishName && (
            <DialogField label="Nome Inglês" value={englishName} />
          )}

          {japaneseName && (
            <DialogField label="Nome Japonês" value={japaneseName} />
          )}

          {modelLabel && <DialogField label="Modelo" value={modelLabel} />}
        </div>
      </Dialog.Body>
    </>
  );
};
