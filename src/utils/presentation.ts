import { EmbeddedVerifiableCredential, VerifiablePresentation, WrappedOrSignedOpenCertsDocument } from "../shared";

/** The VC Data Model 2.0 context URL — the first `@context` entry of a v2 document. */
const VC_V2_CONTEXT = "https://www.w3.org/ns/credentials/v2";

/**
 * Whether trustvc's verifier will treat this document as a Verifiable Presentation.
 *
 * This deliberately mirrors the library's own (unexported) router predicate, which looks only
 * at `type` + `verifiableCredential`. If this check were stricter, a document the verifier
 * routes into its VP fragments would be rendered down the credential path instead — where
 * getDataV2 has no data to read and the user sees a generic failure rather than the
 * verifier's actual finding. `proof` is deliberately not required, so an unsigned
 * presentation is still recognised and can be reported as such.
 */
export const isVerifiablePresentation = (document: unknown): document is VerifiablePresentation => {
  if (!document || typeof document !== "object") return false;
  const { type, verifiableCredential } = document as VerifiablePresentation;
  const types = Array.isArray(type) ? type : [type];
  return types.includes("VerifiablePresentation") && verifiableCredential !== undefined;
};

/**
 * The credentials embedded in a presentation, always as an array — `verifiableCredential` may
 * be a single object or a list. Returns [] for anything that is not a presentation.
 */
export const getPresentationCredentials = (document: unknown): EmbeddedVerifiableCredential[] => {
  if (!isVerifiablePresentation(document)) return [];
  const credentials = document.verifiableCredential;
  if (!credentials) return [];
  return Array.isArray(credentials) ? credentials : [credentials];
};

/**
 * A presentation has no issuer of its own: it is asserted by the HOLDER, and each embedded
 * credential carries its own issuer. The holder is who is making the claim to the verifier.
 */
export const getPresentationHolder = (document: unknown): string => {
  if (!isVerifiablePresentation(document)) return "Unknown";
  const holder = typeof document.holder === "string" ? document.holder : document.holder?.id;
  return holder?.toUpperCase() || "Unknown";
};

/**
 * A short label for a credential's tab. Prefers the renderer template name, which is what
 * distinguishes one credential from another on screen; falls back to its `type` (minus the
 * generic `VerifiableCredential`), then to a 1-based position.
 */
export const getCredentialLabel = (credential: EmbeddedVerifiableCredential | undefined, index: number): string => {
  const templateName = [credential?.renderMethod].flat()?.[0]?.templateName;
  if (typeof templateName === "string" && templateName.trim()) {
    return templateName.replace(/_/g, " ");
  }
  const types = [credential?.type].flat().filter(Boolean) as string[];
  const specific = types.find((type) => type !== "VerifiableCredential");
  if (specific) return specific;
  return `Credential ${index + 1}`;
};

/** The issuer DID of an embedded credential, rendered the way every other identity here is. */
export const getCredentialIssuer = (credential: EmbeddedVerifiableCredential | undefined): string => {
  const issuer = credential?.issuer;
  const id = typeof issuer === "string" ? issuer : issuer?.id;
  return id?.toUpperCase() || "Unknown";
};

/**
 * The data-model version label for a credential or presentation: "V2.0" or "V1.1".
 *
 * trustvc's `vc.isSignedDocumentV2_0` only answers this for signed CREDENTIALS, so it cannot
 * classify a presentation envelope; both are decided the same way, by the first `@context`.
 */
export const getW3CVersionLabel = (document: unknown): "V2.0" | "V1.1" => {
  const context = (document as VerifiablePresentation | undefined)?.["@context"];
  const first = [context].flat()[0];
  return first === VC_V2_CONTEXT ? "V2.0" : "V1.1";
};

/**
 * A download filename for one credential inside a presentation.
 *
 * Every tab sharing the presentation's own name would save different credentials over each
 * other, so the credential's label qualifies it: `presentation-degree.opencert`.
 */
export const getCredentialFileName = (
  credential: EmbeddedVerifiableCredential | undefined,
  index: number,
  presentationName = "presentation"
): string => {
  const base = (presentationName || "presentation").replace(/\.(opencert|json)$/i, "");
  const slug = getCredentialLabel(credential, index)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base}-${slug || `credential-${index + 1}`}.opencert`;
};

/** The download name for the presentation itself; `id` is optional on a VP. */
export const getPresentationFileName = (document: unknown): string => {
  const id = (document as VerifiablePresentation | undefined)?.id;
  return typeof id === "string" && id.trim() ? id : "presentation";
};

/**
 * An embedded credential is a standalone W3C VC, so everything downstream of the credential
 * tabs (the renderer, the analytics, the per-credential verification) treats it as a document
 * in its own right.
 */
export const asOpenCertsDocument = (credential: EmbeddedVerifiableCredential): WrappedOrSignedOpenCertsDocument =>
  credential as unknown as WrappedOrSignedOpenCertsDocument;
