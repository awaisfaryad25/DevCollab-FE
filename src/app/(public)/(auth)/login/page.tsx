"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import BackgroundGradient from "@/app/ui/background-gradient";
import Input from "@/app/ui/Input";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: call your login API here
    setTimeout(() => setLoading(false), 1500);
  };

  const handleGoogle = () => {
    setGoogleLoading(true);
    // TODO: trigger NextAuth Google signIn("google")
    setTimeout(() => setGoogleLoading(false), 1500);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <BackgroundGradient />
      {/* Card */}
      <div className="p-4 w-full max-w-sm mx-auto">
        <div className="mb-4 ">
          <h1 className="text-2xl lg:text-3xl font-semibold text-foreground">
            Welcome back!
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Log in to your DevCollab account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-4">
            <Input label="Email" className="border-violet-500!" type="email" placeholder="you@example.com" leftIcon={<Mail className="size-4" />} required />
            <Input
              label="Password"
              type={show ? "text" : "password"}
              placeholder="••••••••"
              className="border-violet-500!"
              leftIcon={<Lock className="size-4" />}
              rightIcon={show ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              onRightIconClick={() => setShow(!show)}
            />
          </div>
          <div className="text-sm text-end text-violet-600">
            <Link href="/forgot-password" className="hover:underline">Forgot Password?</Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full mt-8 items-center justify-center gap-2 rounded-lg bg-violet-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Log in
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        {/* Google OAuth */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={googleLoading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-violet-500 bg-background py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-60"
        >
          {googleLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          Continue with Google
        </button>




        {/* Sign up link */}
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-violet-600 hover:underline"
          >
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
