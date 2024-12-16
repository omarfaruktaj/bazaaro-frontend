import { useGetShopsQuery } from "@/features/shop/shop-api";
import { Link } from "react-router";
import Loading from "../ui/loading";

export default function FeaturedVendors() {
  const { data, isLoading } = useGetShopsQuery(null);

  if (isLoading) return <Loading />;

  if (!data || !data.length) return null;
  return (
    <section className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Featured Vendors</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((vendor) => (
          <Link
            key={vendor.name}
            to={`/shops/${vendor.id}`}
            className="flex flex-col items-center p-4 shadow-md rounded-lg hover:shadow-md transition duration-300"
          >
            <img
              src={vendor.logo}
              alt={`${vendor.name} logo`}
              width={100}
              height={100}
              className="mb-2 rounded-md"
            />
            <span className="text-center font-semibold">{vendor.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
