"use client";

import { useState } from "react";
import { Search, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const tasks = [
  { id: "1", title: "Set up Socket.io server", project: "DevCollab Web App", assignee: "Ali Raza", priority: "High", status: "In progress", due: "Jun 20, 2026" },
  { id: "2", title: "Design login page UI", project: "Mobile Dashboard", assignee: "Sara Ahmad", priority: "Medium", status: "Completed", due: "Jun 15, 2026" },
  { id: "3", title: "Integrate Stripe payments", project: "Payment Integration", assignee: "Fatima Malik", priority: "High", status: "In progress", due: "Jun 25, 2026" },
  { id: "4", title: "Write API documentation", project: "API Gateway v2", assignee: "Omar Farooq", priority: "Low", status: "Todo", due: "Jun 30, 2026" },
  { id: "5", title: "Fix mobile responsiveness", project: "Landing Page Redesign", assignee: "Maria Khan", priority: "Medium", status: "Completed", due: "Jun 10, 2026" },
  { id: "6", title: "Implement JWT refresh token", project: "Auth Module", assignee: "Zain Ahmed", priority: "High", status: "Todo", due: "Jun 22, 2026" },
  { id: "7", title: "Set up CI/CD pipeline", project: "DevCollab Web App", assignee: "Hassan Ali", priority: "Medium", status: "In progress", due: "Jun 28, 2026" },
  { id: "8", title: "Add dark mode support", project: "Mobile Dashboard", assignee: "Aisha Noor", priority: "Low", status: "Todo", due: "Jul 5, 2026" },
];

const priorityColors: Record<string, string> = {
  High: "bg-danger/10 text-danger",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-emerald-100 text-emerald-700",
};

const statusColors: Record<string, string> = {
  "In progress": "bg-primary/10 text-primary",
  Completed: "bg-success/10 text-success",
  Todo: "bg-muted text-muted-foreground",
};


const Tasks = () => {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const filtered = tasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.assignee.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    const matchPriority = priorityFilter === "All" || t.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Tasks</h1>
        <p className="mt-0.5 text-sm ">{tasks.length} tasks across all projects</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Todo", count: tasks.filter(t => t.status === "Todo").length, color: "text-muted-foreground" },
          { label: "In progress", count: tasks.filter(t => t.status === "In progress").length, color: "text-blue-600" },
          { label: "Completed", count: tasks.filter(t => t.status === "Completed").length, color: "text-emerald-600" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-background p-4 text-center">
            <p className={cn("text-2xl font-semibold", s.color)}>{s.count}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search tasks or assignees..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", "Todo", "In progress", "Completed"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={cn("rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                statusFilter === s ? "border-primary bg-primary text-white" : "border-border bg-background text-foreground hover:bg-accent"
              )}>{s}</button>
          ))}
          <div className="h-6 w-px bg-border self-center" />
          {["All", "High", "Medium", "Low"].map((p) => (
            <button key={p} onClick={() => setPriorityFilter(p)}
              className={cn("rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                priorityFilter === p ? "border-primary bg-primary text-white" : "border-border bg-background text-foreground hover:bg-accent"
              )}>{p}</button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {["Task", "Project", "Assignee", "Priority", "Status", "Due date", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{t.title}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{t.project}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{t.assignee}</td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", priorityColors[t.priority])}>{t.priority}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", statusColors[t.status])}>{t.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{t.due}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {tasks.length}</p>
          <div className="flex items-center gap-1">
            <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent disabled:opacity-40" disabled><ChevronLeft className="size-4" /></button>
            <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-white">1</span>
            <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent"><ChevronRight className="size-4" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks