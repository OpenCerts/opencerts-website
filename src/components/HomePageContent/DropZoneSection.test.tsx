import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { NETWORK_NAME } from "../../config";
import { rootReducer } from "../../reducers";
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

describe("dropZoneSection", () => {
  it("verifies a demo drop once, without also handing the dragged image to the drop zone", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ id: "demo" }),
      blob: () => Promise.resolve(new Blob(["{}"], { type: "application/json" })),
    });
    const originalFetch = window.fetch;
    window.fetch = fetchMock as typeof fetch;
    const reachedDocument = jest.fn();
    document.addEventListener("drop", reachedDocument);

    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        featureToggle: {},
      },
    });

    try {
      const view = render(
        <Provider store={store}>
          <DropZoneSectionContainer />
        </Provider>
      );
      const dropTarget = screen.getByTestId("demo-drop");

      const event = new Event("drop", { bubbles: true, cancelable: true });
      Object.defineProperty(event, "dataTransfer", {
        value: {
          getData: (format: string) => (format === DEMO_CERT ? "true" : ""),
          files: [new File(["img"], "cert.png", { type: "image/png" })],
        },
      });
      dropTarget.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
      expect(reachedDocument).not.toHaveBeenCalled();

      await waitFor(() => {
        expect(store.getState().certificate.raw).toStrictEqual({ id: "demo" });
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      view.unmount();
    } finally {
      document.removeEventListener("drop", reachedDocument);
      window.fetch = originalFetch;
    }
  });
});
