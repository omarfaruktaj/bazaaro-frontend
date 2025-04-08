import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-tale";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "@/features/shop/components/table/columns";
import { useGetShopsQuery } from "@/features/shop/shop-api";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardIcon,
  Filter,
  MapPin,
  RefreshCcw,
  Search,
  ShoppingBag,
  Store,
  StoreIcon,
  UserCheck,
  UserX,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminVendors() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState("all");

  const { data, isLoading, error, refetch } = useGetShopsQuery({
    page: page + 1,
    include: "user,product,review",
  });

  useEffect(() => {
    setPage(0);
  }, [filterStatus, searchTerm, activeTab]);

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
          <ClipboardIcon className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Error Loading Vendors
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          We encountered a problem while fetching the vendor data. Please try
          again later.
        </p>
        <Button onClick={() => refetch()} className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  if (!data || data?.shop?.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <StoreIcon className="h-10 w-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No Vendors Found
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          There are no vendors registered in the system yet.
        </p>
        <Button className="flex items-center gap-2">
          <Store className="h-4 w-4" />
          Invite Vendors
        </Button>
      </div>
    );
  }

  // Filter shops based on search term, status, and active tab
  const filteredShops = data.shop.filter((shop) => {
    const matchesSearch =
      searchTerm === "" ||
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (shop.description &&
        shop.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && !shop.isBlacklisted) ||
      (filterStatus === "blacklisted" && shop.isBlacklisted);

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && !shop.isBlacklisted) ||
      (activeTab === "blacklisted" && shop.isBlacklisted);

    return matchesSearch && matchesStatus && matchesTab;
  });

  // Sort shops
  const sortedShops = [...filteredShops].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name);
    } else if (sortBy === "products") {
      return (b.product?.length || 0) - (a.product?.length || 0);
    } else if (sortBy === "rating") {
      const aRating =
        a.review?.reduce((sum, review) => sum + review.rating, 0) /
        (a.review?.length || 1);
      const bRating =
        b.review?.reduce((sum, review) => sum + review.rating, 0) /
        (b.review?.length || 1);
      return bRating - aRating;
    }
    return 0;
  });

  const { pagination } = data;

  // Calculate vendor statistics
  const totalVendors = pagination?.totalItem || data.shop.length;
  const activeVendors = data.shop.filter((shop) => !shop.isBlacklisted).length;
  const blacklistedVendors = data.shop.filter(
    (shop) => shop.isBlacklisted
  ).length;
  const totalProducts = data.shop.reduce(
    (sum, shop) => sum + (shop.product?.length || 0),
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Vendor Management
            </h1>
            <p className="text-gray-500 mt-1">
              View and manage all vendors in the system
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">Invite Vendor</span>
            </Button>
          </div>
        </div>

        {/* Vendor Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Store className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Vendors</p>
                <p className="text-xl font-bold">{totalVendors}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-xl font-bold">{activeVendors}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <UserX className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blacklisted</p>
                <p className="text-xl font-bold">{blacklistedVendors}</p>
              </div>
            </CardContent>
          </Card>

          {/* <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <ShieldAlert className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Featured</p>
                <p className="text-xl font-bold">{featuredVendors}</p>
              </div>
            </CardContent>
          </Card> */}

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <ShoppingBag className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-xl font-bold">{totalProducts}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg mb-8">
          <CardHeader className="bg-gray-50 border-b pb-4">
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="all">
                  All Vendors
                  <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                    {totalVendors}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    {activeVendors}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="blacklisted">
                  Blacklisted
                  <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                    {blacklistedVendors}
                  </span>
                </TabsTrigger>
                {/* <TabsTrigger value="featured">
                  Featured
                  <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                    {featuredVendors}
                  </span>
                </TabsTrigger> */}
              </TabsList>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search vendors by name, description or location..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <div className="w-40">
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="blacklisted">Blacklisted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-40">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                        <SelectItem value="products">Most Products</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {sortedShops.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-500">
                      No vendors match your filters
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setFilterStatus("all");
                        setActiveTab("all");
                      }}
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeTab + filterStatus + sortBy}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-lg border overflow-hidden"
                  >
                    <DataTable columns={columns} data={sortedShops} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Tabs>
          </CardHeader>
        </Card>

        {/* Vendor Map Distribution (Placeholder) */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MapPin className="h-5 w-5 text-primary mr-2" />
            Vendor Distribution
          </h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <Building2 className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">
                    Vendor location map would display here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {pagination && (pagination.prevPage || pagination.nextPage) && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {sortedShops.length} of {pagination.totalItem} vendors
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

              <div className="text-sm px-2">
                Page {pagination.page} of {pagination.totalPage}
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
