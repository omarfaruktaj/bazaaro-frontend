import React from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";

const OfferBanner: React.FC = () => {
  return (
    <section className="relative bg-muted text-foreground py-16">
      <div className="container mx-auto px-6 flex flex-col items-center justify-between">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Exclusive Deal: 50% Off!
        </h2>
        <p className="text-lg mb-6">
          Upgrade your wardrobe with our premium collection. Limited time
          offer—don’t miss out!
        </p>
        <Button className="px-8 py-3  duration-300">
          <Link to="/products">Shop Now</Link>
        </Button>
      </div>
    </section>
  );
};

export default OfferBanner;
