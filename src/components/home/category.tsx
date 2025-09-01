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

  const filteredCategories = categories?.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }, (_, i) => (
            <CategorySectionSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (!categories?.length) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 text-center">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full">
            <Layers className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No categories found
          </h2>
          <p className="text-muted-foreground mb-6">
            Check back later for new categories
          </p>
          <Button variant="outline" asChild>
            <Link to="/products">Browse All Products</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Explore Our <span className="text-primary">Categories</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Discover our wide range of products organized by category
          </p>

          <div className="relative mt-6 max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search categories..."
              className="pl-10 pr-4 py-3 rounded-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredCategories?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-base">
              No categories match your search.
            </p>
            <Button
              variant="link"
              className="mt-2 text-sm"
              onClick={() => setSearchTerm("")}
            >
              Clear search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {filteredCategories?.map((category, index) => {
              const Icon = getIconByValue(category.icon);
              const colors = [
                "bg-blue-50 text-blue-600 border-blue-100",
                "bg-green-50 text-green-600 border-green-100",
                "bg-purple-50 text-purple-600 border-purple-100",
                "bg-amber-50 text-amber-600 border-amber-100",
                "bg-rose-50 text-rose-600 border-rose-100",
                "bg-cyan-50 text-cyan-600 border-cyan-100",
              ];
              const colorClass = colors[index % colors.length];

              return (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className={`group p-5 rounded-xl border ${colorClass} flex flex-col items-center text-center hover:shadow-sm transition`}
                >
                  <div className="mb-3">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-inner">
                      <Icon size={28} />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-800 mb-1">
                    {category.name}
                  </h3>
                  <div className="flex items-center text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
