import {
  VerificationFragment,
  getDataV2,
  isValidOpenCert,
  isWrappedV2Document,
  isWrappedV3Document,
  v2,
  v3,
} from "@trustvc/trustvc";
import registry from "../../public/static/registry.json";
import { DEPLOY_ENV } from "../config";
import { ANALYTICS_EVENTS } from "../constants/analyticsEvents";
import { WrappedOrSignedOpenCertsDocument } from "../shared";
import { certificateNotIssued, certificateRevoked, contractNotFound, invalidArgument, serverError } from "./fragment";
import { GTMEvent, pushGTMEvent } from "./gtm";

export type DocumentSchema = "OA v2" | "OA v3" | "W3C VC";
export type IssuerMethod = "Registry" | "DNS-TXT" | "DNS-DID" | "DID:WEB" | "unknown";
export type SigningAlgorithm = "merkleroot2018" | "BBS2023" | "ECDSA2023" | "unknown";
export type VerificationResult = "valid" | "error";

export interface DocumentVerificationEvent extends GTMEvent {
  event: typeof ANALYTICS_EVENTS.DOCUMENT_VERIFICATION_COMPLETED;
  environment: string;
  document_schema: DocumentSchema;
  issuer_method: IssuerMethod;
  issuer_identity: string;
  signing_algorithm: SigningAlgorithm;
  verification_result: VerificationResult;
  error_code?: string;
}

// Fragment name constants — sourced from @trustvc/trustvc verifier implementations.
// Extend this map to support future signing suites without touching analytics call sites.
const SIGNING_ALGORITHM_FRAGMENT_MAP: Readonly<Record<string, SigningAlgorithm>> = {
  OpenAttestationHash: "merkleroot2018",
  Bbs2023W3CSignatureIntegrity: "BBS2023",
  EcdsaW3CSignatureIntegrity: "ECDSA2023",
};

function isInRegistry(value: string): value is keyof typeof registry.issuers {
  return value in registry.issuers;
}

export const getDocumentSchema = (certificate: WrappedOrSignedOpenCertsDocument): DocumentSchema => {
  if (isWrappedV2Document(certificate)) return "OA v2";
  if (isWrappedV3Document(certificate)) return "OA v3";
  return "W3C VC";
};

export const getIssuerMethod = (certificate: WrappedOrSignedOpenCertsDocument): IssuerMethod => {
  if (isWrappedV2Document(certificate)) {
    const issuer = getDataV2(certificate).issuers[0];
    const type = issuer?.identityProof?.type;
    if (type === v2.IdentityProofType.DNSTxt) return "DNS-TXT";
    if (type === v2.IdentityProofType.DNSDid) return "DNS-DID";
    if (issuer && (issuer.certificateStore || issuer.documentStore)) {
      // Legacy OpenCerts issuers use a bare DID identity proof (no DNS record) and are
      // trusted instead by having their document/certificate store on the gated OpenCerts registry.
      const documentStore = issuer.certificateStore ?? issuer.documentStore ?? "";
      if (documentStore && isInRegistry(documentStore)) {
        return "Registry";
      }
    }
    return "unknown";
  }
  if (isWrappedV3Document(certificate)) {
    return certificate.openAttestationMetadata.identityProof.type === v3.IdentityProofType.DNSDid
      ? "DNS-DID"
      : "unknown";
  }
  // W3C VC: derive from the DID method in the issuer field
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const issuer = (certificate as any).issuer;
  const issuerId: string = typeof issuer === "string" ? issuer : issuer?.id ?? "";
  if (issuerId.startsWith("did:web:")) return "DID:WEB";
  return "unknown";
};

export const getIssuerIdentity = (certificate: WrappedOrSignedOpenCertsDocument): string => {
  if (isWrappedV2Document(certificate)) {
    const issuer = getDataV2(certificate).issuers[0];
    if (!issuer) return "";
    const documentStore = issuer.certificateStore ?? issuer.documentStore ?? issuer.tokenRegistry ?? "";
    if (documentStore && isInRegistry(documentStore)) {
      return registry.issuers[documentStore as keyof typeof registry.issuers].name;
    }
    return issuer.identityProof?.location ?? "";
  }
  if (isWrappedV3Document(certificate)) {
    return certificate.openAttestationMetadata.identityProof.identifier;
  }
  // W3C VC
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const issuer = (certificate as any).issuer;
  return typeof issuer === "string" ? issuer : issuer?.id ?? "";
};

