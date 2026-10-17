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
import { BackendTrackDetail, BackendTrackSummary } from "./types";

const EMPTY_CURRICULUM: Record<CohortDuration, CurriculumDay[]> = {
  "1D": [],
  "10D": [],
  "20D": [],
  "30D": [],
  "45D": [],
};

/**
 * Maps a backend track summary or detail record to the canonical frontend Track model.
 * Performs explicit validation and safe fallback resolution for the curriculum field.
 */
export function mapBackendTrackToTrack(
  backendTrack: BackendTrackSummary | BackendTrackDetail,
  overrideCurriculum?: Record<CohortDuration, CurriculumDay[]>
): Track {
  const curriculum =
    backendTrack.curriculum ||
    overrideCurriculum ||
    EMPTY_CURRICULUM;

  return {
    slug: String(backendTrack.slug || "").trim(),
    name: String(backendTrack.name || "").trim(),
    shortName: String(backendTrack.shortName || backendTrack.name || "").trim(),
    domain: (backendTrack.domain || "fullstack") as DomainCategory,
    domainLabel: String(backendTrack.domainLabel || "").trim(),
    summary: String(backendTrack.summary || "").trim(),
    detailedDescription: String(backendTrack.detailedDescription || "").trim(),
    technologies: Array.isArray(backendTrack.technologies)
      ? backendTrack.technologies.map(String)
      : [],
    primaryStack: Array.isArray(backendTrack.primaryStack)
      ? backendTrack.primaryStack.map(String)
      : [],
    targetDegrees: Array.isArray(backendTrack.targetDegrees)
      ? backendTrack.targetDegrees.map(String)
      : ["BCA", "MCA", "B.Tech"],
    featured: Boolean(backendTrack.featured),
    availableBatches: Array.isArray(backendTrack.availableBatches)
      ? (backendTrack.availableBatches as BatchTimingId[])
      : ["07:30_AM", "02:00_PM", "06:00_PM", "08:30_PM"],
    durationOptions: (backendTrack.durationOptions || {}) as Record<
      CohortDuration,
      TrackDurationOption
    >,
    capstone: (backendTrack.capstone || {
      title: "Industrial Capstone Project",
      problemStatement: "",
      architecture: "",
      modules: [],
      deploymentTarget: "Production",
      repositoryStructure: "monorepo",
      academicDocReady: true,
    }) as CapstoneSpec,
    curriculum,
  };
}

/**
 * Maps an array of backend track summaries to canonical frontend Track models.
 */
export function mapBackendTracks(
  backendTracks: BackendTrackSummary[]
): Track[] {
  if (!Array.isArray(backendTracks)) return [];
  return backendTracks.map((t) => mapBackendTrackToTrack(t));
}

/**
 * Maps and validates a batch timing record from the backend.
 */
export function mapBackendBatchToBatchTiming(
  raw: BatchTiming
): BatchTiming {
  return {
    id: raw.id,
    timeLabel: String(raw.timeLabel || ""),
    name: String(raw.name || ""),
    status: raw.status || "OPEN",
    suitableFor: String(raw.suitableFor || ""),
  };
}

/**
 * Maps an array of batch timings from the backend.
 */
export function mapBackendBatches(
  rawBatches: BatchTiming[]
): BatchTiming[] {
  if (!Array.isArray(rawBatches)) return [];
  return rawBatches.map(mapBackendBatchToBatchTiming);
}

/**
 * Maps and validates a verified credential record.
 */
export function mapBackendCredentialRecord(
  raw: CredentialRecord
): CredentialRecord {
  return {
    id: String(raw.id || "").trim(),
    studentName: String(raw.studentName || "").trim(),
    studentInitials: String(raw.studentInitials || "").trim(),
    degree: String(raw.degree || "").trim(),
    collegeName: String(raw.collegeName || "").trim(),
    trackSlug: String(raw.trackSlug || "").trim(),
    trackName: String(raw.trackName || "").trim(),
    duration: raw.duration,
    durationDays: Number(raw.durationDays || 45),
    issueDate: String(raw.issueDate || "").trim(),
    verificationStatus: raw.verificationStatus === "REVOKED" ? "REVOKED" : "VERIFIED",
    verifiedAt: String(raw.verifiedAt || "").trim(),
    skills: Array.isArray(raw.skills) ? raw.skills.map(String) : [],
    githubUrl: String(raw.githubUrl || "").trim(),
    liveDeploymentUrl: String(raw.liveDeploymentUrl || "").trim(),
    capstoneTitle: String(raw.capstoneTitle || "").trim(),
    capstoneDescription: raw.capstoneDescription ? String(raw.capstoneDescription) : undefined,
    lorQualified: Boolean(raw.lorQualified),
    ppoQualified: Boolean(raw.ppoQualified),
    scoreBreakdown: {
      codeQuality: Number(raw.scoreBreakdown?.codeQuality || 0),
      milestoneSprints: Number(raw.scoreBreakdown?.milestoneSprints || 0),
      technicalInterview: Number(raw.scoreBreakdown?.technicalInterview || 0),
      totalScore: Number(raw.scoreBreakdown?.totalScore || 0),
    },
    verifiedBy: String(raw.verifiedBy || "").trim(),
  };
}
