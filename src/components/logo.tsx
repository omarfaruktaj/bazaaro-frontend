import { LucideShoppingBag } from "lucide-react";
import { Link } from "react-router";

export default function Logo() {
  return (
    <Link
      to="/"
      className=" text-xl font-bold p-1 cursor-pointer block transition-transform hover:scale-105"
    >
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          {" "}
          <LucideShoppingBag className="h-5 w-5 text-muted" />{" "}
        </div>
        <span>Bazaaro</span>
      </div>
    </Link>
  );
}
