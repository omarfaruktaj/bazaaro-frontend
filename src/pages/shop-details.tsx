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
import {
  Calendar,
  Heart,
  Info,
  MessageSquare,
  Package,
  Star,
  Store,
  Users,
} from "lucide-react";

export default function ShopDetails() {
  const { shopId } = useParams();
  const user = useSelector(selectUser);
  const { data: shop, isLoading } = useGetSingleShopQuery(shopId!);
  const [followUnfollow, { isLoading: isFollowLoading }] =
    useFollowShopMutation();
  // const [activeTab, setActiveTab] = useState("products");

  if (isLoading) return <ShopLoading />;
  console.log(shop);
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

  const isFollowing = shop.shopFollow.some((val) => val.userId === user?.id);

  const handleFollowClick = async () => {
    if (!user) {
      toast.error("You need to login to follow a shop");
      return;
    }

    const res = (await followUnfollow(shop.id)) as Response<null>;

    if (res.error) {
      toast.error(
        res.error?.data?.message || "Action failed. Please try again."
      );
    } else {
      toast.success(
        isFollowing ? "You unfollowed the shop" : "You followed the shop"
      );
    }
  };

  // Format date for shop creation
  const shopCreatedAt = new Date(shop.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        <BackButton />
      </div>

      {/* Shop Hero Section */}
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
                    ? "border-primary text-primary hover:bg-primary/10"
                    : ""
                }`}
                disabled={isFollowLoading}
                aria-label={isFollowing ? "Unfollow shop" : "Follow shop"}
                size="lg"
              >
                {isFollowing ? (
                  <>
                    {isFollowLoading ? "Unfollowing..." : "Following"}
                    <Heart className="ml-2 h-4 w-4 fill-primary" />
                  </>
                ) : (
                  <>
                    {isFollowLoading ? "Following..." : "Follow Shop"}
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

              {/* <div className="flex items-center">
                <ShoppingBag className="h-4 w-4 text-muted-foreground mr-1.5" />
                <span className="text-sm font-medium">
                  {shop?.product?.length || 0} products
                </span>
              </div> */}

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
      <Tabs
        defaultValue="products"
        className="w-full"
        // onValueChange={setActiveTab}
      >
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

function ShopReviews({ reviews }: { reviews: any[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto px-4 py-12 min-h-[40vh]">
        <div className="p-6 rounded-full bg-primary/10 mb-2">
          <MessageSquare className="w-12 h-12 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">No reviews yet</h2>
          <p className="text-muted-foreground mb-6">
            This shop hasn't received any reviews yet. Be the first to leave a
            review!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <Card
            key={index}
            className="overflow-hidden transition-all hover:shadow-md"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-medium text-primary">
                    {review.user?.name?.charAt(0) || "U"}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">
                      {review.user?.name || "Anonymous"}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-1">
                    <Ratings
                      rating={review.rating}
                      totalStars={5}
                      size={16}
                      variant="default"
                      disabled={true}
                    />
                  </div>
                  <p className="mt-2 text-sm">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ShopAbout({ shop }: { shop: any }) {
  return (
    <div className="max-w-3xl mx-auto py-4">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">About {shop.name}</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Description
              </h3>
              <p>{shop.description || "No description provided."}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Contact Information
              </h3>
              <div className="space-y-2">
                {shop.email && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <span>{shop.email}</span>
                  </div>
                )}
                {shop.phone && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Phone:</span>
                    <span>{shop.phone}</span>
                  </div>
                )}
                {shop.location && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Location:</span>
                    <span>{shop.location}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Shop Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Joined:</span>
                  <span className="ml-2">
                    {new Date(shop.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Products:</span>
                  <span className="ml-2">{shop.products?.length || 0}</span>
                </div>
                <div>
                  <span className="font-medium">Followers:</span>
                  <span className="ml-2">{shop.shopFollow?.length || 0}</span>
                </div>
                <div>
                  <span className="font-medium">Reviews:</span>
                  <span className="ml-2">{shop.review?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
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
