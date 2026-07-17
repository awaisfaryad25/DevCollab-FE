"use client";

import { useState } from "react";
import { Pencil, X, Save, Loader2, CheckCircle2 } from "lucide-react";
import Input from "@/app/ui/Input";

export interface ProfileData {
  name: string;
  email: string;
  role: string;
  joined: string;
  lastLogin: string;
}

function ViewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-3 sm:items-center">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="sm:col-span-2 text-sm text-foreground">{value}</p>
    </div>
  );
}

const PersonalDetailCard = ({ data }: { data: ProfileData }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(data);

  const handleChange =
    (key: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setIsEditing(false);
      setTimeout(() => setSaved(false), 2500);
    }, 1200);
  };

  const handleCancel = () => {
    setForm(data);
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-5 bg-background rounded-xl shadow-md">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-sm font-semibold text-foreground">
          Personal information
        </h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <Pencil className="size-3.5" /> Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <Input label="Full name" value={form.name} onChange={handleChange("name")} />
          <Input
            label="Email address"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            hint="Changing email requires re-verification."
          />
          <Input
            label="Role"
            value={form.role}
            disabled
            hint="Role can only be changed by another admin."
          />
          <Input label="Member since" value={form.joined} disabled />
          <Input label="Last login" value={form.lastLogin} disabled />
        </div>
      ) : (
        <div className="space-y-3">
          <ViewField label="Full name" value={data.name} />
          <ViewField label="Email address" value={data.email} />
          <ViewField label="Role" value={data.role} />
          <ViewField label="Member since" value={data.joined} />
          <ViewField label="Last login" value={data.lastLogin} />
        </div>
      )}

      <div className="flex items-center justify-between">
        {saved && (
          <div className="flex items-center gap-2 text-sm text-success">
            <CheckCircle2 className="size-4" /> Profile saved successfully
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
              className="gradient flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              Save changes
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PersonalDetailCard
