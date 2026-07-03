// components/rdt-data-table.tsx
"use client";

import Skeleton from "@/app/ui/Skeleton";
import { useTheme } from "next-themes";
import DataTable, { type TableColumn, type TableStyles } from "react-data-table-component";

interface AppDataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClicked?: (row: T) => void;
  pageSize?: number;
}

// Tailwind-ish theme so it matches shadcn styling instead of RDT's defaults
// const customStyles: TableStyles = {
//   headRow: {
//     style: {
//       backgroundColor: "hsl(var(--muted) / 0.5)",
//       borderRadius: "0.75rem 0.75rem 0 0",
//     },
//   },
//   headCells: {
//     style: {
//       fontWeight: 500,
//       color: "hsl(var(--muted-foreground))",
//       fontSize: "0.875rem",
//     },
//   },
//   rows: {
//     style: {
//       fontSize: "0.875rem",
//       borderTopWidth: "1px",
//       borderTopColor: "hsl(var(--border))",
//       // "&:hover": {
//       //   cursor: "pointer",
//       //   backgroundColor: "hsl(var(--muted) / 0.4)",
//       // },
//     },
//   },
//   pagination: {
//     style: {
//       borderTopWidth: "1px",
//       borderTopColor: "hsl(var(--border))",
//       color: "hsl(var(--muted-foreground))",
//     },
//   },
// };

function AppDataTable<T>({
  data,
  columns,
  isLoading,
  emptyMessage = "No data found",
  onRowClicked,
  pageSize = 10,
}: AppDataTableProps<T>) {

  const { resolvedTheme } = useTheme();
  const tableTheme: "default" | "dark" = resolvedTheme === "dark" ? "dark" : "default";

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border">
      <DataTable<T>
        columns={columns}
        data={data}
        pagination
        paginationPerPage={pageSize}
        highlightOnHover
        pointerOnHover
        onRowClicked={onRowClicked}
        theme={tableTheme}
        // customStyles={customStyles}
        noDataComponent={
          <div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
            {emptyMessage}
          </div>
        }
      />
    </div>
  );
}

export default AppDataTable;