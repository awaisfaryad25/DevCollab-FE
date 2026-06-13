"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Users,
  Building2,
  FolderKanban,
  CheckSquare,
  CreditCard,
  Receipt,
  ArrowLeftRight,
  Mail,
  Bell,
  Activity,
  Settings,
  Box,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarItem = {
  title: string;
  url: string;
  icon: React.ElementType;
  badge?: string;
};

type SidebarSection = {
  section: string;
  items: SidebarItem[];
};

const sidebarData: SidebarSection[] = [
  {
    section: "Main",
    items: [
      { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
      { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
      { title: "Reports", url: "/dashboard/reports", icon: FileText },
    ],
  },
  {
    section: "Management",
    items: [
      { title: "Users", url: "/dashboard/users", icon: Users },
      { title: "Workspaces", url: "/dashboard/workspaces", icon: Building2 },
      { title: "Projects", url: "/dashboard/projects", icon: FolderKanban },
      { title: "Tasks", url: "/dashboard/tasks", icon: CheckSquare },
    ],
  },
  {
    section: "Finance",
    items: [
      { title: "Subscriptions", url: "/dashboard/subscriptions", icon: CreditCard },
      { title: "Invoices", url: "/dashboard/invoices", icon: Receipt },
      { title: "Transactions", url: "/dashboard/transactions", icon: ArrowLeftRight },
    ],
  },
  {
    section: "System",
    items: [
      { title: "Email logs", url: "/dashboard/emails", icon: Mail, badge: "3" },
      { title: "Notifications", url: "/dashboard/notifications", icon: Bell },
      { title: "Activity log", url: "/dashboard/activity", icon: Activity },
      { title: "Settings", url: "/dashboard/settings", icon: Settings },
    ],
  },
];

const AppSidebar = () => {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/dashboard") return pathname === "/dashboard";
    return pathname === url || pathname.startsWith(url + "/");
  };

  return (
    <aside className="h-screen w-64 shrink-0 border-r bg-sidebar">
      <div className="flex h-full flex-col p-4">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="mb-4 flex items-center gap-2 rounded-md px-2 py-2"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Box className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">DevCollab</span>
        </Link>

        {/* Nav sections */}
        <nav className="flex-1 space-y-4 overflow-y-auto">
          {sidebarData.map((group) => (
            <div key={group.section}>
              <p className="px-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {group.section}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.url);
                  return (
                    <Link
                      key={item.url}
                      href={item.url}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                        active
                          ? "bg-accent font-medium text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 opacity-80" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <span className="rounded-full bg-destructive px-1.5 text-[10px] text-destructive-foreground">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="space-y-0.5 border-t pt-2">
          <Link
            href="/help"
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <FileText className="h-4 w-4 opacity-80" />
            Help
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;