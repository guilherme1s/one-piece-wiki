import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface BadgeProps extends ComponentProps<"span"> {
  color?: "primary" | "gold" | "crew" | "muted";
  rounded?: "xs" | "sm" | "md" | "lg" | "full";
}

export const Badge = ({
  color = "primary",
  className,
  rounded = "md",
  children,
  ...props
}: BadgeProps) => {
  const roundedMap = {
    xs: "rounded-xs",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const colorMap = {
    primary: "border-primary/40 bg-primary/15 text-primary",
    gold: "border-gold/40 bg-gold/15 text-gold",
    crew: "border-primary/40 bg-primary/15 text-primary",
    muted: "border-border bg-bg-elevated text-text-muted",
  };

  return (
    <span
      className={twMerge(
        `inline-flex max-w-full items-center ${roundedMap[rounded]} border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide`,
        colorMap[color],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
