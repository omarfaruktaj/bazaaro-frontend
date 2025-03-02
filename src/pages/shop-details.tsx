import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { Ratings } from "@/components/ui/rating";
import { selectUser } from "@/features/auth/auth-slice";
import ShopProducts from "@/features/shop/components/shop-products";
import {
  useFollowShopMutation,
  useGetSingleShopQuery,
} from "@/features/shop/shop-api";
import { Response } from "@/types/response";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "sonner";

export default function ShopDetails() {
  const { shopId } = useParams();
  const user = useSelector(selectUser);
  const { data: shop, isLoading } = useGetSingleShopQuery(shopId!);
  const [followUnfollow, { isLoading: isFollowLoading }] =
    useFollowShopMutation();

  if (isLoading) return <Loading />;

  if (!shop)
    return (
      <div>
        <h2>No shop found</h2>
      </div>
    );

  const shopRating = shop.review.length
    ? shop.review.reduce((acc, rev) => acc + rev.rating, 0) / shop.review.length
    : 0;

  const isFollowing = shop.shopFollow.some((val) => val.userId === user?.id);

  const handleFollowClick = async () => {
    if (!user) toast.error("You need to login to follow a shop");

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

  return (
    <div className="container mx-auto p-8">
      <BackButton />

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0 md:space-x-8">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <img
            src={shop.logo}
            alt={shop.name}
            className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover"
            aria-label="Shop logo"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">{shop.name}</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              {shop.description}
            </p>
            <div className="mt-2 flex items-center">
              <span className="text-sm md:text-base text-muted-foreground">
                {shop.shopFollow.length} followers
              </span>
            </div>
            <div className="mt-2 flex items-center">
              <Ratings
                rating={shopRating}
                totalStars={5}
                size={20}
                variant="default"
                disabled={true}
              />
              <span className="ml-2 text-sm md:text-base text-muted-foreground">
                ({shopRating.toFixed(1)} average rating)
              </span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleFollowClick}
          variant={isFollowing ? "outline" : "default"}
          className="w-full md:w-auto rounded-full transition"
          disabled={isFollowLoading}
          aria-label={isFollowing ? "Unfollow shop" : "Follow shop"}
        >
          {isFollowing
            ? isFollowLoading
              ? "Unfollowing..."
              : "Unfollow"
            : isFollowLoading
            ? "Following..."
            : "Follow"}{" "}
          Shop
        </Button>
      </div>

      <ShopProducts shopId={shop.id} />
    </div>
  );
}
