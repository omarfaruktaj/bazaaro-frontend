import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import ScrollToTopButton from "@/components/ui/scroll-to-top";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import ProductCard from "@/features/product/components/product-card";
import ProductSideFilter from "@/features/product/components/side-product-filter";
import { useGetProductsQuery } from "@/features/product/product-api";
import { Product } from "@/types";
import { FilterIcon } from "lucide-react";
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
      <ScrollToTopButton />
      <div className=" flex items-center justify-between">
        <h2 className="text-4xl font-extrabold text-gray-900 my-8 p-4">
          All Products
        </h2>
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full w-full md:w-auto md:hidden"
              >
                <FilterIcon className="h-5 w-5 text-muted-foreground" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
              </SheetHeader>
              <ProductSideFilter />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div className="col-span-1  hidden md:block">
          <div className="sticky top-8 bg-white p-4 shadow-md rounded-md z-10">
            <h2 className="text-xl font-semibold mb-1">Filter</h2>
            <ProductSideFilter />
          </div>
        </div>

        <div className="md:col-span-3 lg:col-span-4">
          {productError ? (
            <div>
              <p className="text-lg font-medium text-center text-red-600 py-12">
                Oops! Something went wrong. Please try again later.
              </p>
            </div>
          ) : null}

          {!data ||
            (data.products.length === 0 && (
              <div className=" text-center space-y-6 max-w-md  px-4">
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 pt-0">
            {productsList?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {isLoading && <p>Loading...</p>}
          </div>

          {pagination?.nextPage && <div ref={ref} className="h-1"></div>}

          {loading && (
            <div className="flex justify-center py-6">
              <Spinner size="medium" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
