import Category from "@/components/home/category";
import FeaturedProducts from "@/components/home/featured-products";
import FeaturedVendors from "@/components/home/featured-vendor";
import FlashSale from "@/components/home/flash-sale";
import Hero from "@/components/home/hero";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <FlashSale />
      <Category />
      <FeaturedProducts />
      <FeaturedVendors />
      <Footer />
    </div>
  );
}
