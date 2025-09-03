"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gift, Sparkles, Star } from "lucide-react";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../ui/button";

export default function HeroBannerSlider() {
  const slides = [
    {
      title: "Holiday Sale",
      discount: "50% OFF",
      subtitle: "Everything",
      description:
        "Celebrate the season with massive savings on all your favorite items.",
      link: "/products",
      linkText: "Shop Now",
      image: "https://i.ibb.co.com/XJkr8js/pngtree-man-holding-up-shopping.png",
      bgColor: "bg-slate-50",
      textColor: "text-slate-900",
      accentColor: "bg-primary",
      icon: Gift,
    },
    {
      title: "Spring Collection",
      discount: "35% OFF",
      subtitle: "New Arrivals",
      description:
        "Refresh your wardrobe with our stunning spring collection and trending styles.",
      link: "/products",
      linkText: "Explore Styles",
      image: "/placeholder.svg?height=400&width=400",
      bgColor: "bg-blue-50",
      textColor: "text-slate-900",
      accentColor: "bg-primary",
      icon: Sparkles,
    },
    {
      title: "VIP Exclusive",
      discount: "60% OFF",
      subtitle: "Premium Items",
      description:
        "Get early access to our exclusive premium collection with VIP pricing.",
      link: "/exclusive-vip",
      linkText: "Unlock Access",
      image: "/placeholder.svg?height=400&width=400",
      bgColor: "bg-purple-50",
      textColor: "text-slate-900",
      accentColor: "bg-primary",
      icon: Star,
    },
  ];

  return (
    <section className="relative bg-white">
      <div className="relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={800}
          pagination={{
            clickable: true,
            bulletClass:
              "swiper-pagination-bullet !bg-slate-300 !w-2 !h-2 !mx-1",
            bulletActiveClass: "swiper-pagination-bullet-active !bg-slate-900",
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop
          effect="fade"
          fadeEffect={{ crossFade: true }}
          className="hero-slider"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className={`relative min-h-[500px] pt-16 ${slide.bgColor}`}>
                <div className="container mx-auto px-6 lg:px-8 h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 min-h-[500px] py-16">
                    {/* Content Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="flex flex-col justify-center space-y-8"
                    >
                      {/* Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 ${slide.accentColor} text-white rounded-full w-fit`}
                      >
                        <slide.icon className="h-4 w-4" />
                        <span className="font-medium text-sm">
                          {slide.title}
                        </span>
                      </motion.div>

                      {/* Main Heading */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="space-y-2"
                      >
                        <h1
                          className={`text-5xl md:text-6xl lg:text-7xl font-bold ${slide.textColor} leading-tight`}
                        >
                          {slide.discount}
                        </h1>
                        <h2
                          className={`text-2xl md:text-3xl font-medium ${slide.textColor} opacity-80`}
                        >
                          {slide.subtitle}
                        </h2>
                      </motion.div>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className={`text-lg ${slide.textColor} opacity-70 max-w-md leading-relaxed`}
                      >
                        {slide.description}
                      </motion.p>

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <Button
                          size="lg"
                          className={`group ${slide.accentColor} hover:opacity-90 text-white px-8 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:scale-105`}
                          asChild
                        >
                          <Link
                            to={slide.link}
                            className="flex items-center gap-2"
                          >
                            {slide.linkText}
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                          </Link>
                        </Button>
                      </motion.div>
                    </motion.div>

                    {/* Image Section */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="flex justify-center lg:justify-end"
                    >
                      <div className="relative">
                        <img
                          className="h-80 w-80 md:h-96 md:w-96 lg:h-[400px] lg:w-[400px] object-cover rounded-2xl shadow-lg"
                          src={slide.image || "/placeholder.svg"}
                          alt={`${slide.title} promotion`}
                          loading="lazy"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev !text-slate-600 !w-10 !h-10 !bg-white/80 !backdrop-blur-sm !rounded-full !shadow-md hover:!bg-white !transition-all !duration-200 after:!text-base" />
        <button className="swiper-button-next !text-slate-600 !w-10 !h-10 !bg-white/80 !backdrop-blur-sm !rounded-full !shadow-md hover:!bg-white !transition-all !duration-200 after:!text-base" />
      </div>
    </section>
  );
}
