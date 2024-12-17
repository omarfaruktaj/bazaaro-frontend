import { NavLink } from "react-router";

export default function MainNav() {
  const routes = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "All Products",
      href: "/products",
    },
    {
      label: "Recent Products",
      href: "/recent-products",
    },
    {
      label: "Compare",
      href: "/compare-products",
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center text-start space-y-2 md:space-y-0 md:space-x-6">
        {routes.map((route) => (
          <NavLink
            key={route.href}
            to={route.href}
            className={({ isActive, isPending }) =>
              isPending
                ? "text-muted-foreground"
                : isActive
                ? "text-primary font-semibold"
                : "text-gray-700 hover:text-primary"
            }
          >
            {route.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
