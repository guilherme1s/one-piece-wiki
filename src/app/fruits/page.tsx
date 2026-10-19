import { SearchForm } from "@/components/search-form";
import { Wrapper } from "@/components/wrapper";
import { FruitFilters } from "@/components/fruit/fruit-filters";
import { FruitGrid } from "@/components/fruit/fruit-grid";
import { FruitTypeLegend } from "@/components/fruit/fruit-type-legend";
import {
  isDevilFruitType,
  listDevilFruits,
} from "@/api/routes/list-devil-fruits";

interface FruitsPageProps {
  searchParams: Promise<{
    page?: string | string[];
    q?: string | string[];
    type?: string | string[];
  }>;
}

const parsePage = (value: string | string[] | undefined) => {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? "", 10);

  return Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
};

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function FruitsPage({ searchParams }: FruitsPageProps) {
  const { page, q, type } = await searchParams;

  const query = firstValue(q)?.trim() || undefined;
  const typeValue = firstValue(type)?.trim();
  const fruitType =
    typeValue && isDevilFruitType(typeValue) ? typeValue : undefined;

  const {
    fruits,
    total,
    totalAll,
    counts,
    page: currentPage,
    hasNextPage,
  } = await listDevilFruits({
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

            <p className="mt-2 text-sm text-text-muted">
              {total} {total === 1 ? "fruta encontrada" : "frutas encontradas"}
            </p>
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

            <FruitFilters
              counts={counts}
              totalCount={totalAll}
              activeType={fruitType}
              query={query}
            />
          </div>
        </div>

        {query && fruits.length === 0 ? (
          <p className="py-12 text-center text-text-muted">
            Nenhuma akuma no mi encontrada para “{query}”.
          </p>
        ) : (
          <FruitGrid
            fruits={fruits}
            page={currentPage}
            hasNextPage={hasNextPage}
          />
        )}

        <FruitTypeLegend className="mt-12" />
      </div>
    </Wrapper>
  );
}
