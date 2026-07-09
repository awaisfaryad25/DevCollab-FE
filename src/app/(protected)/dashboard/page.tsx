"use client";

import {
  Users, CreditCard, FolderKanban, TrendingUp, TrendingDown, ArrowRight,
  UserPlus, ShieldAlert, Building2, CheckSquare,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const stats = [
  { label: "Total users", value: "2,841", change: "+12%", up: true, sub: "vs last month", icon: Users, iconColor: "text-violet-600", iconBg: "bg-violet-50 dark:bg-violet-950" },
  { label: "Pro subscribers", value: "438", change: "+8%", up: true, sub: "vs last month", icon: CreditCard, iconColor: "text-emerald-600", iconBg: "bg-emerald-50 dark:bg-emerald-950" },
  { label: "Monthly revenue", value: "$9,240", change: "+21%", up: true, sub: "vs last month", icon: TrendingUp, iconColor: "text-amber-600", iconBg: "bg-amber-50 dark:bg-amber-950" },
  { label: "Active projects", value: "184", change: "-3%", up: false, sub: "vs last month", icon: FolderKanban, iconColor: "text-blue-600", iconBg: "bg-blue-50 dark:bg-blue-950" },
];

const weeklySignups = [
  { day: "Mon", signups: 38 },
  { day: "Tue", signups: 52 },
  { day: "Wed", signups: 31 },
  { day: "Thu", signups: 67 },
  { day: "Fri", signups: 45 },
  { day: "Sat", signups: 22 },
  { day: "Sun", signups: 74 },
];

const recentUsers = [
  { name: "Ali Raza", email: "ali@example.com", plan: "Pro", joined: "2m ago", initials: "AR", color: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300" },
  { name: "Sara Ahmad", email: "sara@example.com", plan: "Free", joined: "14m ago", initials: "SA", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
  { name: "Omar Farooq", email: "omar@example.com", plan: "Pro", joined: "1h ago", initials: "OF", color: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300" },
  { name: "Maria Khan", email: "maria@example.com", plan: "Free", joined: "3h ago", initials: "MK", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  { name: "Zain Ahmed", email: "zain@example.com", plan: "Pro", joined: "5h ago", initials: "ZA", color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
];

const activity = [
  { icon: UserPlus, color: "text-violet-600 bg-violet-50 dark:bg-violet-950", text: "Ali Raza signed up via Google OAuth", time: "2m ago" },
  { icon: CreditCard, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950", text: "Sara Ahmad upgraded to Pro — $19/mo", time: "14m ago" },
  { icon: ShieldAlert, color: "text-red-500 bg-red-50 dark:bg-red-950", text: "Failed login × 3 — user@example.com", time: "1h ago" },
  { icon: Building2, color: "text-blue-600 bg-blue-50 dark:bg-blue-950", text: "New workspace 'TechStart PK' created", time: "3h ago" },
  { icon: CheckSquare, color: "text-teal-600 bg-teal-50 dark:bg-teal-950", text: "Project 'DevCollab App' marked complete", time: "5h ago" },
  { icon: UserPlus, color: "text-violet-600 bg-violet-50 dark:bg-violet-950", text: "Maria Khan signed up via email", time: "6h ago" },
];

const quickStats = [
  { label: "Tasks completed today", value: "128" },
  { label: "New workspaces", value: "14" },
  { label: "Emails sent", value: "342" },
  { label: "Churn rate", value: "2.7%" },
];

// ─── CUSTOM TOOLTIP ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-md">
      <p className="mb-1 text-xs font-medium text-foreground">{label}</p>
      <p className="text-xs text-violet-600">
        {payload[0].value} signups
      </p>
    </div>
  );
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

const Dashboard = () => {
  return (
    <div className="space-y-6">

      {/* Page title */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Overview</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Welcome back — here's what's happening today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-border bg-background p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
                  <p className="mt-1.5 text-2xl font-semibold text-foreground">{s.value}</p>
                </div>
                <div className={cn("rounded-lg p-2.5", s.iconBg)}>
                  <Icon className={cn("size-5", s.iconColor)} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                {s.up
                  ? <TrendingUp className="size-3.5 text-emerald-500" />
                  : <TrendingDown className="size-3.5 text-red-500" />}
                <span className={cn("text-xs font-medium", s.up ? "text-emerald-600" : "text-red-500")}>
                  {s.change}
                </span>
                <span className="text-xs text-muted-foreground">{s.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick stats strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {quickStats.map((q) => (
          <div key={q.label} className="rounded-xl border border-border bg-background px-4 py-3 text-center">
            <p className="text-lg font-semibold text-foreground">{q.value}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{q.label}</p>
          </div>
        ))}
      </div>

      {/* Chart + Recent Users */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* ── Area chart ── */}
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">User signups</h2>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <p className="mb-5 text-xs text-muted-foreground">329 total signups this week</p>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={weeklySignups}
              margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
            >
              {/* gradient fill */}
              <defs>
                <linearGradient id="signupGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-border"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-muted-foreground"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-muted-foreground"
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#7c3aed", strokeWidth: 1, strokeDasharray: "4 4" }} />

              <Area
                type="monotone"
                dataKey="signups"
                stroke="#7c3aed"
                strokeWidth={2}
                fill="url(#signupGradient)"
                dot={{ fill: "#7c3aed", strokeWidth: 2, r: 3, stroke: "#fff" }}
                activeDot={{ r: 5, fill: "#7c3aed", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent users */}
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Recent users</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">Latest signups across all plans</p>
            </div>
            <Link href="/dashboard/users" className="flex items-center gap-1 text-xs text-violet-600 hover:underline">
              View all <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentUsers.map((u) => (
              <div key={u.email} className="flex items-center gap-3 py-2.5">
                <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold", u.color)}>
                  {u.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{u.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                </div>
                <span className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                  u.plan === "Pro"
                    ? "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
                    : "bg-muted text-muted-foreground"
                )}>
                  {u.plan}
                </span>
                <span className="shrink-0 text-[10px] text-muted-foreground">{u.joined}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity feed */}
      <div className="rounded-xl border border-border bg-background p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Recent activity</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Platform-wide events in real time</p>
          </div>
          <Link href="/dashboard/activity" className="flex items-center gap-1 text-xs text-violet-600 hover:underline">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {activity.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} className="flex items-center gap-3 py-3">
                <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full", a.color)}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <p className="flex-1 text-sm text-foreground">{a.text}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;