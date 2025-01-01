import { Skeleton } from "../ui/skeleton";

export default function ShopSkeleton() {
  return (
    <section className="container mx-auto px-4">
      <Skeleton className="h-8 w-[250px] mb-6" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {" "}
        {[...Array(8)].map((_, index) => (
          <ShopCardSkeleton key={index} />
        ))}
      </div>

      <div className="mt-8 text-center flex items-center justify-end">
        <Skeleton className="h-12 w-[200px] rounded-full" />
      </div>
    </section>
  );
}

const ShopCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
      <Skeleton className="h-24 w-24 rounded-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-4" />
      <div className="flex items-center mt-2 gap-1">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
};
