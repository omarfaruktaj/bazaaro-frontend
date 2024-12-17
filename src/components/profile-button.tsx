import { LogOut, User2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logOut } from "@/features/auth/auth-slice";
import { useAppDispatch } from "@/redux/hooks";
import { User } from "@/types";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserProfile({ user }: { user: User | null }) {
  const dispatch = useAppDispatch();

  if (!user) return;

  const handleLogout = async () => {
    dispatch(logOut());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={user?.profile?.avatar || ""}
            alt={user?.profile?.name}
          />
          <AvatarFallback>
            <User2 />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user?.role === "ADMIN" || user?.role === "CUSTOMER" ? (
          <DropdownMenuItem>
            <Link to={`/my-profile`}>My Profile</Link>
          </DropdownMenuItem>
        ) : null}
        {user?.role === "CUSTOMER" && (
          <>
            <DropdownMenuItem>
              <Link to={"/my-orders"}>My Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/my-reviews"}>My Reviews</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/change-password"}>Change Password</Link>
            </DropdownMenuItem>
          </>
        )}
        {user?.role === "ADMIN" && (
          <div>
            <DropdownMenuItem>
              <Link to={"/dashboard/admin"}>Dashboard</Link>
            </DropdownMenuItem>
          </div>
        )}
        {user?.role === "VENDOR" && (
          <div>
            <DropdownMenuItem>
              <Link to={"/dashboard/vendor"}>Dashboard</Link>
            </DropdownMenuItem>
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
