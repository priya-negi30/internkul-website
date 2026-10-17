/**
 * Browser-side storage of the admin API bearer token.
 * The token is issued by POST /auth/login and sent on every admin request.
 */
const TOKEN_KEY = "internkul_auth_token";
export const UNAUTHORIZED_EVENT = "internkul:unauthorized";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAuthToken(token: string): void {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* storage unavailable */
  }
}

export function clearAuthToken(): void {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable */
  }
}
