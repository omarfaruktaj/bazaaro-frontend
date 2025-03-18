"use client";

import type React from "react";

import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { selectUser } from "@/features/auth/auth-slice";
import { useGetCartQuery } from "@/features/cart/cart-api";

import Logo from "../logo";
import UserProfile from "../profile-button";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

export default function Navbar() {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white font-sans tracking-wide shadow-md">
      <div className="container mx-auto py-3 border-b border-gray-200 lg:min-h-[70px] max-lg:min-h-[60px]">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" className="block transition-transform hover:scale-105">
              <Logo />
            </Link>
          </div>

          {/* Search Bar */}
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

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-5">
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={22} className="text-gray-800" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-primary text-white text-xs font-medium rounded-full">
                  {cartItems}
                </span>
              )}
            </Link>

            {user ? (
              <UserProfile user={user} />
            ) : (
              <Button className="hidden md:flex" size="sm" variant="default">
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

      {/* Main Navigation */}
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
