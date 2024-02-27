import { Skeleton } from '@nextui-org/react';

export const ListSkeleton = () => {
  return (
    <Skeleton className="rounded-lg">
      <div className="bg-default-300 h-24 rounded-lg"></div>
    </Skeleton>
  );
};
