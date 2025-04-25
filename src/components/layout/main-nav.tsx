import { BarChart2, Box, Clock, Home, PenTool } from "lucide-react";
import { NavLink } from "react-router";
import CategoryMenu from "./category-menu";

export default function MainNav() {
  const routes = [
    {
      label: "Home",
      href: "/",
      icon: <Home size={16} />,
    },
    {
      label: "Products",
      href: "/products",
      icon: <Box size={16} />,
    },
    {
      label: "Shops",
      href: "/shops",
      icon: <Box size={16} />,
    },
    {
      label: "Flash Sale",
      href: "/flash-sale",
      icon: <Clock size={16} />,
    },
    {
      label: "Compare",
      href: "/compare-products",
      icon: <BarChart2 size={16} />,
    },
    {
      label: "Blogs",
      href: "/blogs",
      icon: <PenTool size={16} />,
    },
  ];

  return (
    <nav className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-center text-start space-y-2 md:space-y-0">
        {routes.map((route) => (
          <NavLink
            key={route.href}
            to={route.href}
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-4 py-2.5 font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "md:text-white bg-primary-dark"
                  : "md:text-primary-foreground hover:bg-primary-dark/20"
              }`
            }
          >
            {route.icon}
            <span>{route.label}</span>
          </NavLink>
        ))}
        <CategoryMenu />
      </div>
    </nav>
  );
}
