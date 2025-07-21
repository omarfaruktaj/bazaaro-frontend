import { AdminSidebar } from "@/components/layout/admin-sidebar";
import TopBar from "@/components/layout/top-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div>
      <SidebarProvider>
        <AdminSidebar />

        <main className="flex-1 flex flex-col">
          <TopBar />
          <div className=" flex flex-1 flex-col g">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
