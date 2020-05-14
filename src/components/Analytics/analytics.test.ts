import { v2 } from "@govtechsg/open-attestation";
import { analyticsEvent, sendEventCertificateViewedDetailed, stringifyEvent, validateEvent } from "./index";

const evt = {
  category: "TEST_CATEGORY",
  action: "TEST_ACTION",
  label: "TEST_LABEL",
  value: 2,
};

// TODO replace expect(true).toBe(true); by real assertions

describe("stringifyEvent", () => {
  it("prints the event", () => {
    const evtString = stringifyEvent(evt);
    expect(evtString).toBe("Category*: TEST_CATEGORY, Action*: TEST_ACTION, Label: TEST_LABEL, Value: 2");
  });
});

describe("validateEvent", () => {
  it("throws if category is missing", () => {
    expect(() =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore we expect this error to be thrown
      validateEvent({
        label: "LABEL",
      })
    ).toThrow("Category is required");
  });

  it("throws if action is missing", () => {
    expect(() =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore we expect this error to be thrown
      validateEvent({
        category: "CATEGORY",
      })
    ).toThrow("Action is required");
  });

  it("throws if value is not number", () => {
    expect(() => validateEvent({ category: "CATEGORY", action: "ACTION", value: "STRING" })).toThrow(
      "Value must be a number"
    );
  });

  it("passes for minimum values", () => {
    validateEvent({
      category: "CATEGORY",
      action: "ACTION",
      value: undefined,
    });
    expect(true).toBe(true);
  });

  it("passes for all values", () => {
    validateEvent({
      category: "CATEGORY",
      action: "ACTION",
      value: 2,
    });
    expect(true).toBe(true);
  });
});

