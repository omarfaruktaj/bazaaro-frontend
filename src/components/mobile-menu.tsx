import { selectCart } from "@/features/cart/cart-slice";
import { Compass, Heart, Home, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function MobileMenu() {
  const [activeNav, setActiveNav] = useState("home");
  const totalCartItem = useSelector(selectCart).cartItems.length;
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-background border-t border-border z-40 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-20 px-2">
        <button
          onClick={() => setActiveNav("home")}
          className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-lg transition-all duration-200 ${
            activeNav === "home"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Home"
        >
          {" "}
          <Link
            to="/"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </Link>
        </button>

        {/* Explore */}

        <button
          onClick={() => setActiveNav("explore")}
          className={` rounded-lg transition-all duration-200 ${
            activeNav === "explore"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Explore"
        >
          <Link
            to="/products"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2"
          >
            <Compass className="w-6 h-6" />
            <span className="text-xs font-medium">Explore</span>
          </Link>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setActiveNav("wishlist")}
          className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-lg transition-all duration-200 ${
            activeNav === "wishlist"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Wishlist"
        >
          <Heart className="w-6 h-6" />
          <span className="text-xs font-medium">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setActiveNav("cart")}
          className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-lg transition-all duration-200 relative ${
            activeNav === "cart"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Shopping Cart"
        >
          <Link
            to={"/cart"}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs font-medium">Cart</span>
            <span className="absolute top-4 right-9 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalCartItem}
            </span>
          </Link>
        </button>

        {/* Account */}
        <button
          onClick={() => setActiveNav("account")}
          className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-lg transition-all duration-200 ${
            activeNav === "account"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Account"
        >
          <Link
            to="/profile"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2"
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Account</span>
          </Link>
        </button>
      </div>
    </nav>
  );
}
