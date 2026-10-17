import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { verifyCredential } from "@/lib/api/credentials";
import { CertificatePreview } from "@/components/certificates/CertificatePreview";
import { StatusPill } from "@/components/ui/StatusPill";
import {
  AlertTriangle,
  ShieldAlert,
  GitBranch,
  ExternalLink,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await verifyCredential(id);

  if (!result || !result.data) {
    return {
      title: `Credential Not Found: ${id} | internkul`,
      description: `No credential found with identifier ${id} in the internkul permanent credential registry.`,
    };
  }

  const credential = result.data;
  const isRevoked = result.status === "REVOKED";
  const prefix = isRevoked ? "[REVOKED] Credential Record:" : "Verified Credential:";

  return {
    title: `${prefix} ${credential.studentName} (${credential.id}) | internkul`,
    description: `Public authenticated credential for ${credential.studentName} in ${credential.trackName} (${credential.durationDays} days). Live deployment and GitHub proof-of-work authenticated by internkul.`,
  };
}

export const dynamic = "force-dynamic";

export default async function VerifiedCredentialPage({ params }: PageProps) {
  const { id } = await params;
  const cleanId = id.trim().toUpperCase();
  const result = await verifyCredential(cleanId);

  // Network / server error state
  if (result.status === "ERROR") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6 font-sans">
        <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-soft">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-rose-600 uppercase">
            REGISTRY LOOKUP TEMPORARILY UNAVAILABLE
          </div>
          <h1 className="font-editorial text-3xl font-bold text-[#172033]">
            Unable to Authenticate Identifier &ldquo;{cleanId}&rdquo;
          </h1>
          <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
            {result.message || "A network error occurred while querying the credential registry. Please verify your internet connection and try again."}
          </p>
        </div>

        <div className="pt-4 flex justify-center gap-4 text-xs font-semibold">
          <Link
            href="/verify"
            className="px-5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#172033] hover:bg-[#F8FAFC] shadow-soft transition-colors"
          >
            ← Back to Registry Search
          </Link>
          <Link
            href={`/verify/${cleanId}`}
            className="px-5 py-2.5 rounded-xl bg-[#3157D5] text-white hover:bg-[#193B8F] shadow-sm transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Verification</span>
          </Link>
        </div>
      </div>
    );
  }

  // Not found / invalid ID state
  if (result.status === "NOT_FOUND" || !result.data) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6 font-sans">
        <div className="w-16 h-16 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#D97706] flex items-center justify-center mx-auto shadow-soft">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-[#D97706] uppercase">
            STATUS: CREDENTIAL_NOT_FOUND
          </div>
          <h1 className="font-editorial text-3xl font-bold text-[#172033]">
            Certificate ID &ldquo;{cleanId}&rdquo; Could Not Be Verified
          </h1>
          <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
            {result.message ||
              "The certificate ID you requested does not exist in the internkul permanent credential registry. Verify that the ID was typed correctly (format: CG-YEAR-TRACK-NUM)."}
          </p>
        </div>

        <div className="pt-4 flex justify-center gap-4 text-xs font-semibold">
          <Link
            href="/verify"
            className="px-5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#172033] hover:bg-[#F8FAFC] shadow-soft transition-colors"
          >
            ← Try Another Identifier
          </Link>
          <Link
            href="/verify/CG-2026-MERN-104"
            className="px-5 py-2.5 rounded-xl bg-[#3157D5] text-white hover:bg-[#193B8F] shadow-sm transition-colors"
          >
            View Sample Credential (CG-2026-MERN-104)
          </Link>
        </div>
      </div>
    );
  }

  const credential = result.data;
  const isRevoked = result.status === "REVOKED";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/verify"
          className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#64748B] hover:text-[#172033] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Verification Portal</span>
        </Link>
      </div>

      {/* Revocation Warning Alert if Status is REVOKED */}
      {isRevoked && (
        <div className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="font-sans text-sm font-bold text-rose-900 uppercase tracking-wide">
              ATTENTION: CREDENTIAL HAS BEEN REVOKED
            </div>
            <p className="font-sans text-xs text-rose-800 mt-1 leading-relaxed">
              This credential was officially revoked by the internkul certification board and is no longer valid. Any academic or corporate claims associated with this credential identifier have been rescinded.
            </p>
          </div>
        </div>
      )}

      {/* Main Public Proof-of-Work Dossier */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-10 space-y-8 shadow-card font-sans">
        {/* Top Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F1F5F9] gap-4">
          <div className="space-y-1">
            <div className="text-xs uppercase text-[#64748B] font-semibold tracking-wider">
              Authenticated Credential Record
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-[#172033]">
                {credential.id}
              </span>
              <StatusPill status={credential.verificationStatus} />
              {credential.lorQualified && !isRevoked && (
                <StatusPill status="LOR_ELIGIBLE" />
              )}
              {credential.ppoQualified && !isRevoked && (
                <StatusPill status="PPO_ELIGIBLE" />
              )}
            </div>
          </div>

          <div className="text-left sm:text-right text-xs text-[#64748B]">
            <div>
              Date of Issue: <strong className="text-[#172033]">{credential.issueDate}</strong>
            </div>
            <div className="text-xs font-semibold text-[#0F9F6E] mt-0.5">
              Permanent Public Registry
            </div>
          </div>
        </div>

        {/* Student & Program Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5 shadow-soft">
            <div className="text-[#64748B] text-[11px] font-semibold uppercase">
              Student Candidate
            </div>
            <div className="text-xl font-editorial font-bold text-[#172033]">
              {credential.studentName}
            </div>
            <div className="text-[#475569] font-medium">{credential.degree}</div>
            <div className="text-[#64748B] pt-0.5">{credential.collegeName}</div>
          </div>

          <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5 shadow-soft">
            <div className="text-[#64748B] text-[11px] font-semibold uppercase">
              Cohort Program
            </div>
            <div className="text-xl font-editorial font-bold text-[#172033]">
              {credential.trackName}
            </div>
            <div className="text-[#475569]">
              Duration:{" "}
              <strong className="text-[#172033]">{credential.durationDays} Days</strong>{" "}
              Comprehensive Immersion
            </div>
            <div className="text-[#0F9F6E] font-medium pt-0.5">
              ✓ All sprint milestones validated
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 shadow-soft">
            <div className="text-[#64748B] text-[11px] font-semibold uppercase">
              PPO Evaluation Score
            </div>
            <div className="text-3xl font-editorial font-bold text-[#172033]">
              {credential.scoreBreakdown.totalScore} / 100
            </div>
            <div className="text-xs text-[#64748B] space-y-0.5 font-mono">
              <div>Code Quality: {credential.scoreBreakdown.codeQuality}/40</div>
              <div>Milestones: {credential.scoreBreakdown.milestoneSprints}/30</div>
              <div>Defense: {credential.scoreBreakdown.technicalInterview}/30</div>
            </div>
          </div>
        </div>

        {/* Capstone & Proof of Work Links */}
        <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E2E8F0] gap-3">
            <div>
              <div className="text-xs text-[#64748B] uppercase font-semibold">
                Capstone Production Artifact
              </div>
              <h3 className="text-lg font-bold text-[#172033] font-editorial mt-0.5">
                {credential.capstoneTitle}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {credential.githubUrl && (
                <a
                  href={credential.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#CBD5E1] text-xs font-semibold text-[#172033] hover:bg-[#F8FAFC] shadow-soft transition-colors"
                >
                  <GitBranch className="w-3.5 h-3.5 text-[#3157D5]" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                </a>
              )}

              {credential.liveDeploymentUrl && (
                <a
                  href={credential.liveDeploymentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#3157D5] text-white text-xs font-semibold hover:bg-[#193B8F] shadow-sm transition-all"
                >
                  <span>Live App Deployment</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {credential.capstoneDescription && (
            <p className="text-xs text-[#64748B] leading-relaxed font-sans">
              {credential.capstoneDescription}
            </p>
          )}

          {/* Assessed Skills */}
          {credential.skills && credential.skills.length > 0 && (
            <div className="pt-2 space-y-2">
              <div className="text-xs text-[#64748B] uppercase font-semibold">
                Assessed Technical Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {credential.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md bg-white border border-[#E2E8F0] text-xs font-mono font-medium text-[#193B8F] shadow-soft"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Printable/Saveable Certificate Presentation */}
      <section className="space-y-4">
        <CertificatePreview credential={credential} />
      </section>
    </div>
  );
}
