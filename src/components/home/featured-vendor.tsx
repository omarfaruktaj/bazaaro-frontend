import { useGetShopsQuery } from "@/features/shop/shop-api";
import { Review } from "@/types";
import { Link } from "react-router";
import Loading from "../ui/loading";
import { Ratings } from "../ui/rating";

const calculateAverageRating = (reviews: Review[] = []) => {
  if (reviews?.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
};

export default function FeaturedVendors() {
  const { data, isLoading } = useGetShopsQuery({
    limit: 8,
    include: "product, review",
  });

  if (isLoading) return <Loading />;
  if (!data || !data?.shop?.length) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
        Featured Shops
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data?.shop?.map((vendor) => (
          <Link
            key={vendor.id}
            to={`/shops/${vendor.id}`}
            className="flex flex-col items-center p-6 shadow-lg rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <img
              src={vendor.logo || "/images/default-logo.png"}
              alt={`${vendor.name} logo`}
              width={100}
              height={100}
              className="mb-4 rounded-full border-2 border-gray-200 p-1"
            />

            <span className="text-lg font-medium text-center text-gray-800">
              {vendor.name}
            </span>

            <div className="flex items-center mt-2 gap-1">
              <Ratings
                rating={Number(calculateAverageRating(vendor?.review))}
                disabled
                size={16}
              />
              <span className="text-sm text-gray-500">
                ({vendor?.review?.length || 0})
              </span>
            </div>

            <div className="text-sm text-gray-500 mt-2">
              {vendor?.product?.length} products
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
