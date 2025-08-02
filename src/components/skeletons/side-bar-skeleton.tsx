import { Skeleton } from "@/components/ui/skeleton";
import { XCircleIcon } from "lucide-react";

export default function FilterSidebarSkeleton() {
  return (
    <div>
      {/* Search Input Skeleton */}
      <div className="mb-4">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Categories Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-5 w-32 mb-3" /> {/* Label */}
        <div className="flex flex-col gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-full" /> {/* Radio */}
              <Skeleton className="h-5 w-24" /> {/* Label */}
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-5 w-32 mb-3" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-10 w-1/2" />
        </div>
      </div>

      {/* Sort Dropdown Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-5 w-20 mb-3" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Clear Filter Button Skeleton */}
      <div className="w-full flex items-center gap-2">
        <XCircleIcon className="h-5 w-5 text-muted" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
