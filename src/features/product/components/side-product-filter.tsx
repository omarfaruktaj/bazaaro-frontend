import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useGetCategoriesQuery } from "@/features/category/category-api";
import { XCircleIcon } from "lucide-react";
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
  const [selectedSort, setSelectedSort] = useState(initialSort);

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
    setSelectedSort(sort);
    updateSearchParams({ sort });
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
    setSelectedSort(initialSort);
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
    setSelectedSort("");
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
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mb-6">
        <Label className="mb-2 block">Categories</Label>
        <div className="flex flex-col gap-2">
          {isLoading && <Spinner size={"small"} />}
          <RadioGroup
            onValueChange={handleCategoryChange}
            value={selectedCategory}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
            {categories?.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.id} id={category.id} />
                <Label htmlFor={category.id}>{category.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="mb-6">
        <Label className="mb-2 block">Price Range</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={handlePriceChange}
            className="w-1/2"
          />
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={handlePriceChange}
            className="w-1/2"
          />
        </div>
      </div>

      <div className="mb-6">
        <Label className="mb-2 block">Sort</Label>
        <Select value={selectedSort} onValueChange={handleSort}>
          <SelectTrigger className="w-full ">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectItem value="-createdAt">Latest</SelectItem>
              <SelectItem value="price">Price: Low to High</SelectItem>
              <SelectItem value="-price">Price: High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        onClick={handleClearFilter}
        className="w-full"
        disabled={searchParams.size === 0}
      >
        <XCircleIcon className="h-5 w-5 " />
        Clear Filters
      </Button>
    </div>
  );
}
