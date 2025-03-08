"use client";

import {
  Box,
  Calendar,
  ChevronLeft,
  Home,
  LogOut,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Star,
  Tag,
  User,
} from "lucide-react";

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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { logOut } from "@/features/auth/auth-slice";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { NavLink } from "react-router";
import Logo from "../logo";

type NavigationItem = {
  title: string;
  url: string;
  icon: React.ComponentType;
  badge?: number;
};

const navigationItems: Record<string, NavigationItem[]> = {
  main: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
  ],
  management: [
    {
      title: "Users",
      url: "users",
      icon: User,
      // badge: 3,
    },
    {
      title: "Products",
      url: "products",
      icon: Box,
    },
    {
      title: "Shops",
      url: "shops",
      icon: ShoppingBag,
    },
    {
      title: "Categories",
      url: "categories",
      icon: Tag,
    },
  ],
  operations: [
    {
      title: "Orders",
      url: "orders",
      icon: ShoppingCart,
      // badge: 12,
    },
    {
      title: "Payments",
      url: "payments",
      icon: Calendar,
    },
    {
      title: "Reviews",
      url: "reviews",
      icon: Star,
      // badge: 5,
    },
  ],
  system: [
    {
      title: "Settings",
      url: "settings",
      icon: Settings,
    },
  ],
};

// // User profile data
// const userProfile = {
//   name: "Admin User",
//   email: "admin@example.com",
//   role: "Administrator",
//   avatar: "/placeholder.svg?height=40&width=40",
// };

export function AdminSidebar() {
  const { toggleSidebar } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logOut());
  };

  // Filter navigation items based on search query
  const filterItems = (items: typeof navigationItems) => {
    if (!searchQuery) return items;

    const filtered: Record<string, typeof navigationItems.main> = {};

    Object.entries(items).forEach(([category, categoryItems]) => {
      const filteredCategoryItems = categoryItems.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filteredCategoryItems.length > 0) {
        filtered[category] = filteredCategoryItems;
      }
    });

    return filtered;
  };

  const filteredItems = filterItems(navigationItems);

  // Render navigation items for a specific category
  const renderNavItems = (items: typeof navigationItems.main) => {
    return items.map((item) => (
      <NavLink to={item.url} key={item.title}>
        {({ isActive }) => (
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
              <div className="flex items-center w-full">
                <item.icon />
                <span className="flex-grow">{item.title}</span>
                {item.badge && (
                  <SidebarMenuBadge className="bg-primary text-primary-foreground">
                    {item.badge}
                  </SidebarMenuBadge>
                )}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </NavLink>
    ));
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="h-16 flex items-center px-4 py-2">
        <div className="flex items-center justify-between w-full">
          <Logo />
          <SidebarTrigger className="ml-auto md:hidden" />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Search */}
        <div className="px-2 mb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 h-9 text-sm"
            />
          </div>
        </div>

        {/* User Profile */}
        {/* <div
          className={`mb-4 p-3 rounded-lg bg-muted/50 flex items-center gap-3 ${
            state === "collapsed" ? "justify-center" : ""
          }`}
        >
          <Avatar className="h-10 w-10 border-2 border-primary/10">
            <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {state !== "collapsed" && (
            <div className="flex flex-col overflow-hidden">
              <span className="font-medium text-sm truncate">
                {userProfile.name}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {userProfile.role}
              </span>
            </div>
          )}
        </div> */}

        <SidebarSeparator />

        {/* Main Navigation */}
        {Object.keys(filteredItems).length > 0 ? (
          <>
            {filteredItems.main && (
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {renderNavItems(filteredItems.main)}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {filteredItems.management && (
              <SidebarGroup>
                <SidebarGroupLabel>Management</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {renderNavItems(filteredItems.management)}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {filteredItems.operations && (
              <SidebarGroup>
                <SidebarGroupLabel>Operations</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {renderNavItems(filteredItems.operations)}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {filteredItems.system && (
              <SidebarGroup>
                <SidebarGroupLabel>System</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {renderNavItems(filteredItems.system)}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </>
        ) : (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-muted-foreground">No results found</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={() => setSearchQuery("")}
            >
              Clear search
            </Button>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Collapse Sidebar">
              <Button
                onClick={() => toggleSidebar()}
                variant={"secondary"}
                className="flex items-center text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="shrink-0" />
                <span>Collapse</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Button
                onClick={handleLogout}
                variant={"ghost"}
                className="flex items-center text-destructive hover:text-destructive"
              >
                <LogOut className="shrink-0" />
                <span>Logout</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
