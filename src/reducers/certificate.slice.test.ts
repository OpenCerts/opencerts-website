import {
  certificateReducer,
  initialState,
  verifyingCertificate,
  verifyingCertificateErrored,
} from "./certificate.slice";

describe("certificateReducer", () => {
  it("clears a previous verification error when verification starts again", () => {
    const failed = certificateReducer(initialState, verifyingCertificateErrored("Failed to fetch"));
    const restarting = certificateReducer(failed, verifyingCertificate());

    expect(restarting.verificationPending).toBe(true);
    expect(restarting.verificationStatus).toBeNull();
    expect(restarting.verificationError).toBeNull();
  });
});
