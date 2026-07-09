"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type ToggleProps = {
  label?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (value: boolean) => void;
};

const Toggle = ({ label, defaultChecked, checked, onChange }: ToggleProps) => {

  const [on, setOn] = useState(defaultChecked ?? false);

  // support both controlled and uncontrolled usage
  const isOn = checked !== undefined ? checked : on;

  const handleClick = () => {
    const next = !isOn;
    setOn(next);
    onChange?.(next);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        onClick={handleClick}
        className={cn(
          "relative h-5 w-9 rounded-full transition-colors",
          isOn ? "bg-primary" : "bg-muted"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform",
            isOn ? "translate-x-0" : "-translate-x-4"  // ← fixed translation
          )}
        />
      </button>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </div>
  )
}

export default Toggle