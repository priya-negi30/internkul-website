"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  LogOut,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  UserPlus,
  MapPin,
} from "lucide-react";

export default function StudentProfilePage() {
  const router = useRouter();
  const { student, isLoggedIn, logout } = useAuth();

  if (!isLoggedIn || !student) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 font-sans">
        <div className="w-16 h-16 rounded-2xl bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] flex items-center justify-center mx-auto shadow-soft">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="font-editorial text-3xl font-bold text-[#172033]">
            No Active Student Profile Found
          </h1>
          <p className="text-sm text-[#64748B]">
            You have not registered your learning profile yet. Register now to choose your course and tell us what you want to learn.
          </p>
        </div>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3157D5] text-white text-xs font-semibold hover:bg-[#193B8F] shadow-sm transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register Yourself →</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F9F6E] font-semibold">
              STUDENT LEARNING DASHBOARD
            </span>
            <span className="text-xs text-[#64748B]">Active 2026 Profile</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#172033] mt-2">
            Welcome, {student.firstName}!
          </h1>
        </div>

        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:text-rose-600 hover:border-rose-200 transition-colors shadow-soft"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Student ID Card */}
        <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white shadow-card space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3157D5] to-[#193B8F] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {student.firstName[0]}
            </div>
            <div>
              <div className="font-bold text-base text-[#172033]">
                {student.fullName}
              </div>
              <div className="font-mono text-xs text-[#3157D5] font-semibold">
                {student.id}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-[#F1F5F9] text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#3157D5] shrink-0" />
              <span>{student.countryCode} {student.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#3157D5] shrink-0" />
              <span className="truncate">{student.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0F9F6E] shrink-0" />
              <span>{student.authMethod === "google" ? "Google Connected" : "Mobile Verified"}</span>
            </div>
            {student.permanentAddress && (
              <div className="flex items-start gap-2 pt-1 border-t border-[#F1F5F9]">
                <MapPin className="w-4 h-4 text-[#3157D5] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{student.permanentAddress}</span>
              </div>
            )}
          </div>
        </div>

        {/* Middle & Right Column: Enrolled Course & Learning Interests */}
        <div className="md:col-span-2 space-y-6">
          {/* Enrolled Course */}
          <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <span className="text-xs uppercase tracking-wider text-[#64748B] font-semibold">
                Primary Course Interest
              </span>
              <span className="text-xs font-mono font-medium text-[#0F9F6E] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                ENROLLED
              </span>
            </div>

            <div>
              <h2 className="font-editorial text-2xl font-bold text-[#172033]">
                {student.interestedCourseName}
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                Live instructor-led cohorts • Side-by-side practical coding • Production capstone
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Link
                href={`/tracks/${student.interestedCourseSlug}`}
                className="text-xs font-semibold text-[#3157D5] hover:underline flex items-center gap-1"
              >
                <span>View Full Course Syllabus & Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Selected Topics */}
          <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <span className="text-xs uppercase tracking-wider text-[#64748B] font-semibold">
                What You Want to Learn ({student.interestedTopics.length} Topics Selected)
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {student.interestedTopics.map((top) => (
                <span
                  key={top}
                  className="px-3 py-1 rounded-lg bg-[#EEF4FF] border border-[#D8E5FF] text-xs font-mono font-semibold text-[#193B8F]"
                >
                  ✓ {top}
                </span>
              ))}
            </div>
          </div>

          {/* Academic & Certificate Notice */}
          <div className="p-4 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-xs text-[#193B8F] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#3157D5] shrink-0 mt-0.5" />
            <div>
              <strong>Institutional Certification Guarantee:</strong> Upon completion of your live sessions and capstone project, you receive a cryptographically authenticated completion certificate and letter of recommendation issued by <strong>Aon Digicon LLP</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
