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

  if (!categories || !categories.length || isLoading) return null;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-primary-dark/20 md:text-primary-foreground px-4 py-2.5 font-medium text-sm">
            <BiCategory size={16} className="mr-1.5" />
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
              
            </ul> */}
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
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
