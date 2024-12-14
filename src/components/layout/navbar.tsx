import { selectUser } from "@/features/auth/auth-slice";
import { useGetCartQuery } from "@/features/cart/cart-api";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import Logo from "../logo";
import UserProfile from "../profile-button";
import { Button } from "../ui/button";
import Loading from "../ui/loading";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

export default function Navbar() {
  const user = useSelector(selectUser);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const { data: cart, isLoading } = useGetCartQuery(null, { skip: !user });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setIsVisible((prevIsVisible) => {
        const isScrollingUp = prevScrollPos > currentScrollPos;
        const isScrolledPastThreshold = currentScrollPos > 100;

        setPrevScrollPos(currentScrollPos);

        if (isScrollingUp) {
          return true;
        } else if (!isScrollingUp && isScrolledPastThreshold) {
          return false;
        }

        return prevIsVisible;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const cartItems = cart ? cart?.cartItems?.length : 0;

  if (isLoading) return <Loading />;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background shadow-md transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="py-4 ">
        <div className="flex items-center justify-between container mx-auto px-4">
          <Logo />

          <div className="hidden md:flex items-center space-x-6">
            <MainNav />
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} className="text-gray-800" />
              <span className="absolute -top-3 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {cartItems}
              </span>
            </Link>

            {user ? (
              <UserProfile user={user} />
            ) : (
              <Button size={"sm"} variant="outline">
                <Link to={"/login"}>Login</Link>
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
