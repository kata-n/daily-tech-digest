import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = ({ width = "auto", height = "auto" }) => {
  return (
    <div style={{ width, height }}>
      <Skeleton className="h-4 mb-4 w-2/3" />
      <Skeleton className="h-8 w-1/2 mb-6" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5 mt-4" />
    </div>
  );
};

export default CardSkeleton;

export function QuizCardSkeleton() {
  return (
    <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-md p-4 sm:p-6 mb-4 animate-pulse">
      <div className="flex flex-col gap-3">
        <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
      </div>

      <div className="space-y-3 my-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-md"
          />
        ))}
      </div>
    </div>
  );
}

export function QuizSkeletonList() {
  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
      {[...Array(5)].map((_, i) => (
        <QuizCardSkeleton key={i} />
      ))}
    </div>
  );
}
