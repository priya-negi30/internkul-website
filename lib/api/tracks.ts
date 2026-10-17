import { Track } from "@/types";
import { apiFetch, ApiError } from "./client";
import { ApiResponse, BackendTrackDetail, BackendTrackSummary } from "./types";
import { mapBackendTracks, mapBackendTrackToTrack } from "./mappers";

/**
 * Fetch all tracks from the live backend API collection.
 * Uses 60-second ISR caching by default on server, fresh in browser.
 */
export async function getTracks(options?: RequestInit): Promise<Track[]> {
  try {
    const fetchOptions: RequestInit = {
      next: { revalidate: 60 },
      ...options,
    };
    const response = await apiFetch<ApiResponse<BackendTrackSummary[]>>(
      "/tracks",
      fetchOptions
    );
    return mapBackendTracks(response.data);
  } catch (error) {
    console.error("[getTracks] Failed to fetch tracks from API:", error);
    throw error;
  }
}

/**
 * Fetch a single track by its slug from the live backend API.
 * Includes complete curriculum milestone data.
 * Returns null if the track was not found (HTTP 404).
 */
export async function getTrackBySlug(
  slug: string,
  options?: RequestInit
): Promise<Track | null> {
  try {
    const encodedSlug = encodeURIComponent(slug);
    const fetchOptions: RequestInit = {
      next: { revalidate: 60 },
      ...options,
    };
    const response = await apiFetch<ApiResponse<BackendTrackDetail>>(
      `/tracks/${encodedSlug}`,
      fetchOptions
    );
    if (!response || !response.data) {
      return null;
    }
    return mapBackendTrackToTrack(response.data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    console.error(`[getTrackBySlug] Failed to fetch track for slug "${slug}":`, error);
    throw error;
  }
}
