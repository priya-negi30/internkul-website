"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  FileText,
  BriefcaseBusiness,
  GraduationCap,
  CheckCircle2,
  Clock,
  Calendar,
  ShieldCheck,
  ChevronDown,
  Terminal,
  ArrowRight,
  MessageSquare,
  FileCheck,
  Check,
  Copy,
  Headphones,
  FileSpreadsheet,
  MailCheck,
} from "lucide-react";

type DurationKey = "10D" | "20D" | "30D" | "45D";

interface DurationDetail {
  id: DurationKey;
  pillLabel: string;
  badge: string;
  name: string;
  tagline: string;
  liveHours: string;
  sessions: string;
  projects: string;
  academicKit: string;
  lorStatus: string;
  ppoStatus?: string;
  isPpoEligible?: boolean;
  idealFor: string;
  deliverables: string[];
}

const DURATION_DATA: Record<DurationKey, DurationDetail> = {
  "10D": {
    id: "10D",
    pillLabel: "10-Day Micro",
    badge: "MICRO ACCELERATOR",
    name: "10-Day Micro Skill Sprint",
    tagline: "Fast-track toolchain onboarding, production Git workflows, and single-module deployment.",
    liveHours: "15 Hours Live Sessions",
    sessions: "10 Daily Live Sessions",
    projects: "1 Production Micro-Capstone",
    academicKit: "Training Certificate + Project Synopsis",
    lorStatus: "Standard Certificate Track",
    idealFor: "Minor semester vacations, quick skill upgradation, early 2nd/3rd semester students.",
    deliverables: [
      "Official 10-Day Industrial Training Certificate with QR validation",
      "Standard 5-page Capstone Technical Synopsis",
      "Live GitHub repository with verifiable commits",
      "Daily screen-share code reviews & debugging access",
    ],
  },
  "20D": {
    id: "20D",
    pillLabel: "20-Day Sprint",
    badge: "SPRINT COHORT",
    name: "20-Day Engineering Sprint",
    tagline: "Fullstack API architectures, database models, and integrated unit testing matrices.",
    liveHours: "30 Hours Live Sessions",
    sessions: "20 Daily Live Sessions",
    projects: "2 Production Projects",
    academicKit: "Training Certificate + 12-Page Project Report + Session Diary",
    lorStatus: "Standard Certificate Track",
    idealFor: "Mid-semester vacation training, BCA, MCA, B.Tech, BE, B.Com, BBA, B.Sc., and other degree requirements.",
    deliverables: [
      "Official 20-Day Industrial Training Certificate with QR validation",
      "12-Page University-formatted Technical Project Report",
      "Authorized Weekly Evaluation Logbook pre-signed by mentor",
      "Viva-voce core questions prep sheet for mid-term defense",
    ],
  },
  "30D": {
    id: "30D",
    pillLabel: "30-Day Internship Pack",
    badge: "UNIVERSITY MANDATORY PACK",
    name: "30-Day Industrial Internship Pack",
    tagline: "Standard university vocational training fulfillment with end-to-end bound report suite.",
    liveHours: "45 Hours Live Sessions",
    sessions: "30 Daily Live Sessions",
    projects: "3 Multi-Tier Systems",
    academicKit: "University Project Report + LOR (Top 40%) + Joining Letter",
    lorStatus: "Eligible for Corporate LOR (Top 40%)",
    idealFor: "Mandatory university 4-week / 30-day summer & winter industrial internship credits.",
    deliverables: [
      "Corporate Industrial Training & Internship Certificate (Aon Digicon LLP)",
      "University Project Report formatted for university submission",
      "Official Letter of Recommendation (LOR) for top 40% performers",
      "Personalized College Joining Letter & verified NOC documentation",
    ],
  },
  "45D": {
    id: "45D",
    pillLabel: "45-Day Immersion",
    badge: "CAREER IMMERSION + PPO",
    name: "45-Day Comprehensive Industrial Immersion",
    tagline: "Full enterprise architecture, microservices deployment, academic submission suite, and 3-month PPO opportunities.",
    liveHours: "68 Hours Live Sessions",
    sessions: "45 Daily Live Sessions",
    projects: "4 Production Deployments + Distributed Capstone",
    academicKit: "Full Academic Suite + Executive Letter of Recommendation (Top 40%)",
    lorStatus: "Eligible for Corporate LOR (Top 40%)",
    ppoStatus: "3-Month PPO Opportunity (Top Performers)",
    isPpoEligible: true,
    idealFor: "Undergraduates and graduates from diverse academic backgrounds, including BCA, MCA, B.Tech, BE, B.Com, BBA, B.Sc., and other disciplines aiming for jobs & credits.",
    deliverables: [
      "Corporate Industrial Training Certificate + Executive Letter of Recommendation (Top 40%)",
      "3-Month Pre-Placement Offer (PPO) opportunities for outstanding-performing students",
      "University Project Report with system architecture & UML diagrams",
      "Authorized Weekly Evaluation Logbook for HOD sign-off",
      "Comprehensive Viva-Voce defense question sheet + 1-on-1 mock review",
    ],
  },
};

