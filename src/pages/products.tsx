"use client";

import FlashSaleSkeleton from "@/components/skeletons/flash-salse-skeleton";
import { Button } from "@/components/ui/button";
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
import type { Product } from "@/types";
import { FilterIcon, SlidersHorizontal } from "lucide-react";
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
    return <FlashSaleSkeleton />;
  }

  const { pagination } = data || {};

  const handleResetFilters = () => {
    setSearchParams({});
    if (searchParams.size === 0) window.location.reload();
  };

  return (
    <div className="py-8 container mx-auto px-4 sm:px-6">
      <ScrollToTopButton />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          All Products
        </h1>

        <div className="flex items-center gap-3">
          {(searchTerm || sort || category || minPrice || maxPrice) && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="text-xs font-medium"
            >
              Clear Filters
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full md:hidden flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="rounded-t-2xl max-h-[85vh] overflow-y-auto"
            >
              <SheetHeader className="mb-4">
                <SheetTitle>Refine Your Search</SheetTitle>
              </SheetHeader>
              <ProductSideFilter />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-6 gap-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-1  hidden md:block">
          <div className="sticky top-8 bg-white p-5 shadow-sm rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              {(category || minPrice || maxPrice || sort) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetFilters}
                  className="text-xs h-8"
                >
                  Reset
                </Button>
              )}
            </div>
            <ProductSideFilter />
          </div>
        </div>

        <div className="md:col-span-4 lg:col-span-5 ">
          {productError ? (
            <div className="bg-red-50 border border-red-100 rounded-xl p-8 text-center">
              <p className="text-lg font-medium text-red-600 mb-2">
                Oops! Something went wrong.
              </p>
              <p className="text-sm text-red-500 mb-4">
                We couldn't load the products. Please try again later.
              </p>
              <Button
                variant="outline"
                onClick={handleResetFilters}
                className="bg-white"
              >
                Refresh Page
              </Button>
            </div>
          ) : null}

          {!productError && (!data || data.products.length === 0) && (
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 text-center">
              <div className="max-w-md mx-auto">
                <FilterIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  No products found
                </h2>
                <p className="text-gray-500 mb-6">
                  We couldn't find any products matching your current filters.
                  Try adjusting your search criteria.
                </p>
                <Button
                  onClick={handleResetFilters}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  {searchParams.size === 0
                    ? "Reload Page"
                    : "Reset All Filters"}
                </Button>
              </div>
            </div>
          )}

          {data && data.products.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-2">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
