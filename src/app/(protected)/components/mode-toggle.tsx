"use client";

import * as React from "react";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
];

type Theme = "light" | "dark" | "system";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);

  // Avoid hydration mismatch
  React.useEffect(() => setMounted(true), []);

  // Close popup when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsPopupOpen(false);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="size-5 text-warning" />;
      case "dark":
        return <Moon className="size-5 text-white" />;
      default:
        return <Monitor className="size-5 text-[#0EA5E9]" />;
    }
  };

  const isThemeActive = (themeValue: Theme) => theme === themeValue;

  if (!mounted) {
    return (
      <div className="size-10 rounded-lg bg-muted" />
    );
  }

  return (
    <div className="relative" ref={popupRef}>
      <button
        onClick={() => setIsPopupOpen(!isPopupOpen)}
        className="flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer"
        aria-label="Toggle theme"
      >
        {getThemeIcon()}
      </button>

      {isPopupOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-muted/40 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Theme
            </p>
          </div>

          <button
            onClick={() => handleThemeChange("light")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-muted",
              isThemeActive("light")
                ? "text-warning dark:text-warning bg-warning/10"
                : "text-gray-700 dark:text-gray-300 "
            )}
          >
            <Sun className="size-4 text-warning" />
            <span>Light</span>
            {isThemeActive("light") && (
              <Check className="size-4 ml-auto" />
            )}
          </button>

          <button
            onClick={() => handleThemeChange("dark")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-muted",
              isThemeActive("dark")
                ? "text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                : ""
            )}
          >
            <Moon className="size-4" />
            <span>Dark</span>
            {isThemeActive("dark") && (
              <Check className="size-4 ml-auto" />
            )}
          </button>

          <button
            onClick={() => handleThemeChange("system")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors",
              isThemeActive("system")
                ? "text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
          >
            <Monitor className="size-4" />
            <span>System</span>
            {isThemeActive("system") && (
              <Check className="size-4 ml-auto" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}