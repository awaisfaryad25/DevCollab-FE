"use client";

import { useState } from "react";
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SearchInput from "@/app/ui/search-input";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const summaryCards = [
  { label: "Total received", value: "$24,840", change: "+18%", up: true },
  { label: "Total refunded", value: "$380", change: "-2%", up: false },
  { label: "Net revenue", value: "$24,460", change: "+21%", up: true },
  { label: "Transactions", value: "312", change: "+9%", up: true },
];

const transactions = [
  { id: "txn_001", user: "Ali Raza", email: "ali@example.com", initials: "AR", color: "bg-violet-100 text-violet-700", type: "charge", amount: "+$19.00", status: "succeeded", method: "Visa •••• 4242", date: "Jun 14, 2026", time: "10:24 AM" },
  { id: "txn_002", user: "Sara Ahmad", email: "sara@example.com", initials: "SA", color: "bg-emerald-100 text-emerald-700", type: "charge", amount: "+$19.00", status: "succeeded", method: "Mastercard •••• 5678", date: "Jun 14, 2026", time: "09:10 AM" },
  { id: "txn_003", user: "Omar Farooq", email: "omar@example.com", initials: "OF", color: "bg-orange-100 text-orange-700", type: "refund", amount: "-$19.00", status: "refunded", method: "Visa •••• 1234", date: "Jun 13, 2026", time: "03:45 PM" },
  { id: "txn_004", user: "Maria Khan", email: "maria@example.com", initials: "MK", color: "bg-blue-100 text-blue-700", type: "charge", amount: "+$19.00", status: "failed", method: "Visa •••• 9999", date: "Jun 13, 2026", time: "01:20 PM" },
  { id: "txn_005", user: "Zain Ahmed", email: "zain@example.com", initials: "ZA", color: "bg-amber-100 text-amber-700", type: "charge", amount: "+$19.00", status: "succeeded", method: "Mastercard •••• 3344", date: "Jun 12, 2026", time: "11:55 AM" },
  { id: "txn_006", user: "Hassan Ali", email: "hassan@example.com", initials: "HA", color: "bg-indigo-100 text-indigo-700", type: "charge", amount: "+$19.00", status: "succeeded", method: "Visa •••• 7711", date: "Jun 12, 2026", time: "08:30 AM" },
  { id: "txn_007", user: "Fatima Malik", email: "fatima@example.com", initials: "FM", color: "bg-pink-100 text-pink-700", type: "charge", amount: "+$19.00", status: "pending", method: "Mastercard •••• 8822", date: "Jun 11, 2026", time: "06:00 PM" },
  { id: "txn_008", user: "Aisha Noor", email: "aisha@example.com", initials: "AN", color: "bg-rose-100 text-rose-700", type: "refund", amount: "-$19.00", status: "refunded", method: "Visa •••• 5566", date: "Jun 11, 2026", time: "02:15 PM" },
];

const typeIcon: Record<string, React.ReactNode> = {
  charge: <ArrowDownLeft className="h-3.5 w-3.5 text-success" />,
  refund: <ArrowUpRight className="h-3.5 w-3.5 text-danger" />,
};

const statusStyle: Record<string, string> = {
  succeeded: "bg-emerald-100 text-emerald-700",
  failed: "bg-red-100 text-red-600",
  pending: "bg-amber-100 text-amber-700",
  refunded: "bg-muted text-muted-foreground",
};


const Transactions = () => {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = transactions.filter((t) => {
    const matchSearch =
      t.user.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    const matchType = typeFilter === "All" || t.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Transactions</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Stripe payment log for all users.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-accent">
          <Download className="h-4 w-4" /> Export
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((c) => (
          <div key={c.label} className="rounded-xl border border-border bg-background p-5">
            <p className="text-xs text-muted-foreground">{c.label}</p>
            <p className="mt-1.5 text-2xl font-semibold text-foreground">{c.value}</p>
            <div className="mt-2 flex items-center gap-1.5">
              {c.up
                ? <TrendingUp className="h-3.5 w-3.5 text-success" />
                : <TrendingDown className="h-3.5 w-3.5 text-danger" />}
              <span className={cn("text-xs font-medium", c.up ? "text-success" : "text-danger")}>
                {c.change}
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by user or transaction ID..."
        />
        <div className="flex flex-wrap gap-2">
          {["All", "charge", "refund"].map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={cn("rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                typeFilter === t ? "border-primary bg-primary text-white" : "border-border bg-background text-foreground hover:bg-accent"
              )}>{t}</button>
          ))}
          <div className="h-5 w-px self-center bg-border" />
          {["All", "succeeded", "pending", "failed", "refunded"].map((s) => (
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
                {["Transaction ID", "Customer", "Type", "Amount", "Status", "Method", "Date", "Time"].map((h) => (
                  <th key={h} className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">{t.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold", t.color)}>
                        {t.initials}
                      </div>
                      <div>
                        <p className="whitespace-nowrap text-sm font-medium text-foreground">{t.user}</p>
                        <p className="text-xs text-muted-foreground">{t.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 capitalize">
                      {typeIcon[t.type]}
                      <span className="text-xs text-foreground">{t.type}</span>
                    </div>
                  </td>
                  <td className={cn("px-4 py-3 text-sm font-semibold",
                    t.type === "charge" ? "text-success" : "text-danger"
                  )}>{t.amount}</td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium capitalize", statusStyle[t.status])}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{t.method}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{t.date}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {transactions.length}</p>
          <div className="flex items-center gap-1">
            <button disabled className="rounded-md p-1.5 text-muted-foreground hover:bg-accent disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
            <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-white">1</span>
            <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transactions;