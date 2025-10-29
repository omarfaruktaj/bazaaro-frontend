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
    <div className="flex flex-col min-h-screen bg-background">
      <main>
        <HeroBannerSlider />

        <div className="space-y-24 py-16">
          <section className="container mx-auto px-4">
            <Category />
          </section>

          <section className="container mx-auto px-4">
            <FlashSale />
          </section>

          <section className="container mx-auto px-4">
            <FeaturedProducts />
          </section>

          <section className="bg-muted/50 py-16">
            <div className="container mx-auto px-4">
              <OfferBanner />
            </div>
          </section>

          <section className="container mx-auto px-4">
            <FeaturedVendors />
          </section>

          <section className="container mx-auto px-4">
            <Blogs />
          </section>

          <section className="bg-primary/5 py-16">
            <div className="container mx-auto px-4">
              <Newsletter />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
