"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail, Lock, User } from "lucide-react";
import BackgroundGradient from "@/app/ui/background-gradient";
import Input from "@/app/ui/Input";
import { FcGoogle } from "react-icons/fc";
import MainLogo from "../../components/MainLogo";

const passwordRules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
];

export default function RegisterPage() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: call your register API here
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="relative min-h-screen px-4 py-6">
      <div className="w-full max-w-7xl mx-auto">
        <MainLogo/>
      </div>
      <BackgroundGradient />
      <div className="p-4 w-full max-w-sm mx-auto mt-6 lg:mt-10">
        <div className="mb-4">
          <h1 className="text-2xl lg:text-3xl font-semibold text-foreground">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Free forever. No credit card needed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-4">
            <Input label="Full Name" className="border-primary!" type="text" placeholder="Awais Faryad" leftIcon={<User className="size-4" />} required />
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

          <button
            type="submit"
            disabled={loading}
            className="gradient flex w-full mt-8 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Create account
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={() => setGoogleLoading(true)}
          disabled={googleLoading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-background py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 disabled:opacity-60"
        >
          {googleLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FcGoogle className="size-4.5"/>
          )}
          Continue with Google
        </button>

        <p className="mt-2 text-center text-xs text-muted-foreground">
          By signing up you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">Terms</Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">Privacy policy</Link>.
        </p>

        <p className="mt-2 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
