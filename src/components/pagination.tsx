"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
}

export const Pagination = ({ currentPage, hasNextPage }: PaginationProps) => {
  const searchParams = useSearchParams();

  if (currentPage <= 1 && !hasNextPage) {
    return null;
  }

  const page = Math.max(currentPage, 1);

  const buildHref = (targetPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(targetPage));

    return `?${params.toString()}`;
  };

  return (
    <nav
      aria-label="Paginação"
      className="mt-10 flex items-center justify-center gap-2"
    >
      {page > 1 && (
        <Link
          href={buildHref(page - 1)}
          className="rounded-lg border border-border px-4 py-2 text-sm text-text transition hover:bg-bg-card"
        >
          Anterior
        </Link>
      )}

      <span className="px-3 text-sm text-text-muted">Página {page}</span>

      {hasNextPage && (
        <Link
          href={buildHref(page + 1)}
          className="rounded-lg border border-border px-4 py-2 text-sm text-text transition hover:bg-bg-card"
        >
          Próxima
        </Link>
      )}
    </nav>
  );
};
