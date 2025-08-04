"use client";

// import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGetMyShopsQuery } from "@/features/shop/shop-api";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Code,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Star,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import { NavLink } from "react-router";
import Logo from "../logo";

const menuSections = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "overview",
        icon: Home,
        notDisableAble: true,
        description: "View your store overview",
      },
      // {
      //   title: "Home",
      //   url: "/",
      //   icon: Home,
      //   notDisableAble: true,
      //   description: "Go to the Home page",
      // },
      {
        title: "Shop Info",
        url: "shop-info",
        icon: Store,
        notDisableAble: true,
        description: "Manage your shop details",
      },
    ],
  },
  {
    label: "Store Management",
    items: [
      {
        title: "Products",
        url: "products",
        icon: Package,
        description: "Manage your inventory",
        badge: "12",
      },
      {
        title: "Orders",
        url: "orders",
        icon: ShoppingCart,
        description: "Track customer orders",
        badge: "3",
        badgeVariant: "destructive" as const,
      },
      {
        title: "Coupons",
        url: "coupons",
        icon: Code,
        description: "Create discount codes",
      },
      {
        title: "Reviews",
        url: "reviews",
        icon: Star,
        description: "Customer feedback",
        badge: "5",
        badgeVariant: "secondary" as const,
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        title: "Settings",
        url: "settings",
        icon: Settings,
        notDisableAble: true,
        description: "Account preferences",
      },
    ],
  },
];

export function VendorSidebar() {
  const { data: shopData, isLoading } = useGetMyShopsQuery(null);
  const isDisabled = !shopData && !isLoading;

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <Sidebar className="z-50 bg-background border-r border-border/50">
      <SidebarContent className="bg-gradient-to-b from-background to-muted/20">
        {/* Header */}
        <SidebarHeader className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <Logo />
            {shopData && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1"
              >
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-xs text-muted-foreground">Active</span>
              </motion.div>
            )}
          </div>

          {/* Shop Status */}
          {isLoading ? (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border/30">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-muted-foreground/30 rounded animate-pulse" />
                <div className="h-3 bg-muted-foreground/30 rounded flex-1 animate-pulse" />
              </div>
            </div>
          ) : shopData ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20"
            >
              <div className="flex items-center gap-2 mb-1">
                <Store className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {shopData.name}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>Active</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>Verified</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-destructive/5 rounded-lg border border-destructive/20"
            >
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium text-foreground">
                  Setup Required
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Complete your shop setup to access all features
              </p>
            </motion.div>
          )}
        </SidebarHeader>

        {/* Navigation Menu */}
        <div className="flex-1 p-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {menuSections.map((section, sectionIndex) => (
              <SidebarGroup key={section.label} className="mb-6">
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {section.label}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {section.items.map((item, itemIndex) => {
                      const isItemDisabled = isDisabled && !item;

                      return (
                        <motion.div
                          key={item.title}
                          variants={itemVariants}
                          custom={
                            sectionIndex * section.items.length + itemIndex
                          }
                        >
                          <NavLink
                            to={item.url}
                            style={{
                              pointerEvents: isItemDisabled ? "none" : "auto",
                            }}
                          >
                            {({ isActive }) => (
                              <SidebarMenuItem
                                className={cn(
                                  "group relative overflow-hidden rounded-lg transition-all duration-200",
                                  isItemDisabled &&
                                    "opacity-40 cursor-not-allowed",
                                  isActive &&
                                    "bg-primary/10 border border-primary/20",
                                  !isActive && "hover:bg-muted/50 "
                                )}
                              >
                                <SidebarMenuButton
                                  asChild
                                  isActive={isActive}
                                  className={cn(
                                    "w-full h-auto p-3 justify-start gap-3 text-left transition-all duration-200",
                                    isActive && "text-primary font-medium",
                                    !isActive &&
                                      "text-muted-foreground hover:text-foreground"
                                  )}
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                      <div
                                        className={cn(
                                          "flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-200",
                                          isActive
                                            ? "bg-primary/20 text-primary"
                                            : "bg-muted/50 text-muted-foreground group-hover:bg-muted group-hover:text-foreground"
                                        )}
                                      >
                                        <item.icon className="h-4 w-4" />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <div className="font-medium text-sm truncate">
                                          {item.title}
                                        </div>
                                        {item.description && (
                                          <div className="text-xs text-muted-foreground truncate">
                                            {item.description}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Badge */}
                                    {/* {item.badge && !isItemDisabled && (
                                      <Badge
                                        variant={item.badgeVariant || "default"}
                                        className="ml-2 text-xs px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center"
                                      >
                                        {item.badge}
                                      </Badge>
                                    )} */}
                                  </div>
                                </SidebarMenuButton>

                                {/* Active indicator */}
                                {isActive && (
                                  <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                                    initial={false}
                                    transition={{
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 30,
                                    }}
                                  />
                                )}
                              </SidebarMenuItem>
                            )}
                          </NavLink>
                        </motion.div>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        {/* <div className="p-4 border-t border-border/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-3 bg-muted/30 rounded-lg border border-border/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-foreground">
                System Status
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              All systems operational
            </div>
          </motion.div>
        </div> */}
      </SidebarContent>
    </Sidebar>
  );
}
