import { errorMessages, fragments as trustvcFragments, VerificationFragment } from "@trustvc/trustvc";
import twoCredentials from "../components/tests/fixture/presentations/valid/two_credentials.json";
import {
  getPresentationFailureMessage,
  hasPresentationFragments,
  matchPresentationFailure,
} from "./presentationFragment";

const { TYPES } = errorMessages;
const { W3CVpCode } = trustvcFragments as unknown as { W3CVpCode: Record<string, number> };

/**
 * A presentation fragment set, as the verifier emits them.
 *
 * These used to carry only `reason.message`, because the mapping was a table of regexes over
 * that prose living in this repo. Both the matching and the copy now live in
 * `@trustvc/trustvc`, keyed off `reason.code` — so the prose below is deliberately a placeholder
 * nothing reads, and a fragment without a code describes nothing this code can act on.
 */
const vpFragments = (name: string, code: number, credentialIndices: number[] = []): VerificationFragment[] =>
  [
    { name: "W3CVpSignatureIntegrity", type: "DOCUMENT_INTEGRITY", status: "VALID" },
    { name: "W3CVpCredentialStatus", type: "DOCUMENT_STATUS", status: "VALID" },
    { name: "W3CVpIssuerIdentity", type: "ISSUER_IDENTITY", status: "VALID" },
  ].map((f) =>
    f.name === name
      ? {
          ...f,
          status: "INVALID",
          reason: { code, codeString: String(code), message: "verifier prose, never shown" },
          data: { credentialIndices },
        }
      : f
  ) as never;

describe("services/presentationFragment", () => {
  describe("hasPresentationFragments", () => {
    it("is true only when the presentation verifiers actually ran", () => {
      expect(hasPresentationFragments(vpFragments("W3CVpCredentialStatus", W3CVpCode.PRESENTATION_EXPIRED))).toBe(true);
      expect(
        hasPresentationFragments([
          { name: "W3CVpSignatureIntegrity", type: "DOCUMENT_INTEGRITY", status: "SKIPPED" },
        ] as never)
      ).toBe(false);
      expect(hasPresentationFragments([] as never)).toBe(false);
    });
  });

  describe("matchPresentationFailure", () => {
    it("returns nothing when no presentation fragment failed", () => {
      expect(matchPresentationFailure([] as never)).toBeUndefined();
    });

    /**
     * The distinction this mechanism exists for. Both failures read "... has expired" in the
     * verifier's own words and need OPPOSITE advice: a holder can present again, but only an
     * issuer can reissue a credential.
     */
    it("reports an expired embedded credential, not an expired presentation", () => {
      const failure = matchPresentationFailure(vpFragments("W3CVpCredentialStatus", W3CVpCode.CREDENTIAL_EXPIRED, [0]));
      expect(failure?.type).toBe(TYPES.CREDENTIAL_EXPIRED);
    });

    it("reports an expired presentation when the envelope itself is out of date", () => {
      const failure = matchPresentationFailure(vpFragments("W3CVpCredentialStatus", W3CVpCode.PRESENTATION_EXPIRED));
      expect(failure?.type).toBe(TYPES.PRESENTATION_EXPIRED);
    });

    it("blames the unresolvable issuer rather than the signature it also broke", () => {
      // Checking a credential's signature needs its issuer's key, so an unpublished DID fails
      // integrity too. Reported the other way round, an intact document reads as forged.
      const frags = [
        {
          name: "W3CVpSignatureIntegrity",
          type: "DOCUMENT_INTEGRITY",
          status: "INVALID",
          reason: { code: W3CVpCode.CREDENTIAL_SIGNATURE_INVALID, codeString: "x", message: "y" },
          data: { credentialIndices: [0] },
        },
        {
          name: "W3CVpIssuerIdentity",
          type: "ISSUER_IDENTITY",
          status: "INVALID",
          reason: { code: W3CVpCode.CREDENTIAL_ISSUER_UNRESOLVABLE, codeString: "x", message: "y" },
          data: { credentialIndices: [0] },
        },
      ] as never;
      expect(matchPresentationFailure(frags)?.type).toBe(TYPES.CREDENTIAL_ISSUER_UNRESOLVABLE);
    });

    it("treats an unrecognised failure as unverifiable rather than tampered", () => {
      expect(matchPresentationFailure(vpFragments("W3CVpCredentialStatus", 9999))?.type).toBe(
        TYPES.PRESENTATION_UNVERIFIABLE
      );
    });
  });

  describe("getPresentationFailureMessage", () => {
    it("names the credential at fault and sends the user to its issuer", () => {
      const message = getPresentationFailureMessage(
        vpFragments("W3CVpCredentialStatus", W3CVpCode.CREDENTIAL_REVOKED, [1]),
        twoCredentials
      );
      expect(message?.failureMessage).toContain('Credential 2 ("BILL OF LADING")');
      expect(message?.failureMessage).toMatch(/issuing authority/i);
    });

    it("sends an expired presentation back to the holder instead", () => {
      const message = getPresentationFailureMessage(
        vpFragments("W3CVpCredentialStatus", W3CVpCode.PRESENTATION_EXPIRED)
      );
      expect(message?.failureMessage).toMatch(/ask the holder/i);
      expect(message?.failureMessage).not.toMatch(/^credential \d/i);
    });

    it("degrades to the position alone when the document is not to hand", () => {
      const message = getPresentationFailureMessage(
        vpFragments("W3CVpCredentialStatus", W3CVpCode.CREDENTIAL_REVOKED, [1])
      );
      expect(message?.failureMessage).toContain("Credential 2");
      expect(message?.failureMessage).not.toContain('("');
    });

    it("never lets raw verifier wording reach the user", () => {
      const message = getPresentationFailureMessage(
        vpFragments("W3CVpSignatureIntegrity", W3CVpCode.CREDENTIAL_SIGNATURE_INVALID, [0]),
        twoCredentials
      );
      expect(message?.failureMessage).not.toMatch(/validUntil|did:key:|did:web:|Cannot read properties/);
    });

    it("returns nothing for a credential-shaped failure", () => {
      const frags = [
        { name: "W3CSignatureIntegrity", type: "DOCUMENT_INTEGRITY", status: "INVALID", reason: { message: "bad" } },
      ] as never;
      expect(getPresentationFailureMessage(frags)).toBeUndefined();
    });
  });
});
