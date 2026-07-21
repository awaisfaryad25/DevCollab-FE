"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// RADIO BUTTON
// ─────────────────────────────────────────────────────────────────────────────

type RadioOption = {
  label: string;
  value: string;
  hint?: string;
  disabled?: boolean;
};

type RadioGroupProps = {
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  hint?: string;
  orientation?: "vertical" | "horizontal";
  name: string;
};

const RadioGroup = ({
  label,
  options,
  value,
  onChange,
  error,
  hint,
  orientation = "vertical",
  name,
}: RadioGroupProps) => {
  return (
    <fieldset className="flex w-full flex-col gap-1.5">
      {label && (
        <legend className="text-sm font-medium text-foreground">{label}</legend>
      )}

      <div
        className={cn(
          "flex gap-3",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"
        )}
      >
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={cn(
                "flex cursor-pointer items-start gap-3",
                opt.disabled && "cursor-not-allowed opacity-50"
              )}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                disabled={opt.disabled}
                onChange={() => onChange?.(opt.value)}
                className="sr-only"
              />
              {/* Custom radio */}
              <div
                className={cn(
                  "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-border bg-background"
                )}
              >
                {isSelected && (
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-foreground">{opt.label}</p>
                {opt.hint && (
                  <p className="text-xs text-muted-foreground">{opt.hint}</p>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {error && <p className="text-xs text-danger" role="alert">{error}</p>}
      {!error && hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </fieldset>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CHECKBOX
// ─────────────────────────────────────────────────────────────────────────────

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
  hint?: string;
  error?: string;
  indeterminate?: boolean;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, hint, error, indeterminate = false, className, id, disabled, ...props },
    ref
  ) => {
    const checkId = id ?? React.useId();
    const internalRef = React.useRef<HTMLInputElement>(null);

    // merge refs
    React.useImperativeHandle(ref, () => internalRef.current!);

    // handle indeterminate state (not a standard HTML attribute)
    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const isChecked = props.checked;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={checkId}
          className={cn(
            "flex cursor-pointer items-start gap-3",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <input
            ref={internalRef}
            type="checkbox"
            id={checkId}
            disabled={disabled}
            className="sr-only"
            {...props}
          />

          {/* Custom checkbox */}
          <div
            className={cn(
              "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-colors",
              isChecked || indeterminate
                ? "border-primary bg-primary"
                : "border-border bg-background",
              error && "border-danger"
            )}
          >
            {indeterminate ? (
              <Minus className="h-2.5 w-2.5 text-white" strokeWidth={3} />
            ) : isChecked ? (
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
            ) : null}
          </div>

          {label && (
            <div>
              <p className="text-sm font-medium text-foreground">{label}</p>
              {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
            </div>
          )}
        </label>

        {error && <p className="text-xs text-danger" role="alert">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { RadioGroup, Checkbox };
export type { RadioGroupProps, RadioOption, CheckboxProps };
