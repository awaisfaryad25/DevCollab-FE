"use client";

import React, { useState } from "react";
import { Button } from "@/app/ui/Button";
import  Input  from "@/app/ui/Input";
import  Toggle  from "@/app/ui/Toggle";
import { Select } from "@/app/ui/Select";
import { Textarea } from "@/app/ui/Textarea";
import { Tooltip } from "@/app/ui/Tooltip";
import { AvatarUpload, ImageUpload } from "@/app/ui/ImageUpload";
import { Checkbox, RadioGroup } from "@/app/ui/RadioCheckbox";
import {
  ArrowRight, Plus, Mail, Lock, Search,
  Eye, EyeOff, User,
} from "lucide-react";

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-semibold text-primary">{title}</h2>
        <div className="h-px flex-1 bg-border" />
      </div>
      {children}
    </div>
  );
}

// ─── DEMO PAGE ────────────────────────────────────────────────────────────────

const Demo = () => {

  // ── Button states ──────────────────────────────────────────────────────────
  const [saving, setSaving] = useState(false);

  // ── Input states ───────────────────────────────────────────────────────────
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [search, setSearch] = useState("");
  const [inputError, setInputError] = useState("");

  // ── Select state ───────────────────────────────────────────────────────────
  const [plan, setPlan] = useState("");
  const [role, setRole] = useState("");

  // ── Textarea state ─────────────────────────────────────────────────────────
  const [message, setMessage] = useState("");

  // ── Radio state ────────────────────────────────────────────────────────────
  const [selectedRole, setSelectedRole] = useState("user");
  const [selectedPlan, setSelectedPlan] = useState("free");

  // ── Checkbox states ────────────────────────────────────────────────────────
  const [remember, setRemember] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [checkError, setCheckError] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);

  // ── Toggle states ──────────────────────────────────────────────────────────
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [maintenance, setMaintenance] = useState(false);

  // ── Upload states ──────────────────────────────────────────────────────────
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<File | string | null>(null);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 2000);
  };

  const handleEmailBlur = () => {
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      setInputError("Please enter a valid email address.");
    } else {
      setInputError("");
    }
  };

  const handleAvatarChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeTerms(e.target.checked);
    if (e.target.checked) setCheckError("");
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll(e.target.checked);
    setIndeterminate(false);
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-10 p-6">

      <div>
        <h1 className="text-2xl font-semibold text-foreground">DevCollab UI Components</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All reusable components — interactive demo with real state.
        </p>
      </div>

      {/* ── BUTTONS ── */}
      <Section title="Buttons — variants">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="gradient">Gradient</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="gold">Upgrade to Pro ✦</Button>
          <Button variant="link">View details</Button>
        </div>
      </Section>

      <Section title="Buttons — sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </Section>

      <Section title="Buttons — icons, loading, full width">
        <div className="flex flex-wrap gap-3">
          <Button leftIcon={<Plus className="h-4 w-4" />}>New project</Button>
          <Button rightIcon={<ArrowRight className="h-4 w-4" />} variant="outline">
            Continue
          </Button>
          <Button
            loading={saving}
            onClick={handleSave}
            variant="primary"
          >
            {saving ? "Saving..." : "Save changes"}
          </Button>
          <Button disabled variant="primary">Disabled</Button>
        </div>
        <Button fullWidth variant="gradient">
          Full width button
        </Button>
      </Section>

      <Section title="Buttons — as Next.js Link">
        <div className="flex flex-wrap gap-3">
          <Button href="/dashboard" variant="primary">Go to dashboard</Button>
          <Button href="https://stripe.com" external variant="outline">
            Stripe docs ↗
          </Button>
          <Button href="/pricing" variant="gold">See pricing</Button>
        </div>
      </Section>

      {/* ── INPUTS ── */}
      <Section title="Input — variants and states">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Auth variant */}
          <Input
            variant="auth"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            leftIcon={<Mail className="h-4 w-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            error={inputError}
            required
          />

          {/* Password with toggle */}
          <Input
            variant="auth"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={showPassword
              ? <EyeOff className="h-4 w-4" />
              : <Eye className="h-4 w-4" />}
            onRightIconClick={() => setShowPassword(!showPassword)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Dashboard variant */}
          <Input
            variant="default"
            label="Search users"
            placeholder="Search by name or email..."
            leftIcon={<Search className="h-4 w-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            hint="Searches across name and email fields."
          />

          {/* Disabled */}
          <Input
            label="Account ID"
            value="usr_01JXKP2A9B"
            leftIcon={<User className="h-4 w-4" />}
            disabled
            hint="Auto-generated. Cannot be changed."
          />
        </div>
      </Section>

      {/* ── SELECT ── */}
      <Section title="Select">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Subscription plan"
            placeholder="Choose a plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            options={[
              { label: "Free", value: "free" },
              { label: "Pro — $19/mo", value: "pro" },
              { label: "Enterprise", value: "enterprise" },
            ]}
            hint="You can upgrade or downgrade anytime."
          />

          <Select
            label="User role"
            placeholder="Select role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            variant="auth"
            options={[
              { label: "User", value: "user" },
              { label: "Admin", value: "admin" },
              { label: "Viewer (read only)", value: "viewer" },
            ]}
            error={!role ? "Please select a role." : ""}
            required
          />
        </div>
      </Section>

      {/* ── TEXTAREA ── */}
      <Section title="Textarea">
        <div className="grid gap-4 sm:grid-cols-2">
          <Textarea
            label="Message"
            placeholder="Describe your issue or question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            maxLength={300}
            showCount
            hint="Be as descriptive as possible."
          />

          <Textarea
            label="Notes (disabled)"
            value="This field is read-only in this context."
            disabled
            rows={4}
          />
        </div>
      </Section>

      {/* ── RADIO ── */}
      <Section title="Radio buttons">
        <div className="flex flex-wrap gap-10">
          <RadioGroup
            name="role"
            label="User role"
            value={selectedRole}
            onChange={setSelectedRole}
            orientation="vertical"
            options={[
              { label: "User", value: "user", hint: "Standard workspace access." },
              { label: "Admin", value: "admin", hint: "Full platform access." },
              { label: "Viewer", value: "viewer", hint: "Read-only access.", disabled: false },
            ]}
          />

          <RadioGroup
            name="plan"
            label="Subscription plan"
            value={selectedPlan}
            onChange={setSelectedPlan}
            orientation="horizontal"
            options={[
              { label: "Free", value: "free" },
              { label: "Pro", value: "pro" },
              { label: "Enterprise", value: "enterprise" },
            ]}
          />
        </div>

        <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
          Selected role: <span className="font-medium text-foreground">{selectedRole}</span>
          {" · "}
          Selected plan: <span className="font-medium text-foreground">{selectedPlan}</span>
        </div>
      </Section>

      {/* ── CHECKBOX ── */}
      <Section title="Checkboxes">
        <div className="flex flex-wrap gap-6">
          <Checkbox
            label="Remember me"
            hint="Stay logged in for 30 days."
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />

          <Checkbox
            label="Select all rows"
            indeterminate={indeterminate}
            checked={selectAll}
            onChange={handleSelectAll}
          />

          <Checkbox
            label="I agree to the Terms of Service"
            checked={agreeTerms}
            onChange={handleTermsChange}
            error={checkError}
          />

          <Checkbox
            label="Disabled option"
            disabled
          />
        </div>

        {!agreeTerms && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCheckError("You must accept the terms to continue.")}
          >
            Validate terms checkbox
          </Button>
        )}

        <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
          Remember me: <span className="font-medium text-foreground">{remember ? "Yes" : "No"}</span>
          {" · "}
          Terms accepted: <span className="font-medium text-foreground">{agreeTerms ? "Yes" : "No"}</span>
        </div>
      </Section>

      {/* ── TOGGLE ── */}
      <Section title="Toggle switches">
        <div className="space-y-3">
          <Toggle
            label="Email notifications"
            checked={notifications}
            onChange={setNotifications}
          />
          <Toggle
            label="Dark mode"
            checked={darkMode}
            onChange={setDarkMode}
          />
          <Toggle
            label="Maintenance mode"
            checked={maintenance}
            onChange={setMaintenance}
          />
          <Toggle
            label="Disabled toggle"
            defaultChecked
          />
        </div>

        <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
          Notifications: <span className="font-medium text-foreground">{notifications ? "On" : "Off"}</span>
          {" · "}
          Dark mode: <span className="font-medium text-foreground">{darkMode ? "On" : "Off"}</span>
          {" · "}
          Maintenance: <span className="font-medium text-foreground">{maintenance ? "On" : "Off"}</span>
        </div>
      </Section>

      {/* ── TOOLTIP ── */}
      <Section title="Tooltip">
        <div className="flex flex-wrap items-center gap-6 py-4">
          <Tooltip content="Copy to clipboard" position="top">
            <Button variant="outline" size="sm">Hover me (top)</Button>
          </Tooltip>

          <Tooltip content="Admin only action" position="right">
            <Button variant="danger" size="sm">Delete all (right)</Button>
          </Tooltip>

          <Tooltip content="Opens in a new tab" position="bottom">
            <Button variant="ghost" size="sm">External link (bottom)</Button>
          </Tooltip>

          <Tooltip content="Settings panel" position="left">
            <Button variant="outline" size="sm">Settings (left)</Button>
          </Tooltip>

          <Tooltip content="This tooltip is disabled" disabled>
            <Button variant="outline" size="sm" disabled>Disabled tooltip</Button>
          </Tooltip>
        </div>
      </Section>

      {/* ── IMAGE UPLOADS ── */}
      <Section title="Avatar upload">
        <div className="flex flex-wrap items-end gap-8">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground">Small</p>
            <AvatarUpload initials="AF" size="sm" onChange={handleAvatarChange} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground">Medium</p>
            <AvatarUpload initials="AF" size="md" onChange={handleAvatarChange} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground">Large — with preview</p>
            <AvatarUpload
              initials="AF"
              size="lg"
              value={avatarUrl}
              onChange={handleAvatarChange}
              onRemove={() => setAvatarUrl(null)}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground">Disabled</p>
            <AvatarUpload initials="AF" size="md" disabled />
          </div>
        </div>
      </Section>

      <Section title="Image upload — drag and drop">
        <div className="grid gap-4 sm:grid-cols-2">
          <ImageUpload
            label="Project cover"
            value={coverImage}
            onChange={(file) => setCoverImage(file)}
            onRemove={() => setCoverImage(null)}
            maxSizeMB={2}
            hint="PNG or JPG up to 2MB"
          />

          <ImageUpload
            label="Company logo (with error)"
            maxSizeMB={5}
            error="Logo is required."
          />
        </div>
      </Section>

    </div>
  );
};

export default Demo;