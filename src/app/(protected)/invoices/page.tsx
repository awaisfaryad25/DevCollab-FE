"use client";

import { useState } from "react";
import { Search, Download, MoreHorizontal, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const invoices = [
  { id: "INV-001", user: "Ali Raza", email: "ali@example.com", amount: "$19.00", status: "Paid", date: "Jun 1, 2026", due: "Jun 1, 2026", initials: "AR", color: "bg-violet-100 text-violet-700" },
  { id: "INV-002", user: "Omar Farooq", email: "omar@example.com", amount: "$19.00", status: "Paid", date: "May 15, 2026", due: "May 15, 2026", initials: "OF", color: "bg-orange-100 text-orange-700" },
  { id: "INV-003", user: "Fatima Malik", email: "fatima@example.com", amount: "$19.00", status: "Failed", date: "Jun 1, 2026", due: "Jun 1, 2026", initials: "FM", color: "bg-pink-100 text-pink-700" },
  { id: "INV-004", user: "Hassan Ali", email: "hassan@example.com", amount: "$19.00", status: "Paid", date: "Jun 3, 2026", due: "Jun 3, 2026", initials: "HA", color: "bg-indigo-100 text-indigo-700" },
  { id: "INV-005", user: "Zain Ahmed", email: "zain@example.com", amount: "$19.00", status: "Pending", date: "Jun 10, 2026", due: "Jun 15, 2026", initials: "ZA", color: "bg-amber-100 text-amber-700" },
  { id: "INV-006", user: "Sara Ahmad", email: "sara@example.com", amount: "$19.00", status: "Refunded", date: "May 20, 2026", due: "May 20, 2026", initials: "SA", color: "bg-emerald-100 text-emerald-700" },
];

const statusColors: Record<string, string> = {
  Paid: "bg-emerald-100 text-emerald-700",
  Failed: "bg-red-100 text-red-600",
  Pending: "bg-amber-100 text-amber-700",
  Refunded: "bg-muted text-muted-foreground",
};

const Invoices = () => {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = invoices.filter((inv) => {
    const matchSearch = inv.user.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = invoices.filter(i => i.status === "Paid").length * 19;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Invoices</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{invoices.length} invoices total</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-accent">
          <Download className="h-4 w-4" /> Export
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total collected", value: `$${totalRevenue}.00`, color: "text-emerald-600" },
          { label: "Paid", value: invoices.filter(i => i.status === "Paid").length, color: "text-emerald-600" },
          { label: "Pending", value: invoices.filter(i => i.status === "Pending").length, color: "text-amber-600" },
          { label: "Failed", value: invoices.filter(i => i.status === "Failed").length, color: "text-red-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-background p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={cn("mt-1 text-2xl font-semibold", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search by name or invoice ID..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none" />
        </div>
        <div className="flex gap-2">
          {["All", "Paid", "Pending", "Failed", "Refunded"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={cn("rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                statusFilter === s ? "border-violet-600 bg-violet-600 text-white" : "border-border bg-background text-foreground hover:bg-accent"
              )}>{s}</button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {["Invoice", "Customer", "Amount", "Status", "Date", "Due date", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono text-xs font-medium text-foreground">{inv.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={cn("flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold", inv.color)}>{inv.initials}</div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{inv.user}</p>
                        <p className="text-xs text-muted-foreground">{inv.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">{inv.amount}</td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", statusColors[inv.status])}>{inv.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{inv.date}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{inv.due}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent"><MoreHorizontal className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {invoices.length}</p>
          <div className="flex items-center gap-1">
            <button disabled className="rounded-md p-1.5 text-muted-foreground hover:bg-accent disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
            <span className="rounded-md bg-violet-600 px-2.5 py-1 text-xs font-medium text-white">1</span>
            <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoices