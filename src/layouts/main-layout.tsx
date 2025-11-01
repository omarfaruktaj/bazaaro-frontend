import Navbar from "@/components/layout/navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <Navbar offsetTop={0} />
      <main className="min-h-screen pt-[66px]">
        <Outlet />
      </main>
    </>
  );
}
