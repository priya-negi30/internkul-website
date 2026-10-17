"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useCourses, ManagedCourse, CourseStatus } from "@/context/CourseContext";
import { CohortDuration, DomainCategory, Track } from "@/types";
import { AdminPanel } from "@/components/admin/AdminUI";

const durations: CohortDuration[] = ["10D", "20D", "30D", "45D"];

const blankTrack = (): ManagedCourse => ({
  slug: "",
  name: "",
  shortName: "",
  domain: "fullstack",
  domainLabel: "Full Stack & Mobile",
  summary: "",
  detailedDescription: "",
  technologies: [],
  primaryStack: [],
  targetDegrees: ["BCA", "MCA", "BE", "B.Tech"],
  featured: false,
  status: "draft",
  availableBatches: ["07:30_AM", "02:00_PM", "06:00_PM", "08:30_PM"],
  durationOptions: {
    "1D": {
      duration: "1D",
      days: 1,
      label: "1 Day Workshop",
      tierName: "Starter Workshop",
      sessions: 1,
      labHours: 3,
      priceINR: 99,
      originalPriceINR: 499,
      discountPercent: 80,
      academicSupportEligible: false,
      lorEligible: false,
      ppoEligible: false,
      features: ["Certificate of Attendance"],
      synopsisPages: 0,
    },
    "10D": {
      duration: "10D",
      days: 10,
      label: "10 Days",
      tierName: "Skill Sprint",
      sessions: 10,
      labHours: 20,
      priceINR: 999,
      originalPriceINR: 2499,
      discountPercent: 60,
      academicSupportEligible: false,
      lorEligible: false,
      ppoEligible: false,
      features: ["Certificate of Completion", "Mini project"],
      synopsisPages: 0,
    },
    "20D": {
      duration: "20D",
      days: 20,
      label: "20 Days",
      tierName: "Skill Sprint",
      sessions: 20,
      labHours: 40,
      priceINR: 2499,
      originalPriceINR: 4999,
      discountPercent: 50,
      academicSupportEligible: false,
      lorEligible: false,
      ppoEligible: false,
      features: ["Certificate of Completion", "2 Minor projects"],
      synopsisPages: 0,
    },
    "30D": {
      duration: "30D",
      days: 30,
      label: "30 Days",
      tierName: "Marathon",
      sessions: 30,
      labHours: 60,
      priceINR: 4499,
      originalPriceINR: 8999,
      discountPercent: 50,
      academicSupportEligible: true,
      lorEligible: false,
      ppoEligible: false,
      features: ["Certificate of Completion", "Synopsis Guide"],
      synopsisPages: 10,
    },
    "45D": {
      duration: "45D",
      days: 45,
      label: "45 Days",
      tierName: "Internship Pack",
      sessions: 45,
      labHours: 90,
      priceINR: 6999,
      originalPriceINR: 14999,
      discountPercent: 53,
      academicSupportEligible: true,
      lorEligible: true,
      ppoEligible: true,
      features: ["Certificate of Completion", "Capstone Project", "LOR & PPO Eligibility"],
      synopsisPages: 25,
    },
  },
  capstone: {
    title: "",
    problemStatement: "",
    architecture: "",
    modules: [],
    deploymentTarget: "Production",
    repositoryStructure: "monorepo",
    academicDocReady: true,
  },
  curriculum: {
    "1D": [],
    "10D": [],
    "20D": [],
    "30D": [],
    "45D": [],
  },
});

const inputClass =
  "w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#172033] placeholder:text-[#94A3B8] outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft transition-colors disabled:bg-[#F8FAFC] disabled:text-[#94A3B8] disabled:border-[#E2E8F0]";

const labelClass = "block text-xs font-semibold text-[#172033] mb-1.5";

