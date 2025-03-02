import ShopSkeleton from "@/components/skeletons/ShopCardSkeleton";
import { Ratings } from "@/components/ui/rating";
import { useGetShopsQuery } from "@/features/shop/shop-api";
import { calculateAverageRating } from "@/utils/calculate-review";
import { format } from "date-fns";
import { Link } from "react-router";

export default function ShopPage() {
  const { data, isLoading } = useGetShopsQuery({
    limit: 8,
    include: "product, review",
  });

  if (isLoading) return <ShopSkeleton />;
  if (!data || !data?.shop?.length) return <p>No shops found.</p>;

  return (
    <section className="container mx-auto px-4 py-12 ">
      <h2 className="text-4xl font-extrabold  text-gray-900 mb-8">Shops</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.shop?.map((vendor) => (
          <Link
            key={vendor.id}
            to={`/shops/${vendor.id}`}
            className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <img
              src={vendor.logo || "/images/default-logo.png"}
              alt={`${vendor.name} logo`}
              width={100}
              height={100}
              className="mb-4 rounded-full border-2 border-gray-200 p-1 transition-transform duration-200 ease-in-out hover:scale-105"
            />

            <span className="text-xl font-semibold text-center text-gray-800 truncate">
              {vendor.name}
            </span>

            <div className="flex items-center mt-2 gap-1">
              <Ratings
                rating={Number(calculateAverageRating(vendor?.review))}
                disabled
                size={16}
              />
              <span className="text-sm text-gray-500">
                ({vendor?.review?.length || 0} reviews)
              </span>
            </div>

            <div className="text-sm text-gray-600 mt-2 font-medium">
              {vendor?.product?.length}{" "}
              {vendor?.product?.length === 1 ? "product" : "products"}
            </div>

            <div className="text-xs text-gray-400 mt-2">
              Joined: {format(new Date(vendor.createdAt), "MMMM dd, yyyy")}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
