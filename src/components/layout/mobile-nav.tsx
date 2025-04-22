import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { selectUser } from "@/features/auth/auth-slice";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import Logo from "../logo";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import MainNav from "./main-nav";

export default function MobileNav() {
  const user = useSelector(selectUser);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="h-9 w-9">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[350px]">
        <SheetHeader className="mb-6">
          <SheetTitle>
            <div className="flex items-start mb-3">
              <Logo />
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-6">
          <MainNav />
          <div className="pt-4">
            {!user && (
              <>
                <Separator className="my-4" />
                <Button variant="default" className="w-full" asChild>
                  <Link to="/login" className="text-white">
                    Login
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
