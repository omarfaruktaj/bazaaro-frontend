import {
  Code,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Star,
  Store,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Shop Info",
    url: "shop-info",
    icon: Store, // Store icon for Shop Info
  },
  {
    title: "Products",
    url: "products",
    icon: Package, // Package icon for Products
  },
  {
    title: "Orders",
    url: "orders",
    icon: ShoppingCart,
  },
  {
    title: "Coupons",
    url: "coupons",
    icon: Code,
  },
  {
    title: "Reviews",
    url: "reviews",
    icon: Star,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

export function VendorSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader></SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <NavLink to={item.url} key={item.title}>
                  {({ isActive }) => (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <div>
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </NavLink>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