export default function CourseForm({
  initialCourse,
  editing = false,
}: {
  initialCourse?: ManagedCourse;
  editing?: boolean;
}) {
  const router = useRouter();
  const { addCourse, updateCourse } = useCourses();
  const base = useMemo(
    () => (initialCourse ? (JSON.parse(JSON.stringify(initialCourse)) as ManagedCourse) : blankTrack()),
    [initialCourse]
  );
  const [form, setForm] = useState<ManagedCourse>(base);
  const [technologyText, setTechnologyText] = useState(base.technologies.join(", "));
  const [stackText, setStackText] = useState(base.primaryStack.join(", "));
  const [degreesText, setDegreesText] = useState(base.targetDegrees.join(", "));
  const [curriculumText, setCurriculumText] = useState(JSON.stringify(base.curriculum, null, 2));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof ManagedCourse>(key: K, value: ManagedCourse[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const updatePrice = (
    duration: CohortDuration,
    field: "priceINR" | "originalPriceINR" | "discountPercent" | "sessions" | "days",
    value: number
  ) =>
    setForm((current) => ({
      ...current,
      durationOptions: {
        ...current.durationOptions,
        [duration]: { ...current.durationOptions[duration], [field]: value },
      },
    }));

  const updateBatches = (id: string, checked: boolean) =>
    setForm((current) => ({
      ...current,
      availableBatches: checked
        ? [...new Set([...current.availableBatches, id as ManagedCourse["availableBatches"][number]])]
        : current.availableBatches.filter((item) => item !== id),
    }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!form.name.trim() || !form.slug.trim() || !form.summary.trim()) {
      setError("Course title, slug, and short description are required.");
      return;
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)) {
      setError("Slug must use lowercase letters, numbers, and hyphens only.");
      return;
    }
    for (const duration of durations) {
      const item = form.durationOptions[duration];
      if (item.priceINR < 0 || item.originalPriceINR < 0 || item.priceINR > item.originalPriceINR) {
        setError(`Check pricing for ${item.label}: discounted price cannot exceed original price.`);
        return;
      }
    }
    let curriculum;
    try {
      curriculum = JSON.parse(curriculumText);
      if (!curriculum || typeof curriculum !== "object") throw new Error();
    } catch {
      setError("Curriculum must be valid JSON with duration keys such as 10D, 20D, 30D and 45D.");
      return;
    }
    setSaving(true);
    try {
      const cleaned: ManagedCourse = {
        ...form,
        name: form.name.trim(),
        shortName: form.shortName.trim() || form.name.trim(),
        slug: form.slug.trim(),
        summary: form.summary.trim(),
        detailedDescription: form.detailedDescription.trim(),
        technologies: technologyText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        primaryStack: stackText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        targetDegrees: degreesText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        curriculum,
        updatedAt: new Date().toISOString(),
      };
      if (editing && initialCourse) {
        await updateCourse(initialCourse.slug, cleaned);
      } else {
        await addCourse(cleaned);
      }
      router.push("/admin/courses");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save course.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Storage notice */}
      <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/70 text-xs text-blue-900 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-[#3157D5] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-[#193B8F]">[LIVE API]</span> Changes are saved to the Internkul Laravel API.
          Courses set to <strong>Active</strong> appear on the public website; <strong>Draft</strong> courses stay hidden.
        </div>
      </div>

      {/* Basic Information */}
      <AdminPanel className="p-5 sm:p-7">
        <div className="mb-6">
          <h2 className="text-base sm:text-lg font-bold text-[#172033]">Basic information</h2>
          <p className="text-xs text-[#64748B] mt-1">
            The core information presented on course catalog listings and individual syllabus pages.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Course title *</label>
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. MERN Full-Stack Engineering"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Short title</label>
            <input
              className={inputClass}
              value={form.shortName}
              onChange={(e) => update("shortName", e.target.value)}
              placeholder="e.g. MERN Stack"
            />
          </div>

          <div>
            <label className={labelClass}>URL slug *</label>
            <input
              className={inputClass}
              value={form.slug}
              onChange={(e) =>
                !editing && update("slug", e.target.value.toLowerCase().trim().replace(/\s+/g, "-"))
              }
              disabled={editing}
              required
              placeholder="mern-full-stack"
            />
            <p className="text-[11px] text-[#64748B] mt-1">
              {editing
                ? "Slug is locked to preserve existing course links and bookmarks."
                : "Lowercase alphanumeric characters separated by hyphens."}
            </p>
          </div>

          <div>
            <label className={labelClass}>Category *</label>
            <select
              className={inputClass}
              value={form.domain}
              onChange={(e) => {
                const domain = e.target.value as DomainCategory;
                const labels: Record<DomainCategory, string> = {
                  fullstack: "Full Stack & Mobile",
                  programming: "Programming & Systems",
                  data: "Data & Productivity",
                  advanced: "Advanced Technologies",
                };
                setForm((c) => ({ ...c, domain, domainLabel: labels[domain] }));
              }}
            >
              <option value="fullstack">Full Stack & Mobile</option>
              <option value="programming">Programming & Systems</option>
              <option value="data">Data & Productivity</option>
              <option value="advanced">Advanced Technologies</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Short summary description *</label>
            <textarea
              className={inputClass}
              rows={3}
              value={form.summary}
              onChange={(e) => update("summary", e.target.value)}
              required
              placeholder="A concise summary for catalog cards and search previews."
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Comprehensive course description</label>
            <textarea
              className={inputClass}
              rows={5}
              value={form.detailedDescription}
              onChange={(e) => update("detailedDescription", e.target.value)}
              placeholder="Detailed learning outcomes, prerequisites, target background, and capstone project overview."
            />
          </div>

          <div>
            <label className={labelClass}>Technologies (comma-separated)</label>
            <input
              className={inputClass}
              value={technologyText}
              onChange={(e) => setTechnologyText(e.target.value)}
              placeholder="React, Node.js, Express, MongoDB"
            />
          </div>

          <div>
            <label className={labelClass}>Primary stack (comma-separated)</label>
            <input
              className={inputClass}
              value={stackText}
              onChange={(e) => setStackText(e.target.value)}
              placeholder="REACT, NODE, EXPRESS, MONGO"
            />
          </div>

          <div>
            <label className={labelClass}>Target degrees (comma-separated)</label>
            <input
              className={inputClass}
              value={degreesText}
              onChange={(e) => setDegreesText(e.target.value)}
              placeholder="BCA, MCA, BE, B.Tech, B.Sc."
            />
          </div>

          <div>
            <label className={labelClass}>Publication status</label>
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => update("status", e.target.value as CourseStatus)}
            >
              <option value="active">Active — published in student catalog</option>
              <option value="draft">Draft — hidden from student catalog</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 text-xs font-semibold text-[#172033] cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="accent-[#3157D5] w-4 h-4 rounded"
              />
              <span>Feature this course track prominently on the catalog</span>
            </label>
          </div>
        </div>
      </AdminPanel>

      {/* Duration & Pricing */}
      <AdminPanel className="p-5 sm:p-7">
        <div className="mb-5">
          <h2 className="text-base sm:text-lg font-bold text-[#172033]">Duration & pricing tiers</h2>
          <p className="text-xs text-[#64748B] mt-1">
            Configure each cohort duration tier. Currency values are formatted in Indian Rupees (₹).
          </p>
        </div>

        <div className="space-y-4">
          {durations.map((duration) => {
            const item = form.durationOptions[duration];
            return (
              <div key={duration} className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <b className="text-xs sm:text-sm font-bold text-[#172033]">
                    {item.label || `${item.days} Days Cohort`}
                  </b>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-[#EEF4FF] border border-[#D8E5FF] text-[#193B8F] font-semibold">
                    {duration}
                  </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
                  <div>
                    <label className={labelClass}>Days</label>
                    <input
                      type="number"
                      min={1}
                      className={inputClass}
                      value={item.days}
                      onChange={(e) => updatePrice(duration, "days", Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Sessions</label>
                    <input
                      type="number"
                      min={1}
                      className={inputClass}
                      value={item.sessions}
                      onChange={(e) => updatePrice(duration, "sessions", Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Standard price (₹)</label>
                    <input
                      type="number"
                      min={0}
                      className={inputClass}
                      value={item.originalPriceINR}
                      onChange={(e) => updatePrice(duration, "originalPriceINR", Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Offer price (₹)</label>
                    <input
                      type="number"
                      min={0}
                      className={inputClass}
                      value={item.priceINR}
                      onChange={(e) => updatePrice(duration, "priceINR", Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Discount (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      className={inputClass}
                      value={item.discountPercent}
                      onChange={(e) => updatePrice(duration, "discountPercent", Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AdminPanel>

      {/* Available Batch Timings */}
      <AdminPanel className="p-5 sm:p-7">
        <div className="mb-5">
          <h2 className="text-base sm:text-lg font-bold text-[#172033]">Available batch timings</h2>
          <p className="text-xs text-[#64748B] mt-1">
            Select standard industrial time slots enabled for this course.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { id: "07:30_AM", label: "07:30 AM IST · Early morning batch" },
            { id: "02:00_PM", label: "02:00 PM IST · Flexi afternoon batch" },
            { id: "06:00_PM", label: "06:00 PM IST · Standard evening batch" },
            { id: "08:30_PM", label: "08:30 PM IST · Late night batch" },
          ].map((batch) => (
            <label
              key={batch.id}
              className="flex gap-3 items-center rounded-xl border border-[#E2E8F0] bg-white p-3.5 text-xs font-semibold text-[#172033] hover:border-[#3157D5] hover:bg-[#EEF4FF]/20 shadow-soft transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                className="accent-[#3157D5] w-4 h-4 rounded"
                checked={form.availableBatches.includes(batch.id as (typeof form.availableBatches)[number])}
                onChange={(e) => updateBatches(batch.id, e.target.checked)}
              />
              <span>{batch.label}</span>
            </label>
          ))}
        </div>
        <p className="text-[11px] text-[#64748B] mt-3">
          Exact start dates, seat capacity limits and active statuses are scheduled under the Batches & Timings panel.
        </p>
      </AdminPanel>

      {/* Curriculum & Milestones */}
      <AdminPanel className="p-5 sm:p-7">
        <div className="mb-5">
          <h2 className="text-base sm:text-lg font-bold text-[#172033]">Curriculum & milestones</h2>
          <p className="text-xs text-[#64748B] mt-1">
            Duration-specific syllabus definition in JSON format. Maintain the 10D, 20D, 30D and 45D key structure.
          </p>
        </div>

        <textarea
          className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-4 font-mono text-xs text-[#172033] leading-6 outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft"
          rows={16}
          value={curriculumText}
          onChange={(e) => setCurriculumText(e.target.value)}
          spellCheck={false}
        />
      </AdminPanel>

      {/* Form Error Banner */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700 flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-2">
        <Link
          href="/admin/courses"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#172033] hover:border-[#3157D5] hover:text-[#3157D5] hover:bg-[#F8FAFC] shadow-soft transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel</span>
        </Link>
        <button
          disabled={saving}
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3157D5] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#193B8F] shadow-sm hover:shadow transition-all disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving…" : editing ? "Save course changes" : "Create course"}</span>
        </button>
      </div>
    </form>
  );
}
