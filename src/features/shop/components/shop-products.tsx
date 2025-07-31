import { Button } from "@/components/ui/button";
import ScrollToTopButton from "@/components/ui/scroll-to-top";
import { Spinner } from "@/components/ui/spinner";
import ProductCard from "@/features/product/components/product-card";
import ProductFilter from "@/features/product/components/product-filter";
import { useGetProductsQuery } from "@/features/product/product-api";
import { Product } from "@/types";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router";

export default function ShopProducts({ shopId }: { shopId: string }) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("searchTerm") || "";
  const sort = searchParams.get("sort") || "";
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const {
    data,
    isLoading,
    error: productError,
    isFetching,
  } = useGetProductsQuery(
    {
      page: page,
      shopId: shopId,
      include: "category,shop",
      searchTerm,
      sort,
      category,
      minPrice,
      maxPrice,
    },
    { skip: !shopId }
  );

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  useEffect(() => {
    setPage(1);
    setProductsList([]);
  }, [category, minPrice, maxPrice, sort, searchParams]);

  useEffect(() => {
    if (inView && !isFetching && !loading && data?.pagination?.nextPage) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isFetching, loading, data]);

  useEffect(() => {
    if (data) {
      setProductsList((prevProducts) => [...prevProducts, ...data.products]);
      setLoading(false);
    }
  }, [data]);

  if (isLoading && page === 1) {
    return <ProductsLoading />;
  }

  const { pagination } = data || {};

  return (
    <div className="py-4">
      <div className="mb-6">
        <ProductFilter />
      </div>
      <ScrollToTopButton />

      {productError ? (
        <div className="flex items-center justify-center min-h-[40vh] rounded-xl bg-red-50 dark:bg-red-900/10 p-8">
          <div className="text-center">
            <ShoppingBag className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
              Oops! Something went wrong.
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              We couldn't load the products. Please try again later.
            </p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              Retry
            </Button>
          </div>
        </div>
      ) : null}

      {!productError && data?.products.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto px-4 py-12 min-h-[40vh]">
          <div className="p-6 rounded-full bg-primary/10 mb-2">
            <ShoppingBag className="w-12 h-12 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">No products found</h2>
            <p className="text-muted-foreground mb-6">
              {searchParams.size > 0
                ? "No products match your current filters. Try adjusting your search criteria."
                : "This shop hasn't added any products yet. Check back later!"}
            </p>
            {searchParams.size > 0 && (
              <Button
                onClick={() => {
                  setSearchParams({});
                  if (searchParams.size === 0) window.location.reload();
                }}
                className="px-6"
              >
                Reset Filters
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {productsList?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {pagination?.nextPage && <div ref={ref} className="h-1"></div>}

      {loading && (
        <div className="flex justify-center py-8">
          <Spinner size="medium" />
        </div>
      )}
    </div>
  );
}

function ProductsLoading() {
  return (
    <div className="py-4 animate-pulse">
      <div className="mb-6 h-12 bg-muted-foreground/20 rounded-md"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-64 bg-muted-foreground/20 rounded-xl"
            ></div>
          ))}
      </div>
    </div>
  );
}
