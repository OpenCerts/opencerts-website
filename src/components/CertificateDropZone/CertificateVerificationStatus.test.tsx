import { render, screen } from "@testing-library/react";
import React from "react";
import { CERTIFICATE_VERIFICATION_FAILED_HEADING, ignoredFilesMessage } from "../../constants/verificationMessages";
import { CertificateVerificationStatus } from "./CertificateVerificationStatus";

const renderStatus = (overrides: Partial<React.ComponentProps<typeof CertificateVerificationStatus>> = {}): void => {
  render(
    <CertificateVerificationStatus
      resetData={jest.fn()}
      fileError={false}
      demoLoadError={false}
      ignoredFileName={null}
      verifying={false}
      hover={false}
      verificationStatus={null}
      verificationError={null}
      retrieveCertificateByActionError={null}
      document={null}
      {...overrides}
    />
  );
};

describe("certificateVerificationStatus", () => {
  it("shows the raw verification error", () => {
    const providerError = "missing response (url=https://mainnet.infura.io/v3/secret)";
    renderStatus({ verificationError: providerError });

    expect(screen.getByRole("alert")).toHaveTextContent(CERTIFICATE_VERIFICATION_FAILED_HEADING);
    expect(screen.getByTestId("verification-error")).toHaveTextContent(providerError);
  });

  it("keeps the spinner up while a retry is in progress", () => {
    renderStatus({ verifying: true, verificationError: "Failed to fetch" });

    expect(screen.getByRole("status")).toHaveTextContent("Verifying Certificate...");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("tells the user which file was checked when others were ignored", () => {
    renderStatus({ ignoredFileName: "degree.opencert", verifying: true });

    expect(screen.getByTestId("ignored-files-note")).toHaveTextContent(ignoredFilesMessage("degree.opencert"));
  });
});
