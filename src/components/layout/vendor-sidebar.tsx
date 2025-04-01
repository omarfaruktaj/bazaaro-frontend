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
import { useGetMyShopsQuery } from "@/features/shop/shop-api";
import { NavLink } from "react-router";
import Logo from "../logo";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Shop Info",
    url: "shop-info",
    icon: Store,
  },
  {
    title: "Products",
    url: "products",
    icon: Package,
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
  const { data } = useGetMyShopsQuery(null);

  const isDisabled = !data;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <NavLink
                  to={item.url}
                  key={item.title}
                  style={{ pointerEvents: isDisabled ? "none" : "auto" }}
                >
                  {({ isActive }) => (
                    <SidebarMenuItem
                      className={
                        isDisabled ? "opacity-50 cursor-not-allowed" : ""
                      }
                    >
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
