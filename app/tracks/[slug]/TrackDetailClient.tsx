"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Track, CohortDuration, BatchTimingId } from "@/types";
import { useCourses } from "@/context/CourseContext";
import { formatCurrency } from "@/lib/utils";
import { DurationSelector } from "@/components/ui/DurationSelector";
import { BatchSelector } from "@/components/ui/BatchSelector";
import { GitCommitCurriculum } from "@/components/ui/GitCommitCurriculum";
import { CapstoneArchitecture } from "@/components/ui/CapstoneArchitecture";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface TrackDetailClientProps {
  track: Track;
  initialDuration?: CohortDuration;
}

export function TrackDetailClient({ track: initialTrack, initialDuration = "45D" }: TrackDetailClientProps) {
  const { getCourseBySlug, isReady } = useCourses();
  const managedTrack = getCourseBySlug(initialTrack.slug);
  const track: Track = managedTrack
    ? {
        ...managedTrack,
        curriculum: initialTrack.curriculum || managedTrack.curriculum,
      }
    : initialTrack;
  const [selectedDuration, setSelectedDuration] = useState<CohortDuration>(initialDuration);
  const [selectedBatch, setSelectedBatch] = useState<BatchTimingId>(track.availableBatches[0] || "06:00_PM");
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);
  const [permanentAddress, setPermanentAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const durationConfig = track.durationOptions[selectedDuration] || track.durationOptions["45D"];

  // Slice or adapt curriculum based on duration
  const curriculumDays = React.useMemo(() => {
    if (Array.isArray(track.curriculum)) {
      switch (selectedDuration) {
        case "1D":
          return track.curriculum.slice(0, 1);
        case "10D":
          return track.curriculum.slice(0, 10);
        case "20D":
          return track.curriculum.slice(0, 20);
        case "30D":
          return track.curriculum.slice(0, 30);
        case "45D":
        default:
          return track.curriculum;
      }
    }
    if (track.curriculum && typeof track.curriculum === "object") {
      return (
        track.curriculum[selectedDuration] ||
        track.curriculum["45D"] ||
        Object.values(track.curriculum)[0] ||
        []
      );
    }
    return [];
  }, [track.curriculum, selectedDuration]);

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!permanentAddress.trim()) {
      setAddressError("Permanent address is required");
      return;
    }
    setAddressError("");
    setEnrolledSuccess(true);
  };

  if (isReady && (!managedTrack || managedTrack.status !== "active")) {
    return <div className="rounded-2xl border border-[#E2E8F0] bg-white p-10 text-center"><h1 className="text-2xl font-bold">This course is no longer available</h1><p className="text-slate-500 mt-2">Browse the current course catalog to explore available tracks.</p><Link href="/tracks" className="inline-flex mt-5 rounded-xl bg-[#3157D5] px-5 py-3 text-white font-semibold">Browse courses</Link></div>;
  }

  return (
    <div className="space-y-10">
      {/* Track Specification Header (Product Spec style) */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-10 space-y-6 shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-6 border-b border-[#F1F5F9]">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-semibold uppercase">
                {track.domainLabel}
              </span>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] font-medium">
                [{durationConfig.days} {durationConfig.days === 1 ? "Day Workshop" : "Days Cohort"}]
              </span>
              {durationConfig.duration === "1D" && (
                <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309]">
                  CERTIFICATE OF ATTENDANCE ONLY
                </span>
              )}
              {durationConfig.ppoEligible && (
                <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-[#EEF4FF] border border-[#D8E5FF] text-[#193B8F]">
                  PPO ELIGIBLE
                </span>
              )}
              {durationConfig.duration === "45D" && (
                <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-[#EEF4FF] border border-[#D8E5FF] text-[#193B8F]">
                  LOR ELIGIBLE (TOP 40%)
                </span>
              )}
              {durationConfig.academicSupportEligible && (
                <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F9F6E]">
                  AICTE REPORT READY
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-editorial font-bold text-[#172033] leading-tight">
              {track.name}
            </h1>

            <p className="text-base text-[#64748B] leading-relaxed font-sans">
              {track.detailedDescription}
            </p>

            {/* Target Degrees & Disciplines */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#64748B] font-sans">
              <span className="font-semibold text-[#172033]">Target Academic Backgrounds:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {track.targetDegrees.map((deg) => (
                  <span
                    key={deg}
                    className="px-2.5 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[#172033] font-medium"
                  >
                    {deg}
                  </span>
                ))}
                <span className="px-2.5 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[#172033] font-medium">
                  B.Com
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[#172033] font-medium">
                  BBA
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[#172033] font-medium">
                  B.Sc.
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-semibold">
                  + Other Disciplines
                </span>
              </div>
            </div>
          </div>

          {/* Pricing & Reservation Box */}
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] min-w-[280px] space-y-4 shrink-0 shadow-soft">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#64748B] uppercase font-sans font-semibold tracking-wider">
                  Tuition ({durationConfig.label} — {durationConfig.tierName})
                </span>
                {durationConfig.discountPercent && (
                  <span className="text-xs font-mono font-bold text-[#0F9F6E] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                    {durationConfig.discountPercent}% OFF
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-editorial font-bold text-orange-600">
                  {formatCurrency(durationConfig.priceINR)}
                </span>
                {durationConfig.originalPriceINR && (
                  <span className="text-sm line-through text-red-500 font-medium">
                    {formatCurrency(durationConfig.originalPriceINR)}
                  </span>
                )}
              </div>
              <div className="text-xs text-[#64748B] mt-1 font-sans">
                {selectedDuration === "1D"
                  ? "Includes one 2-hour live session • Certificate of Attendance only (no project submission, internship completion credentials, or academic credits included)"
                  : "Inclusive of live instructor sessions, side-by-side practical coding & report review"}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] space-y-2 text-xs font-sans">
              <div className="flex items-center justify-between text-[#64748B]">
                <span>Live Sessions:</span>
                <span className="text-[#172033] font-semibold">
                  {selectedDuration === "1D"
                    ? "1 Session (2 Hours)"
                    : `${durationConfig.sessions || durationConfig.labHours}+ Sessions (Side-by-Side)`}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#64748B]">
                <span>Selected Timing:</span>
                <span className="text-[#0F9F6E] font-mono font-semibold">
                  [{selectedBatch}]
                </span>
              </div>
            </div>

            <button
              onClick={() => setEnrollModalOpen(true)}
              className="w-full py-3 px-4 rounded-xl bg-[#3157D5] text-white font-sans text-xs font-semibold hover:bg-[#193B8F] transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
            >
              <span>Reserve Cohort Seat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Primary Stack Tags */}
        <div className="space-y-2">
          <div className="text-xs font-sans font-semibold text-[#64748B] uppercase tracking-wider">
            Primary Engineering Technologies & Tools:
          </div>
          <div className="flex flex-wrap gap-2">
            {track.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#172033]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Duration Selector */}
      <section className="space-y-4">
        <DurationSelector
          selectedDuration={selectedDuration}
          onSelectDuration={setSelectedDuration}
          durationOptions={track.durationOptions}
        />
      </section>

      {/* Interactive Batch Selector */}
      <section className="space-y-4">
        <BatchSelector
          selectedBatch={selectedBatch}
          onSelectBatch={setSelectedBatch}
          availableBatches={track.availableBatches}
          trackSlug={track.slug}
        />
      </section>

      {/* Selected Tier Features Strip */}
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 space-y-4 shadow-card">
        <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
          <div className="text-xs uppercase text-[#172033] tracking-wider font-bold font-sans">
            {durationConfig.label} ({durationConfig.tierName}) — Deliverable Breakdown
          </div>
          <span className="text-xs font-mono font-semibold text-[#0F9F6E]">
            {selectedDuration === "1D"
              ? "1 Live Session (2 Hours)"
              : `${durationConfig.sessions || durationConfig.labHours}+ Live Sessions (Side-by-Side Practice)`}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {durationConfig.features.map((feat, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-sans text-[#172033] flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-[#0F9F6E] shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Git-Commit Curriculum Timeline */}
      <section className="space-y-4">
        <GitCommitCurriculum
          days={curriculumDays}
          durationLabel={durationConfig.label}
        />
      </section>

      {/* Capstone Architecture */}
      {selectedDuration !== "1D" ? (
        <section className="space-y-4">
          <CapstoneArchitecture
            capstone={track.capstone}
            trackName={track.name}
          />
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-6 text-center space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Capstone Architecture & Major Projects
          </div>
          <p className="text-xs text-[#64748B] max-w-lg mx-auto">
            Capstone projects and production deployments are included in the 10-day, 20-day, 30-day, and 45-day cohorts. The 1-Day workshop focuses strictly on foundational concepts with a Certificate of Attendance only.
          </p>
        </section>
      )}

      {/* Enrollment Drawer / Modal */}
      {enrollModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#172033]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 space-y-6 shadow-2xl relative font-sans text-xs">
            {enrolledSuccess ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-14 h-14 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F9F6E] flex items-center justify-center mx-auto shadow-soft">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="text-[#0F9F6E] font-bold text-base">
                  Seat Reservation Registered!
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Your cohort seat reservation for <strong className="text-[#172033]">{track.name}</strong> ({durationConfig.label} • [{selectedBatch}]) has been saved. {selectedDuration === "1D" ? "Your 2-hour live session details and access link will be shared via WhatsApp/Email." : "Our admissions and engineering lead will connect via WhatsApp/Email with starter GitHub repositories and Discord invite link."}
                </p>
                <button
                  onClick={() => {
                    setEnrollModalOpen(false);
                    setEnrolledSuccess(false);
                    setPermanentAddress("");
                    setAddressError("");
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#3157D5] text-white font-semibold hover:bg-[#193B8F] shadow-sm transition-all"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#172033] text-sm">
                      Reserve Cohort Seat
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setEnrollModalOpen(false);
                      setAddressError("");
                    }}
                    className="text-[#94A3B8] hover:text-[#172033] text-sm font-semibold"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 text-xs text-[#64748B]">
                  <div><strong className="text-[#172033]">Course:</strong> {track.name}</div>
                  <div><strong className="text-[#172033]">Intensity:</strong> {durationConfig.label} ({durationConfig.tierName})</div>
                  <div><strong className="text-[#172033]">Batch:</strong> [{selectedBatch}]</div>
                  <div>
                    <strong className="text-[#172033]">Deliverable:</strong>{" "}
                    {selectedDuration === "1D" ? (
                      <span className="text-[#B45309] font-medium">Certificate of Attendance only (One 2-hour session)</span>
                    ) : (
                      <span>Live Cohort Training & Project Mentorship</span>
                    )}
                  </div>
                  <div>
                    <strong className="text-[#172033]">Tuition:</strong>{" "}
                    <span className="font-bold text-orange-600">{formatCurrency(durationConfig.priceINR)}</span>{" "}
                    {durationConfig.originalPriceINR && (
                      <span className="line-through text-red-500 font-medium">({formatCurrency(durationConfig.originalPriceINR)})</span>
                    )}{" "}
                    {durationConfig.discountPercent && (
                      <span className="text-[#0F9F6E] font-bold">[{durationConfig.discountPercent}% OFF]</span>
                    )}
                  </div>
                </div>

                <form onSubmit={handleEnrollSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">
                      Student Full Name *
                    </label>
                    <input
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#172033] text-xs focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      required
                      placeholder="+91 98260 00000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#172033] text-xs focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#172033] text-xs focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">
                      College & Degree Program *
                    </label>
                    <input
                      required
                      placeholder="e.g. BIT Durg / B.Tech CSE 6th Sem"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#172033] text-xs focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">
                      Permanent Address *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={permanentAddress}
                      onChange={(e) => {
                        setPermanentAddress(e.target.value);
                        if (addressError && e.target.value.trim()) {
                          setAddressError("");
                        }
                      }}
                      placeholder="Enter your complete postal address (Flat / House no, Street, City, State, PIN code)"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-[#172033] text-xs focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] resize-none ${
                        addressError ? "border-rose-400 bg-rose-50/20" : "border-[#E2E8F0]"
                      }`}
                    />
                    {addressError && (
                      <span className="text-xs text-rose-500 block mt-1">{addressError}</span>
                    )}
                  </div>

                  <div className="pt-2 space-y-2.5">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#3157D5] text-white font-sans text-xs font-semibold hover:bg-[#193B8F] shadow-sm transition-all"
                    >
                      Confirm Seat Reservation →
                    </button>

                    <p className="text-center text-[11px] text-[#64748B] leading-relaxed">
                      Your information is handled securely and used only for relevant registration and enrollment purposes, in accordance with our{" "}
                      <Link href="/contact" className="underline hover:text-[#172033]">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
