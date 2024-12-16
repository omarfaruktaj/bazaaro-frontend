import Navbar from "@/components/layout/navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      <Navbar />

      <div className="min-h-screen  mt-16">
        <Outlet />
      </div>
    </div>
  );
}
