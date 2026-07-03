"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Search, MoreHorizontal, UserX, Eye, ShieldCheck, Download, ChevronLeft, ChevronRight, X,
  Mail, Calendar, FolderKanban, CreditCard,
} from "lucide-react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

type User = {
  id: string;
  name: string;
  email: string;
  plan: "Pro" | "Free";
  role: "user" | "admin";
  status: "Active" | "Suspended";
  joined: string;
  projects: number;
  initials: string;
  color: string;
  workspace: string;
  lastActive: string;
};

const users: User[] = [
  { id: "1", name: "Ali Raza", email: "ali@example.com", plan: "Pro", role: "user", status: "Active", joined: "Jun 10, 2026", projects: 8, initials: "AR", color: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300", workspace: "TechStart PK", lastActive: "2 min ago" },
  { id: "2", name: "Sara Ahmad", email: "sara@example.com", plan: "Free", role: "user", status: "Active", joined: "Jun 9, 2026", projects: 2, initials: "SA", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", workspace: "CodeHive Team", lastActive: "1 hr ago" },
  { id: "3", name: "Omar Farooq", email: "omar@example.com", plan: "Pro", role: "admin", status: "Active", joined: "Jun 8, 2026", projects: 15, initials: "OF", color: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300", workspace: "StackBridge", lastActive: "3 hr ago" },
  { id: "4", name: "Maria Khan", email: "maria@example.com", plan: "Free", role: "user", status: "Suspended", joined: "Jun 7, 2026", projects: 0, initials: "MK", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300", workspace: "LaunchPad Studio", lastActive: "2 days ago" },
  { id: "5", name: "Zain Ahmed", email: "zain@example.com", plan: "Pro", role: "user", status: "Active", joined: "Jun 6, 2026", projects: 5, initials: "ZA", color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300", workspace: "BuildFast", lastActive: "5 hr ago" },
  { id: "6", name: "Fatima Malik", email: "fatima@example.com", plan: "Free", role: "user", status: "Active", joined: "Jun 5, 2026", projects: 3, initials: "FM", color: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300", workspace: "DevSquad", lastActive: "1 day ago" },
  { id: "7", name: "Hassan Ali", email: "hassan@example.com", plan: "Pro", role: "user", status: "Active", joined: "Jun 4, 2026", projects: 11, initials: "HA", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300", workspace: "TechStart PK", lastActive: "30 min ago" },
  { id: "8", name: "Aisha Noor", email: "aisha@example.com", plan: "Free", role: "user", status: "Suspended", joined: "Jun 3, 2026", projects: 1, initials: "AN", color: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300", workspace: "CodeHive Team", lastActive: "5 days ago" },
];

// ─── BADGES ───────────────────────────────────────────────────────────────────

function PlanBadge({ plan }: { plan: string }) {
  return (
    <span className={cn(
      "rounded-full px-2 py-0.5 text-[10px] font-medium",
      plan === "Pro"
        ? "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
        : "bg-muted text-muted-foreground"
    )}>
      {plan}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn(
      "rounded-full px-2 py-0.5 text-[10px] font-medium",
      status === "Active"
        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
        : "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
    )}>
      {status}
    </span>
  );
}

function RoleBadge({ role }: { role: string }) {
  return (
    <span className={cn(
      "rounded-full px-2 py-0.5 text-[10px] font-medium",
      role === "admin"
        ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-warning"
        : "bg-muted text-muted-foreground"
    )}>
      {role}
    </span>
  );
}

// ─── ROW ACTIONS DROPDOWN ────────────────────────────────────────────────────

function ActionsMenu({ user, onView }: { user: User; onView: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <>
          {/* backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 w-44 rounded-lg border border-border bg-background shadow-lg">
            <button
              onClick={() => { onView(); setOpen(false); }}
              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-accent"
            >
              <Eye className="h-3.5 w-3.5" /> View profile
            </button>
            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-accent">
              <Mail className="h-3.5 w-3.5" /> Send email
            </button>
            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-accent">
              <ShieldCheck className="h-3.5 w-3.5" /> Make admin
            </button>
            <div className="my-1 h-px bg-border" />
            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-danger hover:bg-danger/10 ">
              <UserX className="h-3.5 w-3.5" /> Suspend user
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── USER DETAIL DRAWER ───────────────────────────────────────────────────────

function UserDrawer({ user, onClose }: { user: User; onClose: () => void }) {
  return (
    <>
      {/* backdrop */}
      <div
        className="fixed min-h-screen h-full inset-0 z-90 bg-background/10 backdrop-blur-[2px]"
        onClick={onClose}
      />
      {/* drawer */}
      <div className="fixed right-0 top-0 z-99 h-full w-80 border-l border-border bg-background shadow-xl">
        <div className="flex h-full flex-col">
          {/* header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <h2 className="text-sm font-semibold text-foreground">User profile</h2>
            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* avatar + name */}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className={cn("flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold", user.color)}>
                {user.initials}
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <PlanBadge plan={user.plan} />
                <RoleBadge role={user.role} />
                <StatusBadge status={user.status} />
              </div>
            </div>

            {/* details */}
            <div className="space-y-3">
              {[
                { icon: Calendar, label: "Joined", value: user.joined },
                { icon: FolderKanban, label: "Projects", value: user.projects.toString() },
                { icon: Building2Icon, label: "Workspace", value: user.workspace },
                { icon: Clock, label: "Last active", value: user.lastActive },
                { icon: CreditCard, label: "Plan", value: user.plan },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 rounded-lg bg-muted/40 px-3 py-2.5">
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium text-foreground truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* footer actions */}
          <div className="border-t border-border p-4 space-y-2">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 py-2.5 text-sm font-medium text-white hover:bg-violet-700">
              <Mail className="h-4 w-4" /> Send email
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950">
              <UserX className="h-4 w-4" />
              {user.status === "Active" ? "Suspend user" : "Reactivate user"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Workaround icon refs used inside drawer
import { Building2 as Building2Icon, Clock } from "lucide-react";

const Users = () => {

  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = planFilter === "All" || u.plan === planFilter;
    const matchStatus = statusFilter === "All" || u.status === statusFilter;
    return matchSearch && matchPlan && matchStatus;
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Users</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {users.length} total · {users.filter(u => u.status === "Active").length} active · {users.filter(u => u.plan === "Pro").length} Pro
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-accent">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total users", value: users.length },
          { label: "Active", value: users.filter(u => u.status === "Active").length },
          { label: "Pro plan", value: users.filter(u => u.plan === "Pro").length },
          { label: "Suspended", value: users.filter(u => u.status === "Suspended").length },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-background p-4 text-center">
            <p className="text-xl font-semibold text-foreground">{s.value}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {["All", "Pro", "Free"].map((p) => (
            <button
              key={p}
              onClick={() => setPlanFilter(p)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                planFilter === p
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-background text-foreground hover:bg-accent"
              )}
            >{p}</button>
          ))}
          <div className="h-5 w-px bg-border" />
          {["All", "Active", "Suspended"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                statusFilter === s
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-background text-foreground hover:bg-accent"
              )}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {["User", "Plan", "Role", "Status", "Workspace", "Projects", "Joined", "Last active", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-sm text-muted-foreground">
                    No users found.
                  </td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedUser(u)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold", u.color)}>
                          {u.initials}
                        </div>
                        <div>
                          <p className="font-medium text-foreground whitespace-nowrap">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><PlanBadge plan={u.plan} /></td>
                    <td className="px-4 py-3"><RoleBadge role={u.role} /></td>
                    <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{u.workspace}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{u.projects}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{u.joined}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{u.lastActive}</td>
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <ActionsMenu user={u} onView={() => setSelectedUser(u)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {users.length} users
          </p>
          <div className="flex items-center gap-1">
            <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent disabled:opacity-40" disabled>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-white">1</span>
            <button className="rounded-md px-2.5 py-1 text-xs text-muted-foreground hover:bg-accent">2</button>
            <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* User detail drawer */}
      {selectedUser && (
        <UserDrawer user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  )
}

export default Users