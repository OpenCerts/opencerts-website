import { VerificationFragment } from "@trustvc/trustvc";
import {
  certificateReducer,
  finishVerifying,
  initialState,
  setIgnoredCertificateFile,
  updateCertificate,
  verifyingCertificate,
  verifyingCertificateCompleted,
  verifyingCertificateErrored,
} from "./certificate.slice";

const validFragment = {
  name: "OpenAttestationHash",
  type: "DOCUMENT_INTEGRITY",
  status: "VALID",
} as VerificationFragment;

describe("certificateReducer", () => {
  it("clears a previous verification error when verification starts again", () => {
    const failed = certificateReducer(initialState, verifyingCertificateErrored("Failed to fetch"));
    const restarting = certificateReducer(failed, verifyingCertificate());

    expect(restarting.verificationPending).toBe(true);
    expect(restarting.verificationStatus).toBeNull();
    expect(restarting.verificationError).toBeNull();
  });

  it("keeps the loader flag set after the result arrives until verification is finished", () => {
    const pending = certificateReducer(initialState, verifyingCertificate());
    const completed = certificateReducer(pending, verifyingCertificateCompleted([validFragment]));

    expect(completed.verificationPending).toBe(true);
    expect(completed.verificationStatus).toStrictEqual([validFragment]);
    expect(certificateReducer(completed, finishVerifying()).verificationPending).toBe(false);
  });

  it("clears an ignored-file note when a new certificate starts verification", () => {
    const noted = certificateReducer(initialState, setIgnoredCertificateFile("degree.opencert"));
    const next = certificateReducer(noted, updateCertificate({ id: "demo" } as never));

    expect(noted.ignoredFileName).toBe("degree.opencert");
    expect(next.ignoredFileName).toBeNull();
  });
});
