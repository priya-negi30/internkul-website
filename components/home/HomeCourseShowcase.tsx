"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ChevronRight, AlertTriangle, RefreshCw } from "lucide-react";
import { useCourses } from "@/context/CourseContext";
import { TrackCard } from "@/components/ui/TrackCard";
import { formatCurrency } from "@/lib/utils";
import { Track } from "@/types";

interface HomeCourseShowcaseProps {
  initialTracks?: Track[];
}

function CourseCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-4 shadow-card animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-4 w-24 bg-[#E2E8F0] rounded-full" />
        <div className="h-4 w-28 bg-[#F1F5F9] rounded-md" />
      </div>
      <div className="h-6 w-3/4 bg-[#E2E8F0] rounded" />
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-[#F1F5F9] rounded" />
        <div className="h-5 w-16 bg-[#F1F5F9] rounded" />
        <div className="h-5 w-16 bg-[#F1F5F9] rounded" />
      </div>
      <div className="space-y-2 py-2">
        <div className="h-3.5 w-full bg-[#F1F5F9] rounded" />
        <div className="h-3.5 w-4/5 bg-[#F1F5F9] rounded" />
      </div>
      <div className="h-12 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl" />
      <div className="pt-3 border-t border-[#F1F5F9] flex justify-between items-center">
        <div className="h-8 w-24 bg-[#E2E8F0] rounded" />
        <div className="h-8 w-28 bg-[#3157D5]/20 rounded-xl" />
      </div>
    </div>
  );
}

export function HomeCourseShowcase({ initialTracks }: HomeCourseShowcaseProps) {
  const { publishedCourses, isReady, isLoading, error, refreshCourses } = useCourses();

  // Published courses: when ready, consume live state from CourseContext (backend API);
  // prior to hydration, fallback to initialTracks or context default to preserve SSR/SEO and avoid mismatch
  const activeCourses = useMemo(() => {
    if (isReady && publishedCourses.length > 0) {
      return publishedCourses;
    }
    const source = initialTracks && initialTracks.length > 0 ? initialTracks : publishedCourses;
    return source.filter((course) => (course as { status?: string }).status !== "draft");
  }, [publishedCourses, isReady, initialTracks]);

  const featuredTracks = useMemo(() => {
    const featured = activeCourses.filter((course) => course.featured);
    if (featured.length > 0) return featured;
    return activeCourses.slice(0, 3);
  }, [activeCourses]);

  const featuredSlugs = useMemo(
    () => new Set(featuredTracks.map((t) => t.slug)),
    [featuredTracks]
  );

  const otherTracks = useMemo(
    () => activeCourses.filter((course) => !featuredSlugs.has(course.slug)).slice(0, 4),
    [activeCourses, featuredSlugs]
  );

  return (
    <section className="py-20 bg-[#EEF4FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#3157D5]">
              Curriculum Domains
            </span>
            <h2 className="font-editorial text-3xl font-bold text-[#172033] mt-1">
              Engineering Courses Designed for India-Wide Students
            </h2>
            <p className="text-sm text-[#64748B] mt-1.5 max-w-xl font-sans">
              Curriculums engineered around live interactive sessions and production tech stacks: MERN, Python, AI/ML, Power BI &amp; SQL, Embedded IoT, .NET Core, and SAP.
            </p>
          </div>

          <Link
            href="/tracks"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#3157D5] hover:text-[#193B8F] transition-colors"
          >
            <span>View All Courses (Full Catalog)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Error State Banner */}
        {error && publishedCourses.length === 0 && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-rose-700">
                  Backend API Sync Notice
                </div>
                <div className="text-sm text-rose-900 mt-0.5">
                  {error}
                </div>
              </div>
            </div>
            <button
              onClick={() => refreshCourses()}
              className="px-4 py-2 rounded-xl bg-white border border-rose-300 text-rose-700 hover:bg-rose-100 font-sans text-xs font-semibold flex items-center gap-2 transition-colors shadow-soft"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Sync</span>
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoading && publishedCourses.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCardSkeleton />
            <CourseCardSkeleton />
            <CourseCardSkeleton />
          </div>
        ) : featuredTracks.length > 0 ? (
          /* Featured Courses Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTracks.map((track) => (
              <TrackCard
                key={track.slug}
                track={track}
                duration="45D"
                showStarterOfferPricing={true}
              />
            ))}
          </div>
        ) : activeCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCourses.slice(0, 3).map((track) => (
              <TrackCard
                key={track.slug}
                track={track}
                duration="45D"
                showStarterOfferPricing={true}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#D8E5FF] bg-white p-10 text-center shadow-card">
            <p className="font-editorial text-lg font-bold text-[#172033]">
              No Courses Currently Published
            </p>
            <p className="text-xs text-[#64748B] mt-1">
              Check back soon for upcoming industrial cohort schedules.
            </p>
          </div>
        )}

        {/* Other Courses Quick Strip */}
        {otherTracks.length > 0 && (
          <div className="pt-4">
            <div className="text-xs font-semibold uppercase text-[#64748B] mb-3">
              Additional Technical Domains Available:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherTracks.map((track) => {
                const startingPrice =
                  track.durationOptions?.["10D"]?.priceINR ??
                  track.durationOptions?.["1D"]?.priceINR ??
                  Object.values(track.durationOptions || {})[0]?.priceINR ??
                  999;

                return (
                  <Link
                    key={track.slug}
                    href={`/tracks/${track.slug}`}
                    className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#3157D5] shadow-soft text-left transition-all block group"
                  >
                    <div className="text-sm font-semibold text-[#172033] group-hover:text-[#3157D5] truncate transition-colors">
                      {track.name}
                    </div>
                    <div className="text-xs text-[#64748B] truncate mt-1">
                      {track.domainLabel} • From {formatCurrency(startingPrice)}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
