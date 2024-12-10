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
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function UserProfile({ user }: { user: User | null }) {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logOut());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {/* <AvatarImage src={user?.profile?.avatar} alt={user?.name} /> */}
          <AvatarFallback>
            <User2 />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to={`/${user?.id}`}>My Profile</Link>
        </DropdownMenuItem>
        {user?.role === "CUSTOMER" && (
          <DropdownMenuItem>
            <Link to={"/my-posts"}>Dashboard</Link>
          </DropdownMenuItem>
        )}
        {user?.role === "ADMIN" && (
          <div>
            <DropdownMenuItem>
              <Link to={"/admin/dashboard"}>Dashboard</Link>
            </DropdownMenuItem>
          </div>
        )}
        {user?.role === "VENDOR" && (
          <div>
            <DropdownMenuItem>
              <Link to={"/vendor/profile"}>Dashboard</Link>
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
