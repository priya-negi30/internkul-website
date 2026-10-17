import { CredentialRecord, Track } from "@/types";
import { apiRequest } from "./http";
import { mapBackendTrackToTrack } from "./mappers";
import {
  AdminCohort,
  AdminDashboard,
  AdminInquiry,
  AdminStudent,
  ApiResponse,
  BackendTrackDetail,
  PaginatedResponse,
} from "./types";

export type AdminTrack = Track & { status: "active" | "draft"; updatedAt?: string };

/* ───────── Tracks (courses) ───────── */

function toAdminTrack(raw: BackendTrackDetail & { status?: string; updatedAt?: string }): AdminTrack {
  return {
    ...mapBackendTrackToTrack(raw),
    status: raw.status === "draft" ? "draft" : "active",
    updatedAt: raw.updatedAt,
  };
}

/** Fields the API accepts for a track (everything else is stripped client-side). */
const TRACK_FIELDS = [
  "slug", "name", "shortName", "domain", "domainLabel", "summary", "detailedDescription",
  "technologies", "primaryStack", "targetDegrees", "featured", "status",
  "availableBatches", "durationOptions", "capstone", "curriculum",
] as const;

export function toTrackPayload(course: Record<string, unknown>): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const key of TRACK_FIELDS) {
    if (key in course && course[key] !== undefined) payload[key] = course[key];
  }
  return payload;
}

export async function adminGetTracks(): Promise<AdminTrack[]> {
  const res = await apiRequest<ApiResponse<BackendTrackDetail[]>>("/admin/tracks", {
    auth: true,
    query: { include_curriculum: 1 },
  });
  return (res.data || []).map(toAdminTrack);
}

export async function adminCreateTrack(payload: Record<string, unknown>): Promise<AdminTrack> {
  const res = await apiRequest<ApiResponse<BackendTrackDetail>>("/admin/tracks", {
    method: "POST",
    auth: true,
    body: toTrackPayload(payload),
  });
  return toAdminTrack(res.data);
}

export async function adminUpdateTrack(slug: string, payload: Record<string, unknown>): Promise<AdminTrack> {
  const res = await apiRequest<ApiResponse<BackendTrackDetail>>(`/admin/tracks/${encodeURIComponent(slug)}`, {
    method: "PUT",
    auth: true,
    body: toTrackPayload(payload),
  });
  return toAdminTrack(res.data);
}

export async function adminDeleteTrack(slug: string): Promise<void> {
  await apiRequest(`/admin/tracks/${encodeURIComponent(slug)}`, { method: "DELETE", auth: true });
}

/* ───────── Scheduled batches (cohorts) ───────── */

export type CohortInput = Partial<
  Pick<AdminCohort, "trackSlug" | "timingId" | "startDate" | "seatLimit" | "enrolled" | "status" | "archived">
>;

const COHORT_FIELDS = ["trackSlug", "timingId", "startDate", "seatLimit", "enrolled", "status", "archived"] as const;

function toCohortPayload(input: CohortInput): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const key of COHORT_FIELDS) {
    if (key in input && input[key] !== undefined) payload[key] = input[key];
  }
  if ("startDate" in payload) payload.startDate = payload.startDate || null;
  return payload;
}

export async function adminGetBatches(): Promise<AdminCohort[]> {
  const res = await apiRequest<ApiResponse<AdminCohort[]>>("/admin/batches", { auth: true });
  return res.data || [];
}

export async function adminCreateBatch(input: CohortInput): Promise<AdminCohort> {
  const res = await apiRequest<ApiResponse<AdminCohort>>("/admin/batches", {
    method: "POST",
    auth: true,
    body: toCohortPayload(input),
  });
  return res.data;
}

export async function adminUpdateBatch(id: string, input: CohortInput): Promise<AdminCohort> {
  const res = await apiRequest<ApiResponse<AdminCohort>>(`/admin/batches/${encodeURIComponent(id)}`, {
    method: "PUT",
    auth: true,
    body: toCohortPayload(input),
  });
  return res.data;
}

export async function adminDeleteBatch(id: string): Promise<void> {
  await apiRequest(`/admin/batches/${encodeURIComponent(id)}`, { method: "DELETE", auth: true });
}

/* ───────── Dashboard ───────── */

export async function adminGetDashboard(): Promise<AdminDashboard> {
  const res = await apiRequest<ApiResponse<AdminDashboard>>("/admin/dashboard", { auth: true });
  return res.data;
}

/* ───────── Inquiries ───────── */

export interface ListQuery {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
  type?: string;
}

export function adminGetInquiries(query: ListQuery = {}) {
  return apiRequest<PaginatedResponse<AdminInquiry>>("/admin/inquiries", { auth: true, query: { ...query } });
}

export async function adminUpdateInquiry(
  id: number,
  body: { status?: AdminInquiry["status"]; adminNotes?: string | null }
): Promise<AdminInquiry> {
  const res = await apiRequest<ApiResponse<AdminInquiry>>(`/admin/inquiries/${id}`, {
    method: "PUT",
    auth: true,
    body,
  });
  return res.data;
}

export async function adminDeleteInquiry(id: number): Promise<void> {
  await apiRequest(`/admin/inquiries/${id}`, { method: "DELETE", auth: true });
}

/* ───────── Students ───────── */

export function adminGetStudents(query: ListQuery = {}) {
  return apiRequest<PaginatedResponse<AdminStudent>>("/admin/students", { auth: true, query: { ...query } });
}

export async function adminDeleteStudent(id: string): Promise<void> {
  await apiRequest(`/admin/students/${encodeURIComponent(id)}`, { method: "DELETE", auth: true });
}

/* ───────── Credentials ───────── */

export type CredentialInput = Partial<
  Pick<
    CredentialRecord,
    | "studentName" | "degree" | "collegeName" | "trackSlug" | "duration" | "durationDays" | "issueDate"
    | "verificationStatus" | "skills" | "githubUrl" | "liveDeploymentUrl" | "capstoneTitle"
    | "capstoneDescription" | "lorQualified" | "ppoQualified" | "verifiedBy" | "scoreBreakdown"
  >
> & { id?: string };

export function adminGetCredentials(query: ListQuery = {}) {
  return apiRequest<PaginatedResponse<CredentialRecord>>("/admin/credentials", { auth: true, query: { ...query } });
}

export async function adminCreateCredential(input: CredentialInput): Promise<CredentialRecord> {
  const res = await apiRequest<ApiResponse<CredentialRecord>>("/admin/credentials", {
    method: "POST",
    auth: true,
    body: input,
  });
  return res.data;
}

export async function adminUpdateCredential(id: string, input: CredentialInput): Promise<CredentialRecord> {
  const res = await apiRequest<ApiResponse<CredentialRecord>>(`/admin/credentials/${encodeURIComponent(id)}`, {
    method: "PUT",
    auth: true,
    body: input,
  });
  return res.data;
}

export async function adminDeleteCredential(id: string): Promise<void> {
  await apiRequest(`/admin/credentials/${encodeURIComponent(id)}`, { method: "DELETE", auth: true });
}
