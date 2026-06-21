"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
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
          <h1 className="text-2xl lg:text-3xl font-semibold">
            Welcome back!
          </h1>
          <p className="mt-1 text-sm ">
            Log in to your DevCollab account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-4">
            <Input label="Email" className="border-primary!" type="email" placeholder="you@example.com" leftIcon={<Mail className="size-4" />} required />
            <Input
              label="Password"
              type={show ? "text" : "password"}
              placeholder="••••••••"
              className="border-primary!"
              leftIcon={<Lock className="size-4" />}
              rightIcon={show ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              onRightIconClick={() => setShow(!show)}
            />
          </div>
          <div className="text-sm text-end text-primary">
            <Link href="/forgot-password" className="hover:underline">Forgot Password?</Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="gradient flex w-full mt-8 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-60"
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
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-primary bg-background py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accen hover:bg-primary/10 disabled:opacity-60"
        >
          {googleLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FcGoogle className="size-4.5"/>
          )}
          Continue with Google
        </button>

        {/* Sign up link */}
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
