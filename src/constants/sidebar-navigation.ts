// constants/sidebar.ts
import {
  LayoutDashboard, BarChart3, FileText, Users, Building2, FolderKanban, CheckSquare, CreditCard, 
  Receipt, ArrowLeftRight, Mail, Bell, Activity, Settings,
} from "lucide-react";

export type SidebarItem = {
  title: string;
  url: string;
  icon: React.ElementType;
  badge?: string;
};

export type SidebarSection = {
  section: string;
  items: SidebarItem[];
};

export const sidebarData: SidebarSection[] = [
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