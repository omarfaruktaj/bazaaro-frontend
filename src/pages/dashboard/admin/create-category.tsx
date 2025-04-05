import BackButton from "@/components/ui/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import CategoryForm from "@/features/category/components/category-form";
import { motion } from "framer-motion";
import { ArrowLeft, FolderTree, Layers, Tag } from "lucide-react";
import { Link } from "react-router";

export default function CreateCategory() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <BackButton />
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create Category</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-md rounded-xl overflow-hidden">
                <div className="bg-primary/5 px-6 py-4 border-b">
                  <Heading
                    title="Create New Category"
                    description="Add a new category to organize your products"
                    icon={<FolderTree className="h-5 w-5 text-primary mt-3" />}
                  />
                </div>
                <CardContent className="p-6">
                  <CategoryForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-0 shadow-md rounded-xl overflow-hidden">
                  <div className="bg-blue-50 px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-blue-700 flex items-center">
                      <Layers className="h-5 w-5 mr-2" />
                      Category Best Practices
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">
                            1
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Use <strong>clear, concise names</strong> that
                          customers will easily understand.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">
                            2
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Write <strong>descriptive text</strong> that explains
                          what types of products belong in this category.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">
                            3
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Choose an{" "}
                          <strong>icon that visually represents</strong> the
                          category's products.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">
                            4
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Limit the <strong>total number of categories</strong>{" "}
                          to avoid overwhelming customers.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">
                            5
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Consider how categories will{" "}
                          <strong>display on mobile devices</strong> with
                          limited screen space.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-0 shadow-md rounded-xl overflow-hidden">
                  <div className="bg-amber-50 px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-amber-700 flex items-center">
                      <Tag className="h-5 w-5 mr-2" />
                      Category Examples
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex items-center mb-1">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                            <span className="text-green-600 text-lg">👕</span>
                          </div>
                          <h4 className="font-medium text-gray-800">
                            Clothing
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Apparel items including shirts, pants, dresses, and
                          outerwear for all ages.
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex items-center mb-1">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                            <span className="text-blue-600 text-lg">📱</span>
                          </div>
                          <h4 className="font-medium text-gray-800">
                            Electronics
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Devices and accessories including phones, computers,
                          and home entertainment.
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex items-center mb-1">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                            <span className="text-purple-600 text-lg">🏠</span>
                          </div>
                          <h4 className="font-medium text-gray-800">
                            Home & Garden
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Furniture, decor, kitchenware, and outdoor items for
                          home improvement.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/dashboard/admin/categories"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
