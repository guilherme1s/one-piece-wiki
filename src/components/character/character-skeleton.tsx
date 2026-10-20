import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card } from "../card";
import { Skeleton } from "../skeleton";

const SKELETON_COUNT = 12;

export const CharacterCardSkeleton = () => (
  <Card.Root>
    <Card.Image>
      <Skeleton className="absolute inset-0 rounded-none" />
    </Card.Image>

    <Card.Body>
      <Skeleton className="mb-2 h-6 w-2/3" />
      <Skeleton className="mb-3 h-4 w-1/2" />

      <Card.Content>
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-16" />
      </Card.Content>
    </Card.Body>

    <Card.Footer>
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-24 rounded-full" />
    </Card.Footer>
  </Card.Root>
);

export const CharacterGridSkeleton = () => (
  <div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <CharacterCardSkeleton key={index} />
      ))}
    </div>

    <div className="mt-10 flex items-center justify-center">
      <Skeleton className="h-9 w-40 rounded-lg" />
    </div>
  </div>
);

const DETAIL_STATS_COUNT = 4;
const DETAIL_INFO_CARDS_COUNT = 6;
const DETAIL_MEMBERS_COUNT = 6;

export const CharacterDetailSkeleton = () => (
  <div className="flex flex-col gap-12 pb-8">
    <section className="grid gap-10 lg:grid-cols-[320px_1fr]">
      <div className="aspect-3/4 w-full overflow-hidden rounded-xl border border-border bg-bg-card">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <div className="flex flex-col justify-center gap-4">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        <Skeleton className="h-12 w-2/3" />

        <Skeleton className="h-5 w-1/2" />

        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-44" />
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="mt-1 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: DETAIL_STATS_COUNT }, (_, index) => (
            <div
              key={index}
              className="rounded-lg border border-border bg-bg-card p-4"
            >
              <Skeleton className="mb-2 h-3 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section>
      <Skeleton className="mb-6 h-8 w-44" />

      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: DETAIL_INFO_CARDS_COUNT }, (_, index) => (
          <div
            key={index}
            className="rounded-lg border border-border bg-bg-card p-4"
          >
            <Skeleton className="mb-2 h-3 w-24" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </section>

    <section>
      <Skeleton className="mb-6 h-8 w-36" />

      <div className="rounded-xl border border-border bg-bg-card p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>

          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {Array.from({ length: DETAIL_MEMBERS_COUNT }, (_, index) => (
            <div
              key={index}
              className="rounded-lg border border-border bg-bg-elevated p-3"
            >
              <Skeleton className="mb-2 h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>

    <div>
      <Link
        href="/characters"
        className="inline-flex items-center gap-2 rounded-lg border border-border-hover bg-bg-elevated px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-bg-card-hover"
      >
        <ArrowLeft size={16} />
        Voltar para personagens
      </Link>
    </div>
  </div>
);
