import { render, screen } from "@testing-library/react";
import React from "react";
import {
  CERTIFICATE_VERIFICATION_FAILED_HEADING,
  CERTIFICATE_VERIFICATION_FAILED_MESSAGE,
  ignoredFilesMessage,
} from "../../constants/verificationMessages";
import { CertificateVerificationStatus } from "./CertificateVerificationStatus";

const renderStatus = (overrides: Partial<React.ComponentProps<typeof CertificateVerificationStatus>> = {}): void => {
  render(
    <CertificateVerificationStatus
      resetData={jest.fn()}
      fileError={false}
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
  it("shows fixed failure copy and hides the provider error", () => {
    renderStatus({ verificationError: "missing response (url=https://mainnet.infura.io/v3/secret)" });

    expect(screen.getByRole("alert")).toHaveTextContent(CERTIFICATE_VERIFICATION_FAILED_HEADING);
    expect(screen.getByTestId("verification-error")).toHaveTextContent(CERTIFICATE_VERIFICATION_FAILED_MESSAGE);
    expect(screen.queryByText(/infura/i)).not.toBeInTheDocument();
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
