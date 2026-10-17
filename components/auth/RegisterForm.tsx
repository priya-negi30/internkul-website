"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { POPULAR_TOPICS, DEFAULT_SUGGESTED_TOPICS } from "@/data/topics";
import { useAuth } from "@/context/AuthContext";
import { useCourses } from "@/context/CourseContext";
import { cn } from "@/lib/utils";
import {
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Search,
  X,
  Plus,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function RegisterForm() {
  const { registerStudent, connectWithGoogle, googleProfile, disconnectGoogle } = useAuth();
  const { publishedCourses } = useCourses();
  const availableCourses = publishedCourses;

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [email, setEmail] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [selectedCourseSlug, setSelectedCourseSlug] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [searchTopic, setSearchTopic] = useState("");

  // Validation & UI State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registeredProfileId, setRegisteredProfileId] = useState("");

  // Handle Google Connect
  const handleGoogleConnect = async () => {
    try {
      const gUser = await connectWithGoogle();
      setFirstName(gUser.firstName);
      setLastName(gUser.lastName);
      setEmail(gUser.email);
      // Clear personal detail errors
      setErrors((prev) => {
        const next = { ...prev };
        delete next.firstName;
        delete next.email;
        return next;
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDisconnectGoogle = () => {
    disconnectGoogle();
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  // Find selected course metadata
  const selectedCourse = useMemo(() => {
    return availableCourses.find((t) => t.slug === selectedCourseSlug);
  }, [availableCourses, selectedCourseSlug]);

  // Dynamically prioritize suggested topics based on selected course
  const dynamicSuggestedTopics = useMemo(() => {
    if (!selectedCourseSlug) {
      return DEFAULT_SUGGESTED_TOPICS;
    }
    // Filter topics that match this course
    const courseMatching = POPULAR_TOPICS.filter((t) =>
      t.courseSlugs.includes(selectedCourseSlug)
    ).map((t) => t.name);

    // Merge with general topics without duplicates
    const combined = Array.from(new Set([...courseMatching, ...DEFAULT_SUGGESTED_TOPICS]));
    return combined.slice(0, 16);
  }, [selectedCourseSlug]);

  // Filtered topics based on search input
  const filteredSearchTopics = useMemo(() => {
    if (!searchTopic.trim()) return [];
    const query = searchTopic.toLowerCase().trim();
    return POPULAR_TOPICS.filter(
      (t) =>
        t.name.toLowerCase().includes(query) && !selectedTopics.includes(t.name)
    ).map((t) => t.name);
  }, [searchTopic, selectedTopics]);

  // Topic add/remove helpers
  const handleAddTopic = (topic: string) => {
    const trimmed = topic.trim();
    if (!trimmed) return;
    if (selectedTopics.includes(trimmed)) return;
    setSelectedTopics((prev) => [...prev, trimmed]);
    setSearchTopic("");
    if (errors.topics) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.topics;
        return next;
      });
    }
  };

  const handleRemoveTopic = (topic: string) => {
    setSelectedTopics((prev) => prev.filter((t) => t !== topic));
  };

  // Form Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Phone validation (Indian 10-digit number)
    const cleanPhone = phone.replace(/[\s-]/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = "Please enter a valid 10-digit Indian mobile number (e.g. 9826012345)";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // Permanent address validation
    if (!permanentAddress.trim()) {
      newErrors.permanentAddress = "Permanent address is required";
    }

    // Course validation
    if (!selectedCourseSlug) {
      newErrors.course = "Please select the course you're interested in";
    }

    // Minimum 3 Topics validation
    if (selectedTopics.length < 3) {
      newErrors.topics = "Please select at least 3 topics to continue.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const courseName = selectedCourse ? selectedCourse.name : selectedCourseSlug;
      const profile = await registerStudent({
        firstName,
        lastName: lastName.trim() || undefined,
        email,
        phone,
        countryCode,
        permanentAddress: permanentAddress.trim(),
        interestedCourseSlug: selectedCourseSlug,
        interestedCourseName: courseName,
        interestedTopics: selectedTopics,
        authMethod: googleProfile ? "google" : "manual",
        avatarUrl: googleProfile?.avatarUrl,
      });

      setRegisteredProfileId(profile.id);
      setRegistrationSuccess(true);
    } catch (err) {
      console.error(err);
      setErrors({ form: err instanceof Error && err.message ? err.message : "Failed to create account. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Confirmation Screen
  if (registrationSuccess) {
    return (
      <div className="rounded-2xl border border-[#D8E5FF] bg-white p-8 sm:p-12 shadow-card max-w-2xl mx-auto space-y-8 animate-fadeIn">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F9F6E] flex items-center justify-center mx-auto shadow-soft">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F9F6E] font-semibold">
              REGISTRATION COMPLETE
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#172033] mt-2">
              Welcome, {firstName}!
            </h2>
            <p className="text-sm text-[#64748B] max-w-md mx-auto mt-1 font-sans">
              Your student learning account has been activated. We&apos;ve saved your learning goals and course preference.
            </p>
          </div>
        </div>

        {/* Student Credential Summary */}
        <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4 text-xs font-sans">
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#E2E8F0] gap-2">
            <div>
              <span className="text-[#64748B] text-[11px] uppercase font-semibold">Student ID</span>
              <div className="font-mono text-sm font-bold text-[#193B8F]">{registeredProfileId}</div>
            </div>
            <div className="text-right">
              <span className="text-[#64748B] text-[11px] uppercase font-semibold">Authentication</span>
              <div className="font-semibold text-[#0F9F6E]">
                {googleProfile ? "Google Verified" : "Mobile Verified"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[#64748B] text-[11px] uppercase font-semibold">Selected Course</span>
              <div className="text-sm font-bold text-[#172033] mt-0.5 font-editorial">
                {selectedCourse?.name || selectedCourseSlug}
              </div>
              <div className="text-[#64748B] text-[11px] mt-0.5">
                {selectedCourse?.domainLabel} • Live Instructor Sessions
              </div>
            </div>

            <div>
              <span className="text-[#64748B] text-[11px] uppercase font-semibold">Contact Info</span>
              <div className="text-xs text-[#172033] font-medium mt-0.5">
                {countryCode} {phone}
              </div>
              <div className="text-xs text-[#64748B] truncate">{email}</div>
            </div>
          </div>

          <div>
            <span className="text-[#64748B] text-[11px] uppercase font-semibold block mb-2">
              Interested Learning Topics ({selectedTopics.length})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedTopics.map((top) => (
                <span
                  key={top}
                  className="px-2.5 py-1 rounded-md bg-[#EEF4FF] border border-[#D8E5FF] text-[11px] font-mono font-medium text-[#193B8F]"
                >
                  ✓ {top}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Certificate and Orientation Notice */}
        <div className="p-4 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-xs text-[#193B8F] flex items-start gap-2.5 font-sans">
          <ShieldCheck className="w-4 h-4 text-[#3157D5] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Next Step:</strong> You will receive a WhatsApp message and email with your cohort orientation date, Discord community access, and GitHub starter repository. All courses award verifiable completion certificates from <strong>Aon Digicon LLP</strong>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link
            href="/profile"
            className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl bg-[#3157D5] text-white font-sans text-xs font-semibold hover:bg-[#193B8F] transition-all text-center shadow-sm"
          >
            Go to Student Dashboard →
          </Link>
          <Link
            href={`/tracks/${selectedCourseSlug}`}
            className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl bg-white border border-[#CBD5E1] text-[#172033] font-sans text-xs font-semibold hover:bg-[#F8FAFC] transition-all text-center shadow-soft"
          >
            Explore Course Curriculum
          </Link>
        </div>
      </div>
    );
  }

  // Active Registration Form View
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-10 shadow-card max-w-2xl mx-auto space-y-8 font-sans">
      {/* Step Roadmap */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9] text-xs">
        <span className="font-mono text-xs uppercase text-[#3157D5] font-bold">
          Account Setup
        </span>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#64748B]">
          <span className="text-[#3157D5] font-semibold">01. Account</span>
          <span>→</span>
          <span className={selectedCourseSlug ? "text-[#3157D5] font-semibold" : ""}>
            02. Course
          </span>
          <span>→</span>
          <span
            className={
              selectedTopics.length >= 3 ? "text-[#0F9F6E] font-semibold" : ""
            }
          >
            03. Interests
          </span>
          <span>→</span>
          <span>04. Start</span>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#172033]">
          Start Your Learning Journey
        </h1>
        <p className="text-sm text-[#64748B] leading-relaxed">
          Create your account and tell us what you want to learn.
        </p>
      </div>

      {/* 1. Google One-Click Auth */}
      <div className="space-y-3">
        {googleProfile ? (
          <div className="p-3.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-white border border-[#A7F3D0] flex items-center justify-center font-bold text-[#0F9F6E]">
                ✓
              </span>
              <div>
                <div className="font-semibold text-[#172033]">
                  Connected as {googleProfile.fullName}
                </div>
                <div className="text-[#64748B] text-[11px]">{googleProfile.email}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDisconnectGoogle}
              className="text-xs text-rose-600 hover:underline font-medium"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleGoogleConnect}
            className="w-full py-3 px-4 rounded-xl border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] hover:border-[#94A3B8] transition-all flex items-center justify-center gap-3 text-xs font-semibold text-[#172033] shadow-soft group"
          >
            {/* Google SVG */}
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
        )}

        {googleProfile && (
          <div className="p-2.5 rounded-lg bg-[#EEF4FF] border border-[#D8E5FF] text-[11px] text-[#193B8F] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#3157D5] shrink-0" />
            <span>
              Google authenticated! Please select your interested course & at least 3 topics below.
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="border-t border-[#E2E8F0] w-full" />
        <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-[#94A3B8] font-semibold absolute">
          {googleProfile ? "Confirm Contact Details" : "Or Register Manually"}
        </span>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#172033]">
              First Name *
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (errors.firstName) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.firstName;
                    return next;
                  });
                }
              }}
              placeholder="Enter your first name"
              className={cn(
                "w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-[#172033] focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft",
                errors.firstName ? "border-rose-400 bg-rose-50/20" : "border-[#CBD5E1]"
              )}
            />
            {errors.firstName && (
              <span className="text-xs text-rose-500 block">{errors.firstName}</span>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#172033]">
              Last Name <span className="text-[#94A3B8] font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-xs text-[#172033] focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft"
            />
          </div>
        </div>

        {/* Contact Details Row: Mobile + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Mobile Number */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#172033]">
              Mobile Number *
            </label>
            <div className="flex gap-2">
              <div className="w-20 px-2.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#172033] font-mono font-medium flex items-center justify-center shrink-0">
                🇮🇳 {countryCode}
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.phone;
                      return next;
                    });
                  }
                }}
                placeholder="10-digit mobile number"
                className={cn(
                  "w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-[#172033] focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft",
                  errors.phone ? "border-rose-400 bg-rose-50/20" : "border-[#CBD5E1]"
                )}
              />
            </div>
            {errors.phone && (
              <span className="text-xs text-rose-500 block">{errors.phone}</span>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#172033]">
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.email;
                    return next;
                  });
                }
              }}
              placeholder="e.g. rahul@example.com"
              className={cn(
                "w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-[#172033] focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft",
                errors.email ? "border-rose-400 bg-rose-50/20" : "border-[#CBD5E1]"
              )}
            />
            {errors.email && (
              <span className="text-xs text-rose-500 block">{errors.email}</span>
            )}
          </div>
        </div>

        {/* Permanent Address */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#172033]">
            Permanent Address *
          </label>
          <textarea
            rows={3}
            value={permanentAddress}
            onChange={(e) => {
              setPermanentAddress(e.target.value);
              if (errors.permanentAddress) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.permanentAddress;
                  return next;
                });
              }
            }}
            placeholder="Enter your complete postal address (Flat / House no, Street, City, State, PIN code)"
            className={cn(
              "w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-[#172033] focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft resize-none",
              errors.permanentAddress ? "border-rose-400 bg-rose-50/20" : "border-[#CBD5E1]"
            )}
          />
          {errors.permanentAddress && (
            <span className="text-xs text-rose-500 block">{errors.permanentAddress}</span>
          )}
        </div>

        {/* 2. Interested Course Dropdown */}
        <div className="space-y-1.5 pt-2 border-t border-[#F1F5F9]">
          <label className="block text-xs font-semibold text-[#172033] flex items-center justify-between">
            <span>Interested Course *</span>
            <span className="text-[11px] text-[#64748B] font-normal">
              Populated from active 2026 offerings
            </span>
          </label>
          <select
            value={selectedCourseSlug}
            onChange={(e) => {
              setSelectedCourseSlug(e.target.value);
              if (errors.course) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.course;
                  return next;
                });
              }
            }}
            className={cn(
              "w-full px-3.5 py-3 rounded-xl bg-white border text-xs text-[#172033] focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft",
              errors.course ? "border-rose-400 bg-rose-50/20" : "border-[#CBD5E1]"
            )}
          >
            <option value="">Select the course you&apos;re interested in</option>
            {availableCourses.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name} ({t.domainLabel})
              </option>
            ))}
          </select>
          {errors.course && (
            <span className="text-xs text-rose-500 block">{errors.course}</span>
          )}

          {selectedCourse && (
            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569] flex items-center justify-between">
              <span className="truncate">{selectedCourse.summary}</span>
              <span className="font-mono text-[11px] text-[#3157D5] font-semibold shrink-0 ml-2">
                [{selectedCourse.domainLabel}]
              </span>
            </div>
          )}
        </div>

        {/* 3. Interested Topics Section */}
        <div className="space-y-3 pt-2 border-t border-[#F1F5F9]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div>
              <h3 className="text-sm font-bold text-[#172033]">
                What do you want to learn?
              </h3>
              <p className="text-xs text-[#64748B]">
                Select at least 3 topics you&apos;re interested in.
              </p>
            </div>

            {/* Live Counter */}
            <div className="self-start sm:self-auto">
              {selectedTopics.length >= 3 ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold text-[#0F9F6E] bg-[#ECFDF5] border border-[#A7F3D0]">
                  ✓ {selectedTopics.length} of 3 topics selected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium text-amber-700 bg-amber-50 border border-amber-200">
                  {selectedTopics.length} of 3 topics selected (Min. 3 required)
                </span>
              )}
            </div>
          </div>

          {/* Selected Topics Chips Container */}
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] min-h-[50px] flex flex-wrap gap-2 items-center shadow-soft">
            {selectedTopics.length === 0 ? (
              <span className="text-xs text-[#94A3B8] italic">
                No topics selected yet. Click from the suggestions below or search.
              </span>
            ) : (
              selectedTopics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EEF4FF] border border-[#D8E5FF] text-xs font-mono font-semibold text-[#193B8F] shadow-sm animate-fadeIn"
                >
                  <span>{topic}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTopic(topic)}
                    className="hover:text-rose-600 transition-colors"
                    title={`Remove ${topic}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))
            )}
          </div>

          {errors.topics && (
            <div className="text-xs text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.topics}</span>
            </div>
          )}

          {/* Topic Search & Add Tag Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchTopic.trim()) {
                  e.preventDefault();
                  handleAddTopic(searchTopic);
                }
              }}
              placeholder="Search or type a topic (e.g. React, Python, SQL) and press Enter..."
              className="w-full pl-10 pr-20 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-xs text-[#172033] focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft"
            />
            {searchTopic.trim() && (
              <button
                type="button"
                onClick={() => handleAddTopic(searchTopic)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#3157D5] text-white text-[11px] font-semibold hover:bg-[#193B8F] transition-all"
              >
                Add Topic
              </button>
            )}

            {/* Filtered Dropdown results */}
            {filteredSearchTopics.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-white border border-[#CBD5E1] rounded-xl shadow-lg p-2 max-h-48 overflow-y-auto space-y-1">
                {filteredSearchTopics.map((match) => (
                  <button
                    key={match}
                    type="button"
                    onClick={() => handleAddTopic(match)}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs hover:bg-[#EEF4FF] hover:text-[#3157D5] flex items-center justify-between transition-colors"
                  >
                    <span>{match}</span>
                    <Plus className="w-3.5 h-3.5 text-[#3157D5]" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Suggested Topic Experience */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] flex items-center justify-between">
              <span>
                {selectedCourseSlug ? "Recommended for your selected course:" : "Choose topics you're interested in:"}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {dynamicSuggestedTopics.map((top) => {
                const isSelected = selectedTopics.includes(top);
                return (
                  <button
                    key={top}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        handleRemoveTopic(top);
                      } else {
                        handleAddTopic(top);
                      }
                    }}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1",
                      isSelected
                        ? "bg-[#3157D5] text-white font-semibold shadow-sm"
                        : "bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] hover:bg-white hover:border-[#CBD5E1]"
                    )}
                  >
                    <span>{top}</span>
                    {isSelected ? (
                      <X className="w-3 h-3" />
                    ) : (
                      <Plus className="w-3 h-3 opacity-60" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Global Error Notice if any */}
        {errors.form && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errors.form}</span>
          </div>
        )}

        {/* Primary Submit Button */}
        <div className="pt-4 border-t border-[#F1F5F9] space-y-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl bg-[#3157D5] text-white text-xs font-sans font-semibold hover:bg-[#193B8F] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Creating Your Account...</span>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Register & Start Learning</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-[#64748B] leading-relaxed max-w-md mx-auto">
            Your information is handled securely and used only for relevant registration and enrollment purposes, in accordance with our{" "}
            <Link href="/contact" className="underline hover:text-[#172033]">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </form>

      {/* Trust & Messaging Section */}
      <div className="pt-6 border-t border-[#F1F5F9] text-center space-y-3">
        <div className="text-xs font-sans font-semibold text-[#172033]">
          Build skills. Work on real projects. Learn with industry guidance.
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#64748B]">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9F6E]" />
            Live interactive sessions
          </span>
          <span className="text-[#CBD5E1]">•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9F6E]" />
            Side-by-side practical coding
          </span>
          <span className="text-[#CBD5E1]">•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9F6E]" />
            Aon Digicon LLP certification
          </span>
        </div>
      </div>
    </div>
  );
}
