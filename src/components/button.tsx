import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "gold"
  | "danger";

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover",
  secondary:
    "border border-border-hover bg-bg-elevated text-text hover:bg-bg-card-hover",
  outline:
    "border border-primary bg-transparent text-primary hover:bg-primary/10",
  ghost:
    "border border-transparent bg-transparent text-text-muted hover:bg-bg-card-hover hover:text-text",
  gold: "border border-gold bg-gold text-bg hover:border-gold-hover hover:bg-gold-hover",
  danger: "border border-yonko bg-yonko text-white hover:brightness-110",
};

export const Button = ({
  children,
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={twMerge(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
