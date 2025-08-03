import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDownUp } from "lucide-react";

export default function ProductHeaderSkeleton() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex items-center justify-between">
      {/* Left: Showing X of Y products */}
      <div>
        <span className="text-sm text-gray-500">
          Showing{" "}
          <Skeleton className="inline-block h-4 w-6 align-middle mx-1" /> of{" "}
          <Skeleton className="inline-block h-4 w-8 align-middle mx-1" />{" "}
          products
        </span>
      </div>

      {/* Right: Sort Label */}
      <div className="text-sm text-gray-500 flex items-center">
        <ArrowDownUp className="h-3 w-3 mr-1 text-muted" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
