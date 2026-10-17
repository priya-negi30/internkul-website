import { ApiHealthResponse } from "./types";

export const DEFAULT_API_BASE_URL = "https://internkul.aondigicon.com/api/v1";

export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, "");
  }
  return DEFAULT_API_BASE_URL;
}

export class ApiError extends Error {
  public status: number;
  public statusText: string;
  public endpoint: string;
  public data: unknown;

  constructor(
    message: string,
    status: number,
    statusText: string,
    endpoint: string,
    data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.endpoint = endpoint;
    this.data = data;
  }
}

export interface ApiFetchOptions extends RequestInit {
  timeoutMs?: number;
}

/**
 * Centralized typed HTTP client with error handling, timeouts, and JSON parsing.
 */
export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;

  const { timeoutMs = 12000, headers, ...restOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...restOptions,
      signal: options.signal || controller.signal,
      headers: {
        Accept: "application/json",
        ...headers,
      },
    });

    clearTimeout(timeoutId);

    // Read payload safely
    const contentType = response.headers.get("content-type") || "";
    let data: unknown = null;
    if (contentType.includes("application/json")) {
      data = await response.json().catch(() => null);
    } else {
      data = await response.text().catch(() => null);
    }

    if (!response.ok) {
      let errorMessage = `API request to ${cleanEndpoint} failed with HTTP ${response.status} (${response.statusText})`;
      if (
        data &&
        typeof data === "object" &&
        "message" in data &&
        typeof (data as { message: unknown }).message === "string"
      ) {
        errorMessage = (data as { message: string }).message;
      }
      throw new ApiError(
        errorMessage,
        response.status,
        response.statusText,
        cleanEndpoint,
        data
      );
    }

    return data as T;
  } catch (error) {
    // Preserve Next.js internal control flow errors (DYNAMIC_SERVER_USAGE, NOT_FOUND, REDIRECT)
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest: unknown }).digest === "string"
    ) {
      throw error;
    }

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError(
        `Request to ${cleanEndpoint} timed out after ${timeoutMs}ms`,
        408,
        "Request Timeout",
        cleanEndpoint
      );
    }

    const message =
      error instanceof Error ? error.message : "Unknown network error occurred";
    throw new ApiError(message, 0, "Network Error", cleanEndpoint, error);
  }
}

/**
 * Connectivity test verifying the backend is reachable.
 */
export async function checkApiHealth(): Promise<ApiHealthResponse> {
  return apiFetch<ApiHealthResponse>("/health", { cache: "no-store" });
}
