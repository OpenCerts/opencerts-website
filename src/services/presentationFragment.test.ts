import { VerificationFragment } from "@trustvc/trustvc";
import twoCredentials from "../components/tests/fixture/presentations/valid/two_credentials.json";
import { PRESENTATION_TYPES } from "../constants/PresentationErrorMessages";
import {
  credentialsAtFault,
  getPresentationFailureMessage,
  hasPresentationFragments,
  matchPresentationFailure,
} from "./presentationFragment";

/**
 * Reasons taken verbatim from a real verification run against the presentation fixtures. They
 * are the contract between trustvc and this mapping: if the library rewords one, the rule that
 * depends on it must move with it.
 */
const REASONS = {
  credentialExpired: "Embedded credential at index 0 has expired (validUntil 2026-08-17T03:40:46.441Z).",
  credentialRevoked: 'Embedded credential at index 0 has been revoked (status purpose "revocation").',
  credentialNotYetValid: "Embedded credential at index 0 is not yet valid (validFrom 2999-01-01T00:00:00Z).",
  presentationExpired: "Presentation has expired (validUntil 2021-01-01T00:00:00Z).",
  holderMismatch:
    'the presentation was signed by "did:key:zDnaeTxq", which does not match the declared holder "did:key:zDnaefVi".',
  unsigned: 'Presentation is not signed (no holder "proof"), so ownership cannot be proven.',
  tampered: "Invalid signature.",
  unresolvableIssuerIntegrity:
    "Embedded credential at index 0 has an invalid signature: Cannot read properties of null (reading 'verificationMethod')",
  unresolvableIssuerIdentity: "Could not resolve issuer(s): index 0 (did:web:nope.invalid).",
  noCredentials: "Presentation contains no verifiable credentials.",
};

const invalid = (name: string, type: string, message: string): VerificationFragment =>
  ({ name, type, status: "INVALID", reason: { code: 0, codeString: "INVALID", message } } as VerificationFragment);

const valid = (name: string, type: string): VerificationFragment =>
  ({ name, type, status: "VALID", data: true } as VerificationFragment);

const VALID_ENVELOPE = [
  valid("W3CVpSignatureIntegrity", "DOCUMENT_INTEGRITY"),
  valid("W3CVpCredentialStatus", "DOCUMENT_STATUS"),
  valid("W3CVpIssuerIdentity", "ISSUER_IDENTITY"),
];

