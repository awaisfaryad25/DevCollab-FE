"use client";

import { useState } from "react";
import { Save, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = ["General", "Email / SMTP", "Stripe", "Security", "Danger zone"];

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-background p-6">
      <div className="mb-6 border-b border-border pb-4">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {desc && <p className="mt-1 text-xs text-muted-foreground">{desc}</p>}
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      <div className="sm:pt-2">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="sm:col-span-2">{children}</div>
    </div>
  );
}

function TextInput({ defaultValue, placeholder, type = "text" }: { defaultValue?: string; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1"
    />
  );
}

function SecretInput({ defaultValue, placeholder }: { defaultValue?: string; placeholder?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

function Toggle({ defaultChecked, label }: { defaultChecked?: boolean; label: string }) {
  const [on, setOn] = useState(defaultChecked ?? false);
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => setOn(!on)}
        className={cn(
          "relative h-5 w-9 rounded-full transition-colors",
          on ? "bg-violet-600" : "bg-muted"
        )}
      >
        <span className={cn(
          "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
          on ? "translate-x-4" : "translate-x-0.5"
        )} />
      </button>
      <span className="text-sm text-foreground">{label}</span>
    </div>
  );
}

const Settings = () => {

  const [activeTab, setActiveTab] = useState("General");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">Manage your application configuration.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-border pb-0">
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
      {activeTab === "General" && (
        <div className="space-y-6">
          <Section title="Branding" desc="How your app appears to users.">
            <Field label="App name" hint="Shown in emails and the UI.">
              <TextInput defaultValue="DevCollab" />
            </Field>
            <Field label="Support email" hint="Users reply to this address.">
              <TextInput defaultValue="hello@devcollab.io" type="email" />
            </Field>
            <Field label="App URL" hint="Your production domain.">
              <TextInput defaultValue="https://devcollab.io" />
            </Field>
          </Section>

          <Section title="Features" desc="Toggle platform-wide features.">
            <Field label="User signups" hint="Allow new users to register.">
              <Toggle defaultChecked label="Signups enabled" />
            </Field>
            <Field label="Google OAuth" hint="Allow Google login.">
              <Toggle defaultChecked label="Google login enabled" />
            </Field>
            <Field label="Maintenance mode" hint="Shows a maintenance page to all users.">
              <Toggle label="Maintenance mode" />
            </Field>
          </Section>
        </div>
      )}

      {activeTab === "Email / SMTP" && (
        <Section title="SMTP configuration" desc="Used by Nodemailer to send all platform emails.">
          <Field label="SMTP host">
            <TextInput defaultValue="smtp.gmail.com" placeholder="smtp.example.com" />
          </Field>
          <Field label="SMTP port">
            <TextInput defaultValue="587" placeholder="587" />
          </Field>
          <Field label="SMTP user">
            <TextInput defaultValue="hello@devcollab.io" placeholder="you@example.com" />
          </Field>
          <Field label="SMTP password">
            <SecretInput placeholder="App password or SMTP key" />
          </Field>
          <Field label="From name" hint="Displayed as sender name.">
            <TextInput defaultValue="DevCollab" />
          </Field>
          <Field label="Test email">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Send test to..."
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1"
              />
              <button className="rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-accent">
                Send test
              </button>
            </div>
          </Field>
        </Section>
      )}

      {activeTab === "Stripe" && (
        <Section title="Stripe configuration" desc="Keys used for payments and webhooks.">
          <Field label="Publishable key" hint="Safe to expose to the frontend.">
            <TextInput defaultValue="pk_live_..." />
          </Field>
          <Field label="Secret key" hint="Never expose this publicly.">
            <SecretInput placeholder="sk_live_..." />
          </Field>
          <Field label="Webhook secret" hint="Used to verify Stripe webhook signatures.">
            <SecretInput placeholder="whsec_..." />
          </Field>
          <Field label="Pro plan price ID" hint="Stripe Price ID for the Pro subscription.">
            <TextInput defaultValue="price_1ABC..." />
          </Field>
        </Section>
      )}

      {activeTab === "Security" && (
        <Section title="Security settings">
          <Field label="JWT secret" hint="Used to sign auth tokens. Change to invalidate all sessions.">
            <SecretInput placeholder="your-jwt-secret" />
          </Field>
          <Field label="Session expiry" hint="How long login sessions last.">
            <select className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1">
              <option>7 days</option>
              <option>30 days</option>
              <option>90 days</option>
            </select>
          </Field>
          <Field label="Rate limiting" hint="Max login attempts before lockout.">
            <Toggle defaultChecked label="Rate limiting enabled (5 attempts / 15 min)" />
          </Field>
          <Field label="2FA" hint="Require two-factor auth for admins.">
            <Toggle label="Require 2FA for admin accounts" />
          </Field>
        </Section>
      )}

      {activeTab === "Danger zone" && (
        <div className="rounded-xl border border-red-200 bg-background p-6">
          <h2 className="mb-1 text-sm font-semibold text-red-600">Danger zone</h2>
          <p className="mb-6 text-xs text-muted-foreground">These actions are irreversible. Proceed with caution.</p>
          <div className="space-y-4">
            {[
              { label: "Reset all user sessions", desc: "Logs out every user immediately.", btn: "Reset sessions" },
              { label: "Clear email queue", desc: "Deletes all pending email jobs.", btn: "Clear queue" },
              { label: "Delete all free users", desc: "Permanently removes all Free-plan accounts.", btn: "Delete free users" },
            ].map((action) => (
              <div key={action.label} className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50/50 p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.desc}</p>
                </div>
                <button className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100">
                  {action.btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save button */}
      {activeTab !== "Danger zone" && (
        <div className="flex justify-end">
          <button className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700">
            <Save className="h-4 w-4" />
            Save changes
          </button>
        </div>
      )}
    </div>
  )
}

export default Settings