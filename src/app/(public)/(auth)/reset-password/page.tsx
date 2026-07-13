"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, CheckCircle2, Lock } from "lucide-react";
import BackgroundGradient from "@/app/ui/background-gradient";
import Input from "@/app/ui/Input";
import MainLogo from "../../components/MainLogo";

export default function ResetPasswordPage() {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const mismatch = confirm.length > 0 && password !== confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return;
    setLoading(true);
    // TODO: call your reset-password API with the token from URL params
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="w-full max-w-7xl mx-auto">
        <MainLogo/>
      </div>
      <BackgroundGradient/>
      <div className="p-4 w-full max-w-sm mx-auto mt-6 lg:mt-20">
        {!done ? (
          <>
            <div className="mb-4">
              <h1 className="text-xl lg:text-2xl xl:text-3xl font-semibold text-foreground">
                Change Password
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Must be at least 8 characters.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="space-y-4">
                <Input
                  label="New Password"
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="border-primary!"
                  leftIcon={<Lock className="size-4" />}
                  rightIcon={show ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                  onRightIconClick={() => setShow(!show)}
                />
                <Input
                  label="Confirm Password"
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="border-primary!"
                  leftIcon={<Lock className="size-4" />}
                  rightIcon={show ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                  onRightIconClick={() => setShow(!show)}
                />
              </div>

              <button
                type="submit"
                disabled={loading || mismatch || password.length < 8}
                className="gradient mt-8 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-white transition-colors  "
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Reset password
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Password updated
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your password has been reset successfully. You can now log in.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white "
            >
              Go to login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