describe("services/presentationFragment", () => {
  describe("hasPresentationFragments", () => {
    it("is true when the presentation verifiers ran", () => {
      expect(hasPresentationFragments(VALID_ENVELOPE)).toBe(true);
    });

    it("is false for a credential, whose presentation fragments are skipped", () => {
      const skipped = [
        { name: "W3CVpSignatureIntegrity", type: "DOCUMENT_INTEGRITY", status: "SKIPPED" },
      ] as VerificationFragment[];

      expect(hasPresentationFragments(skipped)).toBe(false);
    });
  });

  describe("matchPresentationFailure", () => {
    it("returns nothing when every presentation fragment passed", () => {
      expect(matchPresentationFailure(VALID_ENVELOPE)).toBeUndefined();
    });

    /**
     * Both reasons contain "has expired". Matched the other way round, an expired CREDENTIAL
     * is reported as an expired PRESENTATION and the user is told to ask the holder to present
     * again — advice that can never work, because only the issuer can reissue a credential.
     */
    it("reports an expired embedded credential, not an expired presentation", () => {
      const fragments = [
        valid("W3CVpSignatureIntegrity", "DOCUMENT_INTEGRITY"),
        invalid("W3CVpCredentialStatus", "DOCUMENT_STATUS", REASONS.credentialExpired),
        valid("W3CVpIssuerIdentity", "ISSUER_IDENTITY"),
      ];

      expect(matchPresentationFailure(fragments)?.type).toBe(PRESENTATION_TYPES.CREDENTIAL_EXPIRED);
    });

    it("reports an expired presentation when the envelope itself is out of date", () => {
      const fragments = [invalid("W3CVpCredentialStatus", "DOCUMENT_STATUS", REASONS.presentationExpired)];

      expect(matchPresentationFailure(fragments)?.type).toBe(PRESENTATION_TYPES.PRESENTATION_EXPIRED);
    });

    /**
     * Checking an embedded credential's signature needs its issuer's key, so an unresolvable
     * DID fails DOCUMENT_INTEGRITY too. Matched the other way round, an intact presentation is
     * reported as tampered with.
     */
    it("blames the unresolvable issuer rather than the signature it also broke", () => {
      const fragments = [
        invalid("W3CVpSignatureIntegrity", "DOCUMENT_INTEGRITY", REASONS.unresolvableIssuerIntegrity),
        valid("W3CVpCredentialStatus", "DOCUMENT_STATUS"),
        invalid("W3CVpIssuerIdentity", "ISSUER_IDENTITY", REASONS.unresolvableIssuerIdentity),
      ];

      expect(matchPresentationFailure(fragments)?.type).toBe(PRESENTATION_TYPES.ISSUER_UNRESOLVED);
    });

    it.each([
      [REASONS.credentialRevoked, PRESENTATION_TYPES.CREDENTIAL_REVOKED],
      [REASONS.credentialNotYetValid, PRESENTATION_TYPES.CREDENTIAL_NOT_YET_VALID],
      [REASONS.tampered, PRESENTATION_TYPES.TAMPERED],
      [REASONS.unsigned, PRESENTATION_TYPES.UNSIGNED],
      [REASONS.holderMismatch, PRESENTATION_TYPES.HOLDER_MISMATCH],
      [REASONS.noCredentials, PRESENTATION_TYPES.NO_CREDENTIALS],
    ])("maps %s", (reason, expected) => {
      expect(matchPresentationFailure([invalid("W3CVpSignatureIntegrity", "DOCUMENT_INTEGRITY", reason)])?.type).toBe(
        expected
      );
    });

    it("treats an unrecognised failure as invalid rather than tampered", () => {
      const fragments = [invalid("W3CVpIssuerIdentity", "ISSUER_IDENTITY", "something new from the library")];

      expect(matchPresentationFailure(fragments)?.type).toBe(PRESENTATION_TYPES.UNKNOWN);
    });

    it("ignores a credential's own fragments, which are skipped for a presentation", () => {
      const fragments = [invalid("W3CIssuerIdentity", "ISSUER_IDENTITY", "Issuer not resolved")];

      expect(matchPresentationFailure(fragments)).toBeUndefined();
    });
  });

  describe("credentialsAtFault", () => {
    it("names the credential by position and by the label its tab shows", () => {
      expect(credentialsAtFault(REASONS.credentialExpired, twoCredentials)).toStrictEqual({
        // The tab shows the template name with underscores replaced, and so must the copy.
        phrase: 'Credential 1 ("CHAFTA COO")',
        plural: false,
      });
    });

    it("collects every index a reason names", () => {
      const reason = "Could not resolve issuer(s): index 0 (did:web:a), index 1 (did:web:b).";

      expect(credentialsAtFault(reason, twoCredentials).plural).toBe(true);
    });

    it("degrades to the position alone when the document is not to hand", () => {
      expect(credentialsAtFault(REASONS.credentialExpired)).toStrictEqual({ phrase: "Credential 1", plural: false });
    });

    it("degrades to a plain phrase when the reason names no index", () => {
      expect(credentialsAtFault(REASONS.tampered, twoCredentials)).toStrictEqual({
        phrase: "A credential",
        plural: false,
      });
    });
  });

  describe("getPresentationFailureMessage", () => {
    it("names the credential at fault and sends the user to its issuer", () => {
      const fragments = [invalid("W3CVpCredentialStatus", "DOCUMENT_STATUS", REASONS.credentialExpired)];

      const message = getPresentationFailureMessage(fragments, twoCredentials);

      expect(message?.failureMessage).toContain("Credential 1");
      expect(message?.failureMessage).toContain("issuing institution");
    });

    it("sends an expired presentation back to the holder instead", () => {
      const fragments = [invalid("W3CVpCredentialStatus", "DOCUMENT_STATUS", REASONS.presentationExpired)];

      expect(getPresentationFailureMessage(fragments, twoCredentials)?.failureMessage).toContain("ask the holder");
    });

    // Raw verifier wording is an implementation detail and is meaningless to the user.
    it.each(Object.values(REASONS))("never leaks the verifier's own wording for: %s", (reason) => {
      const fragments = [invalid("W3CVpSignatureIntegrity", "DOCUMENT_INTEGRITY", reason)];

      const message = getPresentationFailureMessage(fragments, twoCredentials);

      expect(message).toBeDefined();
      const rendered = `${message?.failureTitle} ${message?.failureMessage}`;
      expect(rendered).not.toMatch(/validUntil|validFrom|did:key|did:web|Cannot read properties|index \d/);
    });
  });
});
