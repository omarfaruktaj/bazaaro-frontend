import {
  Box,
  Calendar,
  Home,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Star,
  Tag,
  User,
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
import Logo from "../logo";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Users",
    url: "users",
    icon: User,
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
  {
    title: "Orders",
    url: "orders",
    icon: ShoppingCart,
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
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
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
