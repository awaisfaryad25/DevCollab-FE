"use client";

import AppSidebar from "./app-sidebar";
import ModeToggle from "./mode-toggle";
import UserNav from "./user-nav";

interface ProtectedLayoutClientProps {
  children: React.ReactNode;
}

export function ProtectedLayoutClient({
  children,
}: ProtectedLayoutClientProps) {

  return (
    <div className="flex h-screen w-full overflow-hidden">
      
      {/* Sidebar */}
      <AppSidebar />

      {/* Right Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Navbar */}
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-sidebar px-4">
          <div className="flex items-center justify-between gap-3">
            <ModeToggle />
            <UserNav />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#F6F8FB] dark:bg-[#F6F8FB] p-4">
          {children}
        </main>
      </div>
    </div>
  );
}