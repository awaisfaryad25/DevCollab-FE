"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, FileText, Menu, PanelLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Logo } from "@/assets";
import { sidebarData } from "@/constants/sidebar-navigation";

const AppSidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved) {
      setIsCollapsed(JSON.parse(saved));
    }
  }, []);

  // Save collapsed state
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const isActive = (url: string) => {
    if (url === "/dashboard") return pathname === "/dashboard";
    return pathname === url || pathname.startsWith(url + "/");
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  return (
    <>
      {/* Mobile floating toggle button - only shown when mobile sidebar is CLOSED */}
      {isMobile && !isMobileOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed left-4 top-4 z-110 rounded-lg p-1 shadow-lg hover:bg-accent transition-colors md:hidden cursor-pointer"
          aria-label="Toggle sidebar"
        >
          {/* <Menu className="h-5 w-5" /> */}
          <PanelLeft className="size-5"/>
        </button>
      )}

      {/* Mobile overlay + sidebar */}
      {isMobile && (
        <>
          <div
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              "fixed inset-0 z-[90] bg-black/60 transition-opacity duration-300 md:hidden",
              isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
          />
          <aside
            className={cn(
              "fixed left-0 top-0 z-[100] h-screen w-64 bg-background border-r transition-transform duration-300 ease-in-out md:hidden",
              isMobileOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <SidebarContent
              isCollapsed={false}
              isMobile={true}
              toggleSidebar={toggleSidebar}
              pathname={pathname}
              isActive={isActive}
            />
          </aside>
        </>
      )}

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:block h-screen shrink-0 bg-muted/40 border-r transition-all duration-300 ease-in-out relative",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          isMobile={false}
          toggleSidebar={toggleSidebar}
          pathname={pathname}
          isActive={isActive}
        />
      </aside>
    </>
  );
};

// Separate component for sidebar content
const SidebarContent = ({
  isCollapsed,
  isMobile,
  toggleSidebar,
  pathname,
  isActive,
}: {
  isCollapsed: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  pathname: string;
  isActive: (url: string) => boolean;
}) => {
  return (
    <div className="flex h-full flex-col p-4 relative">
      {/* Toggle button - positioned at top right for desktop */}
      {!isMobile && (
        <button
          onClick={toggleSidebar}
          className={cn(
            "absolute -right-3 top-5 z-10 rounded-full border border-border bg-background p-1 hover:bg-accent transition-colors",
            isCollapsed ? "rotate-0" : "rotate-180"
          )}
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      {/* Close button for mobile */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="absolute right-4 top-4 rounded-lg p-1 hover:bg-accent transition-colors cursor-pointer"
          aria-label="Close sidebar"
        >
          <PanelLeft className="size-5" />
        </button>
      )}

      {/* Logo */}
      <Link
        href="/dashboard"
        className={cn(
          "flex items-center gap-2 mb-8",
          isCollapsed && !isMobile ? "justify-center" : "justify-center"
        )}
      >
        <Image
          src={Logo}
          className={cn(
            "h-6 4xl:h-[28px]",
            isCollapsed && !isMobile ? "w-6" : "w-9 4xl:w-[40px]"
          )}
          alt="DevCollab-rgb"
        />
        {(!isCollapsed || isMobile) && (
          <p className="font-medium 4xl:text-lg text-dark-gray whitespace-nowrap">
            DevCollab
          </p>
        )}
      </Link>

      {/* Nav sections */}
      <nav className="flex-1 space-y-4 overflow-y-auto">
        {sidebarData.map((group) => (
          <div key={group.section}>
            {(!isCollapsed || isMobile) && (
              <p className="px-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {group.section}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.url);
                return (
                  <Link
                    key={item.url}
                    href={item.url}
                    title={isCollapsed && !isMobile ? item.title : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-accent font-medium text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      isCollapsed && !isMobile && "justify-center px-0"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 opacity-80",
                        isCollapsed && !isMobile && "h-5 w-5"
                      )}
                    />
                    {(!isCollapsed || isMobile) && (
                      <>
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <span className="rounded-full bg-destructive px-1.5 text-[10px] text-destructive-foreground">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      {(!isCollapsed || isMobile) && (
        <div className="space-y-0.5 border-t pt-2">
          <Link
            href="/help"
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <FileText className="h-4 w-4 opacity-80" />
            Help
          </Link>
        </div>
      )}
    </div>
  );
};

export default AppSidebar;