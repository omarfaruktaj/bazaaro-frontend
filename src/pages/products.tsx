"use client";

import ProductCardSkeleton from "@/components/skeletons/product-card-skeleton";
import FilterSidebarSkeleton from "@/components/skeletons/side-bar-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import ScrollToTopButton from "@/components/ui/scroll-to-top";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
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
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownUp,
  FilterIcon,
  Grid3X3,
  LayoutGrid,
  // Search,
  SlidersHorizontal,
  Tag,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router";

export default function Products() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [gridView, setGridView] = useState("grid"); // "grid" or "compact"
  // const [localSearchTerm, setLocalSearchTerm] = useState("");

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

  // useEffect(() => {
  //   setLocalSearchTerm(searchTerm);
  // }, [searchTerm]);

  // if (isLoading && page === 1) {
  //   return <FlashSaleSkeleton />;
  // }

  const { pagination } = data || {};

  const handleResetFilters = () => {
    setSearchParams({});
    if (searchParams.size === 0) window.location.reload();
  };

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const newParams = new URLSearchParams(searchParams);
  //   if (localSearchTerm) {
  //     newParams.set("searchTerm", localSearchTerm);
  //   } else {
  //     newParams.delete("searchTerm");
  //   }
  //   setSearchParams(newParams);
  // };

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("sort", value);
    } else {
      newParams.delete("sort");
    }
    setSearchParams(newParams);
  };

  const removeFilter = (filterType: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(filterType);
    setSearchParams(newParams);
  };

  // Get active filters for display
  const activeFilters = [];
  if (category)
    activeFilters.push({ type: "category", label: `Category: ${category}` });
  if (minPrice)
    activeFilters.push({ type: "minPrice", label: `Min: $${minPrice}` });
  if (maxPrice)
    activeFilters.push({ type: "maxPrice", label: `Max: $${maxPrice}` });
  if (searchTerm)
    activeFilters.push({ type: "searchTerm", label: `"${searchTerm}"` });

  const getSortLabel = () => {
    switch (sort) {
      case "price":
        return "Price: Low to High";
      case "-price":
        return "Price: High to Low";
      case "-createdAt":
        return "Newest First";
      case "createdAt":
        return "Oldest First";
      // case "-rating":
      //   return "Highest Rated";
      // default:
      //   return "Featured";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 mt-36">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollToTopButton />

        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              All Products
            </h1>

            <div className="flex items-center gap-3">
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

              <div className="flex items-center border border-gray-200 rounded-full p-1 bg-white">
                <Button
                  variant={gridView === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setGridView("grid")}
                  className="rounded-full h-8 w-8 p-0"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={gridView === "compact" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setGridView("compact")}
                  className="rounded-full h-8 w-8 p-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-end">
            {/* <form onSubmit={handleSearch} className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                  className="pl-10 pr-16 py-6 rounded-full border-gray-200"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1.5 top-1/2 transform -translate-y-1/2 rounded-full"
                >
                  Search
                </Button>
              </div>
            </form> */}

            <div className="w-full md:w-48">
              <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center">
                    <ArrowDownUp className="h-4 w-4 mr-2" />
                    <span>Sort By</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="featured">Featured</SelectItem> */}
                  <SelectItem value="price">Price: Low to High</SelectItem>
                  <SelectItem value="-price">Price: High to Low</SelectItem>
                  <SelectItem value="-createdAt">Newest First</SelectItem>
                  <SelectItem value="createdAt">Oldest First</SelectItem>
                  {/* <SelectItem value="-rating">Highest Rated</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500 flex items-center">
                <Tag className="h-3 w-3 mr-1" />
                Active Filters:
              </span>

              {activeFilters.map((filter) => (
                <Badge
                  key={filter.type}
                  variant="secondary"
                  className="flex items-center gap-1 bg-white"
                >
                  {filter.label}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter(filter.type)}
                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              {activeFilters.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetFilters}
                  className="text-xs h-7 hover:bg-red-50 hover:text-red-600"
                >
                  Clear All
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="col-span-1 md:col-span-2 lg:col-span-1 hidden md:block">
            <Card className="sticky top-8 overflow-hidden border-0 shadow-sm">
              <div className="bg-gray-50 px-5 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold flex items-center">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </h2>
                  {(category || minPrice || maxPrice || sort) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleResetFilters}
                      className="text-xs h-8 hover:bg-red-50 hover:text-red-600"
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </div>
              <div className="p-5">
                {isLoading ? <FilterSidebarSkeleton /> : <ProductSideFilter />}
              </div>
            </Card>
          </div>

          <div className="md:col-span-4 lg:col-span-5">
            {productError ? (
              <Card className="border-0 shadow-sm overflow-hidden">
                <div className="bg-red-50 p-8 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <X className="h-8 w-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-red-800 mb-2">
                      Oops! Something went wrong
                    </h2>
                    <p className="text-red-600 mb-6">
                      We couldn't load the products. Please try again later.
                    </p>
                    <Button
                      onClick={handleResetFilters}
                      className="bg-white border border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Refresh Page
                    </Button>
                  </div>
                </div>
              </Card>
            ) : null}

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 10 }, (_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div>
                {!productError && (!data || data.products.length === 0) && (
                  <Card className="border-0 shadow-sm overflow-hidden">
                    <div className="bg-gray-50 p-8 text-center">
                      <div className="max-w-md mx-auto">
                        <FilterIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                          No products found
                        </h2>
                        <p className="text-gray-500 mb-6">
                          We couldn't find any products matching your current
                          filters. Try adjusting your search criteria.
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
                  </Card>
                )}
                {data && data.products.length > 0 && (
                  <>
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-500">
                          Showing{" "}
                          <span className="font-medium text-gray-900">
                            {productsList.length}
                          </span>{" "}
                          of{" "}
                          <span className="font-medium text-gray-900">
                            {pagination?.totalItem || 0}
                          </span>{" "}
                          products
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <ArrowDownUp className="h-3 w-3 mr-1" />
                        {getSortLabel()}
                      </div>
                    </div>
                    {isFetching ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {Array.from({ length: 10 }, (_, index) => (
                          <ProductCardSkeleton key={index} />
                        ))}
                      </div>
                    ) : (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={gridView}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`grid ${
                            gridView === "grid"
                              ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"
                              : "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
                          }`}
                        >
                          {productsList?.map((product) => (
                            <motion.div
                              key={product.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ProductCard product={product} />
                            </motion.div>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    )}

                    {pagination?.nextPage && (
                      <div ref={ref} className="h-1"></div>
                    )}

                    {loading && (
                      <div className="flex justify-center py-8">
                        <Spinner size="medium" />
                      </div>
                    )}

                    {!pagination?.nextPage && productsList.length > 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p>You've reached the end of the results</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
