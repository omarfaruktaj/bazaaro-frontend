import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "./product-card-skeleton";

export default function FeaturedProductsSkeleton() {
  return (
    <section className="container mx-auto px-4">
      <Skeleton className="h-8 w-[250px] mb-6" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {[...Array(8)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>

      <div className="mt-8 text-center flex items-center justify-end">
        <Skeleton className="h-12 w-[200px] rounded-full" />
      </div>
    </section>
  );
}
