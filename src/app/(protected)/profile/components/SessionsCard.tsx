"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";

interface Session {
  device: string;
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
}

const initialSessions: Session[] = [
  {
    device: "Chrome on Windows",
    location: "Lahore, Pakistan",
    ip: "111.68.12.45",
    lastActive: "Now · current session",
    current: true,
  },
  {
    device: "Safari on iPhone",
    location: "Lahore, Pakistan",
    ip: "111.68.12.46",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    device: "Chrome on MacBook",
    location: "Karachi, Pakistan",
    ip: "203.135.88.12",
    lastActive: "3 days ago",
    current: false,
  },
];

const SessionsCard = () => {
  const [sessions, setSessions] = useState(initialSessions);

  const revoke = (ip: string) => {
    setSessions((prev) => prev.filter((s) => (s.ip === ip ? false : true)));
  };

  const revokeAll = () => {
    setSessions((prev) => prev.filter((s) => s.current));
  };

  return (
    <div className="p-6 space-y-5 bg-background rounded-xl shadow-md">
      <h3 className="mb-4 text-sm font-semibold text-foreground border-b border-border pb-3">
        Active sessions
      </h3>
      <div className="divide-y divide-border">
        {sessions.map((s) => (
          <div key={s.ip} className="flex items-center justify-between py-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">
                  {s.device}
                </p>
                {s.current && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {s.location} · {s.ip}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {s.lastActive}
              </p>
            </div>
            {!s.current && (
              <button
                onClick={() => revoke(s.ip)}
                className="rounded-lg border border-danger/20! px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/8"
              >
                Revoke
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={revokeAll}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-danger/20! py-2.5 text-sm font-medium text-danger hover:bg-danger/8"
      >
        <LogOut className="h-4 w-4" /> Revoke all other sessions
      </button>
    </div>
  );
};

export default SessionsCard;
