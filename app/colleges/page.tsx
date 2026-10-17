import React from "react";
import { Metadata } from "next";
import { CollegeInquiryForm } from "@/components/colleges/CollegeInquiryForm";
import { Users, LayoutDashboard, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "For Colleges & Institutional Partnerships (TPOs & HODs)",
  description:
    "Technical training infrastructure for higher education institutions across diverse academic disciplines. Bulk cohort onboarding, faculty progress dashboards, and university industrial report compliance.",
  openGraph: {
    title: "Institutional Infrastructure for Colleges | internkul",
    description: "Partner with internkul for campus industrial training and MoU collaboration across higher education institutions.",
  },
};

export default function CollegesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="pb-6 border-b border-[#E2E8F0] space-y-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-semibold">
            INSTITUTIONAL INFRASTRUCTURE
          </span>
          <span className="text-[#CBD5E1]">•</span>
          <span className="text-xs font-sans text-[#64748B]">
            For TPOs, Principals & Department Heads Across Higher Education Institutions
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-editorial font-bold text-[#172033]">
          Technical Training Infrastructure for Your Students.
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] max-w-3xl font-sans leading-relaxed">
          Upgrade your institution&apos;s vocational and industrial training outcomes. internkul partners directly with colleges and universities to deliver structured live technical cohorts for students from diverse academic backgrounds—including BCA, MCA, B.Tech, BE, B.Com, BBA, B.Sc., and other disciplines—with reproducible GitHub portfolios and university-aligned documentation.
        </p>
      </div>

      {/* 3 Core Institutional Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
        {/* Pillar 1 */}
        <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 flex flex-col justify-between shadow-card hover-card">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] flex items-center justify-center text-[#3157D5]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#172033]">
              Bulk Cohort Onboarding
            </h3>
            <p className="text-[#64748B] leading-relaxed text-xs">
              Seamlessly onboard entire semester batches (50 to 300+ students) into specialized technology streams (MERN, Python/FastAPI, AI/ML, Data Analytics, IoT) with dedicated batch timings.
            </p>
          </div>
          <div className="pt-3 border-t border-[#F1F5F9] text-xs font-medium text-[#3157D5]">
            ✓ Custom institutional scheduling
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 flex flex-col justify-between shadow-card hover-card">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#0F9F6E]">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#172033]">
              Faculty Progress Dashboard
            </h3>
            <p className="text-[#64748B] leading-relaxed text-xs">
              Department heads and training coordinators receive live administrative access to inspect student session attendance, daily Git commit counts, and project milestone completion in real time.
            </p>
          </div>
          <div className="pt-3 border-t border-[#F1F5F9] text-xs font-medium text-[#0F9F6E]">
            ✓ Real-time attendance & commit audits
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 flex flex-col justify-between shadow-card hover-card">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] flex items-center justify-center text-[#193B8F]">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#172033]">
              Structured Documentation
            </h3>
            <p className="text-[#64748B] leading-relaxed text-xs">
              Complete deliverable dossiers generated for every student: structured Project Report, official Letter of Recommendation from Aon Digicon LLP, and authenticated training certificate.
            </p>
          </div>
          <div className="pt-3 border-t border-[#F1F5F9] text-xs font-medium text-[#193B8F]">
            ✓ Zero administrative headache for HODs
          </div>
        </div>
      </section>

      {/* Conceptual Faculty Progress Dashboard UI Mockup */}
      <section id="dashboard" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#E2E8F0] gap-2">
          <div>
            <div className="text-xs font-semibold uppercase text-[#3157D5]">
              Administrative Portal Preview
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#172033] mt-0.5">
              Faculty Progress & Department Audit Portal
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#0F9F6E] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
            [CONSOLE: LIVE]
          </span>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 space-y-6 shadow-card font-sans text-xs">
          {/* Top Admin Summary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9] text-[#64748B]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F9F6E]" />
              <span className="text-[#172033] font-bold">
                DEPARTMENT: COMPUTER SCIENCE & ENGINEERING
              </span>
              <span className="text-[#CBD5E1]">|</span>
              <span>BATCH: 2026 COHORT (SEM VI)</span>
            </div>
            <div className="text-xs">
              Enrolled: <strong className="text-[#172033]">84 Students</strong> • Active Attendance: <strong className="text-[#0F9F6E]">97.6%</strong>
            </div>
          </div>

          {/* Sample Student Progress Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-xs text-[#64748B] uppercase">
                  <th className="pb-3 font-semibold">Student Name</th>
                  <th className="pb-3 font-semibold">Course</th>
                  <th className="pb-3 font-semibold">Session Attendance</th>
                  <th className="pb-3 font-semibold">Git Commits</th>
                  <th className="pb-3 font-semibold">Sprint Milestones</th>
                  <th className="pb-3 font-semibold">Academic Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] text-[#172033] text-xs">
                <tr className="hover:bg-[#F8FAFC]">
                  <td className="py-3.5 font-semibold text-[#172033]">Aayush Sharma</td>
                  <td className="py-3.5 text-[#64748B]">MERN (45 Days)</td>
                  <td className="py-3.5 text-[#0F9F6E] font-bold">96% (43/45 Days)</td>
                  <td className="py-3.5 font-mono">128 Commits</td>
                  <td className="py-3.5 text-[#0F9F6E] font-medium">6/6 Completed</td>
                  <td className="py-3.5 text-[#3157D5] font-medium">✓ Signed & Verified</td>
                </tr>
                <tr className="hover:bg-[#F8FAFC]">
                  <td className="py-3.5 font-semibold text-[#172033]">Priyanka Verma</td>
                  <td className="py-3.5 text-[#64748B]">AI/ML (45 Days)</td>
                  <td className="py-3.5 text-[#0F9F6E] font-bold">98% (44/45 Days)</td>
                  <td className="py-3.5 font-mono">142 Commits</td>
                  <td className="py-3.5 text-[#0F9F6E] font-medium">6/6 Completed</td>
                  <td className="py-3.5 text-[#3157D5] font-medium">✓ Signed & Verified</td>
                </tr>
                <tr className="hover:bg-[#F8FAFC]">
                  <td className="py-3.5 font-semibold text-[#172033]">Rohan Dewangan</td>
                  <td className="py-3.5 text-[#64748B]">Data BI (30 Days)</td>
                  <td className="py-3.5 text-[#0F9F6E] font-bold">93% (28/30 Days)</td>
                  <td className="py-3.5 font-mono">89 Commits</td>
                  <td className="py-3.5 text-[#0F9F6E] font-medium">4/4 Completed</td>
                  <td className="py-3.5 text-[#3157D5] font-medium">✓ Signed & Verified</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Institutional MoU Inquiry Form */}
      <section id="mou" className="space-y-4">
        <CollegeInquiryForm />
      </section>
    </div>
  );
}
