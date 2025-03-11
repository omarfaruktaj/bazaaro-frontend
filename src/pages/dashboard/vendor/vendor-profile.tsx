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
import { useState } from "react";
import { useNavigate } from "react-router";

export default function VendorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading } = useGetMyShopsQuery(null);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (isLoading) return <Loading />;

  if (!data) {
    navigate("/dashboard/vendor/setup");
    return null;
  }

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto shadow-lg border-t-4 border-t-primary">
        <CardHeader className="relative pb-0">
          <div className="absolute right-4 top-4 z-10 ">
            <Button
              variant={isEditing ? "destructive" : "outline"}
              size="sm"
              className="rounded-full "
              onClick={handleEdit}
              aria-label={isEditing ? "Cancel Editing" : "Edit Shop Info"}
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit
                </>
              )}
            </Button>
          </div>

          {!isEditing && (
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-background shadow-md">
                <AvatarImage
                  src={data.logo || "https://via.placeholder.com/150"}
                  alt={data.name}
                />
                <AvatarFallback>
                  {data.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">{data.name}</CardTitle>
                  <Badge variant="outline" className="ml-2">
                    <Store className="w-3 h-3 mr-1" />
                    Vendor
                  </Badge>
                </div>

                <div className="flex items-center mt-1 text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    Joined {formatDate(data.createdAt)}
                  </span>
                </div>

                <CardDescription className="mt-2 text-center md:text-left">
                  {data.description}
                </CardDescription>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-6 mt-3">
          {isEditing ? (
            <div className="bg-muted/50 p-4 rounded-lg border">
              <h3 className="text-sm font-medium mb-4">
                Edit Shop Information
              </h3>
              <ShopForm
                initialData={data}
                onSuccess={() => setIsEditing(false)}
              />
            </div>
          ) : (
            <Tabs defaultValue="reviews" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="details">Shop Details</TabsTrigger>
              </TabsList>

              <TabsContent value="reviews">
                {data.review.length > 0 ? (
                  <div className="space-y-4">
                    {data.review.map((review) => (
                      <div key={review.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
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
                          <div className="flex">
                            <Ratings
                              rating={review.rating}
                              variant="yellow"
                              disabled
                            />
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{review.review}</p>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Product ID: {review.productId.substring(0, 8)}...
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No reviews yet.
                  </div>
                )}
              </TabsContent>

              <TabsContent value="details">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-sm font-medium mb-2">Shop ID</h3>
                      <p className="text-sm text-muted-foreground">{data.id}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-sm font-medium mb-2">Status</h3>
                      <Badge
                        variant={data.isBlacklisted ? "destructive" : "default"}
                      >
                        {data.isBlacklisted ? "Blacklisted" : "Active"}
                      </Badge>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-sm font-medium mb-2">Created</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(data.createdAt)}
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-sm font-medium mb-2">Last Updated</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(data.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>

        {!isEditing && (
          <CardFooter className="flex justify-end border-t pt-6">
            <Button onClick={() => navigate("/dashboard/vendor/products")}>
              Manage Products
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
