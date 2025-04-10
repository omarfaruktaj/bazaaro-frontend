import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-tale";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "@/features/product/components/table/columns";
import { useGetProductsQuery } from "@/features/product/product-api";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ClipboardX,
  Filter,
  Package,
  PackageOpen,
  Plus,
  RefreshCcw,
  Search,
  ShoppingBag,
  Tag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function AdminProducts() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    page: page + 1,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setPage(0);
  }, [filterStatus, searchTerm]);

  // This would be implemented in a real app to filter products
  const filteredProducts =
    data?.products?.filter((product) => {
      const matchesSearch =
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "in-stock" && product.quantity > 0) ||
        (filterStatus === "out-of-stock" && product.quantity <= 0) ||
        (filterStatus === "discounted" && (product.discount ?? 0) > 0);

      return matchesSearch && matchesStatus;
    }) || [];

  // Calculate product statistics
  const totalProducts = data?.products?.length || 0;
  const inStockProducts =
    data?.products?.filter((p) => p.quantity > 0).length || 0;
  const outOfStockProducts =
    data?.products?.filter((p) => p.quantity <= 0).length || 0;
  const discountedProducts =
    data?.products?.filter((p) => (p.discount ?? 0) > 0).length || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <Loading />
          <p className="mt-4 text-muted-foreground">Loading your products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <ClipboardX className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Unable to Load Products
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          We encountered a problem while fetching your products. Please try
          again later.
        </p>
        <Button onClick={() => refetch()} className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  if (!data || data?.products?.length === 0) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center space-y-8 max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-48 h-48 relative"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-gray-200"
          >
            <path
              d="M21 15V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.5 6.5L12 2M12 2L7.5 6.5M12 2V14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <PackageOpen className="h-20 w-20 text-primary/40" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Looks like there is no products!{" "}
          </h1>
        </motion.div>
      </div>
    );
  }

  const { pagination } = data;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-500 mt-1">Manage and organize products</p>
          </div>

          <Button
            onClick={() => navigate("/dashboard/vendor/products/create")}
            className="flex items-center gap-2 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Product</span>
          </Button>
        </div>

        {/* Product Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-xl font-bold">{totalProducts}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <ShoppingBag className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Stock</p>
                <p className="text-xl font-bold">{inStockProducts}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <PackageOpen className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-xl font-bold">{outOfStockProducts}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <Tag className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">On Sale</p>
                <p className="text-xl font-bold">{discountedProducts}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg mb-8">
          <div className="bg-white p-6 rounded-t-lg border-b">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <TabsList className="bg-gray-100">
                  <TabsTrigger
                    value="all"
                    onClick={() => setFilterStatus("all")}
                  >
                    All Products
                  </TabsTrigger>
                  <TabsTrigger
                    value="in-stock"
                    onClick={() => setFilterStatus("in-stock")}
                  >
                    In Stock
                  </TabsTrigger>
                  <TabsTrigger
                    value="out-of-stock"
                    onClick={() => setFilterStatus("out-of-stock")}
                  >
                    Out of Stock
                  </TabsTrigger>
                  <TabsTrigger
                    value="discounted"
                    onClick={() => setFilterStatus("discounted")}
                  >
                    On Sale
                  </TabsTrigger>
                </TabsList>

                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 w-full"
                    />
                  </div>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center">
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                        <span>Sort By</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {filteredProducts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-500">
                      No products match your filters
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setFilterStatus("all");
                      }}
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={filterStatus + searchTerm}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="rounded-lg border overflow-hidden">
                      <DataTable columns={columns} data={filteredProducts} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Tabs>
          </div>
        </Card>

        {pagination && (pagination.prevPage || pagination.nextPage) && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {pagination.totalItem}{" "}
              products
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={!pagination.prevPage}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: pagination.totalPage }, (_, i) => (
                  <Button
                    key={i}
                    variant={i === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(i)}
                    className="w-8 h-8 p-0"
                  >
                    {i + 1}
                  </Button>
                )).slice(
                  Math.max(0, page - 2),
                  Math.min(pagination.totalPage, page + 3)
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage((prev) =>
                    Math.min(prev + 1, pagination.totalPage - 1)
                  )
                }
                disabled={!pagination.nextPage}
                className="flex items-center gap-1"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
