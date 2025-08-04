"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gift, Sparkles, Star, Tag } from "lucide-react";
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
      title: "HOLIDAY EXTRAVAGANZA",
      discount: "50% OFF",
      subtitle: "EVERYTHING",
      code: "HOLIDAY50",
      description:
        "Celebrate the season with massive savings on all your favorite items!",
      link: "/products",
      linkText: "Shop Holiday Deals",
      image: "https://i.ibb.co.com/XJkr8js/pngtree-man-holding-up-shopping.png",
      bgGradient: "from-primary via-orange-500 to-red-500",
      cardBg: "bg-card/95 dark:bg-card/90",
      textColor: "text-primary",
      icon: Gift,
      features: ["Free Shipping", "24/7 Support", "Easy Returns"],
    },
    {
      title: "SPRING COLLECTION",
      discount: "35% OFF",
      subtitle: "SITEWIDE",
      code: "SPRING35",
      description:
        "Refresh your wardrobe with our stunning spring collection and trending styles!",
      link: "/products",
      linkText: "Explore Spring Styles",
      image: "/assets/banner/image-1.png",
      // bgGradient: "from-primary via-emerald-500 to-teal-600",
      // cardBg: "bg-card/95 dark:bg-card/90",
      bgGradient: "from-primary via-orange-500 to-red-500",

      cardBg: "bg-card/95 dark:bg-card/90",

      textColor: "text-primary",
      icon: Sparkles,
      features: ["New Arrivals", "Trending Now", "Limited Edition"],
    },
    {
      title: "VIP EXCLUSIVE",
      discount: "UP TO 60%",
      subtitle: "OFF PREMIUM",
      code: "VIP60",
      description:
        "Get early access to our exclusive premium collection with VIP pricing!",
      link: "/exclusive-vip",
      linkText: "Unlock VIP Access",
      image: "/assets/banner/image-2.png",
      // bgGradient: "from-primary via-purple-600 to-indigo-600",
      // cardBg: "bg-card/95 dark:bg-card/90",
      bgGradient: "from-primary via-orange-500 to-red-500",

      cardBg: "bg-card/95 dark:bg-card/90",

      textColor: "text-primary",
      icon: Star,
      features: ["VIP Only", "Premium Quality", "Exclusive Access"],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background ">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.3),transparent)] " />
      </div>

      <div className="relative ">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1200}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-foreground/30 !w-3 !h-3",
            bulletActiveClass:
              "swiper-pagination-bullet-active !bg-primary !scale-125",
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop
          effect="fade"
          fadeEffect={{ crossFade: true }}
          className="hero-slider  overflow-hidden shadow-2xl "
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className={`relative min-h-[600px] bg-gradient-to-br pt-16 ${slide.bgGradient}`}
              >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.1 }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    className="absolute -top-20 -right-20 w-96 h-96 bg-primary-foreground rounded-full blur-3xl"
                  />
                  <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.05 }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary-foreground rounded-full blur-3xl"
                  />
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16 min-h-[600px] py-12">
                    {/* Content Section */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6"
                    >
                      {/* Promo Code Badge */}
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 ${slide.cardBg} backdrop-blur-sm rounded-full shadow-lg border border-border`}
                      >
                        <Tag className={`h-4 w-4 ${slide.textColor}`} />
                        <span
                          className={`font-bold text-base ${slide.textColor}`}
                        >
                          CODE: {slide.code}
                        </span>
                      </motion.div>

                      {/* Main Heading */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="space-y-2"
                      >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground leading-tight">
                          {slide.discount}
                        </h1>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground/90">
                          {slide.subtitle}
                        </h2>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary-foreground/80">
                          {slide.title}
                        </h3>
                      </motion.div>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-lg md:text-xl text-primary-foreground/90 max-w-md leading-relaxed"
                      >
                        {slide.description}
                      </motion.p>

                      {/* Features */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="flex flex-wrap gap-3 justify-center lg:justify-start"
                      >
                        {slide.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full border border-primary-foreground/30"
                          >
                            <slide.icon className="h-4 w-4 text-primary-foreground" />
                            <span className="text-sm font-medium text-primary-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </motion.div>

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                      >
                        <Button
                          size="lg"
                          className="group bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cta-button-wrapper"
                          asChild
                        >
                          <Link
                            to={slide.link}
                            className="flex items-center gap-2"
                          >
                            {slide.linkText}
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </Button>
                      </motion.div>
                    </motion.div>

                    {/* Image Section */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="flex justify-center lg:justify-end relative"
                    >
                      <div className="relative">
                        {/* Decorative Elements */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                          className="absolute -top-8 -right-8 w-16 h-16 border-4 border-primary-foreground/30 rounded-full"
                        />
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{
                            duration: 15,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                          className="absolute -bottom-6 -left-6 w-12 h-12 border-4 border-primary-foreground/20 rounded-full"
                        />

                        {/* Main Image */}
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 1, delay: 0.6 }}
                          className="relative"
                        >
                          <div className="absolute inset-0 bg-primary-foreground/20 backdrop-blur-sm rounded-3xl transform rotate-3" />
                          <img
                            className="relative h-80 w-80 md:h-96 md:w-96 lg:h-[450px] lg:w-[450px] object-cover rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                            src={slide.image || "/placeholder.svg"}
                            alt={`Banner image for ${slide.title}`}
                            loading="lazy"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-background/10" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev !text-foreground !w-12 !h-12 !bg-card/80 !backdrop-blur-sm !rounded-full !border !border-border hover:!bg-card/90 !transition-all !duration-300 after:!text-lg after:!font-bold" />
        <button className="swiper-button-next !text-foreground !w-12 !h-12 !bg-card/80 !backdrop-blur-sm !rounded-full !border !border-border hover:!bg-card/90 !transition-all !duration-300 after:!text-lg after:!font-bold" />
      </div>
    </section>
  );
}
