import { errorMessages, getPresentationFailure, getVerificationError, VerificationFragment } from "@trustvc/trustvc";
import { PresentationFailureMessage } from "../constants/PresentationErrorMessages";

/** The three fragments trustvc emits for a presentation envelope. */
export const VP_FRAGMENT_NAMES = ["W3CVpSignatureIntegrity", "W3CVpCredentialStatus", "W3CVpIssuerIdentity"];

/** Whether a verification run was carried out by the presentation verifiers. */
export const hasPresentationFragments = (fragments: VerificationFragment[]): boolean =>
  fragments.some((fragment) => VP_FRAGMENT_NAMES.includes(fragment.name) && fragment.status !== "SKIPPED");

/**
 * The matched failure, with the verifier reason that produced it.
 *
 * This used to be an ordered table of regexes over the verifier's English reason text, paired
 * with a local copy table. Both now live in `@trustvc/trustvc`, keyed off a stable
 * `reason.code` the fragments carry — so the match is no longer guesswork against prose that a
 * library release can reword without warning.
 *
 * `type` is now one of trustvc's own `errorMessages.TYPES` keys rather than a local
 * `PRESENTATION_TYPES` one. Analytics prefixes it with `PRESENTATION_`, so the codes it reports
 * change shape with this: `PRESENTATION_UNSIGNED` becomes `PRESENTATION_PRESENTATION_UNSIGNED`
 * unless the prefix is dropped — see `verificationAnalytics`.
 */
export const matchPresentationFailure = (
  fragments: VerificationFragment[]
): { type: string; reason: string } | undefined => {
  const failure = getPresentationFailure(fragments);
  if (!failure) return undefined;
  return { type: failure.type, reason: failure.reason };
};

/**
 * The title and message shown for a failed presentation. `document` is optional; without it,
 * copy that names a credential falls back to its position rather than naming the wrong one.
 *
 * Raw verifier wording — validUntil timestamps, did:key strings, "Cannot read properties" —
 * never reaches the user: trustvc resolves the copy from the code, never from the reason.
 */
export const getPresentationFailureMessage = (
  fragments: VerificationFragment[],
  document?: unknown
): PresentationFailureMessage | undefined => {
  if (!getPresentationFailure(fragments)) return undefined;
  const resolved = getVerificationError(fragments, document);
  if (!resolved) return undefined;
  return {
    failureTitle: errorMessages.MESSAGES[resolved.type].failureTitle,
    failureMessage: resolved.message,
  };
};
