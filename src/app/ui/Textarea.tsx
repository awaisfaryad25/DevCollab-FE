"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
  showCount?: boolean;
  maxLength?: number;
  variant?: "default" | "auth";
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      showCount = false,
      maxLength,
      variant = "default",
      className,
      id,
      required,
      disabled,
      value,
      onChange,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id ?? React.useId();
    const [charCount, setCharCount] = React.useState(
      typeof value === "string" ? value.length : 0
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    const variantClass = {
      default: error ? "border-danger" : "border-border",
      auth: error ? "border-danger" : "border-primary",
    }[variant];

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <div className="flex items-center justify-between">
            <label htmlFor={textareaId} className="text-sm font-medium text-foreground">
              {label}
              {required && <span className="ml-1 text-danger">*</span>}
            </label>
            {showCount && maxLength && (
              <span className="text-xs text-muted-foreground">
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          aria-invalid={!!error}
          className={cn(
            "w-full resize-none rounded-lg border bg-background px-3 py-2.5",
            "text-sm text-foreground placeholder:text-muted-foreground",
            "outline-none transition-colors",
            "disabled:cursor-not-allowed disabled:opacity-50",
            variantClass,
            className
          )}
          {...props}
        />

        {error && (
          <p className="text-xs text-danger" role="alert">
            {error}
          </p>
        )}
        {!error && hint && (
          <p className="text-xs text-muted-foreground">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
export type { TextareaProps };
