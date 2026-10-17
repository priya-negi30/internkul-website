import {
  BatchTiming,
  BatchTimingId,
  CapstoneSpec,
  CohortDuration,
  CredentialRecord,
  CurriculumDay,
  DomainCategory,
  Track,
  TrackDurationOption,
} from "@/types";

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiHealthResponse {
  status: "ok" | string;
  database: "connected" | string;
  time?: string;
}

export interface BackendTrackSummary {
  slug: string;
  name: string;
  shortName: string;
  domain: DomainCategory;
  domainLabel: string;
  summary: string;
  detailedDescription: string;
  technologies: string[];
  primaryStack: string[];
  targetDegrees: string[];
  featured: boolean;
  availableBatches: BatchTimingId[];
  startingPriceINR: number;
  durationOptions: Record<CohortDuration, TrackDurationOption>;
  capstone: CapstoneSpec;
  curriculum?: Record<CohortDuration, CurriculumDay[]>;
}

export interface BackendTrackDetail extends BackendTrackSummary {
  curriculum: Record<CohortDuration, CurriculumDay[]>;
}

export interface BackendDomain {
  id: string;
  label: string;
  trackCount: number;
  countText: string;
}

export interface CredentialVerificationSuccessResponse {
  verified: true;
  data: CredentialRecord;
  message?: string;
}

export interface CredentialVerificationFailureResponse {
  verified: false;
  message: string;
  data?: null;
}

export type CredentialVerificationResponse =
  | CredentialVerificationSuccessResponse
  | CredentialVerificationFailureResponse;

/* ───────── Admin API shapes ───────── */

export interface PaginatedResponse<T> {
  data: T[];
  meta: { currentPage: number; lastPage: number; perPage: number; total: number };
}

export interface AdminCohort {
  id: string;
  timingId: BatchTimingId;
  trackSlug: string;
  timeLabel: string;
  name: string;
  status: "OPEN" | "FILLING_FAST" | "CLOSED";
  suitableFor: string;
  startDate: string;
  seatLimit: number;
  enrolled: number;
  seatsLeft?: number;
  archived: boolean;
}

export interface AdminDashboard {
  courses: { total: number; active: number; draft: number };
  batches: { scheduled: number; archived: number };
  students: { total: number };
  inquiries: { total: number; new: number };
  credentials: { verified: number; revoked: number };
  recentInquiries: AdminInquiry[];
  recentStudents: AdminStudent[];
}

export interface AdminInquiry {
  id: number;
  type: "contact" | "college";
  name: string;
  email: string;
  phone: string | null;
  enquiryCategory: string | null;
  interestedCourse: string | null;
  institutionName: string | null;
  designation: string | null;
  numberOfStudents: string | null;
  preferredDuration: string | null;
  preferredTrainingWindow: string | null;
  message: string | null;
  status: "new" | "contacted" | "closed";
  adminNotes: string | null;
  createdAt: string;
}

export interface AdminStudent {
  id: string;
  firstName: string;
  lastName: string | null;
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  permanentAddress: string | null;
  interestedCourseSlug: string;
  interestedCourseName: string;
  interestedTopics: string[];
  authMethod: "google" | "manual";
  registeredAt: string;
  avatarUrl: string | null;
}
