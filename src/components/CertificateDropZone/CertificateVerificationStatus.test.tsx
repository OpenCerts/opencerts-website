import { render, screen } from "@testing-library/react";
import React from "react";
import { CertificateVerificationStatus } from "./CertificateVerificationStatus";

const renderStatus = (overrides: Partial<React.ComponentProps<typeof CertificateVerificationStatus>> = {}): void => {
  render(
    <CertificateVerificationStatus
      resetData={jest.fn()}
      fileError={false}
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
  it("shows a verification failure instead of the empty drop zone", () => {
    renderStatus({ verificationError: "Failed to fetch" });

    expect(screen.getByText("The certificate could not be verified")).toBeInTheDocument();
    expect(screen.getByTestId("verification-error")).toHaveTextContent("Failed to fetch");
  });

  it("keeps the spinner up while a retry is in progress", () => {
    renderStatus({ verifying: true, verificationError: "Failed to fetch" });

    expect(screen.getByText("Verifying Certificate...")).toBeInTheDocument();
    expect(screen.queryByTestId("verification-error")).not.toBeInTheDocument();
  });
});
