import {
  certificateReducer,
  initialState,
  setIgnoredCertificateFile,
  updateCertificate,
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

  it("clears an ignored-file note when a new certificate starts verification", () => {
    const noted = certificateReducer(initialState, setIgnoredCertificateFile("degree.opencert"));
    const next = certificateReducer(noted, updateCertificate({ id: "demo" } as never));

    expect(noted.ignoredFileName).toBe("degree.opencert");
    expect(next.ignoredFileName).toBeNull();
  });
});
