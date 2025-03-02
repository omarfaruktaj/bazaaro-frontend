import { Button } from "@/components/ui/button";
import ProductCard from "@/features/product/components/product-card";
import { useAppSelector } from "@/redux/hooks";
import { Link } from "react-router";

const RecentProducts = () => {
  const recentProducts = useAppSelector(
    (state) => state.product.recentVisitedProducts
  );

  if (recentProducts.length === 0) {
    return (
      <div className="container mx-auto min-h-screen  p-4">
        <div className="flex flex-col min-h-screen gap-4 items-center justify-center">
          <p className="text-lg text-muted-foreground">
            You haven't viewed any products yet. Start browsing!
          </p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Recently Viewed Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;
