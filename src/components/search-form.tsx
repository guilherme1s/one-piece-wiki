import { Search } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";

interface SearchFormProps {
  query?: string;
  placeholder: string;
  actions: string;
  label: string;
  params?: Record<string, string>;
  className?: string;
}

export const SearchForm = ({
  actions,
  placeholder,
  label,
  query,
  params,
  className,
}: SearchFormProps) => {
  return (
    <form
      action={actions}
      method="get"
      role="search"
      className={twMerge("w-full md:w-80", className)}
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
          className="w-full flex-1 bg-transparent text-sm text-text outline-none placeholder:text-text-muted"
        />
        <Button type="submit" variant="gold">
          Buscar
        </Button>
      </div>

      {params &&
        Object.entries(params).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
    </form>
  );
};
