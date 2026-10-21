import { Suspense } from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Wrapper } from "@/components/wrapper";
import { listCharacters } from "@/api/routes/list-characters";
import { getCharacterDisplayName } from "@/lib/character-name";
import { getCharacterExtrasForPage } from "@/lib/character-extras";
import { CharacterGrid } from "@/components/character/character-grid";
import { CharacterGridSkeleton } from "@/components/character/character-skeleton";
import { SearchForm } from "@/components/search-form";

interface CharactersPageProps {
  searchParams: Promise<{ page?: string | string[]; q?: string | string[] }>;
}

export const metadata: Metadata = {
  title: "Personagens",
  description:
    "Explore todos os personagens de One Piece: recompensas, tripulações, ocupações e akumas no mi.",
};

const parsePage = (value: string | string[] | undefined) => {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? "", 10);

  return Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
};

interface CharactersResultsProps {
  query?: string;
  page: number;
}

async function CharactersResults({ query, page }: CharactersResultsProps) {
  const {
    characters,
    page: currentPage,
    hasNextPage,
  } = await listCharacters({
    q: query,
    page,
  });

  const extrasByName = await getCharacterExtrasForPage(
    characters.map((character) => getCharacterDisplayName(character.name)),
  ).catch(() => ({}));

  if (query && characters.length === 0) {
    return (
      <p className="py-12 text-center text-text-muted">
        Nenhum personagem encontrado para “{query}”.
      </p>
    );
  }

  return (
    <CharacterGrid
      characters={characters}
      extrasByName={extrasByName}
      page={currentPage}
      hasNextPage={hasNextPage}
    />
  );
}

export default async function CharactersPage({
  searchParams,
}: CharactersPageProps) {
  const { page, q } = await searchParams;

  const queryValue = Array.isArray(q) ? q[0] : q;
  const query = queryValue?.trim() || undefined;

  return (
    <div>
      <Hero />

      <Wrapper className="py-12">
        <div className="w-full">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-semibold uppercase text-text">
              Personagens
            </h2>

            <SearchForm
              actions="/characters"
              label="Buscar personagem..."
              placeholder="Buscar personagem..."
              query={query}
            />
          </div>

          <Suspense fallback={<CharacterGridSkeleton />}>
            <CharactersResults query={query} page={parsePage(page)} />
          </Suspense>
        </div>
      </Wrapper>
    </div>
  );
}
