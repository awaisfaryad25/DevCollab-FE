"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import {Button} from "@/app/ui/Button";
import TanStackDataTable from "@/app/(protected)/components/tanstack-data-table";
import AppDataTable from "@/app/(protected)/components/app-data-table";
import { tanstackUserColumns, rdtUserColumns, } from "./components/column";

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

const Users = () => {
  const [activeLib, setActiveLib] = useState<"tanstack" | "rdt">("tanstack");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Users</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {users.length} total · {users.filter(u => u.status === "Active").length} active
          </p>
        </div>
        <Button variant="outline" size="md">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Library toggle — using the same reusable Button, pill variant */}
      <div className="flex items-center gap-2">
        <Button
          // variant="pill"
          size="sm"
          // active={activeLib === "tanstack"}
          onClick={() => setActiveLib("tanstack")}
        >
          TanStack Table
        </Button>
        <Button
          size="sm"
          // active={activeLib === "rdt"}
          onClick={() => setActiveLib("rdt")}
        >
          react-data-table-component
        </Button>
      </div>

      {activeLib === "tanstack" ? (
        <TanStackDataTable<User>
          data={users}
          columns={tanstackUserColumns}
          onRowClick={setSelectedUser}
        />
      ) : (
        <AppDataTable<User>
          data={users}
          columns={rdtUserColumns}
          onRowClicked={setSelectedUser}
        />
      )}
    </div>
  );
};

export default Users;