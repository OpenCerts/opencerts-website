import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { VerificationFragment } from "@trustvc/trustvc";
import Router from "next/router";
import React, { act } from "react";
import { Provider } from "react-redux";
import {
  CERTIFICATE_VERIFICATION_FAILED_HEADING,
  CERTIFICATE_VERIFICATION_GENERIC_MESSAGE,
  CERTIFICATE_VERIFICATION_NETWORK_MESSAGE,
  ignoredFilesMessage,
} from "../constants/verificationMessages";
import { rootReducer } from "../reducers";
import { CertificateState, initialState, updateCertificate } from "../reducers/certificate.slice";
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

    expect(screen.getByRole("status")).toHaveTextContent("Verifying Certificate...");
    expect(screen.queryByText("Certificate viewer")).not.toBeInTheDocument();
  });

  it("shows the spinner instead of throwing when another certificate replaces a verified one", () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        featureToggle: {},
        certificate: {
          ...initialState,
          raw: documentFixture,
          rawModified: documentFixture,
          verificationStatus: validStatus,
        },
      },
    });

    render(
      <Provider store={store}>
        <ViewerContainer />
      </Provider>
    );
    expect(screen.getByText("Certificate viewer")).toBeInTheDocument();

    act(() => {
      store.dispatch(updateCertificate({ id: "next-certificate" } as WrappedOrSignedOpenCertsDocument));
    });

    expect(screen.getByRole("status")).toHaveTextContent("Verifying Certificate...");
    expect(screen.queryByText("Certificate viewer")).not.toBeInTheDocument();
  });

  it("shows a failure when verification throws after the viewer is open", () => {
    renderViewer({
      raw: documentFixture,
      rawModified: documentFixture,
      verificationPending: false,
      verificationStatus: null,
      verificationError: "missing response (url=https://mainnet.infura.io/v3/secret)",
    });

    const failure = screen.getByRole("alert");
    expect(failure).toHaveTextContent(CERTIFICATE_VERIFICATION_FAILED_HEADING);
    expect(failure).toHaveTextContent(CERTIFICATE_VERIFICATION_GENERIC_MESSAGE);
    expect(failure).not.toHaveTextContent("infura");
    expect(failure).not.toHaveTextContent(CERTIFICATE_VERIFICATION_NETWORK_MESSAGE);
    expect(screen.getByText("Go Back")).toBeInTheDocument();
    expect(screen.queryByText("Certificate viewer")).not.toBeInTheDocument();
  });

  it("keeps the ignored-file note with the opened certificate", () => {
    renderViewer({
      raw: documentFixture,
      rawModified: documentFixture,
      verificationStatus: validStatus,
      ignoredFileName: "degree.opencert",
    });

    expect(screen.getByTestId("ignored-files-note")).toHaveTextContent(ignoredFilesMessage("degree.opencert"));
    expect(screen.getByText("Certificate viewer")).toBeInTheDocument();
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
