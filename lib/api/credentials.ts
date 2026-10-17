import { CredentialRecord } from "@/types";
import { apiFetch, ApiError } from "./client";
import { CredentialVerificationResponse } from "./types";
import { mapBackendCredentialRecord } from "./mappers";

export interface CredentialVerificationResult {
  verified: boolean;
  status: "VERIFIED" | "REVOKED" | "NOT_FOUND" | "ERROR";
  data: CredentialRecord | null;
  message?: string;
}

/**
 * Verify a student credential against the permanent live credential registry.
 * Handles 200 OK (verified / revoked), 404 (not found), and HTTP error states.
 */
export async function verifyCredential(
  id: string,
  options?: RequestInit
): Promise<CredentialVerificationResult> {
  const cleanId = encodeURIComponent(id.trim().toUpperCase());

  try {
    const response = await apiFetch<CredentialVerificationResponse>(
      `/credentials/verify/${cleanId}`,
      {
        ...options,
        // Bypass cached response for accurate live verification lookup
        cache: options?.cache || "no-store",
      }
    );

    if (response && response.verified && response.data) {
      const record = mapBackendCredentialRecord(response.data);
      const isRevoked = record.verificationStatus === "REVOKED";

      return {
        verified: !isRevoked,
        status: isRevoked ? "REVOKED" : "VERIFIED",
        data: record,
        message: response.message,
      };
    }

    return {
      verified: false,
      status: "NOT_FOUND",
      data: null,
      message: response?.message || "No credential found with this ID.",
    };
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        let msg = "No credential found with this ID.";
        if (
          error.data &&
          typeof error.data === "object" &&
          "message" in error.data &&
          typeof (error.data as { message: unknown }).message === "string"
        ) {
          msg = (error.data as { message: string }).message;
        }
        return {
          verified: false,
          status: "NOT_FOUND",
          data: null,
          message: msg,
        };
      }
    }

    console.error(`[verifyCredential] Error verifying credential "${id}":`, error);
    return {
      verified: false,
      status: "ERROR",
      data: null,
      message: error instanceof Error ? error.message : "Failed to verify credential.",
    };
  }
}
