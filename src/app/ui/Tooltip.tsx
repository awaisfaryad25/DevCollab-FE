"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type TooltipPosition = "top" | "bottom" | "left" | "right";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
  disabled?: boolean;
};

// ─── POSITION STYLES ──────────────────────────────────────────────────────────

const positionStyles: Record<TooltipPosition, { tooltip: string; arrow: string }> = {
  top: {
    tooltip: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    arrow: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-foreground",
  },
  bottom: {
    tooltip: "top-full left-1/2 -translate-x-1/2 mt-2",
    arrow: "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-foreground",
  },
  left: {
    tooltip: "right-full top-1/2 -translate-y-1/2 mr-2",
    arrow: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-foreground",
  },
  right: {
    tooltip: "left-full top-1/2 -translate-y-1/2 ml-2",
    arrow: "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-foreground",
  },
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const Tooltip = ({
  content,
  children,
  position = "top",
  delay = 200,
  className,
  disabled = false,
}: TooltipProps) => {
  const [visible, setVisible] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { tooltip, arrow } = positionStyles[position];

  const show = () => {
    if (disabled) return;
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  React.useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      {visible && (
        <div
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 whitespace-nowrap",
            tooltip
          )}
        >
          {/* Tooltip box */}
          <div
            className={cn(
              "rounded-lg bg-foreground px-2.5 py-1.5 text-xs font-medium text-background shadow-md",
              className
            )}
          >
            {content}
          </div>

          {/* Arrow */}
          <div
            className={cn(
              "absolute h-0 w-0 border-4",
              arrow
            )}
          />
        </div>
      )}
    </div>
  );
};

export { Tooltip };
export type { TooltipProps, TooltipPosition };
