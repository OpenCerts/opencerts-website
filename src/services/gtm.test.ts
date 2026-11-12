import { GTMEvent, pushGTMEvent } from "./gtm";

const deleteDataLayer = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (window as any).dataLayer;
};

const restoreDataLayer = (): void => {
  Object.defineProperty(window, "dataLayer", { value: undefined, writable: true, configurable: true });
};

describe("pushGTMEvent", () => {
  it("initialises window.dataLayer when absent and pushes the event", () => {
    deleteDataLayer();
    const event: GTMEvent = { event: "test_event", foo: "bar" };

    pushGTMEvent(event);

    expect(window.dataLayer).toBeDefined();
    expect(window.dataLayer).toHaveLength(2);
    expect(typeof window.dataLayer[0]).toBe("function");
    expect(window.dataLayer[1]).toStrictEqual(event);

    deleteDataLayer();
  });

  it("appends to an existing window.dataLayer", () => {
    window.dataLayer = [{ event: "prior_event" }];
    const event: GTMEvent = { event: "new_event" };

    pushGTMEvent(event);

    expect(window.dataLayer).toHaveLength(3);
    expect(window.dataLayer[2]).toStrictEqual(event);

    deleteDataLayer();
  });

  it("pushes multiple events in order", () => {
    deleteDataLayer();

    pushGTMEvent({ event: "first" });
    pushGTMEvent({ event: "second" });

    expect((window.dataLayer[1] as GTMEvent).event).toBe("first");
    expect((window.dataLayer[3] as GTMEvent).event).toBe("second");

    deleteDataLayer();
  });

  it("preserves all custom fields in the pushed event", () => {
    deleteDataLayer();
    const event: GTMEvent = {
      event: "document_verification_completed",
      document_schema: "OA v2",
      verification_result: "valid",
      issuer_identity: "NUS",
      issuer_name: "National University of Singapore",
    };

    pushGTMEvent(event);

    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer[0]).toStrictEqual(event);

    deleteDataLayer();
  });

  it("does not send a blank issuer name and clears it on the data layer", () => {
    deleteDataLayer();
    const set = jest.fn();

    pushGTMEvent({
      event: "document_verification_completed",
      issuer_identity: "nus.edu.sg",
      issuer_name: "   ",
    });

    expect(window.dataLayer).toHaveLength(2);
    const reset = window.dataLayer[0] as unknown as (this: { set: typeof set }) => void;
    reset.call({ set });
    expect(set).toHaveBeenCalledWith("issuer_name", undefined);
    expect(window.dataLayer[1]).toStrictEqual({
      event: "document_verification_completed",
      issuer_identity: "nus.edu.sg",
    });

    deleteDataLayer();
  });

  it("does not throw when window.dataLayer.push throws", () => {
    const faultyDataLayer = {
      push: () => {
        throw new Error("GTM push failed");
      },
    };
    Object.defineProperty(window, "dataLayer", { get: () => faultyDataLayer, configurable: true });

    expect(() => pushGTMEvent({ event: "test" })).not.toThrow();

    restoreDataLayer();
  });

  it("does not throw when window.dataLayer itself throws on access", () => {
    Object.defineProperty(window, "dataLayer", {
      get: () => {
        throw new Error("GTM unavailable");
      },
      configurable: true,
    });

    expect(() => pushGTMEvent({ event: "test" })).not.toThrow();

    restoreDataLayer();
  });
});
