import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto py-12">
      {/* Product Header */}
      <div className="flex items-start justify-between ml-6 mb-4">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      <div className="px-6">
        {/* Product Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Image Section Skeleton */}
          <div className="flex justify-center md:justify-start w-full">
            <div className="w-full max-w-xl overflow-hidden">
              <Skeleton className="h-[400px] w-full rounded-md" />
            </div>
          </div>

          {/* Product Details Section Skeleton */}
          <div className="space-y-6">
            {/* Title Skeleton */}
            <Skeleton className="h-8 w-[300px]" />

            {/* Discount Badge Skeleton */}
            <Skeleton className="h-5 w-24 rounded-full" />

            {/* Category Link Skeleton */}
            <Skeleton className="h-5 w-[200px]" />

            {/* Ratings and Reviews Section Skeleton */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Skeleton className="h-5 w-[80px]" />
              <Skeleton className="h-5 w-[50px]" />
            </div>

            {/* Price Section Skeleton */}
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-[120px]" />
              <Skeleton className="h-6 w-[100px]" />
            </div>

            {/* Description Skeleton */}
            <Skeleton className="h-5 w-[80%]" />
            <Skeleton className="h-5 w-[60%]" />

            {/* Stock and Shop Info Skeleton */}
            <div className="text-sm text-muted-foreground flex">
              <Skeleton className="h-5 w-[150px]" />
              <Skeleton className="h-5 w-[100px]" />
            </div>

            {/* Quantity Selector and Add to Cart Button Skeleton */}
            <div className="flex items-center mt-4 space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-12" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>

            {/* Add to Compare Button Skeleton */}
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>
        </div>

        {/* Related Products Section Skeleton */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            <Skeleton className="h-6 w-[200px]" />
          </h2>
          <Skeleton className="h-[200px] w-full rounded-md" />
          <Skeleton className="h-[200px] w-full rounded-md mt-4" />
        </div>

        {/* Customer Reviews Section Skeleton */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">
            <Skeleton className="h-6 w-[250px]" />
          </h2>
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-16 w-full rounded-md mt-4" />
        </div>
      </div>
    </div>
  );
}
