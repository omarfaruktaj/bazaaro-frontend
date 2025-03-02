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
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">
              <div className="flex items-center gap-2">
                {" "}
                <Icon size={22} />
                {title}
              </div>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
