import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

export default function ProductCardSkeleton() {
  return (
    <Card className="border-0 group flex flex-col h-full">
      {/* Card Header with Image */}
      <CardHeader className="p-0">
        <div className="relative cursor-pointer rounded-t-md overflow-hidden">
          <Skeleton className="w-full h-36 lg:h-48 rounded-t-md" />
          <Skeleton className="absolute top-3 right-3 h-6 w-16 rounded-full" />
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-4 flex flex-col flex-grow space-y-4">
        <Skeleton className="h-6 w-[80%] rounded-md" />

        {/* Ratings and Review Count */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-12" />
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 min-w-[60px] max-w-[100px]" />
            <Skeleton className="h-5 min-w-[60px] max-w-[70px]" />
          </div>
        </div>
      </CardContent>

      {/* Card Footer with Add to Cart Button */}
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
}
