"use client";

import { useState } from "react";
import { Search, UserPlus, CreditCard, ShieldAlert, Building2, LogIn, Trash2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchInput from "@/app/ui/search-input";

const allActivity = [
  { id: 1, type: "signup", icon: UserPlus, color: "text-violet-600 bg-violet-50", user: "Ali Raza", email: "ali@example.com", action: "Signed up via Google OAuth", time: "2m ago", date: "Jun 14, 2026" },
  { id: 2, type: "payment", icon: CreditCard, color: "text-emerald-600 bg-emerald-50", user: "Sara Ahmad", email: "sara@example.com", action: "Upgraded to Pro — $19/mo", time: "14m ago", date: "Jun 14, 2026" },
  { id: 3, type: "security", icon: ShieldAlert, color: "text-red-500 bg-red-50", user: "Unknown", email: "hacker@test.com", action: "Failed login attempt × 3", time: "1h ago", date: "Jun 14, 2026" },
  { id: 4, type: "workspace", icon: Building2, color: "text-blue-600 bg-blue-50", user: "Omar Farooq", email: "omar@example.com", action: "Created workspace 'TechStart PK'", time: "3h ago", date: "Jun 14, 2026" },
  { id: 5, type: "login", icon: LogIn, color: "text-teal-600 bg-teal-50", user: "Zain Ahmed", email: "zain@example.com", action: "Logged in via email", time: "5h ago", date: "Jun 14, 2026" },
  { id: 6, type: "delete", icon: Trash2, color: "text-red-500 bg-red-50", user: "Maria Khan", email: "maria@example.com", action: "Deleted project 'Alpha v2'", time: "6h ago", date: "Jun 13, 2026" },
  { id: 7, type: "settings", icon: Settings, color: "text-amber-600 bg-amber-50", user: "Admin", email: "admin@devcollab.io", action: "Updated SMTP settings", time: "8h ago", date: "Jun 13, 2026" },
  { id: 8, type: "payment", icon: CreditCard, color: "text-emerald-600 bg-emerald-50", user: "Hassan Ali", email: "hassan@example.com", action: "Cancelled Pro subscription", time: "1d ago", date: "Jun 13, 2026" },
  { id: 9, type: "signup", icon: UserPlus, color: "text-violet-600 bg-violet-50", user: "Fatima Malik", email: "fatima@example.com", action: "Signed up via email", time: "1d ago", date: "Jun 13, 2026" },
];

const typeFilters = ["All", "signup", "payment", "security", "workspace", "login", "delete", "settings"];

const Activity = () => {

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = allActivity.filter((a) => {
    const matchSearch =
      a.user.toLowerCase().includes(search.toLowerCase()) ||
      a.action.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || a.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Activity log</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Full audit trail of all platform events.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by user or action..."
        />
        <div className="flex flex-wrap gap-1.5">
          {typeFilters.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                "rounded-lg border px-2.5 py-1 text-xs font-medium capitalize transition-colors",
                typeFilter === t
                  ? "border-violet-600 bg-violet-600 text-white"
                  : "border-border bg-background text-foreground hover:bg-accent"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-border bg-background divide-y divide-border">
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">No activity found.</p>
        ) : (
          filtered.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.id} className="flex items-start gap-4 px-5 py-4 hover:bg-muted/30 transition-colors">
                <div className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full", a.color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{a.user}</span>
                    {" — "}
                    {a.action}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.email}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                  <p className="text-[10px] text-muted-foreground">{a.date}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  )
}

export default Activity