import type { DevilFruit } from "@/api/routes/list-devil-fruits";
import { Pagination } from "../pagination";
import { FruitCard } from "./fruit-card";

interface FruitGridProps {
  fruits: DevilFruit[];
  page: number;
  hasNextPage: boolean;
}

export const FruitGrid = ({ fruits, page, hasNextPage }: FruitGridProps) => (
  <>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {fruits.map((fruit) => (
        <FruitCard key={fruit.id} fruit={fruit} />
      ))}
    </div>

    <Pagination currentPage={page} hasNextPage={hasNextPage} />
  </>
);
