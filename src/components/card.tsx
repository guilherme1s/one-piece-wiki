import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type CardRootProps = ComponentProps<typeof Link>;

const CardRoot = ({ className, ...props }: CardRootProps) => (
  <Link
    className={twMerge(
      "group flex flex-col overflow-hidden rounded-xl border border-border bg-bg-card transition-colors duration-200",
      "hover:border-border-hover hover:bg-bg-card-hover",
      "outline-none focus-visible:ring-2 focus-visible:ring-primary",
      className,
    )}
    {...props}
  />
);

interface CardImageProps extends ComponentProps<"div"> {
  src?: string;
  alt?: string;
  ratio?: "portrait" | "square";
}

const CardImage = ({
  src,
  alt = "",
  ratio = "portrait",
  className,
  children,
  ...props
}: CardImageProps) => (
  <div
    className={twMerge(
      "relative flex w-full items-center justify-center overflow-hidden bg-bg-elevated",
      ratio === "square" ? "aspect-square" : "aspect-3/4",
      className,
    )}
    {...props}
  >
    {src ? (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
      />
    ) : (
      children
    )}
  </div>
);

type CardBodyProps = ComponentProps<"div">;

const CardBody = ({ className, ...props }: CardBodyProps) => (
  <div className={twMerge("flex flex-1 flex-col p-5", className)} {...props} />
);

type CardTitleProps = ComponentProps<"h3">;

const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <h3
    className={twMerge(
      "mb-2 font-heading text-lg font-semibold uppercase tracking-wide",
      className,
    )}
    {...props}
  />
);

type CardSubtitleProps = ComponentProps<"p">;

const CardSubtitle = ({ className, ...props }: CardSubtitleProps) => (
  <p
    className={twMerge("mb-3 text-sm text-text-muted", className)}
    {...props}
  />
);

type CardContentProps = ComponentProps<"div">;

const CardContent = ({ className, ...props }: CardContentProps) => (
  <div
    className={twMerge("flex flex-wrap items-center gap-2", className)}
    {...props}
  />
);

type CardFooterProps = ComponentProps<"div">;

const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div
    className={twMerge(
      "flex min-h-14 flex-wrap items-center gap-2 border-t border-border bg-bg-elevated/40 px-5 py-3",
      className,
    )}
    {...props}
  />
);

export const Card = {
  Root: CardRoot,
  Image: CardImage,
  Body: CardBody,
  Title: CardTitle,
  Subtitle: CardSubtitle,
  Content: CardContent,
  Footer: CardFooter,
};