describe("event", () => {
  it("does not fail if ga is not present", () => {
    analyticsEvent(undefined, evt);
    analyticsEvent({}, evt);
    expect(true).toBe(true);
  });

  it("sends and log ga event if window.ga is present", () => {
    const win = { ga: jest.fn() };
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    analyticsEvent(win, evt);
    expect(win.ga).toHaveBeenCalledWith("send", "event", "TEST_CATEGORY", "TEST_ACTION", "TEST_LABEL", 2, undefined);
  });

  it("throws if there is a validation error", () => {
    const win = { ga: jest.fn() };
    const errEvt = { ...evt, value: "STRING" };
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(() => analyticsEvent(win, errEvt)).toThrow("Value must be a number");
  });
});
describe("sendEventCertificateViewedDetailed", () => {
  const mockGA = jest.fn();
  // eslint-disable-next-line jest/no-hooks
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore dont care about ts here
    window.ga = mockGA;
  });

  // eslint-disable-next-line jest/no-hooks
  afterEach(() => {
    delete window.ga;
    mockGA.mockReset();
  });

  describe("when is in the registry", () => {
    it("should use document store to retrieve registry information", () => {
      const issuer: v2.Issuer = {
        documentStore: "0x007d40224f6562461633ccfbaffd359ebb2fc9ba",
        name: "aaa",
        identityProof: {
          location: "aa.com",
          type: v2.IdentityProofType.DNSTxt,
        },
      };
      const certificateData = { id: "id1", name: "cert name", issuedOn: "a date" };
      sendEventCertificateViewedDetailed({ issuer, certificateData });
      expect(mockGA.mock.calls[0][0]).toStrictEqual("send");
      expect(mockGA.mock.calls[0][1]).toStrictEqual("event");
      expect(mockGA.mock.calls[0][2]).toStrictEqual("CERTIFICATE_DETAILS");
      expect(mockGA.mock.calls[0][3]).toStrictEqual("VIEWED - Government Technology Agency of Singapore (GovTech)");
      expect(mockGA.mock.calls[0][4]).toStrictEqual(
        '"store":"0x007d40224f6562461633ccfbaffd359ebb2fc9ba";"document_id":"id1";"name":"cert name";"issued_on":"a date";"issuer_name":"Government Technology Agency of Singapore (GovTech)";"issuer_id":"govtech-registry"'
      );
      expect(mockGA.mock.calls[0][5]).toBeUndefined();
      expect(mockGA.mock.calls[0][6]).toStrictEqual({
        nonInteraction: true,
        dimension1: "0x007d40224f6562461633ccfbaffd359ebb2fc9ba",
        dimension2: "id1",
        dimension3: "cert name",
        dimension4: "a date",
        dimension5: "Government Technology Agency of Singapore (GovTech)",
        dimension6: "govtech-registry",
      });
    });
    it("should use certificate store to retrieve registry information", () => {
      const issuer: v2.Issuer = {
        certificateStore: "0x007d40224f6562461633ccfbaffd359ebb2fc9ba",
        name: "aaa",
        identityProof: {
          location: "aa.com",
          type: v2.IdentityProofType.DNSTxt,
        },
      };
      const certificateData = { id: "id1", name: "cert name", issuedOn: "a date" };
      sendEventCertificateViewedDetailed({ issuer, certificateData });
      expect(mockGA.mock.calls[0][0]).toStrictEqual("send");
      expect(mockGA.mock.calls[0][1]).toStrictEqual("event");
      expect(mockGA.mock.calls[0][2]).toStrictEqual("CERTIFICATE_DETAILS");
      expect(mockGA.mock.calls[0][3]).toStrictEqual("VIEWED - Government Technology Agency of Singapore (GovTech)");
      expect(mockGA.mock.calls[0][4]).toStrictEqual(
        '"store":"0x007d40224f6562461633ccfbaffd359ebb2fc9ba";"document_id":"id1";"name":"cert name";"issued_on":"a date";"issuer_name":"Government Technology Agency of Singapore (GovTech)";"issuer_id":"govtech-registry"'
      );
      expect(mockGA.mock.calls[0][5]).toBeUndefined();
      expect(mockGA.mock.calls[0][6]).toStrictEqual({
        nonInteraction: true,
        dimension1: "0x007d40224f6562461633ccfbaffd359ebb2fc9ba",
        dimension2: "id1",
        dimension3: "cert name",
        dimension4: "a date",
        dimension5: "Government Technology Agency of Singapore (GovTech)",
        dimension6: "govtech-registry",
      });
    });
    it("should use token registry to retrieve registry information", () => {
      const issuer: v2.Issuer = {
        tokenRegistry: "0x5CA3b9daC85DA4DE4030e59C1a0248004209e348",
        name: "aaa",
        identityProof: {
          location: "aa.com",
          type: v2.IdentityProofType.DNSTxt,
        },
      };
      const certificateData = { id: "id1", name: "cert name", issuedOn: "a date" };
      sendEventCertificateViewedDetailed({ issuer, certificateData });
      expect(mockGA.mock.calls[0][0]).toStrictEqual("send");
      expect(mockGA.mock.calls[0][1]).toStrictEqual("event");
      expect(mockGA.mock.calls[0][2]).toStrictEqual("CERTIFICATE_DETAILS");
      expect(mockGA.mock.calls[0][3]).toStrictEqual("VIEWED - Nanyang Polytechnic");
      expect(mockGA.mock.calls[0][4]).toStrictEqual(
        '"store":"0x5CA3b9daC85DA4DE4030e59C1a0248004209e348";"document_id":"id1";"name":"cert name";"issued_on":"a date";"issuer_name":"Nanyang Polytechnic";"issuer_id":"nyp-registry"'
      );
      expect(mockGA.mock.calls[0][5]).toBeUndefined();
      expect(mockGA.mock.calls[0][6]).toStrictEqual({
        nonInteraction: true,
        dimension1: "0x5CA3b9daC85DA4DE4030e59C1a0248004209e348",
        dimension2: "id1",
        dimension3: "cert name",
        dimension4: "a date",
        dimension5: "Nanyang Polytechnic",
        dimension6: "nyp-registry",
      });
    });
    describe("when is not in the registry", () => {
      it("should use identity proof to display issuer information", () => {
        const issuer: v2.Issuer = {
          documentStore: "0xabcdef",
          name: "aaa",
          identityProof: {
            location: "aa.com",
            type: v2.IdentityProofType.DNSTxt,
          },
        };
        const certificateData = { id: "id1", name: "cert name", issuedOn: "a date" };
        sendEventCertificateViewedDetailed({ issuer, certificateData });
        expect(mockGA.mock.calls[0][0]).toStrictEqual("send");
        expect(mockGA.mock.calls[0][1]).toStrictEqual("event");
        expect(mockGA.mock.calls[0][2]).toStrictEqual("CERTIFICATE_DETAILS");
        expect(mockGA.mock.calls[0][3]).toStrictEqual("VIEWED - aa.com");
        expect(mockGA.mock.calls[0][4]).toStrictEqual(
          '"store":"0xabcdef";"document_id":"id1";"name":"cert name";"issued_on":"a date";"issuer_name":"aa.com"'
        );
        expect(mockGA.mock.calls[0][5]).toBeUndefined();
        expect(mockGA.mock.calls[0][6]).toStrictEqual({
          nonInteraction: true,
          dimension1: "0xabcdef",
          dimension2: "id1",
          dimension3: "cert name",
          dimension4: "a date",
          dimension5: "aa.com",
          dimension6: null,
        });
      });
    });
  });
});
