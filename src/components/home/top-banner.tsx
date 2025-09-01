"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router";
const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

function TopBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissedDate = localStorage.getItem("topBannerDismissedDate");
    const today = getTodayDateString();

    if (dismissedDate !== today) {
      setIsVisible(true);
    }
  }, []);

  const dismissBanner = () => {
    const today = getTodayDateString();
    localStorage.setItem("topBannerDismissedDate", today);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary px-4 py-3 shadow-md ">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="h-32 w-32 rotate-12 rounded-full border-4 border-white"></div>
        <div className="absolute -right-6 h-24 w-24 -rotate-12 rounded-full border-4 border-white"></div>
        <div className="absolute -left-8 h-16 w-16 rotate-45 rounded-full border-4 border-white"></div>
      </div>

      <div className="relative z-10 flex items-center justify-between container mx-auto">
        <div className="flex flex-1 items-center justify-center text-center sm:justify-start sm:text-left">
          <div className="hidden sm:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3 h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <p className="flex items-center text-sm font-medium text-white">
            <span className="mr-1.5 hidden rounded-full bg-white px-2 py-0.5 text-xs font-bold text-teal-500 sm:inline-block">
              NEW
            </span>
            <span>
              <span className="font-bold">Free shipping</span> now available on
              all Summer Edition items!
              <Link
                to={"/products"}
                className="ml-1.5 whitespace-nowrap underline hover:text-teal-100"
              >
                Shop now →
              </Link>
            </span>
          </p>
        </div>
        <button
          className="ml-3 flex-shrink-0 text-white focus:outline-none"
          onClick={dismissBanner}
          aria-label="Dismiss"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TopBanner;
