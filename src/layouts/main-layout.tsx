import Navbar from "@/components/layout/navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      <Navbar />

      <div className="min-h-screen  mt-24">
        <Outlet />
      </div>
    </div>
  );
}
