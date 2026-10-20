import { Suspense } from "react";
import { SearchForm } from "@/components/search-form";
import { Skeleton } from "@/components/skeleton";
import { Wrapper } from "@/components/wrapper";
import {
  FruitFiltersSkeleton,
  FruitGridSkeleton,
} from "@/components/fruit/fruit-skeleton";
import { FruitFilters } from "@/components/fruit/fruit-filters";
import { FruitGrid } from "@/components/fruit/fruit-grid";
import { FruitTypeLegend } from "@/components/fruit/fruit-type-legend";
import {
  isDevilFruitType,
  listDevilFruits,
  type DevilFruitType,
} from "@/api/routes/list-devil-fruits";

interface FruitsPageProps {
  searchParams: Promise<{
    page?: string | string[];
    q?: string | string[];
    type?: string | string[];
  }>;
}

type DevilFruitsResult = Awaited<ReturnType<typeof listDevilFruits>>;

const parsePage = (value: string | string[] | undefined) => {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? "", 10);

  return Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
};

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

interface FruitCountProps {
  results: Promise<DevilFruitsResult>;
}

async function FruitCount({ results }: FruitCountProps) {
  const { total } = await results;

  return (
    <p className="mt-2 text-sm text-text-muted">
      {total} {total === 1 ? "fruta encontrada" : "frutas encontradas"}
    </p>
  );
}

interface FruitFiltersPanelProps {
  results: Promise<DevilFruitsResult>;
  activeType?: DevilFruitType;
  query?: string;
}

async function FruitFiltersPanel({
  results,
  activeType,
  query,
}: FruitFiltersPanelProps) {
  const { counts, totalAll } = await results;

  return (
    <FruitFilters
      counts={counts}
      totalCount={totalAll}
      activeType={activeType}
      query={query}
    />
  );
}

interface FruitResultsProps {
  results: Promise<DevilFruitsResult>;
  query?: string;
}

async function FruitResults({ results, query }: FruitResultsProps) {
  const { fruits, page: currentPage, hasNextPage } = await results;

  if (query && fruits.length === 0) {
    return (
      <p className="py-12 text-center text-text-muted">
        Nenhuma akuma no mi encontrada para “{query}”.
      </p>
    );
  }

  return (
    <FruitGrid fruits={fruits} page={currentPage} hasNextPage={hasNextPage} />
  );
}

export default async function FruitsPage({ searchParams }: FruitsPageProps) {
  const { page, q, type } = await searchParams;

  const query = firstValue(q)?.trim() || undefined;
  const typeValue = firstValue(type)?.trim();
  const fruitType =
    typeValue && isDevilFruitType(typeValue) ? typeValue : undefined;

  const results = listDevilFruits({
    q: query,
    type: fruitType,
    page: parsePage(page),
  });

  return (
    <Wrapper className="py-12">
      <div className="w-full">
        <div className="mb-10 flex flex-col gap-6">
          <div>
            <h2 className="text-3xl font-semibold uppercase text-text">
              Akumas no Mi
            </h2>

            <Suspense fallback={<Skeleton className="mt-2 h-4 w-48" />}>
              <FruitCount results={results} />
            </Suspense>
          </div>

          <div className="flex w-full flex-col gap-4">
            <SearchForm
              actions="/fruits"
              label="Buscar akuma no mi"
              placeholder="Buscar por nome, tipo ou modelo..."
              query={query}
              params={fruitType ? { type: fruitType } : undefined}
              className="w-full md:w-full"
            />

            <Suspense fallback={<FruitFiltersSkeleton />}>
              <FruitFiltersPanel
                results={results}
                activeType={fruitType}
                query={query}
              />
            </Suspense>
          </div>
        </div>

        <Suspense fallback={<FruitGridSkeleton />}>
          <FruitResults results={results} query={query} />
        </Suspense>

        <FruitTypeLegend className="mt-12" />
      </div>
    </Wrapper>
  );
}
