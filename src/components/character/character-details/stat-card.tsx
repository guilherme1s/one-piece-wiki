import { twMerge } from "tailwind-merge";

interface StatProps {
  label: string;
  value: string;
  className?: string;
}

export const StatCard = ({ label, value, className }: StatProps) => (
  <div className="rounded-lg border border-border bg-bg-card p-4">
    <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-text-dim">
      {label}
    </span>

    <span
      className={twMerge(
        "font-heading text-xl font-semibold text-text",
        className,
      )}
    >
      {value}
    </span>
  </div>
);
