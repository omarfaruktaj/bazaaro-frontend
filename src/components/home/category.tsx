"use client";

import { useGetCategoriesQuery } from "@/features/category/category-api";
import { getIconByValue } from "@/utils/get-icon-by-value";
import { ArrowRight, Layers, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import CategorySectionSkeleton from "../skeletons/CategorySectionSkeleton";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Category() {
  const { data: categories, isLoading } = useGetCategoriesQuery(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter categories based on search term
  const filteredCategories = categories?.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="py-16 bg-gradient-to-b from-white to-gray-50">
        {Array.from({ length: 10 }, (_, index) => (
          <CategorySectionSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!categories || !categories.length) {
    return (
      <div className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Layers className="h-10 w-10 text-gray-400" />
          </div>
          <p className="text-xl font-medium text-gray-700 mb-2">
            No categories found
          </p>
          <p className="text-muted-foreground mb-6">
            Check back later for new categories
          </p>
          <Button variant="outline" asChild>
            <Link to="/products">Browse All Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const rows = [];
  for (let i = 0; i < (filteredCategories ?? []).length; i += 6) {
    rows.push(filteredCategories?.slice(i, i + 6));
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 leading-tight">
            Explore Our <span className="text-primary">Categories</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Discover our wide range of products organized by categories to help
            you find exactly what you're looking for
          </p>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search categories..."
              className="pl-10 pr-4 py-4 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredCategories?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No categories match your search.
            </p>
            <Button
              variant="link"
              onClick={() => setSearchTerm("")}
              className="mt-2"
            >
              Clear search
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
              >
                {(row ?? []).map((category, index) => {
                  const Icon = getIconByValue(category.icon);
                  const colors = [
                    "bg-blue-50 text-blue-600 border-blue-100",
                    "bg-green-50 text-green-600 border-green-100",
                    "bg-purple-50 text-purple-600 border-purple-100",
                    "bg-amber-50 text-amber-600 border-amber-100",
                    "bg-rose-50 text-rose-600 border-rose-100",
                    "bg-cyan-50 text-cyan-600 border-cyan-100",
                  ];
                  const colorIndex = (rowIndex * 6 + index) % colors.length;
                  const colorClass = colors[colorIndex];

                  return (
                    <div key={category.name}>
                      <Link
                        to={`/products?category=${category.id}`}
                        className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 ${colorClass} h-full transition-all duration-300`}
                      >
                        <div className="relative mb-4">
                          <div className="absolute inset-0 bg-white rounded-full opacity-50"></div>
                          <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full">
                            <Icon size={32} />
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-center mb-2">
                          {category.name}
                        </h3>

                        <div className="mt-auto pt-2 flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Explore</span>
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
