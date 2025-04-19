"use client";

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
import { columns } from "@/features/coupon/components/table/columns";
import { useGetCouponsQuery } from "@/features/coupon/coupon-api";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CalendarDays,
  ClipboardCheck,
  Filter,
  Gift,
  PercentCircle,
  Plus,
  RefreshCcw,
  Search,
  Tag,
  Ticket,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function VendorCoupon() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const { data, isLoading, error, refetch } = useGetCouponsQuery(null);
  const navigate = useNavigate();

  // Get current date for comparing with coupon dates
  const currentDate = new Date();

  // Filter coupons based on search term and status
  const filteredCoupons = data
    ? data.filter((coupon) => {
        const matchesSearch =
          searchTerm === "" ||
          coupon.code.toLowerCase().includes(searchTerm.toLowerCase());

        const couponStartDate = new Date(coupon.startDate);
        const couponEndDate = new Date(coupon.endDate);
        const isActive =
          couponStartDate <= currentDate && couponEndDate >= currentDate;
        const isUpcoming = couponStartDate > currentDate;
        const isExpired = couponEndDate < currentDate;

        const matchesStatus =
          filterStatus === "all" ||
          (filterStatus === "active" && isActive) ||
          (filterStatus === "upcoming" && isUpcoming) ||
          (filterStatus === "expired" && isExpired);

        const matchesTab =
          activeTab === "all" ||
          (activeTab === "active" && isActive) ||
          (activeTab === "upcoming" && isUpcoming) ||
          (activeTab === "expired" && isExpired) ||
          (activeTab === "percentage" &&
            coupon.discountType === "PERCENTAGE") ||
          (activeTab === "fixed" && coupon.discountType === "FIXED");

        return matchesSearch && matchesStatus && matchesTab;
      })
    : [];

  // Calculate coupon statistics
  const totalCoupons = data?.length || 0;
  const activeCoupons =
    data?.filter(
      (coupon) =>
        new Date(coupon.startDate) <= currentDate &&
        new Date(coupon.endDate) >= currentDate
    ).length || 0;
  const upcomingCoupons =
    data?.filter((coupon) => new Date(coupon.startDate) > currentDate).length ||
    0;
  const expiredCoupons =
    data?.filter((coupon) => new Date(coupon.endDate) < currentDate).length ||
    0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <Loading />
          <p className="mt-4 text-muted-foreground">Loading your coupons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Unable to Load Coupons
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          We encountered a problem while fetching your coupons. Please try again
          later.
        </p>
        <Button onClick={() => refetch()} className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center space-y-8 max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-48 h-48 relative"
        >
          <div className="absolute inset-0 bg-primary/5 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Ticket className="h-24 w-24 text-primary/40" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-4 -right-4 bg-primary/10 p-3 rounded-full">
            <PercentCircle className="h-10 w-10 text-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            No Coupons Available
          </h1>
          <p className="text-gray-500 mb-6">
            Create discount coupons to attract customers and boost your sales.
          </p>
          <Button
            onClick={() => navigate("/dashboard/vendor/coupons/create")}
            size="lg"
            className="px-8 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>Create Your First Coupon</span>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Coupons</h1>
            <p className="text-gray-500 mt-1">
              Manage discount coupons for your products
            </p>
          </div>

          <Button
            onClick={() => navigate("/dashboard/vendor/coupons/create")}
            className="flex items-center gap-2 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Coupon</span>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Ticket className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Coupons</p>
                <p className="text-xl font-bold">{totalCoupons}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Tag className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-xl font-bold">{activeCoupons}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <CalendarDays className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-xl font-bold">{upcomingCoupons}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <ClipboardCheck className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expired</p>
                <p className="text-xl font-bold">{expiredCoupons}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg mb-8">
          <div className="bg-white p-6 rounded-t-lg border-b">
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <TabsList className="bg-gray-100  flex-wrap">
                  <TabsTrigger value="all">All Coupons</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="expired">Expired</TabsTrigger>
                  <TabsTrigger value="percentage">Percentage</TabsTrigger>
                  <TabsTrigger value="fixed">Fixed Amount</TabsTrigger>
                </TabsList>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by code..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 w-full"
                    />
                  </div>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <div className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        <span>Filter</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {filteredCoupons.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <Gift className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-500">
                      No coupons match your filters
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
                    key={activeTab + filterStatus + searchTerm}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="rounded-lg border overflow-hidden">
                      <DataTable columns={columns} data={filteredCoupons} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
}