const FAQS = [
  {
    q: "Will my college/HOD accept this certificate for 6th/7th-semester credits?",
    a: "Yes, 100%. Our vocational training curriculum and academic deliverables strictly follow the AICTE model curriculum guidelines and university ordinances (including CSVTU, RTU, AKTU, VTU, and state technical universities). Upon course completion, you receive an official corporate certificate from Aon Digicon LLP equipped with a tamper-proof QR code and a permanent verification registry URL (verify/[id]). Combined with our university project report, authorized daily logbook, and college joining letter, your department review committee and HOD will have every required document ready for credit approval.",
  },
  {
    q: "How are top 40% students selected for the Letter of Recommendation?",
    a: "Students who demonstrate consistent practical code output across live practical sessions, maintain git commit velocity on daily feature branches, and successfully complete their capstone project milestones qualify for the corporate Letter of Recommendation (LOR) from Aon Digicon LLP.",
  },
  {
    q: "How does the 3-month PPO opportunity work in the 45-day Internship Pack?",
    a: "Students enrolled in the 45-day Internship Pack who demonstrate outstanding performance—evaluated on practical code quality (40%), milestone sprint velocity (30%), and the capstone technical defense interview (30%)—are eligible for direct 3-month Pre-Placement Offer (PPO) opportunities and hiring referrals with our partner engineering organizations.",
  },
  {
    q: "Can I switch batch timings if college hours or sessions conflict?",
    a: "Yes, seamlessly. We operate 4 flexible daily cohorts every single day: 07:30 AM (Early Bird), 02:00 PM (Afternoon Flexi), 06:00 PM (Evening Prime), and 08:30 PM (Late Night). If your university timetable shifts, unexpected practical sessions are announced, or exam dates clash, you can switch your active shift directly from your student portal or notify your cohort mentor without incurring fees or missing lecture continuity.",
  },
  {
    q: "What if I miss a live lecture due to university semester exams?",
    a: "Because all internkul cohorts are strictly 100% live and interactive (no pre-recorded lectures are provided), you can seamlessly attend any of the other 3 flexible daily shifts (07:30 AM, 02:00 PM, 06:00 PM, 08:30 PM) on that same day without losing lecture continuity. During peak semester exam weeks, you can also activate an 'Exam Freeze' on your attendance record and coordinate directly with your cohort mentor to review repository milestones and clear doubts.",
  },
  {
    q: "What programming background do I need before joining a cohort?",
    a: "Our cohorts are designed from practical software engineering principles. While basic familiarity with programming logic (C, C++, Java, or Python) is helpful, our mentors lead every session screen-by-screen, writing code side-by-side in real time. We guide you through environment configuration, Git workflows, and architectural principles so that students and graduates from diverse academic backgrounds, including BCA, MCA, B.Tech, BE, B.Com, BBA, B.Sc., and other disciplines, build production confidence from Day 1.",
  },
];

