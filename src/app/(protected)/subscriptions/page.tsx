"use client";

import { useState } from "react";
import { Search, Download, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchInput from "@/app/ui/search-input";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const summaryCards = [
  { label: "Monthly recurring revenue", value: "$8,322", sub: "438 active Pro subs" },
  { label: "Active subscriptions", value: "438", sub: "+8% this month" },
  { label: "Churned this month", value: "12", sub: "2.7% churn rate" },
  { label: "Avg. revenue per user", value: "$19.00", sub: "Pro plan price" },
];

const subscriptions = [
  { id: "sub_1", user: "Ali Raza", email: "ali@example.com", plan: "Pro", status: "Active", amount: "$19/mo", started: "Jun 1, 2026", nextBilling: "Jul 1, 2026", initials: "AR", color: "bg-violet-100 text-violet-700" },
  { id: "sub_2", user: "Omar Farooq", email: "omar@example.com", plan: "Pro", status: "Active", amount: "$19/mo", started: "May 15, 2026", nextBilling: "Jun 15, 2026", initials: "OF", color: "bg-orange-100 text-orange-700" },
  { id: "sub_3", user: "Zain Ahmed", email: "zain@example.com", plan: "Pro", status: "Cancelled", amount: "$19/mo", started: "Apr 10, 2026", nextBilling: "—", initials: "ZA", color: "bg-amber-100 text-amber-700" },
  { id: "sub_4", user: "Hassan Ali", email: "hassan@example.com", plan: "Pro", status: "Active", amount: "$19/mo", started: "Jun 3, 2026", nextBilling: "Jul 3, 2026", initials: "HA", color: "bg-indigo-100 text-indigo-700" },
  { id: "sub_5", user: "Fatima Malik", email: "fatima@example.com", plan: "Pro", status: "Past due", amount: "$19/mo", started: "May 1, 2026", nextBilling: "Jun 1, 2026", initials: "FM", color: "bg-pink-100 text-pink-700" },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700",
    Cancelled: "bg-muted text-muted-foreground",
    "Past due": "bg-red-100 text-red-600",
  };
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", styles[status])}>
      {status}
    </span>
  );
}

const Subscriptions = () => {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = subscriptions.filter((s) => {
    const matchSearch = s.user.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Subscriptions</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Manage Pro plans and billing.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-accent">
          <Download className="h-4 w-4" /> Export
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((c) => (
          <div key={c.label} className="rounded-xl border border-border bg-background p-5">
            <p className="text-xs text-muted-foreground">{c.label}</p>
            <p className="mt-1.5 text-2xl font-semibold text-foreground">{c.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search subscribers..."
        />
        <div className="flex gap-2">
          {["All", "Active", "Cancelled", "Past due"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn("rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                statusFilter === s ? "border-primary bg-primary text-white" : "border-border bg-background text-foreground hover:bg-accent"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Subscriber</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Plan</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Started</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Next billing</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold", s.color)}>
                        {s.initials}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{s.user}</p>
                        <p className="text-xs text-muted-foreground">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{s.plan}</span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{s.amount}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{s.started}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{s.nextBilling}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {subscriptions.length}</p>
          <div className="flex items-center gap-1">
            <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent" disabled>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-white">1</span>
            <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscriptions