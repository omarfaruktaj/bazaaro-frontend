import { useEffect, useState } from "react";
import { Link } from "react-router";

type TopBannerProps = {
  onVisibilityChange?: (visible: boolean) => void;
};

const getTodayDateString = () => new Date().toISOString().split("T")[0];

export default function TopBanner({ onVisibilityChange }: TopBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);

  useEffect(() => {
    const dismissedDate = localStorage.getItem("topBannerDismissedDate");
    const today = getTodayDateString();

    const shouldBeVisible = dismissedDate !== today;
    setIsVisible(shouldBeVisible);

    // 🔥 Notify parent immediately
    onVisibilityChange?.(shouldBeVisible);

    if (!shouldBeVisible) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      if (shouldBeVisible) {
        setHideOnScroll(isScrollingDown);
        onVisibilityChange?.(!isScrollingDown);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onVisibilityChange]);

  const dismissBanner = () => {
    const today = getTodayDateString();
    localStorage.setItem("topBannerDismissedDate", today);
    setIsVisible(false);
    onVisibilityChange?.(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out 
        ${
          hideOnScroll
            ? "opacity-0 -translate-y-full"
            : "opacity-100 translate-y-0"
        }`}
    >
      {/* Banner content goes here */}
      <div className="bg-gradient-to-r from-primary to-primary px-4 py-3 shadow-md">
        <div className="container mx-auto flex justify-between items-center text-white">
          <p>
            <span className="font-bold">Free shipping</span> on all Summer
            Edition items!
            <Link to="/products" className="ml-2 underline hover:text-teal-100">
              Shop now →
            </Link>
          </p>
          <button onClick={dismissBanner} aria-label="Dismiss">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
