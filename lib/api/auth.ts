import { apiRequest } from "./http";
import { clearAuthToken, setAuthToken } from "./token";

export type UserRole = "admin" | "user";

export interface ApiAuthUser {
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string | null;
}

interface LoginResponse {
  data: { user: ApiAuthUser; token: string; tokenType: string };
}

export async function loginRequest(email: string, password: string): Promise<ApiAuthUser> {
  const res = await apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: { email, password },
  });
  setAuthToken(res.data.token);
  return res.data.user;
}

export async function fetchCurrentUser(): Promise<ApiAuthUser> {
  const res = await apiRequest<{ data: ApiAuthUser }>("/auth/me", { auth: true });
  return res.data;
}

export async function logoutRequest(): Promise<void> {
  try {
    await apiRequest("/auth/logout", { method: "POST", auth: true });
  } catch {
    /* token may already be invalid; local cleanup below is what matters */
  } finally {
    clearAuthToken();
  }
}
