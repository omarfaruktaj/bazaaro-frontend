import TopBanner from "@/components/home/top-banner";
import Navbar from "@/components/layout/navbar";
import { useState } from "react";
import { Outlet } from "react-router";

export default function MainLayout() {
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <>
      <TopBanner onVisibilityChange={setBannerVisible} />
      <Navbar offsetTop={bannerVisible ? 48 : 0} />
      <main className="min-h-screen  pt-[60px]">
        <Outlet />
      </main>
    </>
  );
}
