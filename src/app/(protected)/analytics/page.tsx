"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Users, CreditCard, FolderKanban, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const summaryCards = [
  { label: "Total revenue", value: "$9,240", change: "+21%", up: true, icon: CreditCard, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "New users", value: "284", change: "+12%", up: true, icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Active projects", value: "184", change: "-3%", up: false, icon: FolderKanban, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Tasks completed", value: "1,284", change: "+34%", up: true, icon: CheckSquare, color: "text-amber-600", bg: "bg-amber-50" },
];

const revenueMonths = [
  { month: "Jan", value: 4200 },
  { month: "Feb", value: 5100 },
  { month: "Mar", value: 4800 },
  { month: "Apr", value: 6200 },
  { month: "May", value: 7400 },
  { month: "Jun", value: 9240 },
];

const signupMonths = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 185 },
  { month: "Mar", value: 142 },
  { month: "Apr", value: 210 },
  { month: "May", value: 198 },
  { month: "Jun", value: 284 },
];

const planBreakdown = [
  { plan: "Free", count: 2403, pct: 85, color: "bg-muted" },
  { plan: "Pro", count: 438, pct: 15, color: "bg-violet-500" },
];

const topWorkspaces = [
  { name: "TechStart PK", members: 24, projects: 18, plan: "Pro" },
  { name: "CodeHive Team", members: 18, projects: 12, plan: "Pro" },
  { name: "StackBridge", members: 9, projects: 7, plan: "Free" },
  { name: "LaunchPad Studio", members: 15, projects: 10, plan: "Pro" },
  { name: "BuildFast", members: 6, projects: 4, plan: "Free" },
];

const maxRevenue = Math.max(...revenueMonths.map((d) => d.value));
const maxSignup = Math.max(...signupMonths.map((d) => d.value));


const Analytics = () => {

   const [range, setRange] = useState("6M");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Analytics</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Platform-wide metrics and trends.</p>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
          {["1M", "3M", "6M", "1Y"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                range === r ? "bg-violet-600 text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-border bg-background p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="mt-1.5 text-2xl font-semibold text-foreground">{s.value}</p>
                </div>
                <div className={cn("rounded-lg p-2", s.bg)}>
                  <Icon className={cn("h-5 w-5", s.color)} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                {s.up ? <TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> : <TrendingDown className="h-3.5 w-3.5 text-red-500" />}
                <span className={cn("text-xs font-medium", s.up ? "text-emerald-600" : "text-red-500")}>{s.change}</span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue chart */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Monthly revenue</h2>
          <div className="flex items-end gap-3 h-44">
            {revenueMonths.map(({ month, value }) => (
              <div key={month} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">${(value / 1000).toFixed(1)}k</span>
                <div
                  className="w-full rounded-t-md bg-violet-200 hover:bg-violet-500 transition-colors cursor-pointer"
                  style={{ height: `${(value / maxRevenue) * 140}px` }}
                />
                <span className="text-[10px] text-muted-foreground">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Signups chart */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h2 className="mb-4 text-sm font-semibold text-foreground">New user signups</h2>
          <div className="flex items-end gap-3 h-44">
            {signupMonths.map(({ month, value }) => (
              <div key={month} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">{value}</span>
                <div
                  className="w-full rounded-t-md bg-emerald-200 hover:bg-emerald-500 transition-colors cursor-pointer"
                  style={{ height: `${(value / maxSignup) * 140}px` }}
                />
                <span className="text-[10px] text-muted-foreground">{month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan breakdown + top workspaces */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Plan breakdown */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Plan breakdown</h2>
          <div className="space-y-4">
            {planBreakdown.map((p) => (
              <div key={p.plan}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{p.plan}</span>
                  <span className="text-muted-foreground">{p.count.toLocaleString()} users · {p.pct}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className={cn("h-full rounded-full", p.color)} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
            <div className="mt-4 rounded-lg bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">
                MRR from Pro plans:{" "}
                <span className="font-semibold text-foreground">$8,322</span>
                {" "}· Conversion rate:{" "}
                <span className="font-semibold text-foreground">15.4%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Top workspaces */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Top workspaces</h2>
          <div className="divide-y divide-border">
            {topWorkspaces.map((w) => (
              <div key={w.name} className="flex items-center gap-3 py-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-xs font-bold text-violet-600">
                  {w.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{w.name}</p>
                  <p className="text-xs text-muted-foreground">{w.members} members · {w.projects} projects</p>
                </div>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium",
                  w.plan === "Pro" ? "bg-violet-100 text-violet-700" : "bg-muted text-muted-foreground"
                )}>
                  {w.plan}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics