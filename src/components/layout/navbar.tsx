import type React from "react";

import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { selectUser } from "@/features/auth/auth-slice";

import Logo from "../logo";
import UserProfile from "../profile-button";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";
import { selectCart } from "@/features/cart/cart-slice";
import TopBanner from "../home/top-banner";

export default function Navbar() {
  const user = useSelector(selectUser);

  const totalCartItem = useSelector(selectCart).cartItems.length;

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/products?searchTerm=${searchTerm}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white font-sans tracking-wide shadow-md">
      <TopBanner />
      <div className="container mx-auto py-3 border-b border-gray-200 lg:min-h-[70px] max-lg:min-h-[60px]">
        <div className="flex items-center justify-between gap-4">
          <div className="shrink-0">
            <Logo />
          </div>

          <div className="flex-grow mx-2 md:mx-6">
            <div className="relative flex items-center w-full max-w-2xl mx-auto">
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search products, brands, categories..."
                className="w-full pr-12 py-2 rounded-full border-gray-300 focus-visible:ring-primary"
              />
              <Button
                onClick={handleSearch}
                size="sm"
                variant="ghost"
                className="absolute right-1 h-8 w-8 rounded-full hover:bg-gray-100"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={22} className="text-gray-800" />
              {totalCartItem > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-primary text-white text-xs font-medium rounded-full">
                  {totalCartItem}
                </span>
              )}
            </Link>

            {user ? (
              <UserProfile user={user} />
            ) : (
              <Button
                className="hidden md:flex"
                size="sm"
                variant="default"
                asChild
              >
                <Link to="/login" className="text-white">
                  Login
                </Link>
              </Button>
            )}

            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary shadow-sm hidden md:block">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <MainNav />
          </div>
        </div>
      </div>
    </header>
  );
}
