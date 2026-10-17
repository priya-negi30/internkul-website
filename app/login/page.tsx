"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  ShieldCheck,
  AlertCircle,
  Lock,
  Mail,
  UserPlus,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, user, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(user.role === "admin" ? "/admin" : "/profile");
    }
  }, [isLoading, user, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const loggedIn = await login(email, password);
      router.replace(loggedIn.role === "admin" ? "/admin" : "/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-14rem)] bg-[#F8FAFC] flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md mx-auto space-y-6">
        {/* Brand Link */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3157D5] to-[#193B8F] flex items-center justify-center text-white shadow-sm group-hover:shadow transition-shadow">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-editorial text-2xl font-bold tracking-tight text-[#172033] flex items-center gap-1.5 leading-none">
              internkul
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0F9F6E]" />
            </span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-7 sm:p-9 shadow-card">
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold text-[#193B8F] bg-[#EEF4FF] border border-[#D8E5FF]">
                PORTAL ACCESS
              </span>
              <span className="text-xs text-[#64748B]">Single Sign-On</span>
            </div>
            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#172033]">
              Sign in to internkul
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Use the unified sign-in form to access your student learning profile or admin console.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-[#172033]">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#172033] placeholder:text-[#94A3B8] outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-semibold text-[#172033]">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#172033] placeholder:text-[#94A3B8] outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#172033] transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div role="alert" className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-[#3157D5] text-white text-xs sm:text-sm font-sans font-semibold py-3 px-4 flex items-center justify-center gap-2 hover:bg-[#193B8F] shadow-sm hover:shadow transition-all disabled:opacity-60 cursor-pointer"
            >
              <span>{submitting ? "Signing in…" : "Sign in to Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Access notice */}
          <div className="mt-6 rounded-xl border border-[#D8E5FF] bg-[#EEF4FF] p-4 text-xs text-[#475569] space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-[#193B8F]">
              <ShieldCheck className="w-4 h-4 text-[#3157D5]" />
              <span>Admin sign-in</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Admin accounts are created by your Internkul administrator. Students do not need a password:
              just register with your details.
            </p>
          </div>

          {/* New Student Register Link */}
          <div className="mt-6 pt-5 border-t border-[#F1F5F9] text-center">
            <p className="text-xs text-[#64748B]">
              New to internkul?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#3157D5] hover:text-[#193B8F] transition-colors inline-flex items-center gap-1 ml-0.5"
              >
                <span>Register yourself</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
