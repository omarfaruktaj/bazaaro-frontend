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
          <div className="container  mx-auto flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 mt-14">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
