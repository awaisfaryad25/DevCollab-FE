"use client";

import * as React from "react";
import { Camera, Upload, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// AVATAR UPLOAD  (profile picture)
// ─────────────────────────────────────────────────────────────────────────────

type AvatarUploadProps = {
  value?: string | null;        // current image URL
  initials?: string;            // fallback initials e.g. "AF"
  onChange?: (file: File) => void;
  onRemove?: () => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  error?: string;
};

const avatarSizes = {
  sm: { wrap: "h-12 w-12", btn: "h-5 w-5 -bottom-0.5 -right-0.5", icon: "h-2.5 w-2.5", text: "text-sm" },
  md: { wrap: "h-20 w-20", btn: "h-7 w-7 -bottom-1 -right-1", icon: "h-3.5 w-3.5", text: "text-xl" },
  lg: { wrap: "h-28 w-28", btn: "h-8 w-8 -bottom-1 -right-1", icon: "h-4 w-4", text: "text-2xl" },
};

const AvatarUpload = ({
  value,
  initials = "?",
  onChange,
  onRemove,
  size = "md",
  disabled = false,
  error,
}: AvatarUploadProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const s = avatarSizes[size];

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange?.(file);
    // reset so same file can be re-selected
    e.target.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative inline-block">
        {/* Avatar circle */}
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-primary/10 font-semibold text-primary overflow-hidden",
            s.wrap,
            s.text,
            error && "ring-2 ring-danger"
          )}
        >
          {value ? (
            <img src={value} alt="Avatar" className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </div>

        {/* Camera button */}
        {!disabled && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={cn(
              "absolute flex items-center justify-center rounded-full",
              "bg-primary text-white border-2 border-background",
              "hover:bg-primary/90 transition-colors",
              s.btn
            )}
            aria-label="Upload profile picture"
          >
            <Camera className={s.icon} />
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={disabled}
          className="sr-only"
        />
      </div>

      {/* Remove link */}
      {value && onRemove && !disabled && (
        <button
          type="button"
          onClick={onRemove}
          className="text-xs text-danger hover:underline"
        >
          Remove photo
        </button>
      )}

      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE UPLOAD  (general dropzone)
// ─────────────────────────────────────────────────────────────────────────────

type ImageUploadProps = {
  value?: File | string | null;
  onChange?: (file: File) => void;
  onRemove?: () => void;
  accept?: string;
  maxSizeMB?: number;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
};

const ImageUpload = ({
  value,
  onChange,
  onRemove,
  accept = "image/*",
  maxSizeMB = 5,
  label,
  hint,
  error,
  disabled = false,
}: ImageUploadProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [drag, setDrag] = React.useState(false);
  const [sizeError, setSizeError] = React.useState("");

  const preview = React.useMemo(() => {
    if (!value) return null;
    if (typeof value === "string") return value;
    return URL.createObjectURL(value);
  }, [value]);

  const handleFile = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      setSizeError(`File must be under ${maxSizeMB}MB.`);
      return;
    }
    setSizeError("");
    onChange?.(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const displayError = error || sizeError;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && <p className="text-sm font-medium text-foreground">{label}</p>}

      {preview ? (
        /* Preview state */
        <div className="relative overflow-hidden rounded-xl border border-border">
          <img
            src={preview}
            alt="Upload preview"
            className="h-48 w-full object-cover"
          />
          {onRemove && !disabled && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-foreground hover:bg-background shadow-sm transition-colors"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        /* Dropzone */
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && !disabled && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); !disabled && setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={handleDrop}
          className={cn(
            "flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed",
            "transition-colors",
            drag
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-accent/50",
            displayError && "border-danger",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <Upload className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Click to upload{" "}
              <span className="text-primary">or drag and drop</span>
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {hint ?? `PNG, JPG, WEBP up to ${maxSizeMB}MB`}
            </p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
      />

      {displayError && (
        <p className="text-xs text-danger" role="alert">{displayError}</p>
      )}
    </div>
  );
};

export { AvatarUpload, ImageUpload };
export type { AvatarUploadProps, ImageUploadProps };
