"use client";

import { useState } from "react";
import {
  Pencil, X, Save, Loader2, CheckCircle2, ShieldCheck, Eye, EyeOff,
} from "lucide-react";
import Input from "@/app/ui/Input";

const requirements = [
  "At least 8 characters",
  "One uppercase letter",
  "One number",
];

const PasswordCard = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ current: "", next: "", confirm: "", });

  const reset = () => setForm({ current: "", next: "", confirm: "" });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setIsEditing(false);
      reset();
      setTimeout(() => setSaved(false), 2500);
    }, 1200);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-5 bg-background rounded-xl shadow-md">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-sm font-semibold text-foreground">Change password</h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <Pencil className="size-3.5" /> Change
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-5">
          <Input
            label="Current password"
            type={showPw ? "text" : "password"}
            value={form.current}
            onChange={(e) => setForm((p) => ({ ...p, current: e.target.value }))}
            rightIcon={showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            onRightIconClick={() => setShowPw((s) => !s)}
          />
          <Input
            label="New password"
            type={showPw ? "text" : "password"}
            value={form.next}
            onChange={(e) => setForm((p) => ({ ...p, next: e.target.value }))}
            rightIcon={showPw ? <EyeOff className="size4" /> : <Eye className="size-4" />}
            onRightIconClick={() => setShowPw((s) => !s)}
          />
          <Input
            label="Confirm new password"
            type={showPw ? "text" : "password"}
            value={form.confirm}
            onChange={(e) => setForm((p) => ({ ...p, confirm: e.target.value }))}
            rightIcon={showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            onRightIconClick={() => setShowPw((s) => !s)}
          />

          <div className="rounded-lg bg-muted/40 p-3">
            <p className="text-xs font-medium text-foreground mb-1">
              Password requirements
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {requirements.map((r) => (
                <li key={r} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid gap-1 sm:grid-cols-3 sm:items-center">
            <p className="text-sm font-medium text-muted-foreground">Password</p>
            <p className="sm:col-span-2 text-sm text-foreground tracking-widest">
              ••••••••••
            </p>
          </div>
          <div className="grid gap-1 sm:grid-cols-3 sm:items-center">
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <p className="sm:col-span-2 flex items-center gap-1.5 text-sm text-success">
              <ShieldCheck className="size-4" /> Secure
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        {saved && (
          <div className="flex items-center gap-2 text-sm text-success">
            <CheckCircle2 className="size-4" /> Password updated successfully
          </div>
        )}
        {isEditing && (
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/40 disabled:opacity-60"
            >
              <X className="size-4" /> Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="gradient flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ShieldCheck className="size-4" />
              )}
              Update password
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PasswordCard;
