"use client";

import { useState } from "react";
import {
  Download,
  FileText,
  Users,
  CreditCard,
  CheckSquare,
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronDown,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const summaryCards = [
  { label: "Total users", value: "2,841", change: "+12%", up: true, icon: Users, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "Monthly revenue", value: "$9,240", change: "+21%", up: true, icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Tasks completed", value: "1,284", change: "+34%", up: true, icon: CheckSquare, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Churn rate", value: "2.7%", change: "-0.4%", up: false, icon: TrendingDown, color: "text-amber-600", bg: "bg-amber-50" },
];

const userReport = [
  { month: "Jan", signups: 120, active: 98, churned: 4 },
  { month: "Feb", signups: 185, active: 160, churned: 8 },
  { month: "Mar", signups: 142, active: 130, churned: 6 },
  { month: "Apr", signups: 210, active: 195, churned: 10 },
  { month: "May", signups: 198, active: 180, churned: 7 },
  { month: "Jun", signups: 284, active: 261, churned: 12 },
];

const revenueReport = [
  { month: "Jan", revenue: 4200, refunds: 38, net: 4162 },
  { month: "Feb", revenue: 5100, refunds: 57, net: 5043 },
  { month: "Mar", revenue: 4800, refunds: 19, net: 4781 },
  { month: "Apr", revenue: 6200, refunds: 76, net: 6124 },
  { month: "May", revenue: 7400, refunds: 95, net: 7305 },
  { month: "Jun", revenue: 9240, refunds: 114, net: 9126 },
];

const taskReport = [
  { month: "Jan", created: 320, completed: 280, overdue: 18 },
  { month: "Feb", created: 410, completed: 370, overdue: 22 },
  { month: "Mar", created: 385, completed: 340, overdue: 15 },
  { month: "Apr", created: 490, completed: 445, overdue: 28 },
  { month: "May", created: 520, completed: 480, overdue: 19 },
  { month: "Jun", created: 610, completed: 570, overdue: 24 },
];

const availableReports = [
  {
    id: "users",
    title: "User growth report",
    desc: "Monthly signups, active users, and churn breakdown.",
    icon: Users,
    color: "text-violet-600",
    bg: "bg-violet-50",
    formats: ["CSV", "PDF"],
  },
  {
    id: "revenue",
    title: "Revenue report",
    desc: "Monthly revenue, refunds, and net earnings from Stripe.",
    icon: CreditCard,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    formats: ["CSV", "PDF"],
  },
  {
    id: "tasks",
    title: "Task completion report",
    desc: "Tasks created, completed, and overdue per month.",
    icon: CheckSquare,
    color: "text-blue-600",
    bg: "bg-blue-50",
    formats: ["CSV", "PDF"],
  },
  {
    id: "subscriptions",
    title: "Subscription report",
    desc: "Pro plan signups, cancellations, and MRR trend.",
    icon: TrendingUp,
    color: "text-amber-600",
    bg: "bg-amber-50",
    formats: ["CSV"],
  },
];

const maxBar = (data: number[]) => Math.max(...data);

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────

function BarChart({
  data,
  keys,
  colors,
  height = 120,
}: {
  data: Record<string, any>[];
  keys: { key: string; color: string; label: string }[];
  height?: number;
}) {
  const allValues = keys.flatMap((k) => data.map((d) => d[k.key] as number));
  const max = Math.max(...allValues);

  return (
    <div>
      {/* Legend */}
      <div className="mb-3 flex flex-wrap items-center gap-4">
        {keys.map((k) => (
          <div key={k.key} className="flex items-center gap-1.5">
            <div className={cn("h-2.5 w-2.5 rounded-sm", k.color)} />
            <span className="text-xs text-muted-foreground">{k.label}</span>
          </div>
        ))}
      </div>
      {/* Bars */}
      <div className="flex items-end gap-1" style={{ height }}>
        {data.map((row) => (
          <div key={row.month} className="flex flex-1 flex-col items-center gap-0.5">
            <div className="flex w-full items-end gap-0.5" style={{ height: height - 18 }}>
              {keys.map((k) => (
                <div
                  key={k.key}
                  className={cn("flex-1 rounded-t-sm transition-all hover:opacity-80 cursor-pointer", k.color)}
                  style={{ height: `${((row[k.key] as number) / max) * (height - 18)}px` }}
                  title={`${k.label}: ${row[k.key]}`}
                />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground">{row.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExportButton({ reportId, format }: { reportId: string; format: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleExport = () => {
    setLoading(true);
    // TODO: call /api/v1/reports/:id/export?format=csv|pdf
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    }, 1200);
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className={cn(
        "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-60",
        done
          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
          : "border-border bg-background text-foreground hover:bg-accent"
      )}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : done ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : (
        <Download className="h-3.5 w-3.5" />
      )}
      {done ? "Downloaded!" : `Export ${format}`}
    </button>
  );
}


const Reports = () => {

  const [dateRange, setDateRange] = useState("6M");
  const [activeReport, setActiveReport] = useState("users");

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Reports</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Platform-wide data reports — exportable as CSV or PDF.
          </p>
        </div>
        {/* Date range selector */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
            {["1M", "3M", "6M", "1Y"].map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                  dateRange === r
                    ? "bg-violet-600 text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary cards */}
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
              <div className="mt-3 flex items-center gap-1.5">
                {c.up
                  ? <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  : <TrendingDown className="h-3.5 w-3.5 text-red-500" />}
                <span className={cn("text-xs font-medium", c.up ? "text-emerald-600" : "text-red-500")}>{c.change}</span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report tabs */}
      <div className="flex gap-1 border-b border-border">
        {availableReports.map((r) => {
          const Icon = r.icon;
          return (
            <button
              key={r.id}
              onClick={() => setActiveReport(r.id)}
              className={cn(
                "flex items-center gap-2 shrink-0 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                activeReport === r.id
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{r.title.replace(" report", "")}</span>
            </button>
          );
        })}
      </div>

      {/* Active report content */}
      {activeReport === "users" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">User growth report</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Monthly signups, active users, and churn</p>
              </div>
              <div className="flex items-center gap-2">
                <ExportButton reportId="users" format="CSV" />
                <ExportButton reportId="users" format="PDF" />
              </div>
            </div>
            <BarChart
              data={userReport}
              keys={[
                { key: "signups", color: "bg-violet-400", label: "Signups" },
                { key: "active", color: "bg-emerald-400", label: "Active" },
                { key: "churned", color: "bg-red-300", label: "Churned" },
              ]}
              height={160}
            />
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-border bg-background">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {["Month", "New signups", "Active users", "Churned", "Churn rate"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {userReport.map((row) => (
                  <tr key={row.month} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{row.month}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{row.signups}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{row.active}</td>
                    <td className="px-4 py-3 text-sm text-red-500">{row.churned}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {((row.churned / row.signups) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border bg-muted/40">
                  <td className="px-4 py-3 text-xs font-semibold text-foreground">Total</td>
                  <td className="px-4 py-3 text-xs font-semibold text-foreground">{userReport.reduce((a, r) => a + r.signups, 0)}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-foreground">{userReport.reduce((a, r) => a + r.active, 0)}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-red-500">{userReport.reduce((a, r) => a + r.churned, 0)}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">—</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {activeReport === "revenue" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Revenue report</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Monthly revenue, refunds, and net earnings</p>
              </div>
              <div className="flex items-center gap-2">
                <ExportButton reportId="revenue" format="CSV" />
                <ExportButton reportId="revenue" format="PDF" />
              </div>
            </div>
            <BarChart
              data={revenueReport}
              keys={[
                { key: "revenue", color: "bg-emerald-400", label: "Revenue" },
                { key: "refunds", color: "bg-red-300", label: "Refunds" },
                { key: "net", color: "bg-violet-400", label: "Net" },
              ]}
              height={160}
            />
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-background">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {["Month", "Gross revenue", "Refunds", "Net revenue", "MoM growth"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {revenueReport.map((row, i) => {
                  const prev = revenueReport[i - 1];
                  const growth = prev ? (((row.net - prev.net) / prev.net) * 100).toFixed(1) : null;
                  return (
                    <tr key={row.month} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{row.month}</td>
                      <td className="px-4 py-3 text-sm text-emerald-600 font-medium">${row.revenue.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-red-500">-${row.refunds}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">${row.net.toLocaleString()}</td>
                      <td className="px-4 py-3 text-xs">
                        {growth ? (
                          <span className={cn("font-medium", Number(growth) >= 0 ? "text-emerald-600" : "text-red-500")}>
                            {Number(growth) >= 0 ? "+" : ""}{growth}%
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t border-border bg-muted/40">
                  <td className="px-4 py-3 text-xs font-semibold text-foreground">Total</td>
                  <td className="px-4 py-3 text-xs font-semibold text-emerald-600">${revenueReport.reduce((a, r) => a + r.revenue, 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-red-500">-${revenueReport.reduce((a, r) => a + r.refunds, 0)}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-foreground">${revenueReport.reduce((a, r) => a + r.net, 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">—</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {activeReport === "tasks" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Task completion report</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Tasks created, completed, and overdue per month</p>
              </div>
              <div className="flex items-center gap-2">
                <ExportButton reportId="tasks" format="CSV" />
                <ExportButton reportId="tasks" format="PDF" />
              </div>
            </div>
            <BarChart
              data={taskReport}
              keys={[
                { key: "created", color: "bg-blue-400", label: "Created" },
                { key: "completed", color: "bg-emerald-400", label: "Completed" },
                { key: "overdue", color: "bg-red-300", label: "Overdue" },
              ]}
              height={160}
            />
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-background">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {["Month", "Created", "Completed", "Overdue", "Completion rate"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {taskReport.map((row) => (
                  <tr key={row.month} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{row.month}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{row.created}</td>
                    <td className="px-4 py-3 text-sm text-emerald-600 font-medium">{row.completed}</td>
                    <td className="px-4 py-3 text-sm text-red-500">{row.overdue}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{ width: `${((row.completed / row.created) * 100).toFixed(0)}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {((row.completed / row.created) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border bg-muted/40">
                  <td className="px-4 py-3 text-xs font-semibold text-foreground">Total</td>
                  <td className="px-4 py-3 text-xs font-semibold text-foreground">{taskReport.reduce((a, r) => a + r.created, 0)}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-emerald-600">{taskReport.reduce((a, r) => a + r.completed, 0)}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-red-500">{taskReport.reduce((a, r) => a + r.overdue, 0)}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">—</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {activeReport === "subscriptions" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Subscription report</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Pro plan signups, cancellations, and MRR</p>
              </div>
              <ExportButton reportId="subscriptions" format="CSV" />
            </div>
            <BarChart
              data={[
                { month: "Jan", new: 18, cancelled: 2, mrr: 4200 / 19 },
                { month: "Feb", new: 24, cancelled: 3, mrr: 5100 / 19 },
                { month: "Mar", new: 20, cancelled: 4, mrr: 4800 / 19 },
                { month: "Apr", new: 31, cancelled: 2, mrr: 6200 / 19 },
                { month: "May", new: 38, cancelled: 5, mrr: 7400 / 19 },
                { month: "Jun", new: 46, cancelled: 6, mrr: 9240 / 19 },
              ]}
              keys={[
                { key: "new", color: "bg-violet-400", label: "New Pro" },
                { key: "cancelled", color: "bg-red-300", label: "Cancelled" },
              ]}
              height={160}
            />
          </div>

          {/* KPI cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Current MRR", value: "$8,322", sub: "438 active Pro subs × $19" },
              { label: "Annual run rate", value: "$99,864", sub: "MRR × 12" },
              { label: "Avg. sub lifetime", value: "8.4 months", sub: "Based on churn rate 2.7%" },
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-border bg-background p-5">
                <p className="text-xs text-muted-foreground">{k.label}</p>
                <p className="mt-1.5 text-2xl font-semibold text-foreground">{k.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{k.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All reports download section */}
      <div className="rounded-xl border border-border bg-background p-5">
        <h2 className="mb-4 text-sm font-semibold text-foreground">Download all reports</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {availableReports.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.id} className="flex items-center gap-3 rounded-lg border border-border bg-background p-4">
                <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", r.bg)}>
                  <Icon className={cn("h-5 w-5", r.color)} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{r.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{r.desc}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  {r.formats.map((f) => (
                    <ExportButton key={f} reportId={r.id} format={f} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  )
}

export default Reports