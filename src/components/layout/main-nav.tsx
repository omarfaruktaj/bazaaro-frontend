import { NavLink } from "react-router";

export default function MainNav() {
  const routes = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Shops",
      href: "/shops",
    },
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "About Us",
      href: "/about-us",
    },
    {
      label: "Contact Us",
      href: "/contact-us",
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
        {routes.map((route) => (
          <NavLink
            key={route.href}
            to={route.href}
            className={({ isActive, isPending }) =>
              isPending
                ? "text-gray-500"
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
