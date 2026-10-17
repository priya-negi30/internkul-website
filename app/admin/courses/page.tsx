"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, CirclePlus, Pencil, Search, Trash2, CheckCircle2 } from "lucide-react";
import { useCourses } from "@/context/CourseContext";
import { AdminButton, AdminPageHeading, AdminPanel } from "@/components/admin/AdminUI";

export default function CoursesManagementPage() {
  const { courses, deleteCourse, isReady } = useCourses();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [notice, setNotice] = useState("");

  const filtered = useMemo(
    () =>
      courses.filter(
        (c) =>
          (c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.slug.toLowerCase().includes(query.toLowerCase())) &&
          (status === "all" || c.status === status)
      ),
    [courses, query, status]
  );

  async function remove(slug: string, name: string) {
    if (
      !window.confirm(
        `Delete “${name}”? This also removes its scheduled batches. This action cannot be undone.`
      )
    )
      return;
    try {
      await deleteCourse(slug);
      setNotice(`“${name}” was deleted successfully.`);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Unable to delete the course.");
    }
  }

  return (
    <>
      <AdminPageHeading
        eyebrow="Catalog"
        title="Courses & tracks"
        description="Create, configure, publish, or remove industrial training courses from the Internkul curriculum catalog."
        action={
          <AdminButton href="/admin/courses/new">
            <CirclePlus className="w-4 h-4" />
            <span>Add new course</span>
          </AdminButton>
        }
      />

      <AdminPanel>
        {/* Filters Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row gap-3 bg-[#F8FAFC]/50">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or slug…"
              className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#172033] placeholder:text-[#94A3B8] outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft transition-colors"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#172033] outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft transition-colors"
          >
            <option value="all">All statuses</option>
            <option value="active">Active (Visible)</option>
            <option value="draft">Draft (Hidden)</option>
          </select>
        </div>

        {/* Notice Banner */}
        {notice && (
          <div
            role="status"
            className="mx-4 sm:mx-5 mt-4 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-3 text-xs font-semibold text-[#0F9F6E] flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#0F9F6E]" />
            <span>{notice}</span>
          </div>
        )}

        {/* Courses Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#F8FAFC] text-[11px] font-mono uppercase tracking-wider text-[#64748B] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-5 py-4">Course Track</th>
                <th className="px-5 py-4">Duration Tiers</th>
                <th className="px-5 py-4">Price (Standard / Offer)</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.map((course) => {
                const d =
                  course.durationOptions?.["10D"] ||
                  course.durationOptions?.["45D"] ||
                  Object.values(course.durationOptions || {})[0] || {
                    originalPriceINR: 2499,
                    priceINR: 999,
                  };
                return (
                  <tr key={course.slug} className="hover:bg-[#F8FAFC]/80 transition-colors">
                    <td className="px-5 py-4 min-w-64">
                      <div className="font-bold text-xs sm:text-sm text-[#172033]">
                        {course.name}
                      </div>
                      <div className="text-[11px] font-mono text-[#64748B] mt-0.5">
                        /{course.slug}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                        <span className="inline-block text-[11px] font-mono font-medium text-[#193B8F] bg-[#EEF4FF] border border-[#D8E5FF] px-2 py-0.5 rounded-md">
                          {course.domainLabel}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[#64748B]">
                      10 / 20 / 30 / 45 days
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[#94A3B8] line-through text-xs">
                        ₹{d.originalPriceINR.toLocaleString("en-IN")}
                      </span>
                      <br />
                      <span className="font-bold text-xs sm:text-sm text-[#193B8F]">
                        ₹{d.priceINR.toLocaleString("en-IN")}
                      </span>
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
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          title="Edit course"
                          href={`/admin/courses/${course.slug}/edit`}
                          className="p-2 rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#3157D5] hover:border-[#3157D5] hover:bg-[#EEF4FF] shadow-soft transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          title="Delete course"
                          onClick={() => remove(course.slug, course.name)}
                          className="p-2 rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 shadow-soft transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {!isReady ? (
            <p className="p-10 text-center text-xs text-[#64748B]">
              Loading course catalog…
            </p>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="w-8 h-8 mx-auto text-[#94A3B8] mb-3" />
              <p className="font-semibold text-[#172033] text-sm">
                No courses match your filters
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                Try a different search keyword or status filter.
              </p>
            </div>
          ) : null}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3.5 border-t border-[#E2E8F0] text-xs text-[#64748B] bg-[#F8FAFC]/50 flex flex-wrap items-center justify-between gap-2">
          <span>Showing {filtered.length} of {courses.length} courses</span>
          <span className="font-mono text-[11px] text-[#94A3B8]">Changes persist in client storage</span>
        </div>
      </AdminPanel>
    </>
  );
}
