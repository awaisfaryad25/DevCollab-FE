"use client";

import { useState } from "react";
import {
  Camera,
  Eye,
  EyeOff,
  Save,
  ShieldCheck,
  LogOut,
  Loader2,
  CheckCircle2,
  Bell,
  Moon,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Toggle from "@/app/ui/Toggle";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const mockAdmin = {
  name: "Awais Faryad",
  email: "awais@devcollab.io",
  role: "admin",
  plan: "Pro",
  joined: "Jan 1, 2026",
  lastLogin: "Jun 14, 2026 · 10:24 AM",
  initials: "AF",
  avatar: null,
};

// ─── TAB sections ─────────────────────────────────────────────────────────────

const tabs = ["Profile", "Password", "Preferences", "Sessions"];

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
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

function TextInput({ defaultValue, placeholder, type = "text", disabled }: {
  defaultValue?: string; placeholder?: string; type?: string; disabled?: boolean;
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

// ─── PROFILE TAB ──────────────────────────────────────────────────────────────

function ProfileTab() {
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
      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-2xl font-bold text-violet-700">
            {mockAdmin.initials}
          </div>
          <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-violet-600 text-white hover:bg-violet-700">
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{mockAdmin.name}</p>
          <p className="text-xs text-muted-foreground">{mockAdmin.email}</p>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">{mockAdmin.role}</span>
            <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-700">{mockAdmin.plan}</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background p-6 space-y-5">
        <h3 className="text-sm font-semibold text-foreground border-b border-border pb-3">Personal information</h3>
        <Field label="Full name">
          <TextInput defaultValue={mockAdmin.name} />
        </Field>
        <Field label="Email address" hint="Changing email requires re-verification.">
          <TextInput defaultValue={mockAdmin.email} type="email" />
        </Field>
        <Field label="Role" hint="Role can only be changed by another admin.">
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
            <CheckCircle2 className="h-4 w-4" /> Profile saved successfully
          </div>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="ml-auto flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save changes
        </button>
      </div>
    </div>
  );
}

// ─── PASSWORD TAB ─────────────────────────────────────────────────────────────

function PasswordTab() {
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggle = (field: keyof typeof show) => setShow((s) => ({ ...s, [field]: !s[field] }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500); }, 1200);
  };

  const PasswordField = ({ label, field }: { label: string; field: keyof typeof show }) => (
    <Field label={label}>
      <div className="relative">
        <input
          type={show[field] ? "text" : "password"}
          placeholder="••••••••"
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
        <button type="button" onClick={() => toggle(field)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
          {show[field] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </Field>
  );

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-background p-6 space-y-5">
        <h3 className="text-sm font-semibold text-foreground border-b border-border pb-3">Change password</h3>
        <PasswordField label="Current password" field="current" />
        <PasswordField label="New password" field="new" />
        <PasswordField label="Confirm new password" field="confirm" />
        <div className="rounded-lg bg-muted/40 p-3">
          <p className="text-xs font-medium text-foreground mb-1">Password requirements</p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {["At least 8 characters", "One uppercase letter", "One number"].map((r) => (
              <li key={r} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />{r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {saved && (
          <div className="flex items-center gap-2 text-sm text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Password updated successfully
          </div>
        )}
        <button onClick={handleSave} disabled={saving}
          className="ml-auto flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
          Update password
        </button>
      </div>
    </div>
  );
}

// ─── PREFERENCES TAB ──────────────────────────────────────────────────────────

function PreferencesTab() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-background p-6 space-y-5">
        <h3 className="text-sm font-semibold text-foreground border-b border-border pb-3 flex items-center gap-2">
          <Bell className="h-4 w-4" /> Notifications
        </h3>
        <Toggle label="New user signups" defaultChecked />
        <Toggle label="Failed payments" />
        <Toggle label="Security events" defaultChecked />
        <Toggle label="Weekly digest" />
      </div>

      <div className="rounded-xl border border-border bg-background p-6 space-y-5">
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

      <div className="flex justify-end">
        <button className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700">
          <Save className="h-4 w-4" /> Save preferences
        </button>
      </div>
    </div>
  );
}

// ─── SESSIONS TAB ─────────────────────────────────────────────────────────────

const sessions = [
  { device: "Chrome on Windows", location: "Lahore, Pakistan", ip: "111.68.12.45", lastActive: "Now · current session", current: true },
  { device: "Safari on iPhone", location: "Lahore, Pakistan", ip: "111.68.12.46", lastActive: "2 hours ago", current: false },
  { device: "Chrome on MacBook", location: "Karachi, Pakistan", ip: "203.135.88.12", lastActive: "3 days ago", current: false },
];

function SessionsTab() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-background p-6">
        <h3 className="mb-4 text-sm font-semibold text-foreground border-b border-border pb-3">Active sessions</h3>
        <div className="divide-y divide-border">
          {sessions.map((s, i) => (
            <div key={i} className="flex items-center justify-between py-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{s.device}</p>
                  {s.current && (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">Current</span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.location} · {s.ip}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.lastActive}</p>
              </div>
              {!s.current && (
                <button className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
        <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50">
          <LogOut className="h-4 w-4" /> Revoke all other sessions
        </button>
      </div>
    </div>
  );
}

const Profile = () => {

  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">My profile</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "shrink-0 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
              activeTab === tab
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="max-w-2xl">
        {activeTab === "Profile" && <ProfileTab />}
        {activeTab === "Password" && <PasswordTab />}
        {activeTab === "Preferences" && <PreferencesTab />}
        {activeTab === "Sessions" && <SessionsTab />}
      </div>
    </div>
  )
}

export default Profile