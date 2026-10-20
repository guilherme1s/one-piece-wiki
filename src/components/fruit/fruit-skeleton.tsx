import { Card } from "../card";
import { Skeleton } from "../skeleton";

const SKELETON_COUNT = 12;
const FILTER_CHIPS_COUNT = 5;

export const FruitCardSkeleton = () => (
  <Card.Root>
    <Card.Image ratio="square">
      <Skeleton className="absolute inset-0 rounded-none" />
    </Card.Image>

    <Card.Body>
      <Skeleton className="mb-2 h-6 w-2/3" />
      <Skeleton className="mb-3 h-4 w-1/2" />

      <Card.Content>
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </Card.Content>
    </Card.Body>

    <Card.Footer className="justify-between">
      <Skeleton className="h-3 w-32" />
    </Card.Footer>
  </Card.Root>
);

export const FruitFiltersSkeleton = () => (
  <div className="flex flex-wrap items-center gap-2">
    {Array.from({ length: FILTER_CHIPS_COUNT }, (_, index) => (
      <Skeleton key={index} className="h-9 w-28 rounded-full" />
    ))}
  </div>
);

export const FruitGridSkeleton = () => (
  <div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <FruitCardSkeleton key={index} />
      ))}
    </div>

    <div className="mt-10 flex items-center justify-center">
      <Skeleton className="h-9 w-40 rounded-lg" />
    </div>
  </div>
);
