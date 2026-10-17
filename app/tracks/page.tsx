"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCourses } from "@/context/CourseContext";
import { CohortDuration } from "@/types";
import { TrackCard } from "@/components/ui/TrackCard";
import {
  Search,
  BookOpen,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  X,
} from "lucide-react";

function TrackCardSkeleton() {
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

function TrackCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { publishedCourses, isReady, isLoading, error, refreshCourses } = useCourses();
  const activeTracks = publishedCourses;

  const selectedDuration = (searchParams.get("duration") as CohortDuration) || "45D";
  const initialSearch = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);

  // Sync search state with URL query parameter
  const updateQueryParam = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    router.replace(`/tracks?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateQueryParam(query);
  };

  const filteredTracks = useMemo(() => {
    if (!searchQuery.trim()) {
      return activeTracks;
    }
    const query = searchQuery.toLowerCase().trim();
    return activeTracks.filter((track) => {
      const matchesName = track.name.toLowerCase().includes(query);
      const matchesSummary = track.summary.toLowerCase().includes(query);
      const matchesStack = track.primaryStack.some((tech) =>
        tech.toLowerCase().includes(query)
      );
      const matchesTechs = track.technologies.some((tech) =>
        tech.toLowerCase().includes(query)
      );
      return matchesName || matchesSummary || matchesStack || matchesTechs;
    });
  }, [searchQuery, activeTracks]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="pb-6 border-b border-[#E2E8F0] space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#3157D5]" />
          <span className="text-xs font-sans font-bold uppercase text-[#3157D5] tracking-wider">
            Technical Education Catalog
          </span>
          <span className="text-[#CBD5E1]">•</span>
          <span className="font-mono text-xs text-[#172033] font-semibold">
            [{isLoading ? "SYNCING..." : `${filteredTracks.length} COURSES AVAILABLE`}]
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-editorial font-bold text-[#172033]">
          Engineering Courses & Live Cohorts
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] max-w-2xl font-sans">
          Curriculums engineered around live interactive sessions with side-by-side practical coding, Git-commit pipelines, and production deployments. Select a duration tier to view adapted sessions and strategic pricing.
        </p>
      </div>

      {/* Backend error notice */}
      {error && publishedCourses.length === 0 && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-rose-700">
                Failed to sync with live backend
              </div>
              <div className="text-sm text-rose-900 mt-0.5">{error}</div>
            </div>
          </div>
          <button
            onClick={() => refreshCourses()}
            className="px-4 py-2 rounded-xl bg-white border border-rose-300 text-rose-700 hover:bg-rose-100 font-sans text-xs font-semibold flex items-center gap-2 transition-colors shadow-soft"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      )}

      {/* Search Bar with Single Clean Border */}
      <div className="relative w-full">
        <Search className="w-5 h-5 text-[#172033] absolute left-4.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search by technology (e.g. React, Python, Docker, FastApi, SQL)..."
          className="w-full pl-12 pr-12 py-3.5 sm:py-4 rounded-2xl bg-white border-2 border-[#172033] text-sm sm:text-base font-sans font-medium text-[#172033] placeholder:text-[#334155] placeholder:font-semibold focus:outline-none focus:border-[#172033] focus:ring-4 focus:ring-[#172033]/15 shadow-card transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearchChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#64748B] hover:text-[#172033] hover:bg-[#F1F5F9] transition-colors"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Loading Skeletons */}
      {isLoading && publishedCourses.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TrackCardSkeleton />
          <TrackCardSkeleton />
          <TrackCardSkeleton />
          <TrackCardSkeleton />
          <TrackCardSkeleton />
          <TrackCardSkeleton />
        </div>
      ) : filteredTracks.length === 0 ? (
        <div className="rounded-2xl border-2 border-[#172033] bg-white p-12 text-center space-y-4 shadow-card">
          <div className="w-12 h-12 rounded-full bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center mx-auto text-[#D97706]">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="font-sans text-sm text-[#172033] font-bold">
            No Courses Match Your Search
          </div>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            Try adjusting your search terms (e.g. React, Python, Docker, Next.js, FastAPI, SQL).
          </p>
          <button
            onClick={() => handleSearchChange("")}
            className="px-4 py-2 rounded-xl bg-[#172033] font-sans text-xs font-semibold text-white hover:bg-[#272757] shadow-soft transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track) => (
            <TrackCard
              key={track.slug}
              track={track}
              duration={selectedDuration}
              showStarterOfferPricing={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TracksCatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center font-sans text-xs text-[#64748B]">
          Loading technical courses...
        </div>
      }
    >
      <TrackCatalogContent />
    </Suspense>
  );
}
