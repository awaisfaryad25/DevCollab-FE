"use client";

import { useState } from "react";
import {
  TrendingUp, TrendingDown, Users, CreditCard, FolderKanban, CheckSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const summaryCards = [
  { label: "Total revenue", value: "$9,240", change: "+21%", up: true, icon: CreditCard, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "New users", value: "284", change: "+12%", up: true, icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Active projects", value: "184", change: "-3%", up: false, icon: FolderKanban, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Tasks completed", value: "1,284", change: "+34%", up: true, icon: CheckSquare, color: "text-amber-600", bg: "bg-amber-50" },
];

const revenueMonths = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5100 },
  { month: "Mar", revenue: 4800 },
  { month: "Apr", revenue: 6200 },
  { month: "May", revenue: 7400 },
  { month: "Jun", revenue: 9240 },
];

const signupMonths = [
  { month: "Jan", signups: 120 },
  { month: "Feb", signups: 185 },
  { month: "Mar", signups: 142 },
  { month: "Apr", signups: 210 },
  { month: "May", signups: 198 },
  { month: "Jun", signups: 284 },
];

const planBreakdown = [
  { plan: "Free", count: 2403, pct: 85, color: "bg-muted" },
  { plan: "Pro", count: 438, pct: 15, color: "bg-primary" },
];

const topWorkspaces = [
  { name: "TechStart PK", members: 24, projects: 18, plan: "Pro" },
  { name: "CodeHive Team", members: 18, projects: 12, plan: "Pro" },
  { name: "StackBridge", members: 9, projects: 7, plan: "Free" },
  { name: "LaunchPad Studio", members: 15, projects: 10, plan: "Pro" },
  { name: "BuildFast", members: 6, projects: 4, plan: "Free" },
];

// ─── CUSTOM TOOLTIPS ──────────────────────────────────────────────────────────

const RevenueTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-md">
      <p className="mb-1 text-xs font-medium text-foreground">{label}</p>
      <p className="text-xs text-violet-600">${payload[0].value.toLocaleString()}</p>
    </div>
  );
};

const SignupTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-md">
      <p className="mb-1 text-xs font-medium text-foreground">{label}</p>
      <p className="text-xs text-emerald-600">{payload[0].value} signups</p>
    </div>
  );
};

// ─── SHARED CHART PROPS ───────────────────────────────────────────────────────

const axisProps = {
  axisLine: false,
  tickLine: false,
  tick: { fontSize: 11 },
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

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
                range === r ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
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
                {s.up
                  ? <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  : <TrendingDown className="h-3.5 w-3.5 text-red-500" />}
                <span className={cn("text-xs font-medium", s.up ? "text-emerald-600" : "text-red-500")}>
                  {s.change}
                </span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Revenue area chart */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h2 className="mb-1 text-sm font-semibold text-foreground">Monthly revenue</h2>
          <p className="mb-5 text-xs text-muted-foreground">Last 6 months · USD</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={revenueMonths} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border" vertical={false} />
              <XAxis dataKey="month" {...axisProps} className="text-muted-foreground" />
              <YAxis
                {...axisProps}
                className="text-muted-foreground"
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                content={<RevenueTooltip />}
                cursor={{ stroke: "#7c3aed", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#7c3aed"
                strokeWidth={2}
                fill="url(#revenueGradient)"
                dot={{ fill: "#7c3aed", strokeWidth: 2, r: 3, stroke: "#fff" }}
                activeDot={{ r: 5, fill: "#7c3aed", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Signups area chart */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h2 className="mb-1 text-sm font-semibold text-foreground">New user signups</h2>
          <p className="mb-5 text-xs text-muted-foreground">Last 6 months · all plans</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={signupMonths} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <defs>
                <linearGradient id="signupGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border" vertical={false} />
              <XAxis dataKey="month" {...axisProps} className="text-muted-foreground" />
              <YAxis {...axisProps} className="text-muted-foreground" />
              <Tooltip
                content={<SignupTooltip />}
                cursor={{ stroke: "#10b981", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Area
                type="monotone"
                dataKey="signups"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#signupGradient)"
                dot={{ fill: "#10b981", strokeWidth: 2, r: 3, stroke: "#fff" }}
                activeDot={{ r: 5, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
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
                  <span className="text-muted-foreground">
                    {p.count.toLocaleString()} users · {p.pct}%
                  </span>
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
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                  {w.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{w.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {w.members} members · {w.projects} projects
                  </p>
                </div>
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium",
                  w.plan === "Pro"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}>
                  {w.plan}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;