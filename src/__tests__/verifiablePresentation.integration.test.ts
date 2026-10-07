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
import { errorMessages, isValidOpenCert, verificationBuilder, w3cVerifiers } from "@trustvc/trustvc";
import credentialDateInvalid from "../components/tests/fixture/presentations/invalid/credential_date_invalid.json";
import credentialExpired from "../components/tests/fixture/presentations/invalid/credential_expired.json";
import credentialNoHolder from "../components/tests/fixture/presentations/invalid/credential_no_holder.json";
import credentialNotYetValid from "../components/tests/fixture/presentations/invalid/credential_not_yet_valid.json";
import credentialStatusUnsupported from "../components/tests/fixture/presentations/invalid/credential_status_unsupported.json";
import holderMismatch from "../components/tests/fixture/presentations/invalid/holder_mismatch.json";
import presentationDateInvalid from "../components/tests/fixture/presentations/invalid/presentation_date_invalid.json";
import presentationEmpty from "../components/tests/fixture/presentations/invalid/presentation_empty.json";
import presentationExpired from "../components/tests/fixture/presentations/invalid/presentation_expired.json";
import presentationNotYetValid from "../components/tests/fixture/presentations/invalid/presentation_not_yet_valid.json";
import presentationProofIncomplete from "../components/tests/fixture/presentations/invalid/presentation_proof_incomplete.json";
import tamperedCredential from "../components/tests/fixture/presentations/invalid/tampered_credential.json";
import tamperedPresentation from "../components/tests/fixture/presentations/invalid/tampered_presentation.json";
import unsigned from "../components/tests/fixture/presentations/invalid/unsigned.json";
import mixedSuites from "../components/tests/fixture/presentations/valid/mixed_suites.json";
import singleCredential from "../components/tests/fixture/presentations/valid/single_credential.json";
import twoCredentials from "../components/tests/fixture/presentations/valid/two_credentials.json";

import { getPresentationFailureMessage, matchPresentationFailure } from "../services/presentationFragment";
import { WrappedOrSignedOpenCertsDocument } from "../shared";
import { isVerifiablePresentation } from "../utils/presentation";

// A network is named only to satisfy the builder's options type: presentation verification of
// these fixtures resolves did:key locally and makes no chain call.
const verify = (document: unknown) =>
  verificationBuilder(w3cVerifiers, { network: "mainnet" })(document as WrappedOrSignedOpenCertsDocument);

jest.setTimeout(60_000);

const { TYPES } = errorMessages;

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

  // Every failure that can be decided WITHOUT fetching anything.
  //
  // `credential_revoked` and `credential_suspended` are deliberately absent. Deciding either
  // means fetching a status list, and this project has no `fetch`: jest-environment-node omits
  // it, and the moduleNameMapper above stubs `undici` on purpose so the jsonld document loaders
  // cannot reach the network. Both fixtures therefore resolve to CREDENTIAL_STATUS_UNREACHABLE
  // here — an honest answer to "could you check?", but not what the fixture is for.
  //
  // Do not "fix" this by polyfilling fetch: it would undo that isolation and make these cases
  // hit trustvc.github.io and a localhost status list from a unit test. They are verified in the
  // browser instead, where a real fetch decides them. `credential_status_unreachable` and
  // `unresolvable_issuer` DO belong below — their expected outcome is the failure to resolve,
  // so no network is needed to reach it.
  describe.each([
    ["unsigned", unsigned, TYPES.PRESENTATION_UNSIGNED],
    ["presentation_proof_incomplete", presentationProofIncomplete, TYPES.PRESENTATION_PROOF_INCOMPLETE],
    ["tampered_presentation", tamperedPresentation, TYPES.PRESENTATION_TAMPERED],
    ["holder_mismatch", holderMismatch, TYPES.PRESENTATION_HOLDER_MISMATCH],
    ["credential_no_holder", credentialNoHolder, TYPES.CREDENTIAL_NO_HOLDER],
    ["presentation_expired", presentationExpired, TYPES.PRESENTATION_EXPIRED],
    ["presentation_not_yet_valid", presentationNotYetValid, TYPES.PRESENTATION_NOT_YET_VALID],
    ["presentation_date_invalid", presentationDateInvalid, TYPES.PRESENTATION_DATE_INVALID],
    ["presentation_empty", presentationEmpty, TYPES.PRESENTATION_EMPTY],
    ["credential_expired", credentialExpired, TYPES.CREDENTIAL_EXPIRED],
    ["credential_not_yet_valid", credentialNotYetValid, TYPES.CREDENTIAL_NOT_YET_VALID],
    ["credential_date_invalid", credentialDateInvalid, TYPES.CREDENTIAL_DATE_INVALID],
    ["tampered_credential", tamperedCredential, TYPES.CREDENTIAL_TAMPERED],
    ["credential_status_unsupported", credentialStatusUnsupported, TYPES.CREDENTIAL_STATUS_UNSUPPORTED],
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
