"use client";

import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "sonner";

import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ratings } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { selectUser } from "@/features/auth/auth-slice";
import {
  useFollowShopMutation,
  useGetSingleShopQuery,
} from "@/features/shop/shop-api";

import type { Response } from "@/types/response";

import ShopProducts from "@/features/shop/components/shop-products";
import { Shop } from "@/types";
import { motion } from "framer-motion";
import {
  Calendar,
  Heart,
  Info,
  Mail,
  MessageSquare,
  Package,
  Star,
  Store,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function ShopDetails() {
  const { shopId } = useParams();
  const user = useSelector(selectUser);
  const { data: shop, isLoading } = useGetSingleShopQuery(shopId!);
  const [followUnfollow] = useFollowShopMutation();

  const [isFollowing, setIsFollowing] = useState(false);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (shop && user) {
      const followed = shop.shopFollow.some((val) => val.userId === user.id);
      setIsFollowing(followed);
    }
  }, [shop, user]);

  if (isLoading) return <ShopLoading />;

  if (!shop)
    return (
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-[50vh] text-center">
        <Store className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No Shop Found</h2>
        <p className="text-muted-foreground mb-6">
          The shop you're looking for doesn't exist or has been removed.
        </p>
        <BackButton />
      </div>
    );

  const shopRating = shop.review.length
    ? shop.review.reduce((acc, rev) => acc + rev.rating, 0) / shop.review.length
    : 0;

  const handleFollowClick = async () => {
    if (!user) {
      toast.error("You need to login to follow a shop");
      return;
    }

    setIsFollowing((prev) => !prev);

    const res = (await followUnfollow(shop.id)) as Response<null>;

    if (res.error) {
      setIsFollowing((prev) => !prev);
      toast.error(
        res.error?.data?.message || "Action failed. Please try again."
      );
    } else {
      toast.success(
        isFollowing ? "You unfollowed the shop" : "You followed the shop"
      );
    }
  };

  const shopCreatedAt = new Date(shop.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-6 mt-10">
      <div className="mb-4">
        <BackButton />
      </div>

      <div className="relative mb-8 rounded-xl overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10"></div>

        <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-4 border-background shadow-lg">
              <img
                src={shop.logo || "/placeholder.svg"}
                alt={shop.name}
                className="w-full h-full object-cover"
                aria-label="Shop logo"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{shop.name}</h1>
                <p className="text-muted-foreground mt-1 max-w-2xl">
                  {shop.description}
                </p>
              </div>

              <Button
                onClick={handleFollowClick}
                variant={isFollowing ? "outline" : "default"}
                className={`rounded-full px-6 transition-all ${
                  isFollowing
                    ? isHovering
                      ? "border-red-500 text-red-500 hover:bg-red-50"
                      : "border-primary text-primary hover:bg-primary/10"
                    : ""
                }`}
                aria-label={isFollowing ? "Unfollow shop" : "Follow shop"}
                size="lg"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {isFollowing ? (
                  <>
                    {isHovering ? "Unfollow" : "Following"}
                    <Heart
                      className={`ml-2 h-4 w-4 ${
                        isHovering ? "fill-red-500" : "fill-primary"
                      }`}
                    />
                  </>
                ) : (
                  <>
                    Follow Shop
                    <Heart className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-muted-foreground mr-1.5" />
                <span className="text-sm font-medium">
                  {shop.shopFollow.length}{" "}
                  {shop.shopFollow.length === 1 ? "follower" : "followers"}
                </span>
              </div>

              <div className="flex items-center">
                <Star className="h-4 w-4 text-muted-foreground mr-1.5" />
                <span className="text-sm font-medium">
                  {shopRating.toFixed(1)} rating
                </span>
                <Ratings
                  rating={shopRating}
                  totalStars={5}
                  size={16}
                  variant="default"
                  disabled={true}
                  className="ml-1"
                />
                <span className="text-sm text-muted-foreground ml-1">
                  ({shop.review.length}{" "}
                  {shop.review.length === 1 ? "review" : "reviews"})
                </span>
              </div>

              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-muted-foreground mr-1.5" />
                <span className="text-sm font-medium">
                  Since {shopCreatedAt}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Content Tabs */}
      <Tabs defaultValue="products" className="w-full">
        <div className="sticky top-0 z-10 bg-background pt-2 pb-4">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="products" className="flex items-center gap-1.5">
              <Package className="h-4 w-4" />
              <span>Products</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              <span>Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-1.5">
              <Info className="h-4 w-4" />
              <span>About</span>
            </TabsTrigger>
          </TabsList>
          <Separator className="mt-4" />
        </div>

        <TabsContent value="products" className="mt-4">
          <ShopProducts shopId={shop.id} />
        </TabsContent>

        <TabsContent value="reviews" className="mt-4">
          <ShopReviews reviews={shop.review} />
        </TabsContent>

        <TabsContent value="about" className="mt-4">
          <ShopAbout shop={shop} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ShopReviews({ reviews }: { reviews: any[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto px-4 py-20 min-h-[50vh]">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse"></div>
          <div className="relative p-6 rounded-full bg-primary/10">
            <MessageSquare className="w-12 h-12 text-primary" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">No reviews yet</h2>
          <p className="text-muted-foreground mb-6">
            This shop hasn’t received any reviews yet.
            <br /> Be the first to share your experience!
          </p>
          <button className="px-6 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
            Write a Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="text-2xl font-semibold">Customer Reviews</h2>
        <span className="text-sm text-muted-foreground">
          {reviews.length} review{reviews.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="overflow-hidden border border-border/40 bg-card/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                    {review.user?.name?.charAt(0) || "U"}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-lg">
                        {review.user?.name || "Anonymous"}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    <Ratings
                      rating={review.rating}
                      totalStars={5}
                      size={18}
                      disabled
                    />

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.review}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ShopAbout({ shop }: { shop: Shop }) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 ">
      <Card className="border border-border/60 shadow-sm hover:shadow-md transition-all duration-200">
        <CardContent className="p-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              About <span className="text-primary">{shop.name}</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Joined on{" "}
              <span className="font-medium text-foreground">
                {new Date(shop.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>

          {/* Description */}
          <section>
            <h3 className="text-sm uppercase font-semibold text-muted-foreground mb-2 tracking-wider">
              Description
            </h3>
            <p className="text-base text-foreground/90 leading-relaxed">
              {shop.description || "No description provided."}
            </p>
          </section>

          <Separator />

          {/* Contact Info */}
          <section>
            <h3 className="text-sm uppercase font-semibold text-muted-foreground mb-4 tracking-wider">
              Contact Information
            </h3>
            <div className="space-y-3 text-foreground/90">
              {shop?.user?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{shop?.user?.email}</span>
                </div>
              )}
            </div>
          </section>

          <Separator />

          {/* Shop Stats */}
          <section>
            <h3 className="text-sm uppercase font-semibold text-muted-foreground mb-4 tracking-wider">
              Shop Details
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center gap-1">
                <Package className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Products</span>
                <span className="text-lg font-semibold">
                  {shop.product?.length || 0}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Followers</span>
                <span className="text-lg font-semibold">
                  {shop.shopFollow?.length || 0}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Star className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Reviews</span>
                <span className="text-lg font-semibold">
                  {shop.review?.length || 0}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Joined</span>
                <span className="text-lg font-semibold">
                  {new Date(shop.createdAt).getFullYear()}
                </span>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}

function ShopLoading() {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">
      <div className="mb-4 w-24 h-10 bg-muted rounded-md"></div>

      <div className="relative mb-8 rounded-xl overflow-hidden bg-muted p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-muted-foreground/20"></div>

          <div className="flex-1">
            <div className="w-48 h-8 bg-muted-foreground/20 rounded-md mb-2"></div>
            <div className="w-full max-w-md h-4 bg-muted-foreground/20 rounded-md mb-1"></div>
            <div className="w-full max-w-sm h-4 bg-muted-foreground/20 rounded-md mb-4"></div>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="w-24 h-4 bg-muted-foreground/20 rounded-md"></div>
              <div className="w-32 h-4 bg-muted-foreground/20 rounded-md"></div>
              <div className="w-28 h-4 bg-muted-foreground/20 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto grid grid-cols-3 gap-2 mb-8">
        <div className="h-10 bg-muted-foreground/20 rounded-md"></div>
        <div className="h-10 bg-muted-foreground/20 rounded-md"></div>
        <div className="h-10 bg-muted-foreground/20 rounded-md"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-64 bg-muted-foreground/20 rounded-xl"
            ></div>
          ))}
      </div>
    </div>
  );
}
