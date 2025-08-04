import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

export default function CategorySectionSkeleton() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 mx-auto mb-8" />

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              disabled
              type="text"
              placeholder="Search categories..."
              className="pl-10 pr-4 py-4 rounded-full bg-muted"
            />
          </div>
        </div>

        {/* Categories Grid Skeleton */}
        <div className="space-y-8">
          {Array.from({ length: 2 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center p-6 rounded-xl border-2 bg-muted/50 h-full"
                >
                  <div className="relative mb-4">
                    <Skeleton className="w-16 h-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
