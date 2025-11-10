"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { Ratings } from "@/components/ui/rating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShopForm from "@/features/shop/components/shop-form";
import { useGetMyShopsQuery } from "@/features/shop/shop-api";
import { Calendar, PencilIcon, Store, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function VendorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, refetch, isFetching } = useGetMyShopsQuery(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading || isFetching) return <Loading />;

  if (!data) {
    navigate("/dashboard/vendor/setup");
    return null;
  }

  const handleEdit = () => setIsEditing(!isEditing);

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl animate-fadeIn">
      <Card className="overflow-hidden border border-border/60 shadow-xl bg-gradient-to-b from-background to-muted/30 rounded-2xl">
        {/* Header */}
        <CardHeader className="relative bg-gradient-to-r from-primary/10 via-transparent to-transparent pb-6">
          <div className="absolute right-6 top-6 z-10">
            <Button
              variant={isEditing ? "destructive" : "outline"}
              size="sm"
              className="rounded-full shadow-sm hover:scale-105 transition-transform"
              onClick={handleEdit}
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4 mr-2" /> Cancel
                </>
              ) : (
                <>
                  <PencilIcon className="w-4 h-4 mr-2" /> Edit
                </>
              )}
            </Button>
          </div>

          {!isEditing && (
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-28 h-28 border-4 border-background shadow-md hover:scale-105 transition-transform">
                <AvatarImage
                  src={data.logo || "https://via.placeholder.com/150"}
                  alt={data.name}
                />
                <AvatarFallback>
                  {data.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className="text-3xl font-semibold tracking-tight">
                    {data.name}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 text-xs"
                  >
                    <Store className="w-3 h-3" /> Vendor
                  </Badge>
                </div>

                <div className="flex items-center mt-2 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4 mr-1 opacity-70" />
                  Joined {formatDate(data.createdAt)}
                </div>

                <CardDescription className="mt-3 text-center md:text-left max-w-md text-sm leading-relaxed text-muted-foreground">
                  {data.description || "No shop description available."}
                </CardDescription>
              </div>
            </div>
          )}
        </CardHeader>

        {/* Content */}
        <CardContent className="pt-8">
          {isEditing ? (
            <div className="bg-muted/50 p-6 rounded-xl border border-border/60 shadow-sm">
              <h3 className="text-base font-semibold mb-4 text-foreground/80">
                Edit Shop Information
              </h3>
              <ShopForm
                initialData={data}
                onSuccess={() => setIsEditing(false)}
              />
            </div>
          ) : (
            <Tabs defaultValue="reviews" className="w-full">
              <TabsList className="mb-6 grid grid-cols-2 bg-muted/40 rounded-xl">
                <TabsTrigger
                  value="reviews"
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow"
                >
                  Shop Details
                </TabsTrigger>
              </TabsList>

              {/* Reviews */}
              <TabsContent value="reviews" className="space-y-4">
                {data.review?.length > 0 ? (
                  data.review.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 border rounded-xl shadow-sm hover:shadow-md transition-shadow bg-background/60"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-9 h-9">
                            <AvatarFallback>
                              {review.userId.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Customer</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(review.createdAt)}
                            </p>
                          </div>
                        </div>
                        <Ratings
                          rating={review.rating}
                          variant="yellow"
                          disabled
                        />
                      </div>
                      <p className="mt-3 text-sm text-foreground/90 leading-relaxed">
                        {review.review}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Product ID: {review.productId.substring(0, 8)}...
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    <p className="text-sm">No reviews yet.</p>
                  </div>
                )}
              </TabsContent>

              {/* Details */}
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Shop ID", value: data.id },
                    {
                      label: "Status",
                      value: (
                        <Badge
                          variant={
                            data.isBlacklisted ? "destructive" : "default"
                          }
                        >
                          {data.isBlacklisted ? "Blacklisted" : "Active"}
                        </Badge>
                      ),
                    },
                    { label: "Created", value: formatDate(data.createdAt) },
                    {
                      label: "Last Updated",
                      value: formatDate(data.updatedAt),
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 border rounded-xl bg-background/50 hover:bg-muted/30 transition-colors"
                    >
                      <h3 className="text-sm font-semibold mb-1 text-foreground/80">
                        {item.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>

        {/* Footer */}
        {!isEditing && (
          <CardFooter className="flex justify-end border-t pt-6">
            <Button
              onClick={() => navigate("/dashboard/vendor/products")}
              className="shadow-sm hover:scale-105 transition-transform"
            >
              Manage Products
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
