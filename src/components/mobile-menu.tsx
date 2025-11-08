import { selectCart } from "@/features/cart/cart-slice";
import { Compass, Home, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { MdCompare } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function MobileMenu() {
  const [activeNav, setActiveNav] = useState("home");
  const totalCartItem = useSelector(selectCart).cartItems.length;

  const navItems = [
    { id: "home", label: "Home", icon: Home, to: "/" },
    { id: "explore", label: "Explore", icon: Compass, to: "/products" },
    {
      id: "compare",
      label: "Compare",
      icon: MdCompare,
      to: "/compare-products",
    },
    { id: "cart", label: "Cart", icon: ShoppingCart, to: "/cart" },
    { id: "account", label: "Account", icon: User, to: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-md md:hidden">
      <div className="flex justify-around items-center h-16 sm:h-20 px-2">
        {navItems.map(({ id, label, icon: Icon, to }) => (
          <Link
            key={id}
            to={to}
            onClick={() => setActiveNav(id)}
            className={`
              relative flex flex-col items-center justify-center gap-1 px-2 py-2 
              text-xs font-medium transition-all duration-300 ease-in-out
              ${
                activeNav === id
                  ? "text-primary scale-105"
                  : "text-muted-foreground hover:text-foreground hover:scale-105"
              }
            `}
            aria-label={label}
          >
            <Icon className="w-6 h-6" />
            <span>{label}</span>

            {id === "cart" && totalCartItem > 0 && (
              <span className="absolute -top-1.5 right-2 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                {totalCartItem}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
