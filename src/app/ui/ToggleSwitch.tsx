"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ToggleSwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export function ToggleSwitch({
  checked: controlledChecked,
  onCheckedChange,
  className,
}: ToggleSwitchProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = () => {
    const next = !checked;
    if (!isControlled) setInternalChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <label
      className={cn(
        "relative flex max-w-20 cursor-pointer select-none items-center justify-center rounded-lg p-[0.125em]",
        "bg-gradient-to-b from-[#d5d5d5] to-[#e8e8e8]",
        "shadow-[0_1px_1px_rgba(255,255,255,0.6)]",
        "text-2xl",
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none rounded-[inherit] opacity-0"
      />

      {/* Track */}
      <div
        className={cn(
          "relative flex h-[1.5em] w-[3em] items-center rounded-md transition-colors duration-[400ms]",
          "shadow-[inset_0_0_0.0625em_0.125em_rgba(255,255,255,0.2),inset_0_0.0625em_0.125em_rgba(0,0,0,0.4)]",
          checked ? "bg-primary" : "bg-[#e8e8e8]",
        )}
      >
        {/* Knob */}
        <div
          className={cn(
            "absolute flex h-[1.375em] w-[1.375em] items-center justify-center rounded-[0.3125em] bg-[#e8e8e8]",
            "shadow-[inset_0_-0.0625em_0.0625em_0.125em_rgba(0,0,0,0.1),inset_0_-0.125em_0.0625em_rgba(0,0,0,0.2),inset_0_0.1875em_0.0625em_rgba(255,255,255,0.3),0_0.125em_0.125em_rgba(0,0,0,0.5)]",
            "transition-[left] duration-[400ms]",
            checked ? "left-[1.5625em]" : "left-[0.0625em]",
          )}
        >
          {/* Decorative circle grid */}
          <div className="grid grid-cols-3 gap-[0.125em]">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-[0.125em] w-[0.125em] rounded-full bg-[radial-gradient(circle_at_50%_0,#f5f5f5,#c4c4c4)]"
              />
            ))}
          </div>
        </div>
      </div>
    </label>
  );
}