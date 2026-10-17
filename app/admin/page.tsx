"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CirclePlus,
  ClipboardList,
  GraduationCap,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useCourses } from "@/context/CourseContext";
import { adminGetDashboard } from "@/lib/api/admin";
import type { AdminDashboard } from "@/lib/api/types";
import { AdminButton, AdminPageHeading, AdminPanel } from "@/components/admin/AdminUI";

export default function AdminDashboard() {
  const { courses, isReady } = useCourses();
  const [stats, setStats] = useState<AdminDashboard | null>(null);
  const [statsError, setStatsError] = useState("");

  useEffect(() => {
    let cancelled = false;
    adminGetDashboard()
      .then((data) => !cancelled && setStats(data))
      .catch((err) => !cancelled && setStatsError(err instanceof Error ? err.message : "Unable to load dashboard stats."));
    return () => {
      cancelled = true;
    };
  }, []);

  const metrics = [
    {
      label: "Total courses",
      value: stats?.courses.total ?? courses.length,
      note: `${stats?.courses.active ?? courses.filter((c) => c.status === "active").length} active in catalog`,
      icon: BookOpen,
    },
    {
      label: "Total batches",
      value: stats?.batches.scheduled ?? "—",
      note: `${stats?.batches.archived ?? 0} archived`,
      icon: CalendarDays,
    },
    {
      label: "Registered students",
      value: stats?.students.total ?? "—",
      note: "From website registrations",
      icon: GraduationCap,
    },
    {
      label: "Total inquiries",
      value: stats?.inquiries.total ?? "—",
      note: `${stats?.inquiries.new ?? 0} new / unanswered`,
      icon: ClipboardList,
    },
  ];

  return (
    <>
      <AdminPageHeading
        eyebrow="Overview"
        title="Dashboard"
        description="A live operational view of your industrial training tracks, cohorts, and curriculum catalog."
        action={
          <AdminButton href="/admin/courses/new">
            <CirclePlus className="w-4 h-4" />
            <span>Create new course</span>
          </AdminButton>
        }
      />

      {/* Metrics Row */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <AdminPanel key={m.label} className="p-5 sm:p-6 hover-card">
              <div className="flex items-start justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                  {m.label}
                </p>
                <span className="w-10 h-10 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] flex items-center justify-center text-[#3157D5] shadow-soft">
                  <Icon className="w-5 h-5" />
                </span>
              </div>
              <p className="text-3xl font-bold font-editorial text-[#172033] mt-3">
                {isReady || stats ? m.value : "—"}
              </p>
              <p className="text-xs text-[#64748B] mt-1">{m.note}</p>
            </AdminPanel>
          );
        })}
      </div>

      {/* Main 2-Column Section */}
      <div className="grid xl:grid-cols-[1.5fr_1fr] gap-6">
        {/* Recent Courses Table Panel */}
        <AdminPanel>
          <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[#172033] text-base">Recent courses</h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Managed tracks available in the curriculum catalog
              </p>
            </div>
            <Link
              href="/admin/courses"
              className="text-xs font-semibold text-[#3157D5] hover:text-[#193B8F] flex items-center gap-1 transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <tr>
                  <th className="px-5 py-3.5">Course</th>
                  <th className="px-5 py-3.5">Duration</th>
                  <th className="px-5 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {courses.slice(0, 6).map((course) => (
                  <tr key={course.slug} className="hover:bg-[#F8FAFC]/80 transition-colors">
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/courses/${course.slug}/edit`}
                        className="font-semibold text-xs sm:text-sm text-[#172033] hover:text-[#3157D5] transition-colors"
                      >
                        {course.name}
                      </Link>
                      <p className="text-[11px] font-mono text-[#64748B] mt-0.5">
                        /{course.slug}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-[#64748B]">
                      {Object.values(course.durationOptions)
                        .map((d) => d.days)
                        .filter(Boolean)
                        .sort((a, b) => a - b)
                        .join(" / ")}{" "}
                      days
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-mono font-semibold ${
                          course.status === "active"
                            ? "bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F9F6E]"
                            : "bg-amber-50 border border-amber-200 text-amber-700"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            course.status === "active" ? "bg-[#0F9F6E]" : "bg-amber-500"
                          }`}
                        />
                        {course.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {courses.length === 0 && (
              <p className="p-8 text-center text-xs text-[#64748B]">
                No courses yet. Create your first course.
              </p>
            )}
          </div>
        </AdminPanel>

        {/* Right Sidebar Stack */}
        <div className="space-y-5">
          {/* Quick Actions Panel */}
          <AdminPanel className="p-5 sm:p-6">
            <h2 className="font-bold text-[#172033] text-base mb-4">Quick actions</h2>
            <div className="space-y-3">
              <Link
                href="/admin/courses/new"
                className="flex items-center gap-3.5 rounded-xl border border-[#E2E8F0] bg-white p-4 hover:border-[#3157D5] hover:bg-[#EEF4FF]/30 shadow-soft transition-all group"
              >
                <span className="w-10 h-10 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] flex items-center justify-center text-[#3157D5] shrink-0 group-hover:scale-105 transition-transform">
                  <CirclePlus className="w-5 h-5" />
                </span>
                <span className="flex-1 min-w-0">
                  <b className="block text-xs sm:text-sm font-semibold text-[#172033]">
                    Create a course
                  </b>
                  <small className="text-xs text-[#64748B]">
                    Add curriculum, pricing tiers and batch timing options
                  </small>
                </span>
                <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#3157D5] group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/admin/batches"
                className="flex items-center gap-3.5 rounded-xl border border-[#E2E8F0] bg-white p-4 hover:border-[#3157D5] hover:bg-[#EEF4FF]/30 shadow-soft transition-all group"
              >
                <span className="w-10 h-10 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] flex items-center justify-center text-[#3157D5] shrink-0 group-hover:scale-105 transition-transform">
                  <CalendarDays className="w-5 h-5" />
                </span>
                <span className="flex-1 min-w-0">
                  <b className="block text-xs sm:text-sm font-semibold text-[#172033]">
                    Configure batches
                  </b>
                  <small className="text-xs text-[#64748B]">
                    Schedule live timings, start dates and seat limits
                  </small>
                </span>
                <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#3157D5] group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </AdminPanel>

          {/* Live data notice */}
          <AdminPanel className="p-5 border border-[#D8E5FF] bg-[#EEF4FF]/50">
            <div className="flex gap-3 items-start">
              <TrendingUp className="w-5 h-5 text-[#3157D5] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-[#193B8F]">Live API data</h3>
                <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                  {statsError
                    ? statsError
                    : "All figures come from the Internkul Laravel API. Changes you make here are visible on the website immediately."}
                </p>
              </div>
            </div>
          </AdminPanel>
        </div>
      </div>
    </>
  );
}