export const getSigningAlgorithm = (
  certificate: WrappedOrSignedOpenCertsDocument,
  fragments: VerificationFragment[]
): SigningAlgorithm => {
  // OA V2/V3 always use SHA3 Merkle proof
  if (isWrappedV2Document(certificate) || isWrappedV3Document(certificate)) return "merkleroot2018";

  // W3C VC: identify algorithm from whichever DOCUMENT_INTEGRITY verifier was not skipped
  const activeFragment = fragments.find(
    (f) => f.type === "DOCUMENT_INTEGRITY" && f.status !== "SKIPPED" && f.name in SIGNING_ALGORITHM_FRAGMENT_MAP
  );
  return activeFragment ? SIGNING_ALGORITHM_FRAGMENT_MAP[activeFragment.name] : "unknown";
};

export const getErrorCode = (
  certificate: WrappedOrSignedOpenCertsDocument,
  fragments: VerificationFragment[],
  isValid: boolean = isValidOpenCert(fragments)
): string | undefined => {
  if (isValid) return undefined;

  // W3C VC failures map to a single catch-all code, matching existing saga behaviour
  if (!isWrappedV2Document(certificate) && !isWrappedV3Document(certificate)) return "INVALID_DOCUMENT";

  const errors: string[] = [];
  if (!isValidOpenCert(fragments, ["DOCUMENT_INTEGRITY"])) errors.push("CERTIFICATE_HASH");

  if (!isValidOpenCert(fragments, ["DOCUMENT_STATUS"])) {
    if (certificateNotIssued(fragments)) errors.push("UNISSUED_CERTIFICATE");
    else if (certificateRevoked(fragments)) errors.push("REVOKED_CERTIFICATE");
    else if (serverError(fragments)) errors.push("SERVER_ERROR");
    else if (invalidArgument(fragments)) errors.push("INVALID_ARGUMENT");
    else if (contractNotFound(fragments)) errors.push("CERTIFICATE_STORE_NOT_FOUND");
    else errors.push("ETHERS_UNHANDLED_ERROR");
  }

  if (!isValidOpenCert(fragments, ["ISSUER_IDENTITY"])) errors.push("ISSUER_IDENTITY");

  return errors.length > 0 ? errors.join(",") : undefined;
};

export const getVerificationResult = (
  certificate: WrappedOrSignedOpenCertsDocument,
  fragments: VerificationFragment[]
): VerificationResult => (isValidOpenCert(fragments) ? "valid" : "error");

export const buildVerificationEvent = (
  certificate: WrappedOrSignedOpenCertsDocument,
  fragments: VerificationFragment[],
  isValid: boolean = isValidOpenCert(fragments)
): DocumentVerificationEvent => {
  const verificationResult: VerificationResult = isValid ? "valid" : "error";
  const errorCode = isValid ? undefined : getErrorCode(certificate, fragments, false);
  const payload: DocumentVerificationEvent = {
    event: ANALYTICS_EVENTS.DOCUMENT_VERIFICATION_COMPLETED,
    environment: DEPLOY_ENV,
    document_schema: getDocumentSchema(certificate),
    issuer_method: getIssuerMethod(certificate),
    issuer_identity: getIssuerIdentity(certificate),
    signing_algorithm: getSigningAlgorithm(certificate, fragments),
    verification_result: verificationResult,
  };
  payload.error_code = errorCode;
  return payload;
};

/**
 * Builds and pushes a GTM event for a completed verification attempt.
 * Wraps everything in try/catch — analytics failures must never affect the application.
 */
export const pushVerificationEvent = (
  certificate: WrappedOrSignedOpenCertsDocument,
  fragments: VerificationFragment[],
  isValid?: boolean
): void => {
  try {
    pushGTMEvent(buildVerificationEvent(certificate, fragments, isValid ?? isValidOpenCert(fragments)));
  } catch {
    // Analytics failures must never affect the application
  }
};