export default function TrainingAndInternshipPage() {
  const [selectedDuration, setSelectedDuration] = useState<DurationKey>("45D");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    document.title =
      "Industry-Ready Training with Verifiable University Credits | internkul";
  }, []);

  const handleCopyCommunityLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText("https://t.me/internkul_cohorts");
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const activeDuration = DURATION_DATA[selectedDuration];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 font-sans">
      
      {/* =========================================================================
          BLOCK 1: The 5-Part Industrial Training Deliverable Suite
          ========================================================================= */}
      <section id="deliverables" className="space-y-6 scroll-mt-24">
        <div className="space-y-3 pb-6 border-b border-[#E2E8F0]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F9F6E] font-semibold">
              ACADEMIC ALIGNMENT MATRIX
            </span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="text-xs font-sans text-[#64748B]">
              AICTE & CSVTU Compliant Vocational Documentation
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#172033]">
                The 5-Part Industrial Training Deliverable Suite
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] mt-1.5 max-w-3xl font-sans leading-relaxed">
                Every candidate receives an institutional-grade credential bundle engineered to satisfy college HOD evaluation committees, university external examiners, and corporate recruitment boards.
              </p>
            </div>
            <div className="text-xs font-mono text-[#0F9F6E] bg-[#ECFDF5] border border-[#A7F3D0] px-3 py-1.5 rounded-xl shrink-0 self-start md:self-auto flex items-center gap-1.5 shadow-soft">
              <CheckCircle2 className="w-4 h-4 text-[#0F9F6E]" />
              <span>Standardized for 2024–2026 Batch Submissions</span>
            </div>
          </div>
        </div>

        {/* 5-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Official Certificate */}
          <div className="p-6 sm:p-7 rounded-2xl border border-[#E2E8F0] bg-white space-y-4 shadow-card hover-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-editorial font-bold text-[#3157D5]">01</span>
                <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-semibold">
                  CORPORATE CREDENTIAL
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] shrink-0">
                  <Award className="w-5 h-5 text-[#3157D5]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#172033] font-sans">
                    Official Industrial Training & Completion Certificate
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5 font-sans">
                    Signed corporate credentials + QR verification badge
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                Issued under <strong>Aon Digicon LLP</strong> with unique cryptographic registry ID, specifying completed live practical sessions, tech stack, and practical competence.
              </p>
            </div>

            <div className="pt-4 border-t border-[#F1F5F9] space-y-2 text-xs font-sans">
              <div className="flex items-center gap-2 text-[#475569]">
                <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0" />
                <span>Tamper-proof dynamic QR code for instant scan</span>
              </div>
              <div className="flex items-center gap-2 text-[#475569]">
                <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0" />
                <span>Permanent online URL verification at verify/[id]</span>
              </div>
              <div className="flex items-center gap-2 text-[#475569]">
                <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0" />
                <span>Certified by registered corporate technology partners</span>
              </div>
            </div>
          </div>

          {/* Card 2: University Project Report */}
          <div className="p-6 sm:p-7 rounded-2xl border border-[#E2E8F0] bg-white space-y-4 shadow-card hover-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-editorial font-bold text-[#193B8F]">02</span>
                <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[#EEF4FF] border border-[#D8E5FF] text-[#193B8F] font-semibold">
                  UNIVERSITY REPORT
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-[#193B8F] shrink-0">
                  <FileText className="w-5 h-5 text-[#193B8F]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#172033] font-sans">
                    University Project Report
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5 font-sans">
                    Pre-formatted architecture, system diagrams & methodology
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                Complete documentation formatted strictly to AICTE and university guidelines. Ready for immediate college spiral or hard-binding with standard typography and chapter layouts.
              </p>
            </div>

            <div className="pt-4 border-t border-[#F1F5F9] space-y-2 text-xs font-sans">
              <div className="flex items-center gap-2 text-[#475569]">
                <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0" />
                <span>Literature survey, SRS & UML architecture diagrams</span>
              </div>
              <div className="flex items-center gap-2 text-[#475569]">
                <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0" />
                <span>Database ER schemas, API routes & unit test matrices</span>
              </div>
              <div className="flex items-center gap-2 text-[#475569]">
                <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0" />
                <span>Ready-to-print margins, certificates & declaration pages</span>
              </div>
            </div>
          </div>

          {/* Card 3: Letter of Recommendation */}
          <div className="p-6 sm:p-7 rounded-2xl border border-[#E2E8F0] bg-white space-y-4 shadow-card hover-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-editorial font-bold text-[#0F9F6E]">03</span>
                <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F9F6E] font-semibold">
                  TOP 40% STUDENTS
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F9F6E] shrink-0">
                  <MailCheck className="w-5 h-5 text-[#0F9F6E]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#172033] font-sans">
                    Letter of Recommendation
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5 font-sans">
                    Official corporate endorsement for top 40% performers
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                Official Letter of Recommendation (LOR) from <strong>Aon Digicon LLP</strong> awarded to top 40% performing students in each cohort, validating technical execution, milestone velocity, and practical competence.
              </p>
            </div>

            <div className="pt-4 border-t border-[#F1F5F9] space-y-2 text-xs font-sans">
              <div className="flex items-center gap-2 text-[#475569]">
                <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0" />
                <span>Awarded to top 40% based on milestone sprints & code quality</span>
              </div>
              <div className="flex items-center gap-2 text-[#475569]">
                <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0" />
                <span>Signed by corporate engineering leads & industry mentors</span>
              </div>
              <div className="flex items-center gap-2 text-[#475569]">
                <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0" />
                <span>Verifiable credential for placement cells & higher studies</span>
              </div>
            </div>
          </div>

          {/* Card 4: Viva-Voce Prep Sheet */}
          <div className="p-6 sm:p-7 rounded-2xl border border-[#E2E8F0] bg-white space-y-4 shadow-card hover-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-editorial font-bold text-[#3157D5]">04</span>
                <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-semibold">
                  EXAM DEFENSE KIT
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] shrink-0">
                  <GraduationCap className="w-5 h-5 text-[#3157D5]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#172033] font-sans">
                    Viva-Voce & External Defense Question Sheet
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5 font-sans">
                    Comprehensive college evaluation prep sheet
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                Curated repository of 100+ viva defense questions, architectural talking points, and examiner objection counters tailored to your capstone project codebase.
              </p>
            </div>

            <div className="pt-4 border-t border-[#F1F5F9] space-y-2 text-xs font-sans">
              <div className="flex items-center gap-2 text-[#475569]">
                <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0" />
                <span>100+ examiner defense questions with architectural justifications</span>
              </div>
              <div className="flex items-center gap-2 text-[#475569]">
                <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0" />
                <span>Capstone trade-off defense scripts & fallback demo tips</span>
              </div>
              <div className="flex items-center gap-2 text-[#475569]">
                <Check className="w-3.5 h-3.5 text-[#0F9F6E] shrink-0" />
                <span>External examiner rubric breakdown & scoring tips</span>
              </div>
            </div>
          </div>

          {/* Card 5: PPO Opportunity */}
          <div className="p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] bg-white space-y-5 shadow-card hover-card md:col-span-2 lg:col-span-2 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-editorial font-bold text-[#3157D5]">05</span>
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-bold tracking-wide flex items-center gap-1.5 shadow-soft">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3157D5]" />
                    CAREER OUTCOME
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#3157D5] bg-white border border-[#D8E5FF] px-2.5 py-0.5 rounded font-semibold">
                  MERIT EVALUATION
                </span>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] shrink-0 shadow-soft">
                  <BriefcaseBusiness className="w-6 h-6 text-[#3157D5]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-editorial font-bold text-[#172033] leading-snug">
                    PPO Opportunity
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-0.5 font-sans">
                    Performance-based Pre-Placement Offer consideration
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 shadow-soft">
                <p className="text-xs sm:text-sm text-[#172033] leading-relaxed">
                  Outstanding-performing students may receive  PPO opportunity based on their performance, technical skills, project work, and overall evaluation during the program.
                </p>
                <p className="text-xs text-[#64748B] italic font-mono pt-1 border-t border-[#E2E8F0]">
                  Evaluated across practical code quality, milestone velocity, capstone deployment, and live technical defense.
                </p>
              </div>
            </div>

            {/* Checklist Strip */}
            <div className="pt-4 border-t border-[#F1F5F9] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center shadow-soft">
                <div className="text-[#3157D5] font-bold text-sm">TECHNICAL SKILLS</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">Code & Git Velocity</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center shadow-soft">
                <div className="text-[#0F9F6E] font-bold text-sm">PROJECT WORK</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">Production Capstone</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center shadow-soft">
                <div className="text-[#172033] font-bold text-sm">DEFENSE RUBRIC</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">Overall Evaluation</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          BLOCK 2: Hero Fold: Academic Credit & Program Badge
          ========================================================================= */}
      <section className="space-y-6 pt-2">
        <div className="space-y-4 max-w-4xl">
          {/* University Compliance Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-xs font-mono text-[#0F9F6E] font-semibold shadow-soft">
            <span className="w-2 h-2 rounded-full bg-[#0F9F6E] animate-pulse" />
            <span>[AICTE & CSVTU Compliant Vocational Industrial Training]</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-bold text-[#172033] tracking-tight leading-[1.12]">
            Industry-Ready Training with Verifiable University Credits
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl font-sans">
            Project-first curriculum for students and graduates from diverse academic backgrounds, including BCA, MCA, B.Tech, BE, B.Com, BBA, B.Sc., and other disciplines. Complete your mandatory semester internship requirements with university-ready documentation and corporate letters of recommendation.
          </p>
        </div>

        {/* Quick Meta Strip: Monospace micro-stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-[#E2E8F0] font-mono text-xs shadow-card">
          <div className="space-y-1 sm:border-r border-[#E2E8F0] sm:pr-4">
            <div className="text-[#64748B] uppercase tracking-wider text-[11px]">Duration Options</div>
            <div className="text-[#3157D5] font-bold text-sm tracking-wide">
              10D | 20D | 30D | 45D
            </div>
            <div className="text-[11px] text-[#64748B]">Flexible syllabus mapping</div>
          </div>

          <div className="space-y-1 sm:border-r border-[#E2E8F0] sm:pr-4">
            <div className="text-[#64748B] uppercase tracking-wider text-[11px]">Daily Cohorts</div>
            <div className="text-[#172033] font-bold text-sm tracking-wide">
              4 Flexible Shifts
            </div>
            <div className="text-[11px] text-[#64748B]">Morning, Afternoon, Evening, Night</div>
          </div>

          <div className="space-y-1 lg:border-r border-[#E2E8F0] lg:pr-4">
            <div className="text-[#64748B] uppercase tracking-wider text-[11px]">Format</div>
            <div className="text-[#172033] font-bold text-sm tracking-wide">
              100% Live Practical
            </div>
            <div className="text-[11px] text-[#64748B]">Screen-Share Debugging + Code Reviews</div>
          </div>

          <div className="space-y-1">
            <div className="text-[#64748B] uppercase tracking-wider text-[11px]">College Kit</div>
            <div className="text-[#0F9F6E] font-bold text-sm tracking-wide">
              Report, LOR (Top 40%) & Joining Letter
            </div>
            <div className="text-[11px] text-[#64748B]">Pre-formatted for university submission</div>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/tracks"
            className="px-7 py-3.5 rounded-xl bg-[#3157D5] hover:bg-[#193B8F] text-white font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2.5 group"
          >
            <span>Select Course & Batch</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#deliverables"
            className="px-7 py-3.5 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-[#172033] font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-soft"
          >
            <FileCheck className="w-4 h-4 text-[#3157D5]" />
            <span>View Academic Submission Suite</span>
          </a>
        </div>
      </section>

      {/* =========================================================================
          BLOCK 3: Live Cohort Learning Architecture (Dynamic Routine)
          ========================================================================= */}
      <section className="space-y-8">
        <div className="space-y-3 pb-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-semibold">
              DYNAMIC COHORT ARCHITECTURE
            </span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="text-xs font-sans text-[#64748B]">
              Side-by-Side Live Practice Framework
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#172033]">
            Live Cohort Learning Architecture & Daily Routine
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] max-w-3xl font-sans leading-relaxed">
            Experience dynamic session adaptation based on your university semester vacation tier. No recorded slide lectures — write production code side-by-side with senior mentors.
          </p>
        </div>

        {/* Duration Tabs / State Switcher */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-1.5 bg-[#F1F5F9] border border-[#E2E8F0] rounded-2xl max-w-fit">
            {(["10D", "20D", "30D", "45D"] as DurationKey[]).map((durKey) => {
              const item = DURATION_DATA[durKey];
              const isSelected = selectedDuration === durKey;
              return (
                <button
                  key={durKey}
                  onClick={() => setSelectedDuration(durKey)}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isSelected
                      ? "bg-white text-[#3157D5] shadow-card border border-[#E2E8F0]"
                      : "text-[#64748B] hover:text-[#172033] hover:bg-white/60"
                  }`}
                >
                  <span>{item.pillLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tier Dynamic Overview Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] space-y-6 shadow-card">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#F1F5F9]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-bold">
                    {activeDuration.badge}
                  </span>
                  <span className="text-xs text-[#CBD5E1]">•</span>
                  <span className="text-xs text-[#64748B] font-mono">{activeDuration.sessions}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-editorial font-bold text-[#172033]">
                  {activeDuration.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl leading-relaxed">
                  {activeDuration.tagline}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-mono text-xs">
                  <div className="text-[#64748B] text-[10px] uppercase font-semibold">Live Hours</div>
                  <div className="text-[#3157D5] font-bold text-sm">{activeDuration.liveHours}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-mono text-xs">
                  <div className="text-[#64748B] text-[10px] uppercase font-semibold">Recommendation</div>
                  <div className="font-bold text-sm text-[#0F9F6E]">
                    {activeDuration.lorStatus}
                  </div>
                </div>
                {activeDuration.ppoStatus && (
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-mono text-xs">
                    <div className="text-[#64748B] text-[10px] uppercase font-semibold">Career Outcome</div>
                    <div className="font-bold text-sm text-[#3157D5]">
                      {activeDuration.ppoStatus}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Deliverables for active tier */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase text-[#172033] tracking-wider font-semibold">
                Included In This Duration Tier:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {activeDuration.deliverables.map((del, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span className="text-[#475569]">{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Daily Routine Schedule (3-Segment Breakdown) */}
        <div className="space-y-4">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#3157D5] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#3157D5]" />
            <span>Standard 90–105 Minute Daily Session Anatomy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 shadow-card hover-card">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-bold">
                  00–60 MIN
                </span>
                <span className="text-xs font-mono text-[#64748B]">PART 01</span>
              </div>
              <h4 className="text-base font-bold text-[#172033]">
                Live Concept & Tool Walkthrough
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Hands-on architectural breakdown and tooling setup. The mentor codes in a real production environment — demonstrating live patterns, system setup, and code logic with zero dry slide presentations.
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#3157D5] flex items-center gap-1.5">
                <span className="text-[#0F9F6E]">✓</span> Real-world code demonstration
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 shadow-card hover-card">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-bold">
                  60–90 MIN
                </span>
                <span className="text-xs font-mono text-[#64748B]">PART 02</span>
              </div>
              <h4 className="text-base font-bold text-[#172033]">
                Screen-to-Screen Practical Implementation
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Students clone the active session repository and write the day's feature branches simultaneously. Mentors monitor progress, providing immediate intervention and live coding support.
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#3157D5] flex items-center gap-1.5">
                <span className="text-[#0F9F6E]">✓</span> Side-by-side git feature commits
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 shadow-card hover-card">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-bold">
                  90–105 MIN
                </span>
                <span className="text-xs font-mono text-[#64748B]">PART 03</span>
              </div>
              <h4 className="text-base font-bold text-[#172033]">
                Dedicated Debugging & Doubts Room
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Screen sharing is opened for every stuck student. Mentors inspect terminal errors, trace stack dumps, fix runtime bugs, and clarify architectural queries before closing the day.
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#3157D5] flex items-center gap-1.5">
                <span className="text-[#0F9F6E]">✓</span> Zero unresolved syntax/runtime errors
              </div>
            </div>
          </div>
        </div>

        {/* 4-Shift Matrix Cards */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#3157D5] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#3157D5]" />
              <span>4 Daily Shift Timing Matrix (Switch Anytime)</span>
            </div>
            <span className="text-xs font-mono text-[#64748B]">
              Standard Indian Standard Time (IST UTC+5:30)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Shift 1 */}
            <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 shadow-card hover-card">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[#3157D5] font-semibold">
                  SHIFT 01
                </span>
                <span className="font-mono text-[11px] text-[#0F9F6E] font-semibold">
                  IST (UTC+5:30)
                </span>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-[#172033]">07:30 AM</div>
                <div className="text-xs text-[#0F9F6E] font-semibold font-mono mt-0.5">
                  Early Bird Kickstart
                </div>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Complete your hands-on coding session before morning college lectures begin. Fresh minds, zero commute friction.
              </p>
            </div>

            {/* Shift 2 */}
            <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 shadow-card hover-card">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[#3157D5] font-semibold">
                  SHIFT 02
                </span>
                <span className="font-mono text-[11px] text-[#0F9F6E] font-semibold">
                  IST (UTC+5:30)
                </span>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-[#172033]">02:00 PM</div>
                <div className="text-xs text-[#3157D5] font-semibold font-mono mt-0.5">
                  Afternoon Flexi
                </div>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Ideal for students on vacation break, alternate university schedules, or autonomous engineering college shifts.
              </p>
            </div>

            {/* Shift 3 */}
            <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 shadow-card hover-card">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[#3157D5] font-semibold">
                  SHIFT 03
                </span>
                <span className="font-mono text-[11px] text-[#0F9F6E] font-semibold">
                  IST (UTC+5:30)
                </span>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-[#172033]">06:00 PM</div>
                <div className="text-xs text-amber-600 font-semibold font-mono mt-0.5">
                  Evening Prime (Popular)
                </div>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Our most subscribed cohort. Attend right after returning home from university campus and semester practical sessions.
              </p>
            </div>

            {/* Shift 4 */}
            <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 shadow-card hover-card">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[#3157D5] font-semibold">
                  SHIFT 04
                </span>
                <span className="font-mono text-[11px] text-[#0F9F6E] font-semibold">
                  IST (UTC+5:30)
                </span>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-[#172033]">08:30 PM</div>
                <div className="text-xs text-indigo-600 font-semibold font-mono mt-0.5">
                  Late Night Deep Work
                </div>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Quiet, high-focus night hours for dedicated engineering immersion, git commits, and quiet uninterrupted debugging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOCK 4: Student Community & Practical Support Desk
          ========================================================================= */}
      <section className="space-y-8">
        <div className="space-y-3 pb-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F9F6E] font-semibold">
              STUDENT ECOSYSTEM & ADMINISTRATIVE DESK
            </span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="text-xs font-sans text-[#64748B]">
              Peer Acceleration & College NOC Operations
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#172033]">
            Student Community & Practical Support Desk
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] max-w-3xl font-sans leading-relaxed">
            You are never isolated when building complex systems. Connect with peers in dedicated cohort war-rooms and access direct administrative assistance for your college training cell requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Card 1: Batch Collaboration Community */}
          <div className="p-7 rounded-2xl border border-[#E2E8F0] bg-white space-y-6 flex flex-col justify-between shadow-card hover-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5]">
                    <MessageSquare className="w-5 h-5 text-[#3157D5]" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#172033]">
                      Batch Collaboration Community
                    </h3>
                    <p className="text-xs text-[#64748B] font-mono">
                      Private WhatsApp / Telegram Cohort Network
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#0F9F6E] border border-[#A7F3D0] font-semibold">
                  ACTIVE 24/7
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Private WhatsApp/Telegram cohort link for real-time peer troubleshooting, starter code links, and asset kits. Collaborate with hundreds of students and builders from diverse academic backgrounds, including BCA, MCA, B.Tech, BE, B.Com, BBA, B.Sc., and other disciplines building alongside you.
              </p>

              {/* Developer terminal mock (Light Theme) */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-[#64748B] text-[11px] pb-1.5 border-b border-[#E2E8F0]">
                  <span>#cohort-debug-channel</span>
                  <span className="text-[#0F9F6E] font-semibold">● 412 engineers online</span>
                </div>
                <div className="text-[#193B8F]">
                  <span className="text-[#64748B]">mentor_rahul:</span> Pushed starter repo for Day 14 JWT refresh token rotation:
                </div>
                <div className="p-2 rounded bg-white border border-[#E2E8F0] text-[#0F9F6E] text-[11px] font-mono overflow-x-auto">
                  git clone https://github.com/internkul-labs/auth-microservice-v2.git
                </div>
                <div className="text-[#475569] text-[11px]">
                  <span className="text-[#64748B]">vikram_btech:</span> Verified on Postman. Branch merged successfully!
                </div>
              </div>

              <ul className="space-y-2 text-xs text-[#475569]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0F9F6E] shrink-0" />
                  <span>Real-time peer troubleshooting, code reviews & pull requests</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0F9F6E] shrink-0" />
                  <span>Curated asset kits: UI Figma tokens, mock DB datasets, Postman collections</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0F9F6E] shrink-0" />
                  <span>Weekly mentor AMA voice rooms and capstone architecture reviews</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#F1F5F9] flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopyCommunityLink}
                className="px-4 py-2 rounded-xl bg-[#EEF4FF] hover:bg-[#D8E5FF] border border-[#D8E5FF] text-xs font-mono text-[#3157D5] font-semibold flex items-center gap-2 transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-[#3157D5]" />
                <span>{copiedLink ? "Link Copied!" : "Copy Cohort Hub Link"}</span>
              </button>
              <span className="text-[11px] font-mono text-[#64748B]">
                Invite dispatched immediately upon batch enrollment
              </span>
            </div>
          </div>

          {/* Card 2: Academic & Administrative Help Desk */}
          <div className="p-7 rounded-2xl border border-[#E2E8F0] bg-white space-y-6 flex flex-col justify-between shadow-card hover-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F9F6E]">
                    <Headphones className="w-5 h-5 text-[#0F9F6E]" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#172033]">
                      Academic & Administrative Help Desk
                    </h3>
                    <p className="text-xs text-[#64748B] font-mono">
                      Institutional University Documentation Concierge
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#EEF4FF] text-[#3157D5] border border-[#D8E5FF] font-semibold">
                  &lt; 4HR TURNAROUND
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Dedicated ticketing support for college-specific requirements. Need an expedited NOC confirmation or personalized Joining Letter for your university's T&P cell? Our administrative desk delivers.
              </p>

              {/* 3 Core Services Highlighted */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <div className="text-[#0F9F6E] font-bold text-xs flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>College NOC Verification & Personalized Joining Letters</span>
                  </div>
                  <p className="text-[#64748B] font-sans text-[11px] leading-relaxed">
                    Generated on official corporate letterhead with registration seal, student PRN/roll number, and verified cohort duration.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <div className="text-[#3157D5] font-bold text-xs flex items-center gap-1.5">
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Urgent Certificate Name / Roll-Number Amendments</span>
                  </div>
                  <p className="text-[#64748B] font-sans text-[11px] leading-relaxed">
                    Instant correction workflow if your college examination controller requires spelling adjustments or university registration updates.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <div className="text-amber-600 font-bold text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Direct Employer Confirmation for College Placement Cells</span>
                  </div>
                  <p className="text-[#64748B] font-sans text-[11px] leading-relaxed">
                    Official email confirmation sent straight from our corporate domain to your college Training & Placement Officer (TPO).
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-mono">
              <span className="text-[#64748B]">Support: support@internkul.dev</span>
              <span className="text-[#0F9F6E] font-semibold flex items-center gap-1">
                <span>Fast SLA Guaranteed</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          BLOCK 5: High-Impact Student FAQs & Batch Enrollment CTA
          ========================================================================= */}
      <section className="space-y-12">
        {/* FAQ Accordion Component */}
        <div className="space-y-6">
          <div className="space-y-2 pb-6 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-semibold">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <span className="text-[#CBD5E1]">•</span>
              <span className="text-xs font-sans text-[#64748B]">
                Academic Compliance, Credits & University Approval
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#172033]">
              High-Impact Student & University FAQs
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] max-w-2xl font-sans leading-relaxed">
              Everything you and your college faculty need to know about academic credit transfers, batch shifts, and university-ready credentials.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-white border-[#3157D5] shadow-card"
                      : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1]"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#172033] leading-snug">
                      {faq.q}
                    </span>
                    <div
                      className={`p-1.5 rounded-lg border transition-transform duration-200 shrink-0 ${
                        isOpen
                          ? "bg-[#3157D5] border-[#3157D5] text-white rotate-180"
                          : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-1 border-t border-[#F1F5F9] text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Terminal / Enrollment CTA */}
        <div className="p-7 sm:p-10 rounded-2xl border border-[#E2E8F0] bg-white space-y-6 shadow-card relative overflow-hidden">
          {/* Terminal Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
              <span className="ml-2 text-[#64748B]">internkul-terminal v2.5.0</span>
            </div>
            <div className="text-[#0F9F6E] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0F9F6E] animate-pulse" />
              <span>UPCOMING BATCH ENROLLMENT OPEN</span>
            </div>
          </div>

          {/* Command Line Styling */}
          <div className="p-4 rounded-xl bg-[#0F172A] text-white border border-[#1E293B] font-mono text-xs space-y-2">
            <div className="text-gray-300">
              <span className="text-[#10B981] font-bold">$</span> internkul init --track --batch-2025 --academic-dossier
            </div>
            <div className="text-gray-400 text-[11px]">
              &gt; Verifying University Syllabus Alignment: <span className="text-[#10B981]">CSVTU & AICTE COMPLIANT (100%)</span>
            </div>
            <div className="text-gray-400 text-[11px]">
              &gt; Generating University Project Report & LOR Suite: <span className="text-blue-400">CONFIGURED</span>
            </div>
            <div className="text-gray-400 text-[11px]">
              &gt; Current Status: <span className="text-amber-300 font-bold">Select your stack and reserve your batch seat</span>
            </div>
          </div>

          {/* Terminal Body Content */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
            <div className="space-y-2 max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-[#172033] tracking-tight">
                Select your stack and reserve your batch seat
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Join hundreds of students and graduates from diverse academic backgrounds, including BCA, MCA, B.Tech, BE, B.Com, BBA, B.Sc., and other disciplines, fulfilling their university internship credentials with production code. Choose your tech stack, pick your preferred daily shift (07:30 AM to 08:30 PM), and unlock your academic deliverable suite.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-[#475569]">
                <span className="flex items-center gap-1 text-[#0F9F6E] font-semibold">
                  <Check className="w-3.5 h-3.5" /> Instant Joining Letter Issued
                </span>
                <span className="text-[#CBD5E1]">•</span>
                <span className="flex items-center gap-1 text-[#3157D5] font-semibold">
                  <Check className="w-3.5 h-3.5" /> 4 Flexible Daily Shifts
                </span>
                <span className="text-[#CBD5E1]">•</span>
                <span className="flex items-center gap-1 text-[#0F9F6E] font-semibold">
                  <Check className="w-3.5 h-3.5" /> Letter of Recommendation (Top 40%)
                </span>
              </div>
            </div>

            {/* Primary Enrollment CTA Button */}
            <div className="shrink-0">
              <Link
                href="/tracks"
                className="px-8 py-4 rounded-xl bg-[#3157D5] hover:bg-[#193B8F] text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-card flex items-center justify-center gap-3 group"
              >
                <Terminal className="w-5 h-5 text-blue-200 group-hover:scale-110 transition-transform" />
                <span>Browse Available Batches & Enroll</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
