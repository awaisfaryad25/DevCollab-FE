"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  BookOpen,
  MessageSquare,
  Mail,
  ExternalLink,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SearchInput from "@/app/ui/search-input";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const faqs = [
  {
    category: "Authentication",
    items: [
      { q: "How does JWT authentication work in DevCollab?", a: "DevCollab uses JSON Web Tokens (JWT). When you log in, the server signs a token with your user ID and a secret key. Your frontend stores this token and sends it in the Authorization header with every protected request. The server verifies it on each request." },
      { q: "How long do sessions last?", a: "Sessions last 7 days by default. You can change this in Settings → Security → Session expiry. After expiry, the user must log in again." },
      { q: "How does Google OAuth work?", a: "Google OAuth is handled via NextAuth.js on the frontend. When a user clicks 'Continue with Google', they authenticate with Google, and we receive their profile (name, email). We either create a new account or log them into their existing one." },
    ],
  },
  {
    category: "Billing & Stripe",
    items: [
      { q: "How are Stripe webhooks verified?", a: "Every webhook from Stripe includes a signature in the stripe-signature header. We use stripe.webhooks.constructEvent() with your webhook secret to verify the signature before processing any payment event. Never process a webhook without verifying it." },
      { q: "What happens when a payment fails?", a: "The transaction is logged with status 'failed'. The user's plan is not upgraded. Stripe will automatically retry the payment 3 times over the following days." },
      { q: "How do I issue a refund?", a: "Go to Transactions → find the charge → click the 3-dot menu → Refund. This triggers a Stripe refund and updates the invoice status to 'refunded'." },
    ],
  },
  {
    category: "Users & Workspaces",
    items: [
      { q: "What is the difference between roles?", a: "Admin can access the admin dashboard, manage all users, view billing, and change settings. User can only access their own workspaces and projects. Viewer (workspace level) can see but not edit projects." },
      { q: "Can I suspend a user without deleting them?", a: "Yes. Go to Users → find the user → click the 3-dot menu → Suspend. This sets isActive to false. The user cannot log in, but their data is preserved. You can reactivate them at any time." },
      { q: "How do I transfer workspace ownership?", a: "Go to Workspaces → open the workspace → Settings → Transfer ownership. Enter the new owner's email. They must be an existing member of the workspace." },
    ],
  },
  {
    category: "Email & Nodemailer",
    items: [
      { q: "Why are emails going to spam?", a: "This usually happens with Gmail SMTP in development. For production, use a transactional email service like Resend, SendGrid, or Postmark. They have proper SPF/DKIM records that tell email providers the mail is legitimate." },
      { q: "How do I test emails locally?", a: "Use Ethereal Email (ethereal.email) — it's a fake SMTP server that captures emails without actually sending them. Use the credentials Nodemailer generates and view emails in the Ethereal inbox." },
      { q: "Can I customize email templates?", a: "Yes. Email templates are plain HTML strings defined in src/utils/sendEmail.js. You can update the HTML, colors, and copy there. In the future, you can move to a templating engine like Handlebars for more flexibility." },
    ],
  },
];

const docs = [
  { title: "API documentation", desc: "Full REST API reference with examples", href: "/api/docs", icon: BookOpen },
  { title: "Auth guide", desc: "JWT, OAuth, and session management", href: "#", icon: BookOpen },
  { title: "Stripe integration", desc: "Payments, webhooks, and subscriptions", href: "#", icon: BookOpen },
  { title: "Socket.io guide", desc: "Real-time events and room management", href: "#", icon: BookOpen },
];


const Help = () => {

  const [search, setSearch] = useState("");
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [contactMsg, setContactMsg] = useState("");
  const [contactSending, setContactSending] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const filteredFaqs = faqs.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  const handleContact = () => {
    if (!contactMsg) return;
    setContactSending(true);
    setTimeout(() => {
      setContactSending(false);
      setContactSent(true);
      setContactMsg("");
      setTimeout(() => setContactSent(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Help & documentation</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          FAQs, guides, and support for DevCollab admins.
        </p>
      </div>

      {/* Search */}
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search FAQs..."
        />

      {/* Quick links */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {docs.map((d) => {
          const Icon = d.icon;
          return (
            <a
              key={d.title}
              href={d.href}
              target={d.href.startsWith("http") ? "_blank" : undefined}
              className="group flex items-start gap-3 rounded-xl border border-border bg-background p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary">{d.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{d.desc}</p>
              </div>
              <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100" />
            </a>
          );
        })}
      </div>

      {/* FAQs */}
      <div className="space-y-6">
        {filteredFaqs.length === 0 ? (
          <div className="rounded-xl border border-border bg-background py-12 text-center text-sm text-muted-foreground">
            No results found for "{search}"
          </div>
        ) : (
          filteredFaqs.map((cat) => (
            <div key={cat.category}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{cat.category}</h2>
              <div className="overflow-hidden rounded-xl border border-border bg-background divide-y divide-border">
                {cat.items.map((item) => {
                  const isOpen = openItem === item.q;
                  return (
                    <div key={item.q}>
                      <button
                        onClick={() => setOpenItem(isOpen ? null : item.q)}
                        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                      >
                        <span className="text-sm font-medium text-foreground">{item.q}</span>
                        {isOpen
                          ? <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                          : <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                        }
                      </button>
                      {isOpen && (
                        <div className="border-t border-border bg-muted/20 px-5 py-4">
                          <p className="text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Contact support */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Send a message</h2>
              <p className="text-xs text-muted-foreground">We reply within 24 hours</p>
            </div>
          </div>
          <textarea
            placeholder="Describe your issue or question..."
            value={contactMsg}
            onChange={(e) => setContactMsg(e.target.value)}
            rows={4}
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            onClick={handleContact}
            disabled={!contactMsg || contactSending}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
          >
            {contactSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
            {contactSending ? "Sending..." : "Send message"}
          </button>
          {contactSent && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-success">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Message sent! We'll get back to you soon.
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border bg-background p-6">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Other resources</h2>
          <div className="space-y-3">
            {[
              { label: "Email support", value: "hello@devcollab.io", icon: Mail },
              { label: "API docs (Swagger)", value: "localhost:5000/api/docs", icon: BookOpen },
              { label: "GitHub repo", value: "github.com/awaisfaryad25/DevCollab-BE", icon: ExternalLink },
            ].map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.label} className="flex items-center gap-3 rounded-lg bg-muted/40 px-3 py-2.5">
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">{r.label}</p>
                    <p className="text-sm font-medium text-foreground">{r.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help