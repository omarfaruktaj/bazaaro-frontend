import TopBanner from "@/components/home/top-banner";
import Navbar from "@/components/layout/navbar";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [bannerVisible, setBannerVisible] = useState(isHome);

  useEffect(() => {
    setBannerVisible(location.pathname === "/");
  }, [location.pathname]);

  return (
    <>
      {isHome && (
        <TopBanner
          onVisibilityChange={setBannerVisible}
          bannerVisible={bannerVisible}
        />
      )}
      <Navbar offsetTop={bannerVisible ? 48 : 0} />
      <main className="min-h-screen pt-[66px]">
        <Outlet />
      </main>
    </>
  );
}
