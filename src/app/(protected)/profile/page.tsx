"use client";

import { useState } from "react";
import {
  Camera, Mail, Save, ShieldCheck, LogOut, Loader2, CheckCircle2, Bell, Globe, 
} from "lucide-react";

import { cn } from "@/lib/utils";
import Toggle from "@/app/ui/Toggle";
import Image from "next/image";
import { profile } from "@/assets";
import Input from "@/app/ui/Input";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const mockAdmin = {
  name: "Muhammad Awais Faryad",
  email: "awaisfaryad@devcollab.io",
  role: "Admin",
  plan: "Pro",
  joined: "Jan 1, 2026",
  lastLogin: "Jun 14, 2026 · 10:24 AM",
  initials: "AF",
  avatar: null,
};

function Field({ label, hint, children,}: { label: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-3 sm:items-start">
      <div className="sm:pt-2.5">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="sm:col-span-2">{children}</div>
    </div>
  );
}

function TextInput({
  defaultValue,
  placeholder,
  type = "text",
  disabled,
}: {
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}

const sessions = [
  {
    device: "Chrome on Windows",
    location: "Lahore, Pakistan",
    ip: "111.68.12.45",
    lastActive: "Now · current session",
    current: true,
  },
  {
    device: "Safari on iPhone",
    location: "Lahore, Pakistan",
    ip: "111.68.12.46",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    device: "Chrome on MacBook",
    location: "Karachi, Pakistan",
    ip: "203.135.88.12",
    lastActive: "3 days ago",
    current: false,
  },
];

const Profile = () => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold ">Profile</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          View and update your account settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 pt-10">
        {/* Left column Profile Img  */}
        <div className="lg:col-span-2">
          <div className="relative p-6 space-y-5 bg-background rounded-xl shadow-md ">
            <div className=" absolute -top-12">
              <div className="relative rounded-full size-20 md:size-24">
                <Image src={profile} className="size-20 md:size-24 rounded-full" alt="Hexa Logo" />
                <button className="absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full border-2 border-background! bg-primary text-white">
                  <Camera className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-12 space-y-2">
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                {mockAdmin.role}
              </span>
              <h2 className="text- 2xl:text-3xl font-semibold ">
                {mockAdmin.name}
              </h2>
              <p className="text-xs 2xl:text-xl flex items-center gap-2 mt-2">
                <Mail /> {mockAdmin.email}
              </p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Information */}
          <div className="p-6 space-y-5 bg-background rounded-xl shadow-md">
            <div className=" space-y-3">
              <h3 className="text-sm font-semibold text-foreground border-b border-border pb-3">
                Personal information
              </h3>
              <Field label="Full name">
                <TextInput defaultValue={mockAdmin.name} />
              </Field>
              <Field
                label="Email address"
                hint="Changing email requires re-verification."
              >
                <TextInput defaultValue={mockAdmin.email} type="email" />
              </Field>
              <Field
                label="Role"
                hint="Role can only be changed by another admin."
              >
                <TextInput defaultValue={mockAdmin.role} disabled />
              </Field>
              <Field label="Member since">
                <TextInput defaultValue={mockAdmin.joined} disabled />
              </Field>
              <Field label="Last login">
                <TextInput defaultValue={mockAdmin.lastLogin} disabled />
              </Field>
            </div>
            <div className="flex items-center justify-between">
              {saved && (
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" /> Profile saved
                  successfully
                </div>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                className="gradient ml-auto flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save changes
              </button>
            </div>
          </div>

          {/* Password  */}
          <div className="p-6 space-y-5 bg-background rounded-xl shadow-md">
            <div className=" space-y-5">
              <h3 className="text-sm font-semibold text-foreground border-b border-border pb-3">
                Change password
              </h3>
              <Input label="Current password" type="password" />
              <Input label="New password" />
              <Input label="Confirm new password" />
              <div className="rounded-lg bg-muted/40 p-3">
                <p className="text-xs font-medium text-foreground mb-1">
                  Password requirements
                </p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {[
                    "At least 8 characters",
                    "One uppercase letter",
                    "One number",
                  ].map((r) => (
                    <li key={r} className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {saved && (
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" /> Password updated
                  successfully
                </div>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                className="gradient ml-auto flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ShieldCheck className="h-4 w-4" />
                )}
                Update password
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div className="p-6 space-y-5 bg-background rounded-xl shadow-md">
            <div className="grid lg:grid-cols-2">            
              <div className=" space-y-5">
                <h3 className="text-sm font-semibold text-foreground border-b border-border pb-3 flex items-center gap-2">
                  <Bell className="h-4 w-4" /> Notifications
                </h3>
                <Toggle label="New user signups" defaultChecked />
                <Toggle label="Failed payments" />
                <Toggle label="Security events" defaultChecked />
                <Toggle label="Weekly digest" />
              </div>
              <div className=" space-y-5">
                <h3 className="text-sm font-semibold text-foreground border-b border-border pb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Display
                </h3>
                <Field label="Language">
                  <select className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none">
                    <option>English (US)</option>
                    <option>Urdu</option>
                  </select>
                </Field>
                <Field label="Timezone">
                  <select className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none">
                    <option>UTC+5:00 (Pakistan)</option>
                    <option>UTC+0:00</option>
                    <option>UTC-5:00 (EST)</option>
                  </select>
                </Field>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="gradient flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700">
                <Save className="h-4 w-4" /> Save preferences
              </button>
            </div>
          </div>

          {/* Sessions */}
          <div className="p-6 space-y-5 bg-background rounded-xl shadow-md">
            <h3 className="mb-4 text-sm font-semibold text-foreground border-b border-border pb-3">
              Active sessions
            </h3>
            <div className="divide-y divide-border">
              {sessions.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {s.device}
                      </p>
                      {s.current && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {s.location} · {s.ip}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {s.lastActive}
                    </p>
                  </div>
                  {!s.current && (
                    <button className="rounded-lg border border-danger/20! px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/8">
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-danger/20! py-2.5 text-sm font-medium text-danger hover:bg-danger/8">
              <LogOut className="h-4 w-4" /> Revoke all other sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;