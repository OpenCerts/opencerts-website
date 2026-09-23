import { VerificationFragment } from "@trustvc/trustvc";
import {
  PRESENTATION_MESSAGES,
  PRESENTATION_TYPES,
  PresentationFailureMessage,
} from "../constants/PresentationErrorMessages";
import { getCredentialLabel, getPresentationCredentials } from "../utils/presentation";

/** The three fragments trustvc emits for a presentation envelope. */
export const VP_FRAGMENT_NAMES = ["W3CVpSignatureIntegrity", "W3CVpCredentialStatus", "W3CVpIssuerIdentity"];

/** Whether a verification run was carried out by the presentation verifiers. */
export const hasPresentationFragments = (fragments: VerificationFragment[]): boolean =>
  fragments.some((fragment) => VP_FRAGMENT_NAMES.includes(fragment.name) && fragment.status !== "SKIPPED");

/**
 * Every reason across the failing presentation fragments. More than one can fail at once — an
 * unresolvable issuer fails both the signature and the identity check — so all of them are
 * considered, letting the specific explanation win over the generic one.
 */
const failingReasons = (fragments: VerificationFragment[]): string[] =>
  fragments
    .filter(
      (fragment) =>
        VP_FRAGMENT_NAMES.includes(fragment.name) && (fragment.status === "INVALID" || fragment.status === "ERROR")
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((fragment) => (fragment as any)?.reason?.message ?? "");

/**
 * Names the embedded credential(s) a verifier reason blames — by POSITION and by the label its
 * tab shows, e.g. `Credential 2 ("DEGREE")`.
 *
 * Each half alone is wrong. Position alone ("Credential 2", or the verifier's zero-based
 * "index 1") names nothing on screen, because tabs are labelled by template or type. Label
 * alone is ambiguous, because two credentials of the same type produce two identical tabs.
 * Together they are unambiguous: tabs render in credential order, so the position locates the
 * tab and the label confirms it.
 *
 * Reasons carry indices in several shapes, and more than one at a time —
 * "Embedded credential at index 0 has expired (...)",
 * "Could not resolve issuer(s): index 0 (did:web:a), index 1 (did:web:b)." — so every
 * `index N` is collected, not just the first.
 */
export const credentialsAtFault = (reason: string, document?: unknown): { phrase: string; plural: boolean } => {
  // Written as an exec loop rather than matchAll + Set spread: the build targets ES5, where
  // spreading an iterator is not available.
  const pattern = /\bindex (\d+)/gi;
  const indices: number[] = [];
  let match = pattern.exec(reason);
  while (match !== null) {
    const index = Number(match[1]);
    if (!indices.includes(index)) indices.push(index);
    match = pattern.exec(reason);
  }
  indices.sort((a, b) => a - b);
  if (indices.length === 0) return { phrase: "A credential", plural: false };

  const credentials = getPresentationCredentials(document);
  const names = indices.map((index) => {
    const position = `Credential ${index + 1}`;
    const credential = credentials[index];
    if (!credential) return position;
    const label = getCredentialLabel(credential, index);
    // getCredentialLabel falls back to this exact string; do not repeat it.
    return label === position ? position : `${position} ("${label}")`;
  });

  return {
    phrase: names.length === 1 ? names[0] : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`,
    plural: names.length > 1,
  };
};

/**
 * Ordered most specific first — the first match wins. Three orderings are load-bearing:
 *
 * - **Embedded-credential failures before presentation-level ones.** "Presentation has expired
 *   (validUntil ...)" and "Embedded credential at index 0 has expired (validUntil ...)" both
 *   contain "has expired". A single rule would catch the credential case and tell the user to
 *   ask the holder to present again — advice that can never work, because only the issuer can
 *   reissue a credential. An expired presentation is the holder's to fix; an expired
 *   credential is the issuer's.
 * - **Issuer resolution before tampering.** Checking an embedded credential's signature needs
 *   its issuer's public key, so an unpublished DID also fails DOCUMENT_INTEGRITY — with a raw
 *   TypeError about "verificationMethod". Matched the other way round, an intact presentation
 *   is reported as tampered with. Root cause beats symptom.
 * - **Revocation before tampering**, for the same reason: it is the more actionable answer,
 *   and a credential revoked after signing leaves the proof intact anyway.
 */
const PRESENTATION_FAILURES: { match: RegExp; type: string }[] = [
  { match: /no verifiable credentials/i, type: PRESENTATION_TYPES.NO_CREDENTIALS },
  {
    match: /embedded credential .*(has been revoked|has been suspended)/i,
    type: PRESENTATION_TYPES.CREDENTIAL_REVOKED,
  },
  { match: /embedded credential .*has expired/i, type: PRESENTATION_TYPES.CREDENTIAL_EXPIRED },
  { match: /embedded credential .*is not yet valid/i, type: PRESENTATION_TYPES.CREDENTIAL_NOT_YET_VALID },
  { match: /revoked|suspended/i, type: PRESENTATION_TYPES.REVOKED },
  { match: /could not resolve issuer|have no issuer/i, type: PRESENTATION_TYPES.ISSUER_UNRESOLVED },
  { match: /invalid signature|tampered/i, type: PRESENTATION_TYPES.TAMPERED },
  { match: /has expired/i, type: PRESENTATION_TYPES.PRESENTATION_EXPIRED },
  { match: /not signed|no holder/i, type: PRESENTATION_TYPES.UNSIGNED },
  { match: /does not match the declared holder/i, type: PRESENTATION_TYPES.HOLDER_MISMATCH },
];

/** The matched failure, with the verifier reason that produced it. */
export const matchPresentationFailure = (
  fragments: VerificationFragment[]
): { type: string; reason: string } | undefined => {
  const reasons = failingReasons(fragments);
  if (reasons.length === 0) return undefined;

  for (const failure of PRESENTATION_FAILURES) {
    const reason = reasons.find((candidate) => failure.match.test(candidate));
    if (reason !== undefined) return { type: failure.type, reason };
  }
  // An unrecognised presentation failure is invalid, not tampered.
  return { type: PRESENTATION_TYPES.UNKNOWN, reason: reasons[0] };
};

/**
 * The title and message shown for a failed presentation. `document` is optional; without it,
 * copy that names a credential falls back to its position rather than naming the wrong one.
 *
 * Raw verifier wording — validUntil timestamps, did:key strings, "Cannot read properties" —
 * never reaches the user: only the matched rule's copy is rendered.
 */
export const getPresentationFailureMessage = (
  fragments: VerificationFragment[],
  document?: unknown
): PresentationFailureMessage | undefined => {
  const failure = matchPresentationFailure(fragments);
  if (!failure) return undefined;

  const message = PRESENTATION_MESSAGES[failure.type] ?? PRESENTATION_MESSAGES[PRESENTATION_TYPES.UNKNOWN];
  if (typeof message !== "function") return message;

  const { phrase, plural } = credentialsAtFault(failure.reason, document);
  return message(phrase, plural);
};
