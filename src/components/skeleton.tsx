import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type SkeletonProps = ComponentProps<"div">;

export const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    className={twMerge("animate-pulse rounded-md bg-white/10", className)}
    {...props}
  />
);
