"use client";

import { useState } from "react";
import { Search, MoreHorizontal, ChevronLeft, ChevronRight, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchInput from "@/app/ui/search-input";

const projects = [
  { id: "1", name: "DevCollab Web App", workspace: "TechStart PK", owner: "Ali Raza", status: "Active", tasks: 48, completed: 36, plan: "Pro", created: "Jan 15, 2026", color: "bg-violet-100 text-violet-700" },
  { id: "2", name: "Mobile Dashboard", workspace: "CodeHive Team", owner: "Sara Ahmad", status: "Active", tasks: 32, completed: 20, plan: "Pro", created: "Feb 10, 2026", color: "bg-emerald-100 text-emerald-700" },
  { id: "3", name: "API Gateway v2", workspace: "StackBridge", owner: "Omar Farooq", status: "Paused", tasks: 18, completed: 18, plan: "Free", created: "Mar 5, 2026", color: "bg-orange-100 text-orange-700" },
  { id: "4", name: "Landing Page Redesign", workspace: "LaunchPad Studio", owner: "Maria Khan", status: "Completed", tasks: 24, completed: 24, plan: "Pro", created: "Apr 1, 2026", color: "bg-blue-100 text-blue-700" },
  { id: "5", name: "Auth Module", workspace: "BuildFast", owner: "Zain Ahmed", status: "Active", tasks: 15, completed: 8, plan: "Free", created: "May 12, 2026", color: "bg-amber-100 text-amber-700" },
  { id: "6", name: "Payment Integration", workspace: "DevSquad", owner: "Fatima Malik", status: "Active", tasks: 22, completed: 14, plan: "Pro", created: "Jun 3, 2026", color: "bg-pink-100 text-pink-700" },
];

const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Paused: "bg-amber-100 text-amber-700",
  Completed: "bg-blue-100 text-blue-700",
};

const Projects = () => {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = projects.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.workspace.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Projects</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">{projects.length} projects across all workspaces</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search projects or workspaces..."
        />
        <div className="flex gap-2">
          {["All", "Active", "Paused", "Completed"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={cn("rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                statusFilter === s ? "border-primary bg-primary text-white" : "border-border bg-background text-foreground hover:bg-accent"
              )}>{s}</button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {["Project", "Workspace", "Owner", "Progress", "Status", "Plan", "Created", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => {
                const pct = Math.round((p.completed / p.tasks) * 100);
                return (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold", p.color)}>
                          <FolderKanban className="h-3.5 w-3.5" />
                        </div>
                        <span className="font-medium text-foreground">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{p.workspace}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{p.owner}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{pct}%</span>
                      </div>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{p.completed}/{p.tasks} tasks</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", statusColors[p.status])}>{p.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium",
                        p.plan === "Pro" ? "bg-violet-100 text-primary" : "bg-muted text-muted-foreground"
                      )}>{p.plan}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{p.created}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {projects.length}</p>
          <div className="flex items-center gap-1">
            <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent disabled:opacity-40" disabled><ChevronLeft className="h-4 w-4" /></button>
            <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-white">1</span>
            <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects