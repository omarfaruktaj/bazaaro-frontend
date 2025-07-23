"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  Award,
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  Truck,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubscribing(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="bg-gradient-to-br from-background via-muted/30 to-background border-t border-border/50">
      {/* Newsletter Section */}
      <div className="bg-primary/5 border-b border-border/30">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Stay in the Loop
              </h2>
              <p className="text-muted-foreground text-lg">
                Get exclusive deals, new arrivals, and insider updates delivered
                straight to your inbox.
              </p>
            </motion.div>

            <motion.form
              variants={itemVariants}
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 bg-background/80 backdrop-blur-sm border-border/50"
                required
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                className="h-12 px-8 bg-primary hover:bg-primary/90"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </motion.form>

            <motion.p
              variants={itemVariants}
              className="text-sm text-muted-foreground mt-3"
            >
              Join 50,000+ subscribers. Unsubscribe anytime.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="mb-6">
              <Link to="/" className="inline-block">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">
                      B
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-foreground">
                    Bazaro
                  </span>
                </div>
              </Link>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Your trusted marketplace for quality products at unbeatable
              prices. We connect buyers and sellers worldwide, creating a
              seamless shopping experience for everyone.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure Shopping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-blue-500" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4 text-yellow-500" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-orange-500" />
                <span>5-Star Service</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@bazaro.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Commerce St, Business City, BC 12345</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-foreground mb-6 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Story", href: "/story" },
                { label: "Careers", href: "/careers" },
                { label: "Press & Media", href: "/press" },
                { label: "Investor Relations", href: "/investors" },
                { label: "Sustainability", href: "/sustainability" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-foreground mb-6 text-lg">
              Customer Care
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Help Center", href: "/help" },
                { label: "Contact Support", href: "/contact" },
                { label: "Track Your Order", href: "/track-order" },
                { label: "Returns & Refunds", href: "/returns" },
                { label: "Size Guide", href: "/size-guide" },
                { label: "Bulk Orders", href: "/bulk-orders" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal & Policies */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-foreground mb-6 text-lg">
              Legal & Policies
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
                { label: "Shipping Policy", href: "/shipping" },
                { label: "Accessibility", href: "/accessibility" },
                { label: "Seller Agreement", href: "/seller-terms" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      <Separator className="opacity-30" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground"
          >
            <div className="flex items-center space-x-1">
              <span>© 2025 Bazaro. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>in San Francisco</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-muted-foreground rounded-full" />
            <span>All rights reserved.</span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6"
          >
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-muted/50 hover:bg-primary/10 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>We accept:</span>
              <div className="flex space-x-1">
                {["VISA", "MC", "AMEX", "PP"].map((method) => (
                  <div
                    key={method}
                    className="px-2 py-1 bg-muted/30 rounded text-xs font-mono"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
