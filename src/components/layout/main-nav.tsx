import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useGetCategoriesQuery } from "@/features/category/category-api";
import { BarChart2, Box, Clock, Home, PenTool } from "lucide-react";
import { BiCategory } from "react-icons/bi";
import { NavLink } from "react-router";
import ListItem from "../ui/list-item";

export default function MainNav() {
  const { data: categories, isLoading } = useGetCategoriesQuery(null);

  if (!categories || !categories.length) return;

  const routes = [
    {
      label: "Home",
      href: "/",
      icon: <Home size={18} />,
    },
    {
      label: "Products",
      href: "/products",
      icon: <Box size={18} />,
    },
    {
      label: "Shops",
      href: "/shops",
      icon: <Box size={18} />,
    },
    {
      label: "Flash Sale",
      href: "/flash-sale",
      icon: <Clock size={18} />,
    },
    {
      label: "Compare",
      href: "/compare-products",
      icon: <BarChart2 size={18} />,
    },
    {
      label: "Blogs",
      href: "/blogs",
      icon: <PenTool size={18} />,
    },
  ];

  if (isLoading) return;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center text-start space-y-2 md:space-y-0 md:space-x-6">
        {routes.map((route) => (
          <NavLink
            key={route.href}
            to={route.href}
            className={({ isActive }) =>
              `flex items-center space-x-1 px-1 md:px-0 py-2 rounded transition-all ${
                isActive
                  ? "sm:bg-primary text-white font-semibold"
                  : "text-primary md:text-primary-foreground "
              }`
            }
          >
            {route.icon}
            <span>{route.label}</span>
          </NavLink>
        ))}
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
      </div>
    </div>
  );
}
