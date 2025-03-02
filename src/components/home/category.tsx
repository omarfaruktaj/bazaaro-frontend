import { useGetCategoriesQuery } from "@/features/category/category-api";
import { getIconByValue } from "@/utils/get-icon-by-value";
import { Link } from "react-router";
import Loading from "../ui/loading";

export default function Category() {
  const { data: categories, isLoading } = useGetCategoriesQuery(null);

  if (isLoading) return <Loading />;

  if (!categories || !categories.length)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        No categories found.
      </p>
    );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Browse Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const Icon = getIconByValue(category.icon);
            return (
              <Link
                key={category.name}
                to={`/products?category=${category.id}`}
                className="group relative flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
              >
                <span className="text-5xl mb-4 text-primary group-hover:text-primary-500 transition-colors">
                  <Icon size={40} />
                </span>

                <span className="text-lg font-semibold text-gray-700 group-hover:text-primary-500 transition-colors">
                  {category.name}
                </span>

                <span className="absolute inset-0 bg-primary-100 opacity-0 group-hover:opacity-30 transition-opacity rounded-lg"></span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
