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
      discount: "50% OFF EVERYTHING",
      code: "HOLIDAY50",
      description: "Celebrate the season with massive savings!",
      link: "/products",
      linkText: "Shop the Holiday Deals",
      image: "https://i.ibb.co.com/XJkr8js/pngtree-man-holding-up-shopping.png",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      title: "SPRING FLING",
      discount: "35% OFF SITEWIDE",
      code: "SPRING35",
      description: "Refresh your style for the new season!",
      link: "/products",
      linkText: "Explore Spring Styles",
      image: "https://i.ibb.co.com/XJkr8js/pngtree-man-holding-up-shopping.png",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
    },
    {
      title: "EXCLUSIVE VIP ACCESS",
      discount: "UP TO 60% OFF",
      code: "VIP60",
      description: "Get early access to our exclusive discounts!",
      link: "/exclusive-vip",
      linkText: "Unlock Your VIP Offer",
      image: "https://i.ibb.co.com/XJkr8js/pngtree-man-holding-up-shopping.png",
      bgColor: "bg-pink-100",
      textColor: "text-pink-600",
    },
  ];

  return (
    <section>
      <div className="pb-5 pt-1 ">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          autoplay={{ delay: 5000 }}
          speed={1000}
          pagination={{ clickable: true }}
          loop
          effect="fade"
          className="rounded-lg "
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="">
                <div
                  className={`flex items-center rounded-lg p-4 min-h-[585px] ${slide.bgColor} py-10 md:py-20`}
                >
                  <div className="container mx-auto px-4  sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-12 w-full">
                      <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-4">
                        <span
                          className={`px-4 py-2 rounded-xl text-lg md:text-xl ${slide.textColor}`}
                        >
                          {slide.code}
                        </span>
                        <p
                          className={`text-3xl font-bold md:text-5xl lg:text-6xl ${slide.textColor}`}
                        >
                          {slide.discount}
                        </p>
                        <p className="text-3xl font-semibold text-black md:text-5xl lg:text-6xl">
                          {slide.title}
                        </p>
                        <p className="mt-4 text-base text-slate-700 md:text-lg lg:text-xl">
                          {slide.description}
                        </p>
                        <Button size={"lg"}>
                          <Link to={slide.link}>{slide.linkText}</Link>
                        </Button>
                      </div>
                      <div className="flex justify-center lg:justify-end">
                        <img
                          className="h-64 w-64 object-cover rounded-xl md:h-80 md:w-80 lg:h-[380px] lg:w-[480px] mx-auto"
                          src={slide.image}
                          alt={`Banner image for ${slide.title}`}
                          width={450}
                          height={500}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
