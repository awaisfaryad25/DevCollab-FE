"use client";

import { useState } from "react";
import { Pencil, X, Save, Loader2, CheckCircle2, Bell, Globe } from "lucide-react";
import Toggle from "@/app/ui/Toggle";

interface Preferences {
  newSignups: boolean;
  failedPayments: boolean;
  securityEvents: boolean;
  weeklyDigest: boolean;
  language: string;
  timezone: string;
}

const defaultPreferences: Preferences = {
  newSignups: true,
  failedPayments: false,
  securityEvents: true,
  weeklyDigest: false,
  language: "English (US)",
  timezone: "UTC+5:00 (Pakistan)",
};

function ViewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

const PreferencesCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [prefs, setPrefs] = useState<Preferences>(defaultPreferences);

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
    setPrefs(defaultPreferences);
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-5 bg-background rounded-xl shadow-md">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-sm font-semibold text-foreground">Preferences</h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <h4 className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </h4>

          {isEditing ? (
            <div className="space-y-5">
              <Toggle
                label="New user signups"
                checked={prefs.newSignups}
                onChange={(v: boolean) => setPrefs((p) => ({ ...p, newSignups: v }))}
              />
              <Toggle
                label="Failed payments"
                checked={prefs.failedPayments}
                onChange={(v: boolean) => setPrefs((p) => ({ ...p, failedPayments: v }))}
              />
              <Toggle
                label="Security events"
                checked={prefs.securityEvents}
                onChange={(v: boolean) => setPrefs((p) => ({ ...p, securityEvents: v }))}
              />
              <Toggle
                label="Weekly digest"
                checked={prefs.weeklyDigest}
                onChange={(v: boolean) => setPrefs((p) => ({ ...p, weeklyDigest: v }))}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <ViewRow label="New user signups" value={prefs.newSignups ? "On" : "Off"} />
              <ViewRow label="Failed payments" value={prefs.failedPayments ? "On" : "Off"} />
              <ViewRow label="Security events" value={prefs.securityEvents ? "On" : "Off"} />
              <ViewRow label="Weekly digest" value={prefs.weeklyDigest ? "On" : "Off"} />
            </div>
          )}
        </div>

        <div className="space-y-5">
          <h4 className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
            <Globe className="h-4 w-4" /> Display
          </h4>

          {isEditing ? (
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text">Language</label>
                <select
                  value={prefs.language}
                  onChange={(e) => setPrefs((p) => ({ ...p, language: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none"
                >
                  <option>English (US)</option>
                  <option>Urdu</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text">Timezone</label>
                <select
                  value={prefs.timezone}
                  onChange={(e) => setPrefs((p) => ({ ...p, timezone: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none"
                >
                  <option>UTC+5:00 (Pakistan)</option>
                  <option>UTC+0:00</option>
                  <option>UTC-5:00 (EST)</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <ViewRow label="Language" value={prefs.language} />
              <ViewRow label="Timezone" value={prefs.timezone} />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        {saved && (
          <div className="flex items-center gap-2 text-sm text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Preferences saved
          </div>
        )}
        {isEditing && (
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/40 disabled:opacity-60"
            >
              <X className="h-4 w-4" /> Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="gradient flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PreferencesCard


