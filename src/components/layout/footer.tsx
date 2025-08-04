"use client";

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
import { Link } from "react-router";

import { Separator } from "@/components/ui/separator";

export default function Footer() {
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
    <footer className="bg-gradient-to-br from-background via-muted/30 to-background border-t border-border/50 text-sm">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Brand Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
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
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Your trusted marketplace for quality products at unbeatable
              prices. We connect buyers and sellers worldwide for a seamless
              shopping experience.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-6">
              {[
                {
                  icon: Shield,
                  label: "Secure Shopping",
                  color: "text-green-500",
                },
                { icon: Truck, label: "Fast Delivery", color: "text-blue-500" },
                {
                  icon: Award,
                  label: "Quality Guaranteed",
                  color: "text-yellow-500",
                },
                {
                  icon: Star,
                  label: "5-Star Service",
                  color: "text-orange-500",
                },
              ].map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center space-x-2 text-muted-foreground"
                >
                  <Icon className={`h-4 w-4 ${color}`} />
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-foreground mb-4 text-lg">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                support@bazaro.com
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                123 Commerce St, Business City, BC
              </li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-foreground mb-4 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Shops", href: "/shops" },
                { label: "Compare", href: "/compare" },
                { label: "Blogs", href: "/blogs" },
                { label: "Sustainability", href: "/sustainability" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      <Separator className="my-8 opacity-20" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 pb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center gap-4 text-muted-foreground"
          >
            <div className="flex items-center gap-1">
              <span>© 2025 Bazaro.</span>
              <span className="hidden md:inline">All rights reserved.</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>in San Francisco</span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center gap-4"
          >
            {/* Social Icons */}
            <div className="flex items-center gap-4">
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
                  className="w-10 h-10 bg-muted/40 hover:bg-muted/70 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-105 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>We accept:</span>
              <div className="flex gap-1">
                {["VISA", "MC", "AMEX", "PP"].map((method) => (
                  <div
                    key={method}
                    className="px-2 py-1 bg-muted/30 rounded font-mono"
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
