// components/hero/Hero.tsx
import Link from "next/link";
import { Zap, ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="relative overflow-hidden px-4 py-24 text-center md:py-36">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-120 w-200 rounded-full bg-[#010066]/70 opacity-40 blur-3xl dark:bg-[#010066]/20" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-[#010066] dark:border-[#010066]">
          <Zap className="h-3 w-3" />
          Real-time collaboration for dev teams
        </span>

        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
          Ship faster,{" "}
          <span className="text-[#010066]">together</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          DevCollab gives your team projects, tasks, real-time chat, and
          analytics in one place. No more switching between five tools.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/auth/register"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#010066] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#010066]/50 sm:w-auto"
          >
            Start for free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#how-it-works"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent sm:w-auto"
          >
            See how it works
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Free forever · No credit card required · Setup in 2 minutes
        </p>
      </div>

      {/* Dashboard preview */}
      <div className="relative mx-auto mt-16 max-w-5xl">
        <div className="overflow-hidden rounded-xl border border-border bg-muted shadow-2xl shadow-violet-100 dark:shadow-violet-900/20">
          {/* Fake browser bar */}
          <div className="flex items-center gap-2 border-b border-border bg-background px-4 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <div className="ml-4 flex-1 rounded bg-muted px-3 py-1 text-xs text-muted-foreground">
              app.devcollab.io/workspace/dashboard
            </div>
          </div>
          {/* Mock dashboard body */}
          <div className="grid grid-cols-4 gap-0 bg-background p-0">
            {/* Sidebar */}
            <div className="col-span-1 hidden border-r border-border p-4 sm:block">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-[#010066]" />
                <div className="h-3 w-16 rounded bg-muted" />
              </div>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="mb-2 flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-muted" />
                  <div
                    className={cn(
                      "h-2.5 rounded bg-muted",
                      i === 0 ? "w-20 bg-violet-100" : "w-14"
                    )}
                  />
                </div>
              ))}
            </div>
            {/* Main content */}
            <div className="col-span-4 p-4 sm:col-span-3">
              <div className="mb-4 grid grid-cols-3 gap-3">
                {["Total tasks", "In progress", "Completed"].map((l, i) => (
                  <div key={l} className="rounded-lg border border-border bg-muted p-3">
                    <div className="mb-1 text-xs text-muted-foreground">{l}</div>
                    <div className="text-lg font-semibold text-foreground">
                      {["48", "12", "36"][i]}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["To do", "In progress", "Done"].map((col) => (
                  <div key={col} className="rounded-lg border border-border bg-muted p-2">
                    <div className="mb-2 text-xs font-medium text-muted-foreground">
                      {col}
                    </div>
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="mb-1.5 h-8 rounded-md border border-border bg-background"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;