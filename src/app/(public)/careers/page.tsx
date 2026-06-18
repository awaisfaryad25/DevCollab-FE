import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";

const roles = [
  {
    title: "Senior Full-Stack Engineer",
    team: "Engineering",
    type: "Full-time",
    location: "Remote",
    href: "/careers/senior-fullstack",
  },
  {
    title: "Product Designer",
    team: "Design",
    type: "Full-time",
    location: "Remote",
    href: "/careers/product-designer",
  },
  {
    title: "DevOps Engineer",
    team: "Infrastructure",
    type: "Full-time",
    location: "Remote",
    href: "/careers/devops",
  },
];

const perks = [
  "100% remote — work from anywhere",
  "Competitive salary + equity",
  "Flexible hours — async by default",
  "Home office budget ($1,000)",
  "Learning & conference budget",
  "Health coverage",
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-muted/40 px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-[#010066]">
            Careers
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            Build the tool builders use
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            We're a small, fully remote team on a mission to make software teams
            10× more effective. If that sounds like your kind of problem, read on.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="px-4 py-20">
        <div className="w-full max-w-11/12 md:max-w-10/13 mx-auto">
          <h2 className="mb-8 text-2xl font-semibold text-foreground">Why DevCollab</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm text-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[#010066] text-xs">✓</span>
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Open roles */}
      <section className="border-t border-border bg-muted/40 px-4 py-20">
        <div className="w-full max-w-11/12 md:max-w-10/13 mx-auto">
          <h2 className="mb-8 text-2xl font-semibold text-foreground">Open roles</h2>
          <div className="space-y-4">
            {roles.map((role) => (
              <Link
                key={role.title}
                href={role.href}
                className="group flex items-center justify-between rounded-xl border border-border bg-background p-5 transition-shadow hover:shadow-md"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-[#010066]">
                    {role.title}
                  </p>
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[#010066]">
                      {role.team}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {role.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {role.location}
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-[#010066]" />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Don't see your role?{" "}
            <Link href="/contact" className="text-[#010066] hover:underline">
              Send us a message
            </Link>{" "}
            — we're always interested in exceptional people.
          </p>
        </div>
      </section>
    </main>
  );
}
