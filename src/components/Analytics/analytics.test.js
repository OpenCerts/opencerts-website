import { stub } from "sinon";
import * as logger from "../../utils/logger";
import { event, stringifyEvent, validateEvent } from "./index";

const evt = {
  category: "TEST_CATEGORY",
  action: "TEST_ACTION",
  label: "TEST_LABEL",
  value: 2
};

describe("stringifyEvent", () => {
  it("prints the event", () => {
    const evtString = stringifyEvent(evt);
    expect(evtString).toBe(
      "Category*: TEST_CATEGORY, Action*: TEST_ACTION, Label: TEST_LABEL, Value: 2"
    );
  });
});

describe("validateEvent", () => {
  it("throws if category is missing", () => {
    expect(() =>
      validateEvent({
        label: "LABEL"
      })
    ).toThrowError("Category is required");
  });

  it("throws if action is missing", () => {
    expect(() =>
      validateEvent({
        category: "CATEGORY"
      })
    ).toThrowError("Action is required");
  });

  it("throws if value is not number", () => {
    expect(() =>
      validateEvent({ category: "CATEGORY", action: "ACTION", value: "STRING" })
    ).toThrowError("Value must be a number");
  });

  it("passes for minimum values", () => {
    validateEvent({
      category: "CATEGORY",
      action: "ACTION"
    });
  });

  it("passes for all values", () => {
    validateEvent({
      category: "CATEGORY",
      action: "ACTION",
      label: "LABEL",
      value: 2
    });
  });
});

describe("event", () => {
  let stubbedLogger;
  let trace;

  beforeEach(() => {
    trace = stub();
    stubbedLogger = stub(logger, "getLogger");
    stubbedLogger.returns({
      trace,
      error: trace
    });
  });

  afterEach(() => {
    logger.getLogger.restore();
  });

  it("logs event only if window.ga is not present", () => {
    event(undefined, evt);
    const expectedString = stringifyEvent(evt);
    expect(trace.args[0][0]).toEqual(expectedString);
    expect(stubbedLogger.args[0][0]).toEqual("components:Analytics(Inactive):");
  });

  it("sends and log ga event if window.ga is present", () => {
    const win = { ga: stub() };
    event(win, evt);
    const expectedString = stringifyEvent(evt);
    expect(win.ga.args[0]).toEqual([
      "send",
      "event",
      "TEST_CATEGORY",
      "TEST_ACTION",
      "TEST_LABEL",
      2
    ]);
    expect(trace.args[0][0]).toEqual(expectedString);
    expect(stubbedLogger.args[0][0]).toEqual("components:Analytics:");
  });

  it("logs error", () => {
    const win = { ga: stub() };
    const errEvt = { ...evt, value: "STRING" };
    event(win, errEvt);
    expect(stubbedLogger.args[0][0]).toEqual("components:Analytics:");
    expect(win.ga.called).toBe(false);
  });
});
