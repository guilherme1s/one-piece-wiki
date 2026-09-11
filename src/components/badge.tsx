import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface BadgeProps extends ComponentProps<"span"> {
  color?: string;
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

  const colorMap: Record<string, string> = {
    primary: "border-primary bg-primary/20 text-primary",
    gold: "border-gold bg-gold/20 text-gold",
  };

  return (
    <span
      className={twMerge(
        `inline-flex items-center ${roundedMap[rounded]} border border-${colorMap[color]} bg-${colorMap[color]}/20 px-2.5 py-1 text-xs font-semibold uppercase text-${color}`,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
