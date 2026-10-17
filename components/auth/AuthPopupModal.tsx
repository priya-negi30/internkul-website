"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

interface FormErrors {
  firstName?: string;
  phone?: string;
  email?: string;
}

export function AuthPopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  // Check session storage on mount and show modal after a brief delay
  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem("internkul_home_auth_modal_dismissed");
      if (!isDismissed) {
        // Fast transition for immediate appearance on landing
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 250);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback if sessionStorage is disabled
      setIsOpen(true);
    }
  }, []);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Handle escape key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleDismiss = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem("internkul_home_auth_modal_dismissed", "true");
    } catch {
      // Ignore storage errors
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    const cleanPhone = phone.trim().replace(/[\s-]/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Prototype placeholder interaction without pretending real authentication succeeded
      setSubmittedStatus("form");
    }
  };

  const handleGoogleContinue = () => {
    // Prototype placeholder interaction without pretending real authentication succeeded
    setSubmittedStatus("google");
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 bg-[#172033]/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Background click overlay */}
      <div className="fixed inset-0" onClick={handleDismiss} />

      {/* Modal Card */}
      <div className="relative w-full max-w-[440px] bg-white rounded-2xl sm:rounded-3xl border border-[#E2E8F0] shadow-2xl p-6 sm:p-7 z-10 max-h-[92vh] overflow-y-auto">
        {/* Close button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close modal"
          className="absolute right-4 top-4 w-7 h-7 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] hover:text-[#172033] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF4FF] border border-[#D8E5FF] text-[11px] font-mono font-semibold text-[#3157D5] uppercase tracking-wide">
            <Sparkles className="w-3 h-3 text-[#3157D5]" />
            <span>Welcome to internkul</span>
          </span>
        </div>

        {/* Heading & Subtext */}
        <div className="space-y-1 mb-5">
          <h2
            id="auth-modal-title"
            className="text-2xl font-editorial font-bold text-[#172033] leading-snug"
          >
            Welcome to Your Learning Journey
          </h2>
          <p className="text-xs text-[#64748B] font-sans leading-relaxed">
            Create your account to explore courses, training, and internship opportunities.
          </p>
        </div>

        {/* Prototype Feedback Banner */}
        {submittedStatus ? (
          <div className="py-6 text-center space-y-4 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F9F6E] flex items-center justify-center mx-auto shadow-soft">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-editorial text-lg font-bold text-[#172033]">
                {submittedStatus === "google"
                  ? "Google Sign-In Simulation"
                  : "Details Received (UI Prototype)"}
              </h3>
              <p className="text-xs text-[#64748B] max-w-xs mx-auto leading-relaxed">
                {submittedStatus === "google"
                  ? "Demonstration mode: Google OAuth interaction confirmed without external redirect."
                  : `Hello ${firstName}! Registration prototype interaction complete. Explore our live cohorts below.`}
              </p>
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              className="w-full py-2.5 px-4 rounded-xl bg-[#3157D5] text-white text-xs font-semibold hover:bg-[#193B8F] shadow-sm transition-all"
            >
              Explore Courses & Cohorts
            </button>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
            {/* 1. First Name */}
            <div>
              <label
                htmlFor="modal-firstName"
                className="block text-xs font-semibold text-[#172033] mb-1"
              >
                First Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="modal-firstName"
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (errors.firstName) {
                    setErrors((prev) => ({ ...prev, firstName: undefined }));
                  }
                }}
                placeholder="e.g. Rahul"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-[#172033] placeholder:text-[#94A3B8] transition-all focus:outline-none focus:ring-1 ${
                  errors.firstName
                    ? "border-rose-400 focus:border-rose-500 focus:ring-rose-400/20"
                    : "border-[#CBD5E1] focus:border-[#3157D5] focus:ring-[#3157D5]"
                }`}
              />
              {errors.firstName && (
                <div className="flex items-center gap-1 mt-1 text-[11px] text-rose-500">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.firstName}</span>
                </div>
              )}
            </div>

            {/* 2. Last Name (Optional) */}
            <div>
              <label
                htmlFor="modal-lastName"
                className="block text-xs font-semibold text-[#172033] mb-1"
              >
                Last Name <span className="text-[#94A3B8] font-normal">(Optional)</span>
              </label>
              <input
                id="modal-lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-xs text-[#172033] placeholder:text-[#94A3B8] transition-all focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]"
              />
            </div>

            {/* 3. Mobile Number */}
            <div>
              <label
                htmlFor="modal-phone"
                className="block text-xs font-semibold text-[#172033] mb-1"
              >
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-mono font-medium text-[#475569] shrink-0">
                  +91
                </span>
                <input
                  id="modal-phone"
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setPhone(val);
                    if (errors.phone) {
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }
                  }}
                  placeholder="98260 00000"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-[#172033] placeholder:text-[#94A3B8] transition-all focus:outline-none focus:ring-1 ${
                    errors.phone
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-400/20"
                      : "border-[#CBD5E1] focus:border-[#3157D5] focus:ring-[#3157D5]"
                  }`}
                />
              </div>
              {errors.phone && (
                <div className="flex items-center gap-1 mt-1 text-[11px] text-rose-500">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>

            {/* 4. Email Address */}
            <div>
              <label
                htmlFor="modal-email"
                className="block text-xs font-semibold text-[#172033] mb-1"
              >
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="modal-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                placeholder="rahul@example.com"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-[#172033] placeholder:text-[#94A3B8] transition-all focus:outline-none focus:ring-1 ${
                  errors.email
                    ? "border-rose-400 focus:border-rose-500 focus:ring-rose-400/20"
                    : "border-[#CBD5E1] focus:border-[#3157D5] focus:ring-[#3157D5]"
                }`}
              />
              {errors.email && (
                <div className="flex items-center gap-1 mt-1 text-[11px] text-rose-500">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <div className="pt-1.5">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#3157D5] hover:bg-[#193B8F] text-white text-xs font-sans font-semibold transition-all shadow-sm hover:shadow flex items-center justify-center cursor-pointer"
              >
                Continue
              </button>
            </div>

            {/* Divider with OR */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E2E8F0]" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-3 text-[#94A3B8] font-mono font-medium">
                  OR
                </span>
              </div>
            </div>

            {/* Secondary Action: Continue with Google */}
            <button
              type="button"
              onClick={handleGoogleContinue}
              className="w-full py-2.5 px-4 rounded-xl border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] hover:border-[#94A3B8] text-xs font-semibold text-[#172033] transition-all flex items-center justify-center gap-2.5 shadow-soft cursor-pointer"
            >
              {/* Google Brand SVG */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Consent Note */}
            <p className="text-[11px] text-[#94A3B8] text-center font-sans pt-1 leading-relaxed">
              By continuing, you agree to our{" "}
              <Link
                href="/contact"
                className="text-[#64748B] hover:text-[#172033] underline underline-offset-2"
              >
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/contact"
                className="text-[#64748B] hover:text-[#172033] underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
