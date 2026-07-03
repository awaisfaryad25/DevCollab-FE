// /users/components/column.ts (shared type + data can live in your Users file, imported here)
import { type ColumnDef } from "@tanstack/react-table";
import { type TableColumn } from "react-data-table-component";
import { cn } from "@/lib/utils";

export type User = {
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

// ── TanStack columns ──
export const tanstackUserColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold", row.original.color)}>
          {row.original.initials}
        </div>
        <div>
          <p className="font-medium text-foreground whitespace-nowrap">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  { accessorKey: "plan", header: "Plan", cell: ({ row }) => <PlanBadge plan={row.original.plan} /> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  { accessorKey: "workspace", header: "Workspace" },
  { accessorKey: "projects", header: "Projects" },
  { accessorKey: "joined", header: "Joined" },
];

// ── react-data-table-component columns ──
export const rdtUserColumns: TableColumn<User>[] = [
  {
    name: "User",
    selector: (row) => row.name,
    sortable: true,
    cell: (row) => (
      <div className="flex items-center gap-3 py-1">
        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold", row.color)}>
          {row.initials}
        </div>
        <div>
          <p className="font-medium text-foreground whitespace-nowrap">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      </div>
    ),
  },
  { name: "Plan", selector: (row) => row.plan, sortable: true, cell: (row) => <PlanBadge plan={row.plan} /> },
  { name: "Status", selector: (row) => row.status, sortable: true, cell: (row) => <StatusBadge status={row.status} /> },
  { name: "Workspace", selector: (row) => row.workspace, sortable: true },
  { name: "Projects", selector: (row) => row.projects, sortable: true },
  { name: "Joined", selector: (row) => row.joined, sortable: true },
];