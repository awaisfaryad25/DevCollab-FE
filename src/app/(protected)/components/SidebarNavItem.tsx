"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ElementType } from "react";

export interface SidebarNavItemData {
  title: string;
  url: string;
  icon: ElementType;
  badge?: string | number;
}

interface SidebarNavItemProps {
  item: SidebarNavItemData;
  isActive: boolean;
  isCollapsed: boolean;
  isMobile: boolean;
}

const SidebarNavItem = ({ item, isActive, isCollapsed, isMobile }: SidebarNavItemProps) => {
  const { title, url, icon: Icon, badge } = item;
  const collapsed = isCollapsed && !isMobile;
  const showLabel = !collapsed;

  return (
    <Link
      href={url}
      title={collapsed ? title : undefined}
      className={cn(
        "flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm transition-colors",
        collapsed && "justify-center px-0",
        isActive
          ? "border-l-2 border-primary! bg-primary/8 font-medium text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <Icon className={cn("size-4", collapsed && "size-4.5")} />
      {showLabel && (
        <>
          <span className="flex-1">{title}</span>
          {badge && (
            <span className="rounded-full bg-destructive px-1.5 text-[10px] text-destructive-foreground">
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
};

export default SidebarNavItem;