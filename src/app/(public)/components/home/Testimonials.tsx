// components/testimonials/Testimonials.tsx
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Sara Ahmad",
    role: "Engineering Lead, Fintech PK",
    initials: "SA",
    color: "bg-violet-100 text-violet-700",
    quote:
      "We moved from Jira to DevCollab and cut our weekly standup time in half. The real-time board is genuinely instant.",
  },
  {
    name: "Omar Farooq",
    role: "Product Manager, Techify",
    initials: "OF",
    color: "bg-emerald-100 text-emerald-700",
    quote:
      "Setting up a workspace took five minutes. My team was assigning tasks and chatting before the end of that first meeting.",
  },
  {
    name: "Maria Khan",
    role: "CTO, LaunchPad Studio",
    initials: "MK",
    color: "bg-orange-100 text-orange-700",
    quote:
      "The analytics dashboard alone saved us three hours a week. I can see project health at a glance without pulling anyone into a meeting.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-muted/40 px-4 py-24">
      <div className="w-full max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-violet-600">
            Testimonials
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Teams that made the switch
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map(({ name, role, initials, color, quote }) => (
            <div
              key={name}
              className="flex flex-col gap-4 rounded-xl border border-border bg-background p-6"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                "{quote}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold",
                    color
                  )}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;