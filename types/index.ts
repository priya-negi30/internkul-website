export type CohortDuration = "1D" | "10D" | "20D" | "30D" | "45D";

export type BatchTimingId = "07:30_AM" | "02:00_PM" | "06:00_PM" | "08:30_PM";

export interface BatchTiming {
  id: BatchTimingId;
  timeLabel: string;
  name: string;
  status: "OPEN" | "FILLING_FAST" | "CLOSED";
  suitableFor: string;
}

export type DomainCategory = 
  | "data" 
  | "programming" 
  | "fullstack" 
  | "advanced";

export interface CurriculumDay {
  day: number;
  commitHash: string;
  commitMessage: string;
  milestoneTitle: string;
  topics: string[];
  practicalDeliverable: string;
  codeSnippet?: string;
  hours: number;
}

export interface CapstoneSpec {
  title: string;
  problemStatement: string;
  architecture: string;
  modules: string[];
  deploymentTarget: string;
  repositoryStructure: string;
  academicDocReady: boolean;
}

export interface TrackDurationOption {
  duration: CohortDuration;
  days: number;
  label: string;
  tierName: string;
  sessions: number;
  labHours?: number;
  priceINR: number;
  originalPriceINR: number;
  discountPercent: number;
  academicSupportEligible: boolean;
  lorEligible?: boolean;
  ppoEligible: boolean;
  features: string[];
  synopsisPages: number;
}

export interface Track {
  slug: string;
  name: string;
  shortName: string;
  domain: DomainCategory;
  domainLabel: string;
  summary: string;
  detailedDescription: string;
  technologies: string[];
  primaryStack: string[];
  targetDegrees: ("BCA" | "MCA" | "BE" | "B.Tech" | "B.Com" | "BBA" | "B.Sc." | string)[];
  durationOptions: Record<CohortDuration, TrackDurationOption>;
  availableBatches: BatchTimingId[];
  curriculum: Record<CohortDuration, CurriculumDay[]>;
  capstone: CapstoneSpec;
  featured: boolean;
}

export interface CredentialRecord {
  id: string; // e.g. CG-2026-MERN-104
  studentName: string;
  studentInitials: string;
  degree: string;
  collegeName: string;
  trackSlug: string;
  trackName: string;
  duration: CohortDuration;
  durationDays: number;
  issueDate: string;
  verificationStatus: "VERIFIED" | "REVOKED";
  verifiedAt: string;
  skills: string[];
  githubUrl: string;
  liveDeploymentUrl: string;
  capstoneTitle: string;
  capstoneDescription?: string;
  lorQualified?: boolean;
  ppoQualified: boolean;
  scoreBreakdown: {
    codeQuality: number; // /40
    milestoneSprints: number; // /30
    technicalInterview: number; // /30
    totalScore: number; // /100
  };
  verifiedBy: string;
}

export interface MetricStat {
  label: string;
  value: string;
  subtext: string;
  trend?: string;
}

export interface StudentProfile {
  id: string; // e.g. STU-2026-MERN-8912
  firstName: string;
  lastName?: string;
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  permanentAddress?: string;
  interestedCourseSlug: string;
  interestedCourseName: string;
  interestedTopics: string[];
  authMethod: "google" | "manual";
  registeredAt: string;
  avatarUrl?: string;
}

export interface RegistrationInput {
  firstName: string;
  lastName?: string;
  phone: string;
  countryCode: string;
  email: string;
  permanentAddress: string;
  interestedCourseSlug: string;
  interestedCourseName: string;
  interestedTopics: string[];
  authMethod: "google" | "manual";
  avatarUrl?: string;
}
