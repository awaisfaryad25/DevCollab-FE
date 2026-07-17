"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── VARIANTS ─────────────────────────────────────────────────────────────────

const variants = {
  primary:   "bg-primary text-white hover:bg-primary/90 border border-transparent",
  secondary: "bg-secondary text-white hover:bg-secondary/90 border border-transparent",
  gradient:  "bg-gradient-to-r from-secondary to-primary text-white hover:opacity-90 border border-transparent",
  outline:   "bg-transparent border border-border text-foreground hover:bg-accent",
  danger:    "bg-danger text-white hover:bg-danger/90 border border-transparent",
  ghost:     "bg-transparent border border-transparent text-foreground hover:bg-accent",
  gold:      "bg-gold text-yellow-900 hover:bg-gold/90 border border-transparent",
  link:      "bg-transparent border-none text-primary underline-offset-4 hover:underline p-0 h-auto",
};

const sizes = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-9 px-4 text-sm gap-2",
  lg: "h-11 px-6 text-sm gap-2",
  xl: "h-12 px-8 text-base gap-2.5",
};

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type BaseProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

type ButtonProps = ButtonAsButton | ButtonAsLink;

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const base = cn(
      "inline-flex items-center justify-center rounded-lg font-medium transition-all",
      "focus:outline-none disabled:pointer-events-none disabled:opacity-50",
      variants[variant],
      sizes[size],
      fullWidth && "w-full",
      className
    );

    const content = (
      <>
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : leftIcon}
        {children && <span>{children}</span>}
        {!loading && rightIcon}
      </>
    );

    // render as Next.js Link
    if ("href" in props && props.href !== undefined) {
      const { href, external, ...rest } = props as ButtonAsLink;
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={base}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          {...(rest as any)}
        >
          {content}
        </Link>
      );
    }

    // render as button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={base}
        disabled={(props as ButtonAsButton).disabled || loading}
        {...(props as ButtonAsButton)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, Variant as ButtonVariant, Size as ButtonSize };
