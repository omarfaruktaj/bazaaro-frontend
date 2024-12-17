import TopBar from "@/components/layout/top-bar";
import { VendorSidebar } from "@/components/layout/vendor-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function VendorLayout() {
  return (
    <div>
      <SidebarProvider>
        <VendorSidebar />

        <main className="flex-1 flex flex-col ">
          <TopBar />
          <div className="container mx-auto flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 ">
            <div className="bg-gray-50 min-h-screen rounded-lg">
              <Outlet />
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
