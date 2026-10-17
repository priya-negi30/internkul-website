import React from "react";
import Link from "next/link";
import { GraduationCap, MapPin, CheckCircle2 } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white text-[#64748B] text-xs font-sans">
      {/* Top Banner: Nationwide Developer Mission */}
      <div className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0F9F6E]" />
            <span className="text-[#172033] text-xs font-medium">
              Live Cohorts Active • Engineering Sessions Scheduled Daily
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#64748B]">
            <span className="flex items-center gap-1.5 font-medium text-[#475569]">
              <MapPin className="w-3.5 h-3.5 text-[#3157D5]" />
              <span>Built in Chhattisgarh</span>
            </span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="text-[#172033] font-medium">
              Designed for students and graduates from diverse academic backgrounds, including BCA, MCA, B.Tech, BE, B.Com, BBA, B.Sc., and other disciplines
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#3157D5] to-[#193B8F] flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-[#172033]">
                internkul
              </span>
            </div>

            <p className="text-[#64748B] leading-relaxed text-sm pr-4 max-w-sm">
              India-wide technical industrial training & internship platform. Engineering cohorts with interactive live sessions, Git workflows, academic industrial project reports, and verified letters of recommendation.
            </p>

            <div className="p-3.5 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-xs space-y-1 max-w-sm">
              <div className="text-[#193B8F] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3157D5]" />
                <span>AICTE-Aligned Support</span>
              </div>
              <p className="text-[#475569] text-[11px] leading-normal">
                Structured industrial documentation, comprehensive project reports, and letters of recommendation for students and graduates from diverse academic backgrounds, including BCA, MCA, B.Tech, BE, B.Com, BBA, B.Sc., and other disciplines.
              </p>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div className="space-y-3">
            <div className="text-[#172033] font-semibold text-xs uppercase tracking-wider">
              Learning Courses
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tracks" className="text-[#64748B] hover:text-[#3157D5] transition-colors">
                  All Technical Courses
                </Link>
              </li>
              <li>
                <Link href="/tracks/mern-full-stack" className="text-[#64748B] hover:text-[#3157D5] transition-colors">
                  MERN Full-Stack
                </Link>
              </li>
              <li>
                <Link href="/tracks/python-development" className="text-[#64748B] hover:text-[#3157D5] transition-colors">
                  Python Backend & Systems
                </Link>
              </li>
              <li>
                <Link href="/tracks/ai-ml" className="text-[#64748B] hover:text-[#3157D5] transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/tracks/power-bi-sql" className="text-[#64748B] hover:text-[#3157D5] transition-colors">
                  Data Analytics (BI & SQL)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Institutions */}
          <div className="space-y-3">
            <div className="text-[#172033] font-semibold text-xs uppercase tracking-wider">
              Institutions & Verification
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/colleges" className="text-[#64748B] hover:text-[#3157D5] transition-colors">
                  For Colleges & TPOs
                </Link>
              </li>
              <li>
                <Link href="/colleges#mou" className="text-[#64748B] hover:text-[#3157D5] transition-colors">
                  Institutional MoU Application
                </Link>
              </li>
              <li>
                <Link href="/internship-matrix" className="text-[#64748B] hover:text-[#3157D5] transition-colors">
                  Project Report & Deliverables
                </Link>
              </li>
              <li>
                <Link href="/verify" className="text-[#64748B] hover:text-[#3157D5] transition-colors flex items-center gap-1.5">
                  <span>Verify Credential</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#EEF4FF] text-[#3157D5] font-semibold">
                    CG-*
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#64748B] hover:text-[#3157D5] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Trust */}
          <div className="space-y-3">
            <div className="text-[#172033] font-semibold text-xs uppercase tracking-wider">
              About internkul
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-[#172033] font-medium">Headquarters:</span>
                <span className="block text-[#64748B]">Chhattisgarh, India</span>
              </li>
              <li>
                <span className="text-[#172033] font-medium">Target Audience:</span>
                <span className="block text-[#64748B]">Students and graduates from diverse academic backgrounds, including BCA, MCA, B.Tech, BE, B.Com, BBA, B.Sc., and other disciplines</span>
              </li>
              <li>
                <span className="text-[#172033] font-medium">Daily Batches:</span>
                <span className="block font-mono text-[11px] text-[#475569] mt-0.5">
                  07:30 AM • 02:00 PM • 06:00 PM • 08:30 PM
                </span>
              </li>
              <li className="pt-1.5">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#3157D5] hover:text-[#193B8F] transition-colors"
                >
                  <span>Student & Academic Help Desk &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div>
            © {new Date().getFullYear()} internkul. All rights reserved. Built in Chhattisgarh. Designed for students and graduates from diverse academic backgrounds, including BCA, MCA, B.Tech, BE, B.Com, BBA, B.Sc., and other disciplines.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-[#172033] transition-colors">Contact Us</Link>
            <span className="hover:text-[#172033] cursor-pointer">Academic Standards</span>
            <span className="hover:text-[#172033] cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-[#172033] cursor-pointer">Verification Registry</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
