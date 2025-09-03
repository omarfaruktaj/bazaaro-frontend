import type React from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";

const OfferBanner: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-slate-300 dark:border-slate-600 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-slate-300 dark:border-slate-600 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-slate-300 dark:border-slate-600 rounded-full"></div>
      </div>

      <div className="relative container mx-auto px-6 py-20 text-center">
        {/* Offer badge */}
        <div className="inline-flex items-center px-4 py-2 bg-primary dark:bg-primary  rounded-full text-sm font-medium mb-6 border border-primary dark:primary text-white">
          <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
          Limited Time Offer
        </div>

        {/* Main heading with better typography */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 mb-6 text-balance">
          <span className="block text-3xl md:text-4xl lg:text-5xl font-normal text-slate-600 dark:text-slate-400 mb-2">
            Exclusive Deal
          </span>
          <span className=" from-primary ">50% Off</span>
        </h2>

        {/* Description with improved spacing */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
          Upgrade your wardrobe with our premium collection.
          <span className="block mt-2 font-medium text-slate-700 dark:text-slate-200">
            Don't miss out on this incredible opportunity!
          </span>
        </p>

        {/* Enhanced CTA section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className=" shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Link to="/products" className="flex items-center gap-2">
              Shop Now
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </Button>

          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Offer ends in 3 days
          </p>
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;
