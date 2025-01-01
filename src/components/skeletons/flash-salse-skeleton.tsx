import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "./product-card-skeleton";

export default function FlashSaleSkeleton() {
  return (
    <section className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-[250px]" />
        <div className="flex items-center">
          <Skeleton className="h-6 w-[100px]" />
          <Skeleton className="h-6 w-[120px] ml-2" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {[...Array(12)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
