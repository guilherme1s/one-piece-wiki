import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export type DivProps = ComponentProps<"div">;

export const Wrapper = ({ className, ...props }: DivProps) => {
  return (
    <div
      className={twMerge(
        "mx-auto flex w-full max-w-300 items-center px-6 xl:px-0",
        className,
      )}
      {...props}
    />
  );
};
