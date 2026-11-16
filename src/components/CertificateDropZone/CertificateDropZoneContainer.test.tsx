import { configureStore } from "@reduxjs/toolkit";
import { captureException } from "@sentry/nextjs";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { act } from "react";
import { Provider } from "react-redux";
import { NETWORK_NAME } from "../../config";
import { ignoredFilesMessage } from "../../constants/verificationMessages";
import { rootReducer } from "../../reducers";
import { resetCertificateState, updateCertificate } from "../../reducers/certificate.slice";
import { WrappedOrSignedOpenCertsDocument } from "../../shared";
import { CertificateDropZoneContainer } from "./CertificateDropZoneContainer";

jest.mock("next/router", () => ({
  __esModule: true,
  default: {
    prefetch: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

jest.mock("@sentry/nextjs", () => ({
  captureException: jest.fn(),
}));

const DEMO_CERT = `/static/demo/${NETWORK_NAME}.opencert`;

const mountDropZone = () => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: { featureToggle: {} },
  });
  render(
    <Provider store={store}>
      <CertificateDropZoneContainer />
    </Provider>
  );
  return store;
};

const dropFiles = (files: File[], demo = false) => {
  fireEvent.drop(screen.getByTestId("certificate-dropzone"), {
    dataTransfer: {
      types: ["Files"],
      files,
      getData: (format: string) => (demo && format === DEMO_CERT ? "true" : ""),
    },
  });
};

describe("certificateDropZoneContainer", () => {
  it("names the certificate it checked when the drop also contains other files", async () => {
    const store = mountDropZone();
    const pdf = new File(["%PDF"], "notes.pdf", { type: "application/pdf" });
    const certificate = new File(['{"id":"degree"}'], "degree.opencert", { type: "application/json" });

    dropFiles([pdf, certificate]);

    await waitFor(() => {
      expect(screen.getByTestId("ignored-files-note")).toHaveTextContent(ignoredFilesMessage("degree.opencert"));
    });

    act(() => {
      store.dispatch(updateCertificate({ id: "demo" } as WrappedOrSignedOpenCertsDocument));
    });
    expect(screen.queryByTestId("ignored-files-note")).not.toBeInTheDocument();

    dropFiles([pdf, certificate]);
    await waitFor(() => {
      expect(screen.getByTestId("ignored-files-note")).toBeInTheDocument();
    });
    act(() => {
      store.dispatch(resetCertificateState());
    });
    expect(screen.queryByTestId("ignored-files-note")).not.toBeInTheDocument();
  });

  it("loads a demo drag that does not advertise any files", async () => {
    const originalFetch = window.fetch;
    window.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: "demo-from-drag" }),
    }) as typeof fetch;
    const reachedDocument = jest.fn();
    document.addEventListener("drop", reachedDocument);

    try {
      const store = mountDropZone();
      fireEvent.drop(screen.getByTestId("certificate-dropzone"), {
        dataTransfer: {
          types: [DEMO_CERT],
          files: [],
          getData: (format: string) => (format === DEMO_CERT ? "true" : ""),
        },
      });

      await waitFor(() => {
        expect(store.getState().certificate.raw).toStrictEqual({ id: "demo-from-drag" });
      });
      expect(window.fetch).toHaveBeenCalledWith(DEMO_CERT);
      expect(reachedDocument).toHaveBeenCalledWith(expect.any(Event));
      expect(screen.queryByTestId("demo-load-error")).not.toBeInTheDocument();
      expect(screen.getByTestId("dropzone-view-wrapper")).toHaveClass("bg-blue-100");
    } finally {
      document.removeEventListener("drop", reachedDocument);
      window.fetch = originalFetch;
    }
  });

  it("reports a failed demo certificate fetch and shows an error", async () => {
    const originalFetch = window.fetch;
    window.fetch = jest.fn().mockRejectedValue(new Error("Failed to fetch")) as typeof fetch;

    try {
      mountDropZone();
      dropFiles([new File(["img"], "cert.png", { type: "image/png" })], true);

      await waitFor(() => {
        expect(screen.getByTestId("demo-load-error")).toHaveTextContent(
          "The demo certificate could not be loaded. Please try again."
        );
      });
      expect(captureException).toHaveBeenCalledWith(expect.any(Error), { tags: { area: "demoCert" } });
      expect(screen.queryByText("Failed to fetch")).not.toBeInTheDocument();
    } finally {
      window.fetch = originalFetch;
    }
  });
});
