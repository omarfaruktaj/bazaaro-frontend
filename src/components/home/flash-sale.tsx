import ProductCard from "@/features/product/components/product-card";
import { useGetProductsQuery } from "@/features/product/product-api";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import CountdownTimer from "../countdown-timer";
import { Button } from "../ui/button";
import Loading from "../ui/loading";

export default function FlashSale() {
  const { data, isLoading, error } = useGetProductsQuery({
    limit: 8,
    include: "category,shop",
    sort: "-discount",
  });

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className=" flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-center text-red-600 py-12">
          Error fetching products. Please try again later.
        </p>
      </div>
    );
  }

  if (!data || data?.products?.length === 0) {
    return null;
  }

  const flashSaleEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Flash Sale</h2>
        <div className="flex items-center">
          <span className="mr-2">Ends in:</span>
          <CountdownTimer endTime={flashSaleEndTime} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-8 text-center flex items-center justify-end">
        <Button asChild className="rounded-full">
          <Link to="/flash-sale">
            View All Flash Sale Products
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
