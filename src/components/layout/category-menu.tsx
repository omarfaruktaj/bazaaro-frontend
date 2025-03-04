import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useGetCategoriesQuery } from "@/features/category/category-api";
import { BiCategory } from "react-icons/bi";
import ListItem from "../ui/list-item";

export default function CategoryMenu() {
  const { data: categories, isLoading } = useGetCategoriesQuery(null);

  if (!categories || !categories.length) return;
  if (isLoading) return;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent md:text-white md:hover:text-white">
            <BiCategory size={18} /> Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid md:w-[300px] gap-2 p-2 md:grid-cols-2 ">
              {categories.map((category) => (
                <ListItem
                  key={category.id}
                  title={category.name}
                  icon={category.icon}
                  href={"/products?category=" + category.id}
                >
                  {category?.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
