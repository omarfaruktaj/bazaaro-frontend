import { selectUser } from "@/features/auth/auth-slice";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import Logo from "../logo";
import UserProfile from "../profile-button";
import { Button } from "../ui/button";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

export default function Navbar() {
  const user = useSelector(selectUser);

  return (
    <div className="py-4 bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="flex items-center justify-between container mx-auto px-4">
        <Logo />

        <div className="hidden md:flex items-center space-x-6">
          <MainNav />
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} className="text-gray-800" />
            <span className="absolute -top-3 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
              3
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
  );
}
