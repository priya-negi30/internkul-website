import { BatchTiming } from "@/types";
import { apiFetch } from "./client";
import { ApiResponse } from "./types";
import { mapBackendBatches } from "./mappers";

/**
 * Fetch all available cohort batch timings from the live backend API.
 * Uses 60-second ISR caching by default on server.
 */
export async function getBatches(options?: RequestInit): Promise<BatchTiming[]> {
  try {
    const fetchOptions: RequestInit = {
      next: { revalidate: 60 },
      ...options,
    };
    const response = await apiFetch<ApiResponse<BatchTiming[]>>("/batches", fetchOptions);
    return mapBackendBatches(response.data);
  } catch (error) {
    console.error("[getBatches] Failed to fetch batches from API:", error);
    throw error;
  }
}
