"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, FileText, PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarData } from "@/constants/sidebar-navigation";
import SidebarLogo from "./SidebarLogo";
import SidebarNavItem from "./SidebarNavItem";

const AppSidebar = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() =>
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem("sidebar-collapsed") ?? "false") : false
  );

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => setIsMobileOpen(false), [pathname]);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const isActive = (url: string) =>
    url === "/dashboard" ? pathname === url : pathname === url || pathname.startsWith(url + "/");

  const toggleSidebar = () =>
    isMobile ? setIsMobileOpen((prev) => !prev) : setIsCollapsed((prev: boolean) => !prev);

  return (
    <>
      {isMobile && !isMobileOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed left-4 top-4 z-110 cursor-pointer rounded-lg p-1 shadow-lg transition-colors hover:bg-accent md:hidden"
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="size-5" />
        </button>
      )}

      {isMobile && (
        <>
          <div
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              "fixed inset-0 z-[90] bg-background/60 transition-opacity duration-300 md:hidden",
              isMobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            )}
          />
          <aside
            className={cn(
              "fixed left-0 top-0 z-[100] h-screen w-64 border-r bg-background transition-transform duration-300 ease-in-out md:hidden",
              isMobileOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <SidebarContent isCollapsed={false} isMobile toggleSidebar={toggleSidebar} isActive={isActive} />
          </aside>
        </>
      )}

      <aside
        className={cn(
          "relative hidden h-screen shrink-0 border-r bg-background transition-all duration-300 ease-in-out md:block",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarContent isCollapsed={isCollapsed} isMobile={false} toggleSidebar={toggleSidebar} isActive={isActive} />
      </aside>
    </>
  );
};

const SidebarContent = ({
  isCollapsed,
  isMobile,
  toggleSidebar,
  isActive,
}: {
  isCollapsed: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  isActive: (url: string) => boolean;
}) => {
  const expanded = !isCollapsed || isMobile;

  return (
    <div className="relative flex h-full flex-col p-4">
      <button
        onClick={toggleSidebar}
        className={cn(
          "absolute z-60 cursor-pointer rounded-full border border-border bg-background p-1 transition-colors hover:bg-accent",
          isMobile ? "right-4 top-4" : "-right-3 top-5",
          !isMobile && (isCollapsed ? "rotate-0" : "rotate-180")
        )}
        aria-label={isMobile ? "Close sidebar" : "Toggle sidebar"}
      >
        {isMobile ? <PanelLeft className="size-5" /> : <ChevronLeft className="size-4" />}
      </button>

      <SidebarLogo isCollapsed={isCollapsed} isMobile={isMobile} />

      <nav className="flex-1 space-y-4 overflow-y-auto">
        {sidebarData.map((group) => (
          <div key={group.section}>
            {expanded && (
              <p className="px-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {group.section}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <SidebarNavItem
                  key={item.url}
                  item={item}
                  isActive={isActive(item.url)}
                  isCollapsed={isCollapsed}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {expanded && (
        <div className="space-y-0.5 border-t pt-2">
          <Link
            href="/help"
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <FileText className="size-4" />
            Help
          </Link>
        </div>
      )}
    </div>
  );
};

export default AppSidebar;