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
  return (
    <span
      className={twMerge(
        `inline-flex items-center rounded-${rounded} border border-${color} bg-${color}/20 px-2.5 py-1 text-xs font-semibold uppercase text-${color}`,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
