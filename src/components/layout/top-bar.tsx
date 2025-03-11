import { selectUser } from "@/features/auth/auth-slice";
import { useSelector } from "react-redux";
import UserProfile from "../profile-button";
import { SidebarTrigger } from "../ui/sidebar";

export default function TopBar() {
  const user = useSelector(selectUser);

  return (
    <header className="flex sticky top-0 z-50  h-14 items-center justify-between  gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <div>
        <SidebarTrigger className="text-black" />
      </div>

      <UserProfile user={user} />
    </header>
  );
}
