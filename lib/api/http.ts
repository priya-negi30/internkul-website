import { ApiError, apiFetch } from "./client";
import { clearAuthToken, getAuthToken, UNAUTHORIZED_EVENT } from "./token";

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  /** Send the stored bearer token (admin endpoints). */
  auth?: boolean;
  query?: Record<string, string | number | boolean | undefined>;
}

/** Pull the first Laravel validation message out of a 422 payload. */
function friendlyMessage(error: ApiError): string {
  const data = error.data as { errors?: Record<string, string[]>; message?: string } | null;
  if (data && typeof data === "object" && data.errors) {
    const first = Object.values(data.errors)[0];
    if (Array.isArray(first) && first[0]) return first[0];
  }
  return error.message;
}

/**
 * JSON request helper for mutations and authenticated calls.
 * - Adds the Authorization header when `auth` is true.
 * - Turns Laravel validation errors into a readable message.
 * - On 401, clears the token and notifies AuthContext so the UI signs out.
 */
export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = false, query } = options;

  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getAuthToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let url = endpoint;
  if (query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== "") params.set(k, String(v));
    });
    const qs = params.toString();
    if (qs) url += (url.includes("?") ? "&" : "?") + qs;
  }

  try {
    return await apiFetch<T>(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch (error) {
    if (error instanceof ApiError) {
      if (auth && error.status === 401 && typeof window !== "undefined") {
        clearAuthToken();
        window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
      }
      throw new ApiError(friendlyMessage(error), error.status, error.statusText, error.endpoint, error.data);
    }
    throw error;
  }
}
