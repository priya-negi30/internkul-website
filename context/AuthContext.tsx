"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { StudentProfile, RegistrationInput } from "@/types";
import {
  clearAuthToken,
  fetchCurrentUser,
  getAuthToken,
  loginRequest,
  logoutRequest,
  registerStudentRequest,
  UNAUTHORIZED_EVENT,
} from "@/lib/api";

export type UserRole = "admin" | "user";
export interface AuthUser {
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}
interface GoogleAuthProfile {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string;
}
interface AuthContextType {
  student: StudentProfile | null;
  user: AuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  googleProfile: GoogleAuthProfile | null;
  connectWithGoogle: () => Promise<GoogleAuthProfile>;
  disconnectGoogle: () => void;
  login: (email: string, password: string) => Promise<AuthUser>;
  registerStudent: (input: RegistrationInput) => Promise<StudentProfile>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STUDENT_KEY = "internkul_student_profile";
const AUTH_KEY = "internkul_auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [googleProfile, setGoogleProfile] = useState<GoogleAuthProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const dropSession = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {
      /* ignore */
    }
  };

  // Restore the session. Admin sessions are re-validated against the API;
  // a stored "admin" role without a valid server token is never trusted.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const storedStudent = localStorage.getItem(STUDENT_KEY);
        const storedUser = localStorage.getItem(AUTH_KEY);
        if (storedStudent) setStudent(JSON.parse(storedStudent) as StudentProfile);

        if (storedUser) {
          const parsed = JSON.parse(storedUser) as AuthUser;
          if (parsed.role === "admin" || getAuthToken()) {
            try {
              if (!getAuthToken()) throw new Error("no token");
              const me = await fetchCurrentUser();
              if (!cancelled) {
                setUser({ email: me.email, name: me.name, role: me.role, avatarUrl: me.avatarUrl || undefined });
              }
            } catch {
              clearAuthToken();
              if (!cancelled) dropSession();
            }
          } else if (!cancelled) {
            setUser(parsed);
          }
        } else if (storedStudent) {
          const profile = JSON.parse(storedStudent) as StudentProfile;
          const restored: AuthUser = { email: profile.email, name: profile.fullName, role: "user", avatarUrl: profile.avatarUrl };
          if (!cancelled) setUser(restored);
          localStorage.setItem(AUTH_KEY, JSON.stringify(restored));
        }
      } catch (error) {
        console.error("Failed to restore Internkul session", error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    // Any admin API call that comes back 401 signs the user out.
    const onUnauthorized = () => dropSession();
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    return () => {
      cancelled = true;
      window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    };
  }, []);

  const persistUser = (nextUser: AuthUser) => {
    setUser(nextUser);
    try { localStorage.setItem(AUTH_KEY, JSON.stringify(nextUser)); } catch (error) { console.error("Could not persist session", error); }
  };

  // Real login against POST /auth/login. The role comes from the server.
  const login = async (email: string, password: string): Promise<AuthUser> => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password.trim()) throw new Error("Enter your email and password.");
    const apiUser = await loginRequest(normalizedEmail, password);
    const nextUser: AuthUser = {
      email: apiUser.email,
      name: apiUser.name,
      role: apiUser.role,
      avatarUrl: apiUser.avatarUrl || student?.avatarUrl,
    };
    persistUser(nextUser);
    return nextUser;
  };

  const connectWithGoogle = async (): Promise<GoogleAuthProfile> => {
    const mockGoogleUser: GoogleAuthProfile = {
      email: "aryan.sharma@gmail.com", firstName: "Aryan", lastName: "Sharma", fullName: "Aryan Sharma",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    };
    setGoogleProfile(mockGoogleUser);
    return mockGoogleUser;
  };
  const disconnectGoogle = () => setGoogleProfile(null);

  // Registers the student through POST /students/register (stored server-side).
  const registerStudent = async (input: RegistrationInput): Promise<StudentProfile> => {
    const newProfile = await registerStudentRequest({
      ...input,
      firstName: input.firstName.trim(),
      lastName: input.lastName ? input.lastName.trim() : undefined,
      email: input.email.trim(),
      phone: input.phone.trim(),
      avatarUrl: input.avatarUrl || googleProfile?.avatarUrl,
    });
    setStudent(newProfile);
    try { localStorage.setItem(STUDENT_KEY, JSON.stringify(newProfile)); } catch (error) { console.error("Failed to persist student profile", error); }
    // Students have no admin token: this local session is display-only.
    persistUser({ email: newProfile.email.toLowerCase(), name: newProfile.fullName, role: "user", avatarUrl: newProfile.avatarUrl });
    return newProfile;
  };

  const logout = () => {
    if (getAuthToken()) void logoutRequest();
    clearAuthToken();
    setStudent(null); setUser(null); setGoogleProfile(null);
    try { localStorage.removeItem(STUDENT_KEY); localStorage.removeItem(AUTH_KEY); } catch (error) { console.error("Failed to clear session", error); }
  };

  return <AuthContext.Provider value={{ student, user, isLoggedIn: !!user, isLoading, googleProfile, connectWithGoogle, disconnectGoogle, login, registerStudent, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
