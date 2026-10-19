import { Circle } from "lucide-react";
import { twMerge } from "tailwind-merge";
import type { DevilFruitType } from "@/api/routes/list-devil-fruits";
import { FRUIT_TYPE_ICON_MAP } from "@/lib/fruit-icons";

interface FruitPlaceholderProps {
  type: string;
  className?: string;
  iconClassName?: string;
}

export const FruitPlaceholder = ({
  type,
  className,
  iconClassName,
}: FruitPlaceholderProps) => {
  const Icon = FRUIT_TYPE_ICON_MAP[type as DevilFruitType] ?? Circle;

  return (
    <div
      className={twMerge(
        "flex h-full w-full items-center justify-center bg-bg-elevated",
        className,
      )}
    >
      <Icon
        aria-hidden="true"
        strokeWidth={1.5}
        className={twMerge("text-text-muted", iconClassName)}
      />
    </div>
  );
};
