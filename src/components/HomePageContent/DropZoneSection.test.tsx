import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { NETWORK_NAME } from "../../config";
import { rootReducer } from "../../reducers";
import { initialState, updateCertificate } from "../../reducers/certificate.slice";
import { DropZoneSectionContainer } from "./DropZoneSection";

jest.mock("next/router", () => ({
  __esModule: true,
  default: {
    prefetch: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

const DEMO_CERT = `/static/demo/${NETWORK_NAME}.opencert`;

const demoTransfer = () => ({
  types: ["Files"],
  files: [new File(["img"], "cert.png", { type: "image/png" })],
  getData: (format: string) => (format === DEMO_CERT ? "true" : ""),
  dropEffect: "copy",
});

describe("dropZoneSection", () => {
  it("lets the drop zone verify a demo drag once and clear the hover state", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ id: "demo" }),
      blob: () => Promise.resolve(new Blob(['{"id":"demo"}'], { type: "application/json" })),
    });
    const originalFetch = window.fetch;
    window.fetch = fetchMock as typeof fetch;
    const actions: string[] = [];

    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(() => (next) => (action) => {
          actions.push((action as { type: string }).type);
          return next(action);
        }),
      preloadedState: {
        featureToggle: {},
      },
    });

    try {
      render(
        <Provider store={store}>
          <DropZoneSectionContainer />
        </Provider>
      );
      const dropzone = screen.getByTestId("certificate-dropzone");
      const wrapper = screen.getByTestId("dropzone-view-wrapper");

      fireEvent.dragEnter(dropzone, { dataTransfer: demoTransfer() });
      await waitFor(() => {
        expect(wrapper).toHaveClass("bg-green-100");
      });

      fireEvent.drop(dropzone, { dataTransfer: demoTransfer() });

      await waitFor(() => {
        expect(wrapper).toHaveClass("bg-blue-100");
      });
      expect(wrapper).not.toHaveClass("bg-green-100");
      await waitFor(() => {
        expect(store.getState().certificate.raw).toStrictEqual({ id: "demo" });
      });
      expect(actions.filter((type) => type === updateCertificate.type)).toHaveLength(1);
    } finally {
      window.fetch = originalFetch;
    }
  });

  it("ignores another demo tap while a certificate is already being verified", () => {
    const fetchMock = jest.fn();
    const originalFetch = window.fetch;
    window.fetch = fetchMock as typeof fetch;

    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        featureToggle: {},
        certificate: {
          ...initialState,
          verificationPending: true,
        },
      },
    });

    try {
      render(
        <Provider store={store}>
          <DropZoneSectionContainer />
        </Provider>
      );
      const button = screen.getByRole("button", { name: "Click me for a demo certificate!" });

      expect(button).toBeDisabled();
      fireEvent.click(button);

      expect(fetchMock).not.toHaveBeenCalled();
    } finally {
      window.fetch = originalFetch;
    }
  });
});
