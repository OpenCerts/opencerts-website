/**
 * @jest-environment node
 *
 * These assertions run REAL signed presentations through the real verifier. They exist because
 * a hand-built fragment set pins our copy mapping but not the verifier wording it depends on:
 * trustvc can reword a reason and those tests keep passing while production silently regresses.
 *
 * The node environment is deliberate. Data-integrity proofs need real crypto, which jsdom does
 * not provide — under it, verification fails for reasons unrelated to the fixture and every
 * assertion becomes meaningless rather than erroring.
 */
import { isValidOpenCert, verificationBuilder, w3cVerifiers } from "@trustvc/trustvc";
import credentialExpired from "../components/tests/fixture/presentations/invalid/credential_expired.json";
import holderMismatch from "../components/tests/fixture/presentations/invalid/holder_mismatch.json";
import presentationExpired from "../components/tests/fixture/presentations/invalid/presentation_expired.json";
import tamperedCredential from "../components/tests/fixture/presentations/invalid/tampered_credential.json";
import unsigned from "../components/tests/fixture/presentations/invalid/unsigned.json";
import mixedSuites from "../components/tests/fixture/presentations/valid/mixed_suites.json";
import singleCredential from "../components/tests/fixture/presentations/valid/single_credential.json";
import twoCredentials from "../components/tests/fixture/presentations/valid/two_credentials.json";
import { PRESENTATION_TYPES } from "../constants/PresentationErrorMessages";
import { getPresentationFailureMessage, matchPresentationFailure } from "../services/presentationFragment";
import { WrappedOrSignedOpenCertsDocument } from "../shared";
import { isVerifiablePresentation } from "../utils/presentation";

// A network is named only to satisfy the builder's options type: presentation verification of
// these fixtures resolves did:key locally and makes no chain call.
const verify = (document: unknown) =>
  verificationBuilder(w3cVerifiers, { network: "mainnet" })(document as WrappedOrSignedOpenCertsDocument);

jest.setTimeout(60_000);

describe("verifiable presentation verification", () => {
  describe.each([
    ["single_credential", singleCredential],
    ["two_credentials", twoCredentials],
    ["mixed_suites", mixedSuites],
  ])("%s", (_name, fixture) => {
    it("is routed into the presentation verifiers and passes", async () => {
      expect(isVerifiablePresentation(fixture)).toBe(true);

      const fragments = await verify(fixture);

      expect(isValidOpenCert(fragments)).toBe(true);
      expect(matchPresentationFailure(fragments)).toBeUndefined();
    });
  });

  describe.each([
    ["credential_expired", credentialExpired, PRESENTATION_TYPES.CREDENTIAL_EXPIRED],
    ["presentation_expired", presentationExpired, PRESENTATION_TYPES.PRESENTATION_EXPIRED],
    ["tampered_credential", tamperedCredential, PRESENTATION_TYPES.TAMPERED],
    ["unsigned", unsigned, PRESENTATION_TYPES.UNSIGNED],
    ["holder_mismatch", holderMismatch, PRESENTATION_TYPES.HOLDER_MISMATCH],
  ])("%s", (_name, fixture, expectedType) => {
    it(`fails and is reported as ${expectedType}`, async () => {
      const fragments = await verify(fixture);

      expect(isValidOpenCert(fragments)).toBe(false);
      expect(matchPresentationFailure(fragments)?.type).toBe(expectedType);
    });

    it("tells the user something the verifier's own wording never would", async () => {
      const fragments = await verify(fixture);

      const message = getPresentationFailureMessage(fragments, fixture);

      expect(message).toBeDefined();
      expect(`${message?.failureTitle} ${message?.failureMessage}`).not.toMatch(
        /validUntil|validFrom|did:key|did:web|Cannot read properties|index \d/
      );
    });
  });
});
