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
          <NavigationMenuTrigger className="bg-transparent hover:bg-primary/90 transition-colors md:text-primary-foreground px-4 py-2.5 font-medium text-sm rounded-md">
            <BiCategory size={18} className="mr-2" />
            Categories
          </NavigationMenuTrigger>

          <NavigationMenuContent className="w-screen sm:w-auto">
            <div className="w-full sm:w-[500px] max-w-[95vw] p-4 relative">
              <div className="text-sm text-muted-foreground mb-3 px-2">
                Browse Categories
              </div>
              <ul className="grid w-full gap-3 grid-cols-1 sm:grid-cols-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <ListItem
                      title={category.name}
                      icon={category.icon}
                      href={"/products?category=" + category.id}
                      className="hover:bg-secondary/80 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {category?.description}
                      </p>
                    </ListItem>
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
