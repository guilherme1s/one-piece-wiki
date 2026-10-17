import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export type BadgeColor =
  | "primary"
  | "gold"
  | "green"
  | "blue"
  | "purple"
  | "orange"
  | "red"
  | "violet"
  | "neutral";

interface BadgeProps extends ComponentProps<"span"> {
  color?: BadgeColor;
  rounded?: "xs" | "sm" | "md" | "lg" | "full";
}

export const Badge = ({
  color = "primary",
  className,
  rounded = "full",
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

  const colorMap: Record<BadgeColor, string> = {
    primary: "border-primary/40 bg-primary/15 text-primary",
    gold: "border-gold/40 bg-gold/15 text-gold",
    green: "border-living/40 bg-living/15 text-living",
    blue: "border-zoan/40 bg-zoan/15 text-zoan",
    purple: "border-paramecia/40 bg-paramecia/15 text-paramecia",
    orange: "border-zoan-mythic/40 bg-zoan-mythic/15 text-zoan-mythic",
    red: "border-yonko/40 bg-yonko/15 text-yonko",
    violet: "border-zoan-ancient/40 bg-zoan-ancient/15 text-zoan-ancient",
    neutral: "border-border bg-bg-elevated text-text-muted",
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
