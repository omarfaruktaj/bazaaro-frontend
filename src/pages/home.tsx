import { default as HeroBannerSlider } from "@/components/home/banner";
import Blogs from "@/components/home/blogs";
import Category from "@/components/home/category";
import FeaturedProducts from "@/components/home/featured-products";
import FeaturedVendors from "@/components/home/featured-vendor";
import FlashSale from "@/components/home/flash-sale";
import Newsletter from "@/components/home/newsletter";
// import Newsletter from "@/components/home/newsletter";
import OfferBanner from "@/components/home/offer";

import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div>
      <HeroBannerSlider />
      <FlashSale />
      <Category />
      <FeaturedProducts />
      <OfferBanner />
      <FeaturedVendors />
      <Blogs />
      <Newsletter />
      <Footer />
    </div>
  );
}
