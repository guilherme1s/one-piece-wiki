import Link from "next/link";
import { twMerge } from "tailwind-merge";
import {
  DEVIL_FRUIT_TYPES,
  type DevilFruitType,
} from "@/api/routes/list-devil-fruits";

interface FruitFiltersProps {
  activeType?: DevilFruitType;
  query?: string;
  counts: Record<DevilFruitType, number>;
  totalCount: number;
}

interface FilterChipProps {
  href: string;
  label: string;
  count: number;
  active?: boolean;
}

const buildHref = (type: DevilFruitType | undefined, query?: string) => {
  const params = new URLSearchParams();

  if (query) params.set("q", query);
  if (type) params.set("type", type);

  const search = params.toString();

  return search ? `/fruits?${search}` : "/fruits";
};

const FilterChip = ({ href, label, count, active }: FilterChipProps) => (
  <Link
    href={href}
    aria-current={active ? "page" : undefined}
    className={twMerge(
      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
      active
        ? "border-primary/30 bg-primary/15 text-primary-hover"
        : "border-border bg-bg-card text-text-muted hover:border-border-hover hover:bg-bg-card-hover hover:text-text",
    )}
  >
    {label}

    <span
      className={twMerge(
        "rounded-full px-1.5 py-0.5 text-xs",
        active ? "bg-primary/20" : "bg-bg-elevated",
      )}
    >
      {count}
    </span>
  </Link>
);

export const FruitFilters = ({
  activeType,
  query,
  counts,
  totalCount,
}: FruitFiltersProps) => (
  <div className="flex flex-wrap items-center gap-2">
    <FilterChip
      href={buildHref(undefined, query)}
      label="Todas"
      count={totalCount}
      active={!activeType}
    />

    {DEVIL_FRUIT_TYPES.map((type) => (
      <FilterChip
        key={type}
        href={buildHref(type, query)}
        label={type}
        count={counts[type]}
        active={activeType === type}
      />
    ))}
  </div>
);
