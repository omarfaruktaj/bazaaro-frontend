"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { useGetCategoriesQuery } from "@/features/category/category-api";
import {
  FilterIcon,
  Search,
  SortAsc,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDebouncedCallback } from "use-debounce";

export default function ProductFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const initialSearchTerm = searchParams.get("searchTerm") || "";
  const initialSort = searchParams.get("sort") || "";
  const initialSelectedCategory = searchParams.get("category") || "";
  const initialMinPrice = searchParams.get("minPrice") || "";
  const initialMaxPrice = searchParams.get("maxPrice") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [selectedCategory, setSelectedCategory] = useState(
    initialSelectedCategory
  );
  const [sortLabel, setSortLabel] = useState("Sort");

  const { data: categories, isLoading } = useGetCategoriesQuery(null);

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    for (const key in updates) {
      if (updates[key] === null || updates[key] === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, updates[key] as string);
      }
    }
    setSearchParams(newParams);
  };

  const handleSort = (sort: string, label: string) => {
    updateSearchParams({ sort });
    setSortLabel(label);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateSearchParams({ category });
  };

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
    setMinPrice(initialMinPrice);
    setMaxPrice(initialMaxPrice);
    setSelectedCategory(initialSelectedCategory);

    // Update sort label based on initialSort
    if (initialSort === "-createdAt") setSortLabel("Latest");
    else if (initialSort === "price") setSortLabel("Price: Low to High");
    else if (initialSort === "-price") setSortLabel("Price: High to Low");
    else setSortLabel("Sort");

    // Count active filters
    let count = 0;
    if (initialSearchTerm) count++;
    if (initialSelectedCategory) count++;
    if (initialMinPrice || initialMaxPrice) count++;
    if (initialSort) count++;
    setActiveFiltersCount(count);
  }, [
    initialMaxPrice,
    initialMinPrice,
    initialSearchTerm,
    initialSelectedCategory,
    initialSort,
  ]);

  const handleClearFilter = () => {
    setSearchParams({});
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory("");
    setSortLabel("Sort");
  };

  const debouncedSearch = useDebouncedCallback((search: string) => {
    updateSearchParams({ searchTerm: search });
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm);
  };

  const handlePriceChange = () => {
    updateSearchParams({ minPrice, maxPrice });
  };

  const getSelectedCategoryName = () => {
    if (!selectedCategory) return null;
    const category = categories?.find((cat) => cat.id === selectedCategory);
    return category?.name;
  };

  return (
    <div className="bg-background shadow-sm rounded-lg p-4 space-y-4 mb-6">
  {/* Top Bar */}
  <div className="grid md:grid-cols-3 gap-4 items-center">
    {/* Search */}
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="pl-10 pr-4 py-2 w-full"
      />
      {searchTerm && (
        <button
          onClick={() => {
            setSearchTerm("");
            updateSearchParams({ searchTerm: null });
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </div>

    {/* Filters */}
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full md:w-auto">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72 p-4 space-y-4">
          {/* Category Filter */}
          <div>
            <Label className="text-sm font-medium">Category</Label>
            <div className="mt-2 max-h-40 overflow-y-auto pr-1 space-y-1">
              {isLoading ? (
                <div className="flex justify-center py-2">
                  <Spinner size="small" />
                </div>
              ) : (
                <RadioGroup
                  onValueChange={handleCategoryChange}
                  value={selectedCategory}
                  className="space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="all" />
                    <Label htmlFor="all" className="text-sm cursor-pointer">All</Label>
                  </div>
                  {categories?.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={category.id} id={category.id} />
                      <Label htmlFor={category.id} className="text-sm cursor-pointer">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <Label className="text-sm font-medium">Price Range</Label>
            <div className="flex items-center gap-2 mt-2">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                onBlur={handlePriceChange}
                className="w-full"
              />
              <span className="text-sm text-muted-foreground">to</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                onBlur={handlePriceChange}
                className="w-full"
              />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full md:w-auto">
            <SortAsc className="h-4 w-4 mr-2" />
            {sortLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={initialSort === "-createdAt"}
            onClick={() => handleSort("-createdAt", "Latest")}
          >
            Latest
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={initialSort === "price"}
            onClick={() => handleSort("price", "Price: Low to High")}
          >
            Price: Low to High
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={initialSort === "-price"}
            onClick={() => handleSort("-price", "Price: High to Low")}
          >
            Price: High to Low
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    {/* Clear Filters */}
    {activeFiltersCount > 0 && (
      <Button
        variant="ghost"
        onClick={handleClearFilter}
        className="text-muted-foreground hover:text-foreground w-full md:w-auto"
        size="sm"
      >
        <XCircle className="h-4 w-4 mr-2" />
        Clear Filters
      </Button>
    )}
  </div>

  {/* Active Filters */}
  {activeFiltersCount > 0 && (
    <div className="flex flex-wrap gap-2">
      {initialSearchTerm && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Search: {initialSearchTerm}
          <button
            onClick={() => {
              setSearchTerm("");
              updateSearchParams({ searchTerm: null });
            }}
            className="hover:text-foreground"
          >
            <XCircle className="h-3 w-3" />
          </button>
        </Badge>
      )}
      {selectedCategory && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Category: {getSelectedCategoryName()}
          <button
            onClick={() => {
              setSelectedCategory("");
              updateSearchParams({ category: null });
            }}
            className="hover:text-foreground"
          >
            <XCircle className="h-3 w-3" />
          </button>
        </Badge>
      )}
      {(minPrice || maxPrice) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Price: {minPrice || "0"} - {maxPrice || "∞"}
          <button
            onClick={() => {
              setMinPrice("");
              setMaxPrice("");
              updateSearchParams({ minPrice: null, maxPrice: null });
            }}
            className="hover:text-foreground"
          >
            <XCircle className="h-3 w-3" />
          </button>
        </Badge>
      )}
      {initialSort && (
        <Badge variant="secondary" className="flex items-center gap-1">
          {sortLabel}
          <button
            onClick={() => {
              setSortLabel("Sort");
              updateSearchParams({ sort: null });
            }}
            className="hover:text-foreground"
          >
            <XCircle className="h-3 w-3" />
          </button>
        </Badge>
      )}
    </div>
  )}
</div>

  );
}
