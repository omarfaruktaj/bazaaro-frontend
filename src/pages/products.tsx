import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import ScrollToTopButton from "@/components/ui/scroll-to-top";
import { Spinner } from "@/components/ui/spinner";
import ProductCard from "@/features/product/components/product-card";
import ProductFilter from "@/features/product/components/product-filter";
import { useGetProductsQuery } from "@/features/product/product-api";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router";

export default function Products() {
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
  } = useGetProductsQuery({
    page: page,
    include: "category,shop,review",
    searchTerm,
    sort,
    category,
    minPrice,
    maxPrice,
  });

  console.log(data);
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
    return <Loading />;
  }

  const { pagination } = data || {};

  return (
    <div className="py-8 container mx-auto">
      <ProductFilter />
      <ScrollToTopButton />

      {productError ? (
        <div className="container mx-auto flex items-center justify-center min-h-screen">
          <p className="text-lg font-medium text-center text-red-600 py-12">
            Oops! Something went wrong. Please try again later.
          </p>
        </div>
      ) : null}

      {!data ||
        (data.products.length === 0 && (
          <div className="container mx-auto flex flex-col min-h-screen items-center justify-center text-center space-y-6 max-w-md  px-4">
            <div className="mb-4">
              <h1 className="text-xl font-semibold text-primary">
                No products found matching your criteria!
              </h1>
            </div>
            <Button
              onClick={() => {
                setSearchParams({});
                if (searchParams.size === 0) window.location.reload();
              }}
              className="bg-primary text-white rounded-md px-6 py-3 transition-transform hover:scale-105"
            >
              {searchParams.size === 0 ? "Reload Page" : "Reset Filters"}
            </Button>
          </div>
        ))}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-6 p-4 ">
        {productsList?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {pagination?.nextPage && <div ref={ref} className="h-1"></div>}

      {loading && (
        <div className="flex justify-center py-6">
          <Spinner size="medium" />
        </div>
      )}
      {/* {!isLoading && !pagination?.nextPage && (
        <p className="text-center text-muted-foreground">
          {" "}
          --No more products--
        </p>
      )} */}
    </div>
  );
}
