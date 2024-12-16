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
import { FilterIcon, SortAsc, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDebouncedCallback } from "use-debounce";

export default function ProductFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

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

  const handleSort = (sort: string) => {
    updateSearchParams({ sort });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateSearchParams({ category });
  };

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
    setMinPrice(initialMaxPrice);
    setMaxPrice(initialMaxPrice);
    setSelectedCategory(initialSelectedCategory);
  }, [
    initialMaxPrice,
    initialMinPrice,
    initialSearchTerm,
    initialSelectedCategory,
  ]);

  const handleClearFilter = () => {
    setSearchParams({});
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory("");
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

  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-4 px-4 md:px-4 py-4">
      <div className="relative w-full md:w-2/5">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full  px-4 py-2 rounded-full border border-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>

      <div className="flex flex-wrap gap-4 justify-between w-full md:w-auto">
        <div className="flex gap-4 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full w-full md:w-auto"
              >
                <FilterIcon className="h-5 w-5 text-muted-foreground" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 p-4">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <div>
                <Label>Categories</Label>
                <div className="flex flex-col gap-2 mt-2">
                  {isLoading && <Spinner size={"small"} />}
                  <RadioGroup
                    onValueChange={(value) => handleCategoryChange(value)}
                    value={selectedCategory}
                  >
                    <div key={`All`} className="flex items-center space-x-2">
                      <RadioGroupItem value={""} id={"all"} />
                      <Label htmlFor={"all"}>All</Label>
                    </div>
                    {categories?.map((category) => (
                      <div
                        key={`${category.id}+${category.name}`}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={category.id} id={category.id} />
                        <Label htmlFor={category.id}>{category.name}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              <div className="mt-4">
                <Label>Price Range</Label>
                <div className="flex  justify-between items-center mt-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    onBlur={handlePriceChange}
                    className="w-24 "
                  />
                  <div className="text-muted-foreground">to</div>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    onBlur={handlePriceChange}
                    className="w-24 "
                  />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full w-full md:w-auto"
              >
                <SortAsc className="h-5 w-5 text-muted-foreground" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 p-4">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={initialSort === "-createdAt"}
                onClick={() => handleSort("-createdAt")}
              >
                Latest
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={initialSort === "price"}
                onClick={() => handleSort("price")}
              >
                Price: Low to High
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={initialSort === "-price"}
                onClick={() => handleSort("-price")}
              >
                Price: High to Low
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            onClick={handleClearFilter}
            className="rounded-full w-full md:w-auto"
            disabled={searchParams.size === 0}
          >
            <XCircleIcon className="h-5 w-5 text-muted-foreground" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
