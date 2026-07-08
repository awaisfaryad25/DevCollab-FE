"use client";

import { useState } from "react";
import { Search, MoreHorizontal, Building2, Users, FolderKanban, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchInput from "@/app/ui/search-input";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const workspaces = [
  { id: "1", name: "TechStart PK", owner: "Ali Raza", ownerEmail: "ali@example.com", members: 24, projects: 18, plan: "Pro", status: "Active", created: "Jan 10, 2026", initials: "TP", color: "bg-violet-100 text-violet-700" },
  { id: "2", name: "CodeHive Team", owner: "Sara Ahmad", ownerEmail: "sara@example.com", members: 18, projects: 12, plan: "Pro", status: "Active", created: "Feb 3, 2026", initials: "CH", color: "bg-emerald-100 text-emerald-700" },
  { id: "3", name: "StackBridge", owner: "Omar Farooq", ownerEmail: "omar@example.com", members: 9, projects: 7, plan: "Free", status: "Active", created: "Mar 14, 2026", initials: "SB", color: "bg-orange-100 text-orange-700" },
  { id: "4", name: "LaunchPad Studio", owner: "Maria Khan", ownerEmail: "maria@example.com", members: 15, projects: 10, plan: "Pro", status: "Suspended", created: "Apr 2, 2026", initials: "LS", color: "bg-blue-100 text-blue-700" },
  { id: "5", name: "BuildFast", owner: "Zain Ahmed", ownerEmail: "zain@example.com", members: 6, projects: 4, plan: "Free", status: "Active", created: "May 20, 2026", initials: "BF", color: "bg-amber-100 text-amber-700" },
  { id: "6", name: "DevSquad", owner: "Fatima Malik", ownerEmail: "fatima@example.com", members: 11, projects: 8, plan: "Pro", status: "Active", created: "Jun 1, 2026", initials: "DS", color: "bg-pink-100 text-pink-700" },
];

const WorkSpaces = () => {

  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = workspaces.filter((w) => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase()) || w.owner.toLowerCase().includes(search.toLowerCase());
    const matchPlan = planFilter === "All" || w.plan === planFilter;
    const matchStatus = statusFilter === "All" || w.status === statusFilter;
    return matchSearch && matchPlan && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Workspaces</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{workspaces.length} total workspaces</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search workspaces..."
        />
        <div className="flex gap-2">
          {["All", "Pro", "Free"].map((p) => (
            <button key={p} onClick={() => setPlanFilter(p)}
              className={cn("rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                planFilter === p ? "border-primary bg-primary text-white" : "border-border bg-background text-foreground hover:bg-accent"
              )}>{p}</button>
          ))}
        </div>
        <div className="flex gap-2">
          {["All", "Active", "Suspended"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={cn("rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                statusFilter === s ? "border-primary bg-primary text-white" : "border-border bg-background text-foreground hover:bg-accent"
              )}>{s}</button>
          ))}
        </div>
      </div>

      {/* Grid cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((w) => (
          <div key={w.id} className="rounded-xl border border-border bg-background p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold", w.color)}>
                  {w.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{w.name}</p>
                  <p className="text-xs text-muted-foreground">{w.ownerEmail}</p>
                </div>
              </div>
              <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-muted/40 p-2.5 text-center">
                <Users className="mx-auto mb-1 h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-semibold text-foreground">{w.members}</p>
                <p className="text-[10px] text-muted-foreground">Members</p>
              </div>
              <div className="rounded-lg bg-muted/40 p-2.5 text-center">
                <FolderKanban className="mx-auto mb-1 h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-semibold text-foreground">{w.projects}</p>
                <p className="text-[10px] text-muted-foreground">Projects</p>
              </div>
              <div className="rounded-lg bg-muted/40 p-2.5 text-center">
                <Building2 className="mx-auto mb-1 h-4 w-4 text-muted-foreground" />
                <p className={cn("text-xs font-semibold", w.plan === "Pro" ? "text-violet-600" : "text-muted-foreground")}>{w.plan}</p>
                <p className="text-[10px] text-muted-foreground">Plan</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium",
                w.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
              )}>{w.status}</span>
              <span className="text-[10px] text-muted-foreground">Created {w.created}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Showing {filtered.length} of {workspaces.length}</p>
        <div className="flex items-center gap-1">
          <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent disabled:opacity-40" disabled>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-white">1</span>
          <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WorkSpaces