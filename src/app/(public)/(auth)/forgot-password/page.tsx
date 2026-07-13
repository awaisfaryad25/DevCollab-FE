"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import BackgroundGradient from "@/app/ui/background-gradient";
import Input from "@/app/ui/Input";
import MainLogo from "../../components/MainLogo";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: call your forgot-password API here
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen px-4 py-6">
      <div className="w-full max-w-7xl mx-auto">
        <MainLogo/>
      </div>
      <BackgroundGradient />
      <div className="p-4 w-full max-w-sm mx-auto mt-6 lg:mt-20">
        {!sent ? (
          <>
            <div className="mb-4">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-xl lg:text-2xl xl:text-3xl font-semibold">
                Forgot your password?
              </h1>
              <p className="mt-2 text-sm">
                Enter your email and we'll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <Input label="Email address" 
                  className="border-primary!" type="email" 
                  placeholder="you@example.com" 
                  leftIcon={<Mail className="size-4" />} required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="gradient mt-8 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-60"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Send reset link
              </button>
            </form>

            <div className="mt-2">
              <Link
                href="/login"
                className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5 group-hover:text-primary" />
                Back to login
              </Link>
            </div>
          </>
        ) : (
          /* Success state */
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
              <Mail className="h-6 w-6 text-success" />
            </div>
            <h2 className="text-lg font-semibold">
              Check your inbox
            </h2>
            <p className="mt-2 text-sm">
              We sent a password reset link to{" "}
              <span className="font-medium text-foreground">{email}</span>.
              It expires in 30 minutes.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Didn't get it?{" "}
              <button
                onClick={() => setSent(false)}
                className="text-primary hover:underline"
              >
                Resend
              </button>
            </p>
            <div className="mt-2">
              <Link
                href="/login"
                className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5 group-hover:text-primary" />
                Back to login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
