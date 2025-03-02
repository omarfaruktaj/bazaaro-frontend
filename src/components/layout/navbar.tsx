import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { selectUser } from "@/features/auth/auth-slice";
import { useGetCartQuery } from "@/features/cart/cart-api";
import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import Logo from "../logo";
import UserProfile from "../profile-button";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

export default function EnhancedNavbar() {
  const user = useSelector(selectUser);
  const { data: cart, isLoading } = useGetCartQuery(null, { skip: !user });
  const cartItems = cart ? cart?.cartItems?.length : 0;

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/products?searchTerm=${searchTerm}`);
    }
  };

  if (isLoading) {
    return;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-lg bg-white font-sans tracking-wide">
      <section className="container mx-auto py-3 border-gray-200 border-b lg:min-h-[70px] max-lg:min-h-[60px]">
        <div className="flex items-center justify-between">
          <div className="shrink-0">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <div className="flex-grow mx-4 flex justify-center items-center">
            <div className="flex items-center  w-full md:w-auto max-w-2xl">
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="w-full px-4 py-5 rounded-l-full pr-12  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 "
              />

              <Button
                onClick={handleSearch}
                size="sm"
                variant="outline"
                className=" py-5 rounded-l-none rounded-r-full px-5 "
                // className="absolute right-0 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full "
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} className="text-gray-800" />
              {cartItems > 0 && (
                <span className="absolute -top-3 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                  {cartItems}
                </span>
              )}
            </Link>

            {user ? (
              <UserProfile user={user} />
            ) : (
              <Button className="hidden md:block" size="sm" variant="outline">
                <Link to="/login">Login</Link>
              </Button>
            )}

            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-primary py-3 hidden md:block">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <MainNav />
          </div>
        </div>
      </div>
    </header>
  );
}
