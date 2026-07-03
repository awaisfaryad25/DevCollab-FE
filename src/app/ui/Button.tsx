"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "danger" | "pill";
type ButtonSize = "sm" | "md" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  active?: boolean; // for pill/filter-style toggle buttons
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50",
  outline:
    "border border-border bg-background text-foreground hover:bg-accent disabled:opacity-40",
  ghost:
    "text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-40",
  danger:
    "border border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 disabled:opacity-50",
  pill: "border text-xs font-medium transition-colors border-border bg-background text-foreground hover:bg-accent",
};

const activePillClasses = "border-primary! bg-primary! text-white!";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-4 py-2.5 text-sm rounded-lg gap-2",
  icon: "p-1.5 rounded-md",
};

const Button = ({
  variant = "outline",
  size = "md",
  active,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors",
        variantClasses[variant],
        sizeClasses[size],
        variant === "pill" && active && activePillClasses,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
