"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { logOut } from "@/features/auth/auth-slice";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks";
import { motion } from "framer-motion";
import {
  Bell,
  Box,
  Calendar,
  Home,
  Loader2,
  LogOut,
  Search,
  Settings,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Star,
  Tag,
  User,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import Logo from "../logo";

type NavigationItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  badge?: number;
};

const navigationSections: Record<string, NavigationItem[]> = {
  dashboard: [
    // {
    //   title: "Home",
    //   url: "/",
    //   icon: Home,
    //   description: "Go to the Home page",
    // },
    {
      title: "Dashboard",
      url: "overview",
      icon: Home,
      description: "View your application overview",
    },
    // {
    //   title: "Analytics",
    //   url: "analytics",
    //   icon: BarChart3,
    //   description: "Performance metrics",
    // },
  ],
  management: [
    {
      title: "Users",
      url: "users",
      icon: User,
      description: "Manage user accounts",
      // badge: 3,
    },
    {
      title: "Products",
      url: "products",
      icon: Box,
      description: "Product catalog",
      // badge: 156,
    },
    {
      title: "Shops",
      url: "shops",
      icon: ShoppingBag,
      description: "Vendor management",
      // badge: 24,
    },
    {
      title: "Categories",
      url: "categories",
      icon: Tag,
      description: "Product categories",
    },
  ],
  operations: [
    {
      title: "Orders",
      url: "orders",
      icon: ShoppingCart,
      description: "Order processing",
      // badge: 12,
    },
    {
      title: "Payments",
      url: "payments",
      icon: Calendar,
      description: "Payment tracking",
    },
    {
      title: "Reviews",
      url: "reviews",
      icon: Star,
      description: "Customer feedback",
      // badge: 5,
    },
  ],
  system: [
    {
      title: "Settings",
      url: "settings",
      icon: Settings,
      description: "System configuration",
    },
    // {
    //   title: "Security",
    //   url: "security",
    //   icon: Shield,
    //   description: "Security settings",
    // },
    // {
    //   title: "Database",
    //   url: "database",
    //   icon: Database,
    //   description: "Data management",
    // },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export function AdminSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    setIsLoading(true);
    await dispatch(logOut());
    setIsLoading(false);
  };

  // Filter navigation items based on search query
  const filterItems = (items: typeof navigationSections) => {
    if (!searchQuery) return items;

    const filtered: Record<string, NavigationItem[]> = {};
    Object.entries(items).forEach(([category, categoryItems]) => {
      const filteredCategoryItems = categoryItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredCategoryItems.length > 0) {
        filtered[category] = filteredCategoryItems;
      }
    });
    return filtered;
  };

  const filteredItems = filterItems(navigationSections);

  // Render navigation items for a specific category
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderNavItems = (items: NavigationItem[], _sectionKey: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return items.map((item, _index) => (
      <motion.div key={item.title} variants={itemVariants}>
        <NavLink to={item.url}>
          {({ isActive }) => (
            <SidebarMenuItem
              className={cn(
                "group relative overflow-hidden rounded-lg transition-all duration-200",
                "hover:bg-muted/50",
                isActive && "bg-primary/10 border-l-4 border-primary"
              )}
            >
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.description}
                className={cn(
                  "h-auto p-3 justify-start hover:bg-transparent",
                  isActive && "text-primary hover:text-primary"
                )}
              >
                <div className="flex items-center gap-3 w-full">
                  <div
                    className={cn(
                      "p-2 rounded-md transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted "
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm truncate">
                        {item.title}
                      </span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-2 h-5 px-1.5 text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </NavLink>
      </motion.div>
    ));
  };

  return (
    <Sidebar className="border-r bg-gradient-to-b from-background to-muted/20">
      <SidebarHeader className="p-2.5 border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        {/* Admin Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 dark:from-green-950/20 dark:to-emerald-950/20 dark:border-green-800"
        >
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Administrator Access
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                Full system privileges active
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search admin panel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 bg-muted/50 border-0 focus:bg-background"
            />
          </div>
        </div>

        {/* Navigation Sections */}
        {Object.keys(filteredItems).length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {filteredItems.dashboard && (
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Home
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {renderNavItems(filteredItems.dashboard, "dashboard")}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {filteredItems.management && (
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Management
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {renderNavItems(filteredItems.management, "management")}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {filteredItems.operations && (
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Operations
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {renderNavItems(filteredItems.operations, "operations")}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {filteredItems.system && (
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  System
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {renderNavItems(filteredItems.system, "system")}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-sm font-medium text-muted-foreground mb-2">
              No results found
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Try adjusting your search terms
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="text-primary hover:text-primary"
            >
              Clear search
            </Button>
          </motion.div>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t bg-muted/20">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                onClick={handleLogout}
                disabled={isLoading}
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
                <span className="ml-2">
                  {isLoading ? "Signing out..." : "Sign Out"}
                </span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
