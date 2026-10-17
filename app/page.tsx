import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  GitBranch,
  BookOpen,
  Code2,
  Award,
  ChevronRight,
  Check,
  UserPlus,
} from "lucide-react";
import { MetricRibbon } from "@/components/ui/MetricRibbon";
import { LiveTerminal } from "@/components/ui/LiveTerminal";
import { StatusPill } from "@/components/ui/StatusPill";
import { getTracks } from "@/lib/api/tracks";
import { getBatches } from "@/lib/api/batches";
import { AuthPopupModal } from "@/components/auth/AuthPopupModal";
import { HomeCourseShowcase } from "@/components/home/HomeCourseShowcase";
import { Track, BatchTiming } from "@/types";

export default async function HomePage() {
  let tracks: Track[] = [];
  let batches: BatchTiming[] = [];

  try {
    const [liveTracks, liveBatches] = await Promise.all([
      getTracks(),
      getBatches(),
    ]);
    if (liveTracks && liveTracks.length > 0) tracks = liveTracks;
    if (liveBatches && liveBatches.length > 0) batches = liveBatches;
  } catch (err) {
    console.error("HomePage: Failed to fetch live backend resources:", err);
  }
  return (
    <div className="w-full flex flex-col space-y-0">
      {/* Homepage Login / Register Popup Modal */}
      <AuthPopupModal />

      {/* 1. HERO SECTION (White / Soft Glow Background) */}
      <section className="relative pt-16 sm:pt-24 pb-20 bg-white border-b border-[#E2E8F0] overflow-hidden">
        {/* Subtle background educational glow and pattern */}
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="absolute inset-0 bg-edu-pattern opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
            {/* Left Column: Standalone Avatar Cutout Sticker */}
            <div className="order-2 lg:order-1 lg:col-span-5 flex items-center justify-center lg:justify-start">
              <div className="relative h-[360px] sm:h-[440px] md:h-[480px] lg:h-[520px] xl:h-[560px] aspect-[1310/1536] max-w-full select-none drop-shadow-[0_16px_36px_rgba(25,59,143,0.10)]">
                <Image
                  src="/images/avatar.png"
                  alt="internkul Student Engineer Avatar"
                  fill
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 440px, 520px"
                  className="object-contain pointer-events-none"
                  priority
                />
              </div>
            </div>

            {/* Right Column: Hero Editorial & Academic Content */}
            <div className="order-1 lg:order-2 lg:col-span-7 text-center lg:text-left space-y-6">
              {/* Academic badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4FF] border border-[#D8E5FF] text-xs font-sans font-semibold text-[#3157D5] shadow-soft">
                <span className="w-2 h-2 rounded-full bg-[#0F9F6E]" />
                <span>LIVE TECHNICAL TRAINING & INTERNSHIP ACROSS DIVERSE DISCIPLINES</span>
                <span className="text-[#CBD5E1]">•</span>
                <span className="font-mono text-[11px] text-[#193B8F]">[2026 COHORTS]</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[46px] xl:text-[54px] 2xl:text-6xl font-editorial font-bold text-[#172033] tracking-tight leading-[1.12]">
                Build skills that work in the real world.
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Industrial Training & Internship programs for <strong className="text-[#172033]">students and graduates from diverse academic backgrounds, including BCA, MCA, B.Tech, BE, B.Com, BBA, B.Sc., and other disciplines</strong>. Practical engineering cohorts with side-by-side debugging, production deployments, academic documentation, and verified letters of recommendation.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/tracks"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#3157D5] text-white font-sans text-xs font-semibold hover:bg-[#193B8F] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                >
                  <span>[ Explore Courses ]</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/register"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#172033] font-sans text-xs font-semibold hover:text-[#3157D5] hover:border-[#3157D5] hover:bg-[#F8FAFC] shadow-soft transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4 text-[#3157D5]" />
                  <span>[ Register Yourself ]</span>
                </Link>
              </div>

              {/* The 5-Step Academic Journey Visual Concept: Internkul Learning Model */}
              <div className="pt-8 border-t border-[#F1F5F9]">
                <div className="text-xs uppercase tracking-wider text-[#64748B] font-semibold mb-3">
                  The internkul Learning Model: Learn live → Practice side-by-side → Resolve doubts → Apply → Reach the goal
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 text-xs font-sans">
                  <span className="px-3 py-1 rounded-lg bg-[#EEF4FF] text-[#3157D5] font-semibold border border-[#D8E5FF]">
                    01. Live Session
                  </span>
                  <span className="text-[#CBD5E1]">→</span>
                  <span className="px-3 py-1 rounded-lg bg-[#F8FAFC] text-[#172033] font-semibold border border-[#E2E8F0]">
                    02. Side-by-Side Practice
                  </span>
                  <span className="text-[#CBD5E1]">→</span>
                  <span className="px-3 py-1 rounded-lg bg-[#F8FAFC] text-[#172033] font-semibold border border-[#E2E8F0]">
                    03. Doubt Resolution
                  </span>
                  <span className="text-[#CBD5E1]">→</span>
                  <span className="px-3 py-1 rounded-lg bg-[#ECFDF5] text-[#0F9F6E] font-semibold border border-[#A7F3D0]">
                    04. Practical Application
                  </span>
                  <span className="text-[#CBD5E1]">→</span>
                  <span className="px-3 py-1 rounded-lg bg-[#F2F3FF] text-[#193B8F] font-semibold border border-[#D8E5FF]">
                    05. Goal-Oriented Learning
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL-TIME PLATFORM METRICS RIBBON (#F8FAFC Background) */}
      <section className="py-12 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MetricRibbon />
        </div>
      </section>

      {/* 3. CORE THESIS: WHY THIS MODEL (White Background) */}
      <section className="py-20 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#3157D5]">
              Core Educational Philosophy
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#172033]">
              Students don&apos;t just watch courses. <br />
              <span className="text-[#3157D5] italic">They attend live sessions and practice code side-by-side.</span>
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed font-sans">
              Traditional computer centers lecture off slides or send recorded video links. internkul treats you like a junior software engineer inside an active engineering squad. You join live instructor-led sessions, practice the code side-by-side during the session, review pull requests, and ship verifiable public artifacts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#3157D5] shadow-soft">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172033]">
                Live Practice Sessions
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                Instructor conducts live sessions where students practice side-by-side simultaneously rather than watching passive recordings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#193B8F] shadow-soft">
                <GitBranch className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172033]">
                Git & Agile Workflow
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                Branch protection, PR discussions, semantic commit messages, and Jira sprint task movement.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#3157D5] shadow-soft">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172033]">
                Academic Deliverables
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                Structured Project Report, official Letter of Recommendation, and viva preparation guide for AICTE-approved colleges.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F9F6E] shadow-soft">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172033]">
                Industry Recommendation (LOR)
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                Official Letter of Recommendation from corporate technology leaders awarded to top 40% performers based on code quality and milestone delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE BATCH SCHEDULE MATRIX (Soft Indigo #F2F3FF Background) */}
      <section className="py-20 bg-[#F2F3FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#3157D5]">
                Academic Scheduling Infrastructure
              </span>
              <h2 className="font-editorial text-3xl font-bold text-[#172033] mt-1">
                Four Non-Conflicting Daily Cohort Timings
              </h2>
              <p className="text-sm text-[#64748B] mt-1.5 max-w-xl font-sans">
                Engineered so students across diverse academic disciplines can attend classes without overlapping university lecture hours or exam schedules.
              </p>
            </div>
            <div className="text-xs font-mono font-semibold text-[#0F9F6E] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0] self-start sm:self-auto">
              [ALL LIVE BATCHES OPEN]
            </div>
          </div>

          {batches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {batches.map((batch) => (
                <div
                  key={batch.id}
                  className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 shadow-card hover-card transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-semibold">
                      [{batch.id}]
                    </span>
                    <span className="text-xs font-sans text-[#0F9F6E] font-semibold">
                      {batch.status}
                    </span>
                  </div>

                  <div>
                    <div className="text-2xl font-bold text-[#172033] font-sans">
                      {batch.timeLabel}
                    </div>
                    <div className="text-xs text-[#64748B] font-semibold uppercase tracking-wider mt-0.5">
                      {batch.name.replace("_", " ")}
                    </div>
                  </div>

                  <p className="text-xs text-[#64748B] leading-relaxed pt-2 border-t border-[#F1F5F9]">
                    {batch.suitableFor}
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/tracks"
                      className="w-full block text-center py-2 px-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#172033] hover:bg-[#EEF4FF] hover:text-[#3157D5] hover:border-[#D8E5FF] transition-colors"
                    >
                      Select Batch →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#D8E5FF] bg-white p-8 text-center shadow-card font-sans">
              <p className="text-sm font-semibold text-[#172033]">
                Daily Cohort Timings Updating
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                Live batch schedules are being synchronized from the platform registry.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 5. TRAINING DURATIONS / IMMERSION TIERS (White Background) */}
      <section className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#3157D5]">
                Structured Cohort Intensities
              </span>
              <h2 className="font-editorial text-3xl font-bold text-[#172033] mt-1">
                Choose Your Immersion Tier
              </h2>
              <p className="text-sm text-[#64748B] mt-1.5 max-w-xl font-sans">
                From 10-day hands-on skill sprints to comprehensive 45-day industrial internship packs with project reports and corporate letters of recommendation.
              </p>
            </div>
            <div className="text-xs font-sans text-[#64748B]">
              Strategic course pricing: <strong className="text-[#172033]">₹999 → ₹6,999</strong> (Up to 60% OFF)
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 10 Days — Skill Sprint */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-4 flex flex-col justify-between shadow-card hover-card">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#3157D5] px-2.5 py-0.5 rounded bg-[#EEF4FF] border border-[#D8E5FF]">
                    10 Days
                  </span>
                  <span className="text-xs font-sans text-[#64748B]">10 Live Sessions</span>
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#172033]">
                    Skill Sprint
                  </h3>
                  <div className="text-[11px] font-mono text-[#64748B] mt-0.5">
                    10 Days — Skill Sprint
                  </div>
                </div>

                {/* Strategic Pricing Display */}
                <div className="py-2 px-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-editorial font-bold text-orange-600">
                      ₹999
                    </span>
                    <span className="text-xs line-through text-red-500 font-medium">
                      ₹2,499
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0F9F6E] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                    60% OFF
                  </span>
                </div>

                {/* Features list */}
                <ul className="space-y-1.5 text-xs text-[#475569] font-sans pt-1">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Certificate of Completion from <strong>Aon Digicon LLP</strong></span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Mini project at the end of the course</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Well-explained course content</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Live classes</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>One-on-one interaction</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Guidance from real-world experts</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Problem-solving through practical sessions</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#F1F5F9]">
                <Link
                  href="/tracks?duration=10D"
                  className="w-full block text-center py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#172033] hover:bg-[#EEF4FF] hover:text-[#3157D5] transition-colors"
                >
                  Explore 10-Day Courses
                </Link>
              </div>
            </div>

            {/* 20 Days — Skill Sprint */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-4 flex flex-col justify-between shadow-card hover-card">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#3157D5] px-2.5 py-0.5 rounded bg-[#EEF4FF] border border-[#D8E5FF]">
                    20 Days
                  </span>
                  <span className="text-xs font-sans text-[#64748B]">20 Live Sessions</span>
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#172033]">
                    Skill Sprint
                  </h3>
                  <div className="text-[11px] font-mono text-[#64748B] mt-0.5">
                    20 Days — Skill Sprint
                  </div>
                </div>

                {/* Strategic Pricing Display */}
                <div className="py-2 px-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-editorial font-bold text-orange-600">
                      ₹2,499
                    </span>
                    <span className="text-xs line-through text-red-500 font-medium">
                      ₹4,999
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0F9F6E] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                    50% OFF
                  </span>
                </div>

                {/* Features list */}
                <ul className="space-y-1.5 text-xs text-[#475569] font-sans pt-1">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Certificate of Completion from <strong>Aon Digicon LLP</strong></span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Two minor projects at the end of the course</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Well-explained course content</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Live classes</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>One-on-one interaction</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Guidance from real-world experts</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Problem-solving through practical sessions</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Verified batch on your profile that you can showcase on your resume</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#F1F5F9]">
                <Link
                  href="/tracks?duration=20D"
                  className="w-full block text-center py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#172033] hover:bg-[#EEF4FF] hover:text-[#3157D5] transition-colors"
                >
                  Explore 20-Day Courses
                </Link>
              </div>
            </div>

            {/* 30 Days — Marathon */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-4 flex flex-col justify-between shadow-card hover-card">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#3157D5] px-2.5 py-0.5 rounded bg-[#EEF4FF] border border-[#D8E5FF]">
                    30 Days
                  </span>
                  <span className="text-xs font-mono font-medium text-[#0F9F6E] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                    ACADEMIC
                  </span>
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#172033]">
                    Marathon
                  </h3>
                  <div className="text-[11px] font-mono text-[#64748B] mt-0.5">
                    30 Days — Marathon
                  </div>
                </div>

                {/* Strategic Pricing Display */}
                <div className="py-2 px-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-editorial font-bold text-orange-600">
                      ₹4,499
                    </span>
                    <span className="text-xs line-through text-red-500 font-medium">
                      ₹9,999
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0F9F6E] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                    55% OFF
                  </span>
                </div>

                {/* Features list */}
                <ul className="space-y-1.5 text-xs text-[#475569] font-sans pt-1">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Certificate of Completion from <strong>Aon Digicon LLP</strong></span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>One valuable major project at the end of the course</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Well-explained course content</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Live classes</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>One-on-one interaction</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Guidance from real-world experts</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Problem-solving through practical sessions</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Verified batch on your profile that you can showcase on your resume</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#F1F5F9]">
                <Link
                  href="/tracks?duration=30D"
                  className="w-full block text-center py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#172033] hover:bg-[#EEF4FF] hover:text-[#3157D5] transition-colors"
                >
                  Explore 30-Day Courses
                </Link>
              </div>
            </div>

            {/* 45 Days — Internship Pack */}
            <div className="rounded-2xl border-2 border-[#3157D5] bg-[#EEF4FF]/50 p-6 space-y-4 flex flex-col justify-between shadow-card hover-card relative">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#193B8F] px-2.5 py-0.5 rounded bg-white border border-[#D8E5FF]">
                    45 Days
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#193B8F] bg-[#D8E5FF] px-2 py-0.5 rounded">
                    PPO ELIGIBLE
                  </span>
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#172033]">
                    Internship Pack
                  </h3>
                  <div className="text-[11px] font-mono text-[#3157D5] font-semibold mt-0.5">
                    45 Days — Internship Pack
                  </div>
                </div>

                {/* Strategic Pricing Display */}
                <div className="py-2 px-3 rounded-xl bg-white border border-[#D8E5FF] flex items-baseline justify-between shadow-soft">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-editorial font-bold text-orange-600">
                      ₹6,999
                    </span>
                    <span className="text-xs line-through text-red-500 font-medium">
                      ₹14,999
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0F9F6E] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                    53% OFF
                  </span>
                </div>

                {/* Features list */}
                <ul className="space-y-1.5 text-xs text-[#475569] font-sans pt-1">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Certificate of Completion from <strong>Aon Digicon LLP</strong></span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>One valuable <strong>CAPSTONE project</strong> at the end of the course</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Capstone Project</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Well-explained course content</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Live classes</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>One-on-one interaction</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Guidance from real-world experts</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Problem-solving through practical sessions</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>Verified <strong>Golden Batch</strong> with the course name on your profile that you can showcase on your resume</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#3157D5] shrink-0 mt-0.5" />
                    <span className="font-semibold text-[#193B8F]">Executive Letter of Recommendation for top 40% students</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#3157D5] shrink-0 mt-0.5" />
                    <span className="font-semibold text-[#193B8F]">3-month PPO opportunities for outstanding-performing students</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#D8E5FF]">
                <Link
                  href="/tracks?duration=45D"
                  className="w-full block text-center py-2.5 rounded-xl bg-[#3157D5] text-white text-xs font-semibold hover:bg-[#193B8F] shadow-sm transition-all"
                >
                  Explore 45-Day Courses →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TECHNOLOGY COURSES SHOWCASE (Dynamic Managed Courses) */}
      <HomeCourseShowcase initialTracks={tracks} />

      {/* 7. PEDAGOGICAL WORKFLOW: INTERNKUL LEARNING MODEL (White Background) */}
      <section className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#3157D5]">
              Real Technical Development Standards
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#172033]">
              The internkul Learning Model
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed font-sans">
              Learn live → Practice side-by-side → Resolve doubts → Apply → Reach the goal. Instructor-led sessions with real-time practical execution, GitHub pull requests, and milestone deliveries.
            </p>
          </div>

          {/* Interactive Progression / Terminal */}
          <LiveTerminal />
        </div>
      </section>

      {/* 8. ACADEMIC TRAINING PACKAGE & DELIVERABLES (Page Canvas #F8FAFC Background) */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 sm:p-12 space-y-8 shadow-card">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F1F5F9]">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F9F6E] font-semibold">
                    INDUSTRIAL TRAINING & INTERNSHIP SUPPORT
                  </span>
                  <span className="text-xs text-[#64748B]">
                    OPEN TO AICTE-APPROVED INSTITUTIONS
                  </span>
                </div>
                <h2 className="font-editorial text-3xl font-bold text-[#172033]">
                  Structured Industrial Training Deliverable Suite
                </h2>
                <p className="text-sm text-[#64748B] max-w-2xl leading-relaxed font-sans">
                  For 30-day and 45-day courses, students receive a complete industrial training package to satisfy university vocational and industrial training curriculum guidelines across AICTE-approved colleges.
                </p>
              </div>

              <Link
                href="/internship-matrix"
                className="px-5 py-3 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-sans text-xs font-semibold hover:bg-[#D8E5FF] transition-colors flex items-center gap-2 shrink-0 shadow-soft"
              >
                <BookOpen className="w-4 h-4 text-[#3157D5]" />
                <span>Interactive 10-Chapter Report Preview →</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <div className="text-sm font-bold text-[#172033]">01. Formal Certificate</div>
                <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                  Certificate of Completion from Aon Digicon LLP with unique cryptographically verifiable registry ID.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <div className="text-sm font-bold text-[#172033]">02. Project Report</div>
                <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                  Structured synopsis covering DFDs, ER schemas, architecture blueprints, testing reports, and deployment evidence.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <div className="text-sm font-bold text-[#172033]">03. Letter of Recommendation</div>
                <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                  Official Letter of Recommendation (LOR) from Aon Digicon LLP validating candidate technical performance and practical proficiency.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <div className="text-sm font-bold text-[#172033]">04. Viva Voce Preparation</div>
                <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                  Targeted technical defense questions, system design walkthroughs, and confidence coaching for academic examiners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PROOF OF WORK SPOTLIGHT (White Background) */}
      <section className="py-20 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#3157D5]">
                Proof of Work Architecture
              </span>
              <h2 className="font-editorial text-3xl font-bold text-[#172033] mt-1">
                Public Proof of Work Credentials
              </h2>
              <p className="text-sm text-[#64748B] mt-1.5 max-w-xl font-sans">
                Employers, college HODs, and recruiters can inspect real code repositories, live production deployments, and verified skill scores.
              </p>
            </div>

            <Link
              href="/verify"
              className="flex items-center gap-1.5 text-xs font-semibold text-[#0F9F6E] hover:underline"
            >
              <span>Launch Verification Registry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Sample Verified Credential Spotlight */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:p-8 space-y-6 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
              <div className="flex items-center gap-3">
                <span className="text-lg font-mono font-bold text-[#172033]">
                  CG-2026-MERN-104
                </span>
                <StatusPill status="VERIFIED" />
                <StatusPill status="PPO_ELIGIBLE" />
              </div>
              <div className="text-xs text-[#64748B]">
                Registry Status: Permanent & Public
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div>
                <div className="text-[#64748B] text-[11px] font-semibold uppercase mb-1">Candidate</div>
                <div className="text-base font-bold text-[#172033] font-editorial">Aayush Sharma</div>
                <div className="text-[#64748B] mt-0.5">
                  B.Tech CSE • Bhilai Institute of Technology
                </div>
              </div>

              <div>
                <div className="text-[#64748B] text-[11px] font-semibold uppercase mb-1">Cohort Course</div>
                <div className="text-base font-bold text-[#172033] font-editorial">
                  MERN Full-Stack Engineering (45 Days)
                </div>
                <div className="text-[#64748B] mt-0.5">
                  45 Live Sessions (Side-by-Side Practice) • 95/100 Composite Score
                </div>
              </div>

              <div>
                <div className="text-[#64748B] text-[11px] font-semibold uppercase mb-1">Proof of Work Links</div>
                <div className="flex flex-col gap-1.5 pt-0.5">
                  <Link
                    href="/verify/CG-2026-MERN-104"
                    className="text-[#3157D5] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Inspect Public Credential Registry Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[#0F9F6E] flex items-center gap-1 font-medium">
                    ✓ GitHub Repo Authenticated • Live Deploy Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. INSTITUTIONAL INQUIRY TEASER (White Background) */}
      <section className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-soft">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-sans font-bold uppercase text-[#3157D5]">
                For Colleges, TPOs & Department Heads
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#172033]">
                Technical Training & Internship Infrastructure for Your Students
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed font-sans">
                Partner with internkul for bulk cohort onboarding across AICTE-approved institutions, department-level industrial training syllabus sync, and faculty progress dashboards.
              </p>
            </div>

            <Link
              href="/colleges"
              className="px-6 py-3 rounded-xl bg-white border border-[#CBD5E1] text-[#172033] font-sans text-xs font-semibold hover:bg-[#F8FAFC] shadow-soft transition-all shrink-0"
            >
              Institutional MoU & Portal →
            </Link>
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA SECTION (Soft Blue #EEF4FF Background) */}
      <section className="py-20 bg-[#EEF4FF] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="font-mono text-xs font-semibold text-[#3157D5] px-3 py-1 rounded-full bg-white border border-[#D8E5FF] inline-block">
            [READY_TO_BUILD] ENROLL IN LIVE 2026 COHORTS
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#172033] leading-tight">
            Leave with a portfolio you can demonstrate.
          </h2>
          <p className="text-base text-[#64748B] max-w-xl mx-auto font-sans">
            Choose your course, select your preferred live batch timing, and start shipping real production software side-by-side with experts.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <Link
              href="/tracks"
              className="px-7 py-3.5 rounded-xl bg-[#3157D5] text-white font-sans text-xs font-semibold hover:bg-[#193B8F] shadow-sm hover:shadow transition-all"
            >
              [ Browse All Technical Courses ]
            </Link>
            <Link
              href="/register"
              className="px-7 py-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#172033] font-sans text-xs font-semibold hover:text-[#3157D5] hover:border-[#3157D5] hover:bg-[#F8FAFC] shadow-soft transition-all"
            >
              [ Register Yourself ]
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
