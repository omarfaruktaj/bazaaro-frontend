import { BarChart2, Box, Clock, Home, PenTool } from "lucide-react";
import { NavLink } from "react-router";
import CategoryMenu from "./category-menu";

export default function MainNav() {
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
        <CategoryMenu />
      </div>
    </div>
  );
}
