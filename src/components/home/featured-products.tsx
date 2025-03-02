import ProductCard from "@/features/product/components/product-card";
import { useGetProductsQuery } from "@/features/product/product-api";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import Loading from "../ui/loading";

export default function FeaturedProducts() {
  const { data, isLoading, error } = useGetProductsQuery({
    limit: 8,
    include: "category,shop",
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
  return (
    <section className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-8 text-center flex items-center justify-end">
        <Button asChild className="rounded-full">
          <Link to="/products">
            See all products
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
