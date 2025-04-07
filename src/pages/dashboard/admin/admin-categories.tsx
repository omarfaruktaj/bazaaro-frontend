"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-tale";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import { useGetCategoriesQuery } from "@/features/category/category-api";
import { columns } from "@/features/category/components/table/columns";
import type { Category } from "@/types";
import { getIconByValue } from "@/utils/get-icon-by-value";
import { AnimatePresence, motion } from "framer-motion";
import {
  FolderPlus,
  Layers,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AdminCategories() {
  const { data, isLoading, error } = useGetCategoriesQuery(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filter categories based on search term
  const filteredCategories = data?.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description &&
        category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <Layers className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Error Loading Categories
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          We encountered a problem while fetching the categories. Please try
          again later.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Layers className="h-10 w-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No Categories Found
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          There are no categories in the system yet. Create your first category
          to get started.
        </p>
        <Button
          onClick={() => navigate("/dashboard/admin/categories/create")}
          className="flex items-center gap-2"
        >
          <FolderPlus className="h-4 w-4" />
          Create First Category
        </Button>
      </div>
    );
  }

  // Group categories by first letter for visual organization
  const groupedCategories: Record<string, Category[]> = {};
  filteredCategories?.forEach((category) => {
    const firstLetter = category.name.charAt(0).toUpperCase();
    if (!groupedCategories[firstLetter]) {
      groupedCategories[firstLetter] = [];
    }
    groupedCategories[firstLetter].push(category);
  });

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-500 mt-1">
              Manage product categories and organization
            </p>
          </div>

          <Button
            onClick={() => navigate("/dashboard/admin/categories/create")}
            className="flex items-center gap-2 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>New Category</span>
          </Button>
        </div>

        <Card className="border-0 shadow-lg mb-8">
          <CardHeader className="bg-gray-50 border-b pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center">
                <Layers className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-xl font-semibold">All Categories</h2>
                <div className="ml-2 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                  {data.length}
                </div>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {filteredCategories?.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-500">
                  No categories match your search
                </p>
                <p className="text-sm text-muted-foreground">
                  Try a different search term
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="mt-4"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="overflow-hidden rounded-b-lg">
                <DataTable columns={columns} data={filteredCategories || []} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Visual Category Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Layers className="h-5 w-5 text-primary mr-2" />
            Category Overview
          </h2>

          <AnimatePresence>
            {Object.keys(groupedCategories).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(groupedCategories)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([letter, categories]) => (
                    <motion.div
                      key={letter}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-lg font-medium text-gray-500 mb-3">
                        {letter}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map((category) => {
                          const Icon = category.icon
                            ? getIconByValue(category.icon)
                            : Layers;
                          return (
                            <motion.div
                              key={category.id}
                              whileHover={{ scale: 1.02 }}
                              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-4 flex items-center gap-3"
                            >
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="overflow-hidden">
                                <h3 className="font-medium text-gray-900 truncate">
                                  {category.name}
                                </h3>
                                {category.description && (
                                  <p className="text-sm text-gray-500 truncate">
                                    {category.description}
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-500">
                  No categories match your search
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="mt-4"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
