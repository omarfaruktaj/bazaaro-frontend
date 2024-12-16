import CountdownTimer from "@/components/countdown-timer";
import Loading from "@/components/ui/loading";
import ProductCard from "@/features/product/components/product-card";
import { useGetProductsQuery } from "@/features/product/product-api";

export default function FlashSale() {
  const { data, isLoading, error } = useGetProductsQuery({
    limit: 12,
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
    <section className="container mx-auto p-8">
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
    </section>
  );
}
