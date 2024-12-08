import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { AlignLeft } from "lucide-react";
import MainNav from "./main-nav";
import Logo from "../logo";
import { Link } from "react-router";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant="ghost">
          <AlignLeft />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-4">
          <SheetTitle>
            <div className="flex items-start mb-3">
              <Logo />
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          <MainNav />
          <div className="border-t pt-4">
            <Button variant="outline" className="w-full">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
