import { cn } from "@/lib/utils";
import { getIconByValue } from "@/utils/get-icon-by-value";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import React from "react";

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  icon: string;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, icon, children, ...props }, ref) => {
    const Icon = getIconByValue(icon);
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1.5 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200",
              "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              "border border-transparent hover:border-border",
              "shadow-sm hover:shadow-md",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none mb-2">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>
                <span className="font-semibold">{title}</span>
              </div>
            </div>
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default ListItem;
