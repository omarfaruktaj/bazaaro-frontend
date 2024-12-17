import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { selectUser } from "@/features/auth/auth-slice";
import { AlignLeft } from "lucide-react";
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
          <div className="pt-4">
            {!user && (
              <>
                <Separator />
                <Button variant="outline" className="w-full">
                  <Link to="/login">Login</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
