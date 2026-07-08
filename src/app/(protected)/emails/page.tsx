"use client";

import { useState } from "react";
import {
  Search,
  Mail,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SearchInput from "@/app/ui/search-input";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const summaryCards = [
  { label: "Total sent", value: "1,284", icon: Mail, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "Delivered", value: "1,261", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Failed", value: "23", icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
  { label: "Pending", value: "0", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
];

type EmailLog = {
  id: string;
  to: string;
  user: string;
  subject: string;
  template: string;
  status: "delivered" | "failed" | "pending";
  sentAt: string;
  preview: string;
};

const emailLogs: EmailLog[] = [
  { id: "em_001", to: "ali@example.com", user: "Ali Raza", subject: "Verify your DevCollab account", template: "verifyEmail", status: "delivered", sentAt: "Jun 14, 2026 · 10:24 AM", preview: "Hi Ali, click below to verify your DevCollab account. This link expires in 24 hours." },
  { id: "em_002", to: "sara@example.com", user: "Sara Ahmad", subject: "Reset your DevCollab password", template: "resetPassword", status: "delivered", sentAt: "Jun 14, 2026 · 09:10 AM", preview: "Hi Sara, click below to set a new password. This link expires in 30 minutes." },
  { id: "em_003", to: "omar@example.com", user: "Omar Farooq", subject: "Your DevCollab password was changed", template: "passwordChanged", status: "failed", sentAt: "Jun 13, 2026 · 03:45 PM", preview: "Hi Omar, your DevCollab password was just changed." },
  { id: "em_004", to: "maria@example.com", user: "Maria Khan", subject: "Verify your DevCollab account", template: "verifyEmail", status: "delivered", sentAt: "Jun 13, 2026 · 01:20 PM", preview: "Hi Maria, click below to verify your DevCollab account." },
  { id: "em_005", to: "zain@example.com", user: "Zain Ahmed", subject: "Reset your DevCollab password", template: "resetPassword", status: "delivered", sentAt: "Jun 12, 2026 · 11:55 AM", preview: "Hi Zain, click below to set a new password. This link expires in 30 minutes." },
  { id: "em_006", to: "hassan@example.com", user: "Hassan Ali", subject: "Verify your DevCollab account", template: "verifyEmail", status: "failed", sentAt: "Jun 12, 2026 · 08:30 AM", preview: "Hi Hassan, click below to verify your DevCollab account." },
  { id: "em_007", to: "fatima@example.com", user: "Fatima Malik", subject: "Your DevCollab password was changed", template: "passwordChanged", status: "delivered", sentAt: "Jun 11, 2026 · 06:00 PM", preview: "Hi Fatima, your DevCollab password was just changed." },
];

const statusStyle: Record<string, string> = {
  delivered: "bg-emerald-100 text-emerald-700",
  failed: "bg-red-100 text-red-600",
  pending: "bg-amber-100 text-amber-700",
};

const statusIcon: Record<string, React.ReactNode> = {
  delivered: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />,
  failed: <XCircle className="h-3.5 w-3.5 text-red-500" />,
  pending: <Clock className="h-3.5 w-3.5 text-amber-500" />,
};

const templateStyle: Record<string, string> = {
  verifyEmail: "bg-violet-100 text-violet-700",
  resetPassword: "bg-blue-100 text-blue-700",
  passwordChanged: "bg-amber-100 text-amber-700",
};

const EmailLogs = () => {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [preview, setPreview] = useState<EmailLog | null>(null);

  const filtered = emailLogs.filter((e) => {
    const matchSearch =
      e.user.toLowerCase().includes(search.toLowerCase()) ||
      e.to.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Email logs</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            All emails sent via Nodemailer.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-accent">
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="rounded-xl border border-border bg-background p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="mt-1.5 text-2xl font-semibold text-foreground">{c.value}</p>
                </div>
                <div className={cn("rounded-lg p-2.5", c.bg)}>
                  <Icon className={cn("h-5 w-5", c.color)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by user, email or subject..."
        />
        <div className="flex gap-2">
          {["All", "delivered", "failed", "pending"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={cn("rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                statusFilter === s ? "border-primary bg-primary text-white" : "border-border bg-background text-foreground hover:bg-accent"
              )}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {["Recipient", "Subject", "Template", "Status", "Sent at", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-foreground">{e.user}</p>
                    <p className="text-xs text-muted-foreground">{e.to}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground max-w-xs truncate">{e.subject}</td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", templateStyle[e.template])}>
                      {e.template}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {statusIcon[e.status]}
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium capitalize", statusStyle[e.status])}>
                        {e.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{e.sentAt}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setPreview(e)}
                      className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <Eye className="h-3.5 w-3.5" /> Preview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {emailLogs.length}</p>
          <div className="flex items-center gap-1">
            <button disabled className="rounded-md p-1.5 text-muted-foreground disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
            <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-white">1</span>
            <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* Email preview panel */}
      {preview && (
        <>
          <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm" onClick={() => setPreview(null)} />
          <div className="fixed right-0 top-0 z-40 h-full w-96 border-l border-border bg-background shadow-xl">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="text-sm font-semibold text-foreground">Email preview</h2>
                <button onClick={() => setPreview(null)} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="space-y-2 rounded-lg bg-muted/40 p-4">
                  {[
                    { label: "To", value: preview.to },
                    { label: "Subject", value: preview.subject },
                    { label: "Template", value: preview.template },
                    { label: "Status", value: preview.status },
                    { label: "Sent at", value: preview.sentAt },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-2 text-xs">
                      <span className="w-16 shrink-0 font-medium text-muted-foreground">{label}:</span>
                      <span className="text-foreground capitalize">{value}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Email body preview</p>
                  <div className="rounded-xl border border-border bg-background p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-600 text-white">
                        <Mail className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-foreground">DevCollab</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{preview.subject}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{preview.preview}</p>
                    <div className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white">
                      {preview.template === "verifyEmail" ? "Verify email" : preview.template === "resetPassword" ? "Reset password" : "View account"}
                    </div>
                  </div>
                </div>
              </div>
              {preview.status === "failed" && (
                <div className="border-t border-border p-4">
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/80">
                    <RefreshCw className="h-4 w-4" /> Resend email
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default EmailLogs