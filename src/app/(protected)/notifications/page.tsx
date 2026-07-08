"use client";

import { useState } from "react";
import {
  Bell,
  Send,
  Users,
  CheckCircle2,
  Info,
  AlertTriangle,
  Megaphone,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const sentNotifications = [
  { id: "n_001", title: "Scheduled maintenance", message: "DevCollab will be down for maintenance on Jun 20 from 2–4 AM UTC.", type: "warning", audience: "All users", sentAt: "Jun 14, 2026 · 10:00 AM", reached: 2841 },
  { id: "n_002", title: "New feature: Real-time chat", message: "We've launched real-time team chat for all Pro workspaces.", type: "info", audience: "Pro users", sentAt: "Jun 10, 2026 · 09:00 AM", reached: 438 },
  { id: "n_003", title: "Action required: Verify your email", message: "Some accounts still have unverified emails. Please verify to keep access.", type: "warning", audience: "Unverified users", sentAt: "Jun 8, 2026 · 03:00 PM", reached: 124 },
  { id: "n_004", title: "Welcome to DevCollab!", message: "Thanks for joining. Start by creating your first workspace.", type: "success", audience: "New users", sentAt: "Jun 5, 2026 · 12:00 PM", reached: 284 },
];

const typeStyle: Record<string, { icon: React.ElementType; badge: string; iconColor: string; bg: string }> = {
  info: { icon: Info, badge: "bg-blue-100 text-blue-700", iconColor: "text-blue-600", bg: "bg-blue-50" },
  warning: { icon: AlertTriangle, badge: "bg-amber-100 text-amber-700", iconColor: "text-amber-600", bg: "bg-amber-50" },
  success: { icon: CheckCircle2, badge: "bg-emerald-100 text-emerald-700", iconColor: "text-emerald-600", bg: "bg-emerald-50" },
  announcement: { icon: Megaphone, badge: "bg-violet-100 text-violet-700", iconColor: "text-violet-600", bg: "bg-violet-50" },
};

const Notifications = () => {

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [audience, setAudience] = useState("all");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!title || !message) return;
    setSending(true);
    // TODO: POST /api/v1/notifications
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTitle("");
      setMessage("");
      setTimeout(() => setSent(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Notifications</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Broadcast messages to users across the platform.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Compose panel */}
        <div className="rounded-xl border border-border bg-background p-6">
          <h2 className="mb-5 text-sm font-semibold text-foreground">Compose notification</h2>
          <div className="space-y-4">

            {/* Title */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Title</label>
              <input
                type="text"
                placeholder="e.g. Scheduled maintenance"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
              <textarea
                placeholder="Write your notification message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <p className="mt-1 text-right text-[10px] text-muted-foreground">{message.length}/500</p>
            </div>

            {/* Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Type</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(typeStyle).map(([key, { icon: Icon, badge, iconColor }]) => (
                  <button
                    key={key}
                    onClick={() => setType(key)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium capitalize transition-colors",
                      type === key ? "border-primary bg-primary text-white" : "border-border bg-background text-foreground hover:bg-accent"
                    )}
                  >
                    <Icon className={cn("h-3.5 w-3.5", type === key ? "text-primary" : iconColor)} />
                    {key}
                  </button>
                ))}
              </div>
            </div>

            {/* Audience */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Audience</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none"
              >
                <option value="all">All users (2,841)</option>
                <option value="pro">Pro users only (438)</option>
                <option value="free">Free users only (2,403)</option>
                <option value="unverified">Unverified users (124)</option>
                <option value="new">New users this week (284)</option>
              </select>
            </div>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!title || !message || sending}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
            >
              {sending ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {sending ? "Sending..." : "Send notification"}
            </button>

            {sent && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-success">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Notification sent successfully!
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-xl border border-border bg-background p-6">
          <h2 className="mb-5 text-sm font-semibold text-foreground">Live preview</h2>
          {title || message ? (
            <div className={cn(
              "rounded-xl border p-4",
              type === "warning" ? "border-amber-200 bg-amber-50" :
              type === "success" ? "border-emerald-200 bg-emerald-50" :
              type === "announcement" ? "border-violet-200 bg-violet-50" :
              "border-blue-200 bg-blue-50"
            )}>
              <div className="flex items-start gap-3">
                <div className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full", typeStyle[type].bg)}>
                  {(() => { const Icon = typeStyle[type].icon; return <Icon className={cn("h-4 w-4", typeStyle[type].iconColor)} />; })()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{title || "Notification title"}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {message || "Your notification message will appear here..."}
                  </p>
                  <p className="mt-2 text-[10px] text-muted-foreground">Just now · {audience === "all" ? "All users" : audience === "pro" ? "Pro users" : audience}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
              <Bell className="mb-2 h-8 w-8 text-muted-foreground opacity-40" />
              <p className="text-sm text-muted-foreground">Fill in the form to preview your notification</p>
            </div>
          )}
        </div>
      </div>

      {/* Sent history */}
      <div className="rounded-xl border border-border bg-background p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Sent notifications</h2>
          <span className="text-xs text-muted-foreground">{sentNotifications.length} total</span>
        </div>
        <div className="divide-y divide-border">
          {sentNotifications.map((n) => {
            const { icon: Icon, badge, iconColor, bg } = typeStyle[n.type];
            return (
              <div key={n.id} className="flex items-start gap-4 py-4">
                <div className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full", bg)}>
                  <Icon className={cn("h-4 w-4", iconColor)} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{n.title}</p>
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium capitalize", badge)}>{n.type}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{n.message}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{n.audience}</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-success" />{n.reached.toLocaleString()} reached</span>
                    <span>{n.sentAt}</span>
                  </div>
                </div>
                <button className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-red-50 hover:text-danger">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Notifications