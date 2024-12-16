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
    <section className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories.map((category) => {
          const Icon = getIconByValue(category.icon);
          return (
            <Link
              key={category.name}
              to={`/shop/${category.id}`}
              className="group flex flex-col items-center justify-center p-5  rounded-xl backdrop-blur-lg hover:bg-primary-500/20 transition duration-300 shadow-lg hover:shadow-primary-500/50"
            >
              <span className="text-5xl mb-4 text-primary-400 group-hover:text-primary-300 transition-colors">
                <Icon size={32} />
              </span>
              <span className="text-lg font-semibold group-hover:text-primary-300 transition-colors">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
