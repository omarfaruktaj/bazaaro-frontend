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
    notDisableAble: true,
  },
  {
    title: "Shop Info",
    url: "shop-info",
    icon: Store,
    notDisableAble: true,
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
    notDisableAble: true,
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
                  style={{
                    pointerEvents:
                      isDisabled && !item.notDisableAble ? "none" : "auto",
                  }}
                >
                  {({ isActive }) => (
                    <SidebarMenuItem
                      className={
                        isDisabled && !item.notDisableAble
                          ? "opacity-50 cursor-not-allowed"
                          : ""
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
