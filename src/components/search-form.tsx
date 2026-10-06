import { Search } from "lucide-react";

interface SearchFormProps {
  query?: string;
  placeholder: string;
  actions: string;
  label: string;
}

export const SearchForm = ({
  actions,
  placeholder,
  label,
  query,
}: SearchFormProps) => {
  return (
    <form
      action={actions}
      method="get"
      role="search"
      className="w-full md:w-80"
    >
      <label htmlFor="character-search" className="sr-only">
        {label}
      </label>
      <div className="flex h-11 items-center gap-2 rounded-lg border border-border bg-bg-card px-3 transition focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20">
        <Search
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-text-muted"
        />
        <input
          type="search"
          id="character-search"
          name="q"
          defaultValue={query}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm text-text outline-none placeholder:text-text-muted"
        />
        <button
          type="submit"
          className="rounded-md bg-gold px-3 py-1.5 text-xs font-semibold text-bg transition hover:opacity-90 cursor-pointer"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};
