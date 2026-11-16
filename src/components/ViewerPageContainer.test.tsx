import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { VerificationFragment } from "@trustvc/trustvc";
import Router from "next/router";
import React from "react";
import { Provider } from "react-redux";
import { rootReducer } from "../reducers";
import { CertificateState, initialState } from "../reducers/certificate.slice";
import { WrappedOrSignedOpenCertsDocument } from "../shared";
import { ViewerContainer } from "./ViewerPageContainer";

jest.mock("next/router", () => ({
  __esModule: true,
  default: {
    prefetch: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

jest.mock("./CertificateViewer", () => ({
  CertificateViewerContainer: () => <div>Certificate viewer</div>,
}));

const documentFixture = { id: "certificate" } as WrappedOrSignedOpenCertsDocument;
const validStatus = [
  { name: "OpenAttestationHash", type: "DOCUMENT_INTEGRITY", status: "VALID" },
] as VerificationFragment[];

const renderViewer = (certificate: Partial<CertificateState>): void => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      featureToggle: {},
      certificate: {
        ...initialState,
        ...certificate,
      },
    },
  });

  render(
    <Provider store={store}>
      <ViewerContainer />
    </Provider>
  );
};

describe("viewerPageContainer", () => {
  it("does not throw while verification is still pending", () => {
    renderViewer({
      raw: documentFixture,
      rawModified: documentFixture,
      verificationPending: true,
      verificationStatus: null,
    });

    expect(screen.getByTestId("verifying-certificate")).toBeInTheDocument();
    expect(screen.queryByText("Certificate viewer")).not.toBeInTheDocument();
  });

  it("shows a failure when verification throws after the viewer is open", () => {
    renderViewer({
      raw: documentFixture,
      rawModified: documentFixture,
      verificationPending: false,
      verificationStatus: null,
      verificationError: "Failed to fetch",
    });

    expect(screen.getByTestId("verification-failed")).toHaveTextContent("Failed to fetch");
    expect(screen.getByText("Go Back")).toBeInTheDocument();
    expect(screen.queryByText("Certificate viewer")).not.toBeInTheDocument();
  });

  it("renders the certificate once verification has finished", () => {
    renderViewer({
      raw: documentFixture,
      rawModified: documentFixture,
      verificationStatus: validStatus,
    });

    expect(screen.getByText("Certificate viewer")).toBeInTheDocument();
  });

  it("sends a direct visit with no certificate back to the home page", () => {
    renderViewer({});

    expect(Router.replace).toHaveBeenCalledWith("/");
  });
});
