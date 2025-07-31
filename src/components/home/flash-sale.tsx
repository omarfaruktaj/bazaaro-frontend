"use client";

import type React from "react";

import ProductCard from "@/features/product/components/product-card";
import { useGetProductsQuery } from "@/features/product/product-api";
import { motion } from "framer-motion";
import {
  Bolt,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Pause,
  Play,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import FlashSaleSkeleton from "../skeletons/flash-salse-skeleton";
import { Button } from "../ui/button";
import CountdownTimer from "../countdown-timer";

export default function FlashSale() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const { data, isLoading, error } = useGetProductsQuery({
    limit: 12,
    include: "category,shop",
    sort: "-discount",
  });

  // Calculate items per view based on screen size
  const getItemsPerView = useCallback(() => {
    if (typeof window === "undefined") return 4;

    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    return 4;
  }, []);

  const [currentItemsPerView, setCurrentItemsPerView] = useState(
    getItemsPerView()
  );

  useEffect(() => {
    const handleResize = () => {
      setCurrentItemsPerView(getItemsPerView());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getItemsPerView]);
  const products = data?.products || [];
  const maxIndex = Math.max(0, products.length - currentItemsPerView) / 3;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isPaused || products.length <= currentItemsPerView)
      return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused, maxIndex, products.length, currentItemsPerView]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  };

  if (isLoading) return <FlashSaleSkeleton />;

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto p-6 bg-red-50 rounded-lg">
          <Flame className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-medium text-red-600 mb-2">
            Error fetching flash sale products
          </p>
          <p className="text-sm text-red-500 mb-4">
            Please try again later or check out our other deals
          </p>
          <Button asChild variant="outline">
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!data || products.length === 0) {
    return null;
  }

  const flashSaleEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <section className="py-12 bg-gradient-to-r from-red-50 via-white to-red-50 ">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="relative mb-10">
          {/* Background decorative elements */}
          <div className="absolute -top-6 left-0 w-24 h-24 bg-red-500 opacity-5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 right-0 w-32 h-32 bg-yellow-500 opacity-5 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-lg border border-red-100">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-full mr-4">
                <Bolt className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Flash Sale</h2>
                <p className="text-gray-500">
                  Incredible deals at unbeatable prices
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Countdown Timer */}
              <div className="flex items-center bg-gray-100 px-6 py-3 rounded-xl border border-gray-100">
                <Clock className="h-5 w-5 text-red-500 mr-3" />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">Ends in:</span>
                  <CountdownTimer endTime={flashSaleEndTime} />
                </div>
              </div>

              {/* Auto-play control */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="flex items-center gap-2"
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span className="hidden sm:inline">Play</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative group "
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Products Container */}
          <div className="overflow-hidden rounded-xl p-6 ">
            <motion.div
              className="flex gap-2"
              animate={{
                x: `${-currentIndex * (100 / currentItemsPerView)}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{
                width: `${(products.length / currentItemsPerView) * 100}%`,
              }}
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className="flex-shrink-0 "
                  style={{ width: `${100 / products.length}%` }}
                  // whileHover={{ y: -8 }}
                  // transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    {/* Discount Badge */}
                    <div className="absolute -top-3 -right-3 z-10">
                      <motion.div
                        className="flex items-center justify-center w-14 h-14 bg-red-600 text-white rounded-full transform rotate-12 shadow-lg "
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="transform -rotate-12 text-center">
                          <div className="text-xs font-bold">SAVE</div>
                          <div className="text-lg font-extrabold">
                            {product.discount}%
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    <ProductCard product={product} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {products.length > currentItemsPerView && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 p-0 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 bg-white/90 backdrop-blur-sm"
                onClick={goToPrevious}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 p-0 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 bg-white/90 backdrop-blur-sm"
                onClick={goToNext}
                disabled={currentIndex === maxIndex}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>

        {/* Dots Navigation */}
        {products.length > currentItemsPerView && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 rounded-full transition-all duration-200",
                  index === currentIndex
                    ? "w-8 bg-red-500"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                )}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* View All Button
        <div className="mt-10 text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Link to="/flash-sale" className="flex items-center px-8">
              View All Flash Sale Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div> */}
      </div>
    </section>
  );
}
