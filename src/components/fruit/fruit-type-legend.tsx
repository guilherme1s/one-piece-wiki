import { twMerge } from "tailwind-merge";
import type { DevilFruitType } from "@/api/routes/list-devil-fruits";
import { getFruitTypeBadgeColor } from "@/lib/fruit-type";
import { Badge } from "../badge";

const LEGEND: { type: DevilFruitType; description: string }[] = [
  {
    type: "Paramecia",
    description: "Poderes que alteram o corpo ou manipulam o ambiente",
  },
  {
    type: "Logia",
    description: "Permitem se transformar em um elemento da natureza",
  },
  {
    type: "Zoan",
    description: "Concedem a transformação em animais",
  },
  {
    type: "Unknown",
    description: "Frutas com classificação desconhecida",
  },
];

interface FruitTypeLegendProps {
  className?: string;
}

export const FruitTypeLegend = ({ className }: FruitTypeLegendProps) => (
  <section
    className={twMerge(
      "rounded-xl border border-border bg-bg-card p-6",
      className,
    )}
  >
    <h4 className="mb-4 text-sm text-text-dim">Legenda dos Tipos</h4>

    <div className="flex flex-wrap gap-x-8 gap-y-4">
      {LEGEND.map(({ type, description }) => (
        <div key={type} className="flex items-center gap-3">
          <Badge color={getFruitTypeBadgeColor(type)}>{type}</Badge>

          <span className="text-xs text-text-dim">{description}</span>
        </div>
      ))}
    </div>
  </section>
);
