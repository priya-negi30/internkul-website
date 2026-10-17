import { apiFetch } from "./client";
import { ApiResponse, BackendDomain } from "./types";

/**
 * Fetch domain categories and track counts from the live backend API.
 */
export async function getDomains(options?: RequestInit): Promise<BackendDomain[]> {
  try {
    const response = await apiFetch<ApiResponse<BackendDomain[]>>("/domains", options);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("[getDomains] Failed to fetch domains from API:", error);
    throw error;
  }
}
