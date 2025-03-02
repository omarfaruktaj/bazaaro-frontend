import { Skeleton } from "@/components/ui/skeleton";

export default function FilterSkeleton() {
  return (
    <div>
      <div className="mb-4">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="mb-6">
        <p className="mb-2 block">Categories</p>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-12" /> {/* Spinner Skeleton */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded-full" />{" "}
            <Skeleton className="h-4 w-20" /> {/* Label skeleton */}
          </div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-full" />{" "}
              <Skeleton className="h-4 w-20" /> {/* Category name skeleton */}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <p className="mb-2 block">Price Range</p>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-1/2 rounded-md" />{" "}
          <Skeleton className="h-10 w-1/2 rounded-md" />{" "}
        </div>
      </div>
      <div className="mb-6">
        <p className="mb-2 block">Sort</p>
        <div className="w-full">
          <Skeleton className="h-10 w-full rounded-md" />{" "}
        </div>
      </div>
      <Skeleton className="h-12 w-full rounded-md" /> {/* Button Skeleton */}
    </div>
  );
}
