"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getTracks } from "@/lib/api/tracks";
import { getBatches } from "@/lib/api/batches";
import {
  adminCreateBatch,
  adminCreateTrack,
  adminDeleteBatch,
  adminDeleteTrack,
  adminGetBatches,
  adminGetTracks,
  adminUpdateBatch,
  adminUpdateTrack,
  CohortInput,
} from "@/lib/api/admin";
import { ApiError } from "@/lib/api/client";
import { clearAuthToken, getAuthToken } from "@/lib/api/token";
import { BatchTiming, BatchTimingId, Track } from "@/types";

export type CourseStatus = "active" | "draft";

export type ManagedCourse = Track & {
  status: CourseStatus;
  updatedAt?: string;
  /** Kept optional for older components; the API is now the only source of truth. */
  isLocalOnly?: boolean;
  hasLocalEdits?: boolean;
};

/** A scheduled cohort (admin) — stored in the Laravel API. */
export interface ManagedBatch extends Omit<BatchTiming, "id"> {
  id: string;
  timingId: BatchTimingId;
  trackSlug: string;
  startDate: string;
  seatLimit: number;
  enrolled: number;
  archived: boolean;
}

interface CourseContextValue {
  /** Admin sessions see every course (incl. drafts); visitors see published ones. */
  courses: ManagedCourse[];
  publishedCourses: ManagedCourse[];
  /** Per-track time slots shown to students (derived from each track's availableBatches). */
  batches: ManagedBatch[];
  /** Scheduled cohorts from the admin API (empty for non-admin visitors). */
  cohorts: ManagedBatch[];
  /** Time slots (07:30_AM, ...). */
  timings: BatchTiming[];
  isReady: boolean;
  isLoading: boolean;
  error: string | null;
  getCourses: () => ManagedCourse[];
  getCourseBySlug: (slug: string) => ManagedCourse | undefined;
  addCourse: (course: ManagedCourse) => Promise<void>;
  updateCourse: (slug: string, updated: Partial<ManagedCourse>) => Promise<void>;
  deleteCourse: (slug: string) => Promise<void>;
  addBatch: (batch: Partial<ManagedBatch> & { trackSlug: string; timingId: BatchTimingId }) => Promise<ManagedBatch>;
  updateBatch: (id: string, updated: Partial<ManagedBatch>) => Promise<void>;
  deleteBatch: (id: string) => Promise<void>;
  refreshCourses: () => Promise<void>;
}

const CourseContext = createContext<CourseContextValue | undefined>(undefined);

/** Builds the per-track time-slot list used by the public BatchSelector. */
function buildTrackBatches(trackList: Track[], timings: BatchTiming[]): ManagedBatch[] {
  const timingMap = new Map(timings.map((t) => [t.id, t]));
  return trackList.flatMap((track) =>
    (track.availableBatches || []).flatMap((timingId) => {
      const timing = timingMap.get(timingId);
      if (!timing) return [];
      return [
        {
          id: `${track.slug}-${timingId}`,
          timingId,
          trackSlug: track.slug,
          timeLabel: timing.timeLabel,
          name: timing.name,
          status: timing.status,
          suitableFor: timing.suitableFor,
          startDate: "",
          seatLimit: 30,
          enrolled: 0,
          archived: false,
        } satisfies ManagedBatch,
      ];
    })
  );
}

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading: authLoading } = useAuth();
  const isAdmin = user?.role === "admin";

  const [courses, setCourses] = useState<ManagedCourse[]>([]);
  const [cohorts, setCohorts] = useState<ManagedBatch[]>([]);
  const [timings, setTimings] = useState<BatchTiming[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(
    async (silent = false) => {
      if (!silent) setIsLoading(true);
      setError(null);

      try {
        const timingList = await getBatches({ cache: "no-store" });
        let trackList: ManagedCourse[] | null = null;
        let cohortList: ManagedBatch[] = [];

        if (isAdmin && getAuthToken()) {
          try {
            const [adminTracks, adminCohorts] = await Promise.all([adminGetTracks(), adminGetBatches()]);
            trackList = adminTracks;
            cohortList = adminCohorts as ManagedBatch[];
          } catch (adminErr) {
            // Expired/invalid token: fall back to the public catalogue.
            if (adminErr instanceof ApiError && (adminErr.status === 401 || adminErr.status === 403)) {
              clearAuthToken();
            } else {
              throw adminErr;
            }
          }
        }

        if (!trackList) {
          const publicTracks = await getTracks({ cache: "no-store" });
          trackList = publicTracks.map((t) => ({ ...t, status: "active" as const }));
        }

        setTimings(timingList);
        setCourses(trackList);
        setCohorts(cohortList);
      } catch (apiErr) {
        console.error("CourseProvider: Failed to load from backend API:", apiErr);
        setError(apiErr instanceof Error ? apiErr.message : "Unable to connect to the course API");
        setCourses([]);
        setCohorts([]);
        setTimings([]);
      } finally {
        setIsLoading(false);
        setIsReady(true);
      }
    },
    [isAdmin]
  );

  // Load once auth has settled, and reload when the user signs in or out.
  useEffect(() => {
    if (authLoading) return;
    void loadData();
  }, [authLoading, loadData]);

  const publishedCourses = useMemo(() => courses.filter((c) => c.status === "active"), [courses]);

  const batches = useMemo(() => buildTrackBatches(publishedCourses, timings), [publishedCourses, timings]);

  const value = useMemo<CourseContextValue>(
    () => ({
      courses,
      publishedCourses,
      batches,
      cohorts,
      timings,
      isReady,
      isLoading,
      error,
      getCourses: () => courses,
      getCourseBySlug: (slug) => courses.find((course) => course.slug === slug),

      addCourse: async (course) => {
        await adminCreateTrack(course as unknown as Record<string, unknown>);
        await loadData(true);
      },
      updateCourse: async (slug, updated) => {
        await adminUpdateTrack(slug, updated as unknown as Record<string, unknown>);
        await loadData(true);
      },
      deleteCourse: async (slug) => {
        await adminDeleteTrack(slug);
        await loadData(true);
      },

      addBatch: async (batch) => {
        const created = (await adminCreateBatch(batch as CohortInput)) as ManagedBatch;
        setCohorts((current) => [...current, created]);
        return created;
      },
      updateBatch: async (id, updated) => {
        const saved = (await adminUpdateBatch(id, updated as CohortInput)) as ManagedBatch;
        setCohorts((current) => current.map((b) => (b.id === id ? saved : b)));
      },
      deleteBatch: async (id) => {
        await adminDeleteBatch(id);
        setCohorts((current) => current.filter((b) => b.id !== id));
      },

      refreshCourses: async () => {
        await loadData();
      },
    }),
    [courses, publishedCourses, batches, cohorts, timings, isReady, isLoading, error, loadData]
  );

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
}
