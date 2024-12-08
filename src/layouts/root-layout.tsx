import Navbar from "@/components/layout/navbar";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
