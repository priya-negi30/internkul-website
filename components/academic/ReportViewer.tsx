"use client";

import React, { useState } from "react";
import { ACADEMIC_REPORT_CHAPTERS } from "@/data/academic";
import { ChevronRight, BookOpen, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReportViewer() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const currentChapter = ACADEMIC_REPORT_CHAPTERS[activeChapterIndex];

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-card">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 bg-[#F8FAFC] border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] flex items-center justify-center text-[#3157D5]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="font-editorial text-xl font-bold text-[#172033]">
              Student Industrial Training Report & Synopsis
            </div>
            <div className="text-xs text-[#64748B] flex items-center gap-2 mt-0.5">
              <span className="font-semibold text-[#193B8F]">AICTE FORMAT-ALIGNED</span>
              <span className="text-[#CBD5E1]">•</span>
              <span>Comprehensive Project Dossier</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#0F9F6E] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
            ✓ Faculty Sign-Off Ready
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
        {/* Left Sidebar: 10 Chapters Index */}
        <div className="lg:col-span-4 border-r border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-1 overflow-y-auto max-h-[600px]">
          <div className="px-3 py-2 text-xs uppercase text-[#64748B] font-bold tracking-wider font-sans">
            Table of Contents (10 Chapters)
          </div>

          {ACADEMIC_REPORT_CHAPTERS.map((chap, idx) => {
            const isActive = activeChapterIndex === idx;

            return (
              <button
                key={chap.id}
                onClick={() => setActiveChapterIndex(idx)}
                className={cn(
                  "w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 group",
                  isActive
                    ? "bg-white text-[#172033] border border-[#E2E8F0] font-semibold shadow-soft"
                    : "text-[#64748B] hover:text-[#172033] hover:bg-white/60"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs px-2 py-0.5 rounded-md border shrink-0",
                    isActive
                      ? "bg-[#EEF4FF] text-[#3157D5] border-[#D8E5FF] font-bold"
                      : "bg-white text-[#64748B] border-[#E2E8F0]"
                  )}
                >
                  {chap.chapterNumber}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="text-xs truncate font-medium">
                    {chap.title}
                  </div>
                  <div className="text-[11px] text-[#94A3B8] truncate mt-0.5">
                    {chap.subsections.length} Subsections
                  </div>
                </div>

                {isActive && (
                  <ChevronRight className="w-4 h-4 text-[#3157D5] shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Main Preview: Chapter Reader */}
        <div className="lg:col-span-8 p-6 sm:p-10 bg-white flex flex-col justify-between">
          <div className="space-y-6">
            {/* Chapter Header */}
            <div className="pb-4 border-b border-[#F1F5F9]">
              <div className="font-mono text-xs text-[#3157D5] font-bold mb-1">
                CHAPTER {currentChapter.chapterNumber}
              </div>
              <h4 className="font-editorial text-2xl font-bold text-[#172033]">
                {currentChapter.title}
              </h4>
              <p className="text-sm text-[#64748B] mt-1.5 leading-relaxed font-sans">
                {currentChapter.summary}
              </p>
            </div>

            {/* Subsections tags */}
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase text-[#64748B] tracking-wider">
                Document Subsections Included in Report
              </div>
              <div className="flex flex-wrap gap-2">
                {currentChapter.subsections.map((sub, sidx) => (
                  <span
                    key={sidx}
                    className="text-xs font-sans px-3 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] font-medium"
                  >
                    § {currentChapter.chapterNumber}.{sidx + 1} {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Syllabus / Report Elements */}
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase text-[#64748B] tracking-wider">
                Formal Documentation Requirements
              </div>
              <div className="space-y-2">
                {currentChapter.content.map((item, cidx) => (
                  <div
                    key={cidx}
                    className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5 text-xs text-[#172033]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0F9F6E] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Verbatim Excerpt */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold uppercase text-[#64748B] tracking-wider">
                Verbatim Document Excerpt (Page Preview)
              </div>
              <div className="p-4 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-xs text-[#193B8F] italic leading-relaxed border-l-4 border-l-[#3157D5]">
                &ldquo;{currentChapter.sampleExcerpt}&rdquo;
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="pt-6 mt-8 border-t border-[#F1F5F9] flex items-center justify-between">
            <button
              disabled={activeChapterIndex === 0}
              onClick={() => setActiveChapterIndex((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-xl bg-white border border-[#E2E8F0] text-xs font-medium text-[#475569] hover:text-[#172033] hover:border-[#CBD5E1] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous Chapter
            </button>

            <span className="text-xs font-mono text-[#64748B]">
              Chapter {activeChapterIndex + 1} of {ACADEMIC_REPORT_CHAPTERS.length}
            </span>

            <button
              disabled={activeChapterIndex === ACADEMIC_REPORT_CHAPTERS.length - 1}
              onClick={() => setActiveChapterIndex((prev) => Math.min(ACADEMIC_REPORT_CHAPTERS.length - 1, prev + 1))}
              className="px-4 py-2 rounded-xl bg-[#3157D5] text-white text-xs font-medium hover:bg-[#193B8F] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next Chapter →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
