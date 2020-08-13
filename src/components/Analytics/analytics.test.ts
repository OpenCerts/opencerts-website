import { v2, WrappedDocument, SchemaId } from "@govtechsg/open-attestation";
import {
  analyticsEvent,
  sendEventCertificateViewedDetailed,
  stringifyEvent,
  validateEvent,
  triggerErrorLogging,
} from "./index";

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
          dimension6: "(not set)",
        });
      });
    });
  });
});

describe("analytics*", () => {
  // eslint-disable-next-line jest/no-hooks
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // eslint-disable-next-line jest/prefer-spy-on
    window.ga = jest.fn();
  });
  // eslint-disable-next-line jest/no-hooks
  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // eslint-disable-next-line jest/prefer-spy-on
    window.ga = undefined;
  });
  describe("triggerErrorLogging", () => {
    it("should send cert details (certificateStore) and errors to Google Analytics", () => {
      const certificate: WrappedDocument = {
        version: SchemaId.v2,
        data: {
          attainmentDate: "a6474204-94a4-499b-af95-b161ea0f6996:string:2012-12-31T23:59:00+08:00",
          transcript: [
            {
              level: "215cba59-fc69-4799-906d-13831235d61b:string:ORDINARY",
              grade: "0312dcfb-460d-4b01-b154-676ae307f91c:string:1",
              name: "191170f2-7c47-497f-954f-09b7b4b2fc25:string:ADDITIONAL MATHEMATICS",
              languageMedium: "02f3c2f4-207d-4106-b950-dbde85457d71:string:ENGLISH",
              examiningAuthority: "b2511648-d512-44d6-92a2-7e9537bf2169:string:CAMBRIDGE",
            },
          ],
          $template: "87387e89-58ac-41cb-abb8-66af522dd5f5:string:sg/gov/seab/SOR_GCEO",
          name:
            "3185297a-bb47-4853-8f45-9cb60cf98608:string:SINGAPORE-CAMBRIDGE GENERAL CERTIFICATE OF EDUCATION ORDINARY LEVEL",
          recipient: {},
          id: "5dd55da3-8e32-4ee6-b23b-5c17a3395792:string:MyAwesomeCertID",
          additionalData: {
            certifierDesignation: "5551636b-8015-4437-8726-183ee0e030da:string:Chief Executive",
            certifierName: "572bae48-a0e6-4410-b8cc-289791c19ffb:string:Mr Yue Lip Sin",
          },
          issuers: [
            {
              name: "b6c56876-2a07-4efb-a56f-afdeb7ec91f2:string:SEAB",
              certificateStore:
                "979b437d-d7ec-4e9f-9384-f78962e1af2a:string:0xE4a94Ef9C26904A02Cd6735F7D4De1D840146a0f",
            },
          ],
          issuedOn: "eaef8495-93d6-45ab-988f-5ef5785fd2f3:string:2019-09-02T18:51:14+08:00",
        },
        privacy: {
          obfuscatedData: [],
        },
        signature: {
          type: "SHA3MerkleProof",
          targetHash: "64f8058107cda314c437a1d22fd8906fdf6e08bde1d50293e0806c1dcf29f49b",
          proof: [
            "a2c4ded0a3f54caae9a9cff70138625e095a5d25982453f3b3f01cc739dd5394",
            "a96b8bc2d30004d9c4fc06ba543531e86e4a6663358b44515ddf3e13c6661363",
            "e2b59a7591b133875857e66238ffd82ab334352dc30ad92072b55bfbbac8aeb3",
            "5e883a0758853e1ff4beb418853f5581cdbede52a99413a0e2e642a9427e5d3a",
            "7e4ff422f67dd54e7adbcd396613c882f56aed37d28a92b75464818e87b5e0c8",
            "7e9f13fecdd301396a49205d5e4e9d4d510483de94f7ce5959705ca27a9622ac",
            "194b54fab9fa3fea3ccb28547cea3b384309af50a9e8d60e11deb2398db3cbde",
            "c0f4d2fe097ec81d3c52b28955fec39441fba9dcdbf444972c547b0d6b44931b",
            "7c3a2be42b86baa300f032c3f2246ad335c80dd526acfe7435a788e6215799fe",
            "a05cc0f6e66acb8ba0e2b3ddeac5e6c38ce01c82df0ed09b341076ae9bcd07f3",
            "a2a7b47af15ee91dc0ac738a5bb38bfc5f6af559b5696b2cdb0d81e6a91133c0",
            "789c3c9ae12840abb4c166b5614245bf718667d09126ea7582925be6b6e6ca6a",
            "4bc04315fda8a6cc6355d57bb3a9c7016933104627713b58abcecaa12417b64a",
            "d9095e8c10dc7fb060593e0c6b7e4dea832a685afd96edd661ddb48d32ca74e1",
            "eb8b3bfae929e613e63df8e3b20770a27050cd88b3f5099c372b1649fbeacd89",
            "d8d2bacf6182e1ffaec35c19412e84fce5a94bb5c86bd3c4ceb77c8a1692305d",
            "5210c8d56a9ed82c4b1d9df161120b7a8c70175212459232dd418976b7fb029e",
          ],
          merkleRoot: "a67e656818400c059e3461b53b042e85fa4db8ceb57ae51e15e21cc15c9ad3ef",
        },
      };

      triggerErrorLogging(certificate, [
        "CERTIFICATE_HASH", // Document has been tampered, naughty naughty!
        "UNISSUED_CERTIFICATE", // Document isn't issued by the given store
        "REVOKED_CERTIFICATE", // Document has been revoked by the given store
      ]);

      expect(window.ga).toHaveBeenCalledWith(
        "send",
        "event",
        "CERTIFICATE_ERROR",
        "ERROR - Singapore Examinations and Assessment Board",
        "CERTIFICATE_HASH,UNISSUED_CERTIFICATE,REVOKED_CERTIFICATE",
        undefined,
        {
          dimension1: "0xE4a94Ef9C26904A02Cd6735F7D4De1D840146a0f",
          dimension2: "MyAwesomeCertID",
          dimension3: "SINGAPORE-CAMBRIDGE GENERAL CERTIFICATE OF EDUCATION ORDINARY LEVEL",
          dimension4: "2019-09-02T18:51:14+08:00",
          dimension5: "Singapore Examinations and Assessment Board",
          dimension6: "seab-registry",
          dimension7: "CERTIFICATE_HASH,UNISSUED_CERTIFICATE,REVOKED_CERTIFICATE",
          nonInteraction: true,
        }
      );
    });
    it("should send cert details (documentStore/DNS-TXT) and errors to Google Analytics", () => {
      const certificate: WrappedDocument = {
        version: SchemaId.v2,
        data: {
          id: "e160ddc1-3e9f-496a-8e96-d3c0873c7561:string:MyAwesomeCertID",
          description: "d24c312f-86b0-4446-a03d-38fb9957aefc:string:The course...",
          name:
            "b5fae7b2-ca9a-4ebc-a732-63f1c208263e:string:Practitioner Certificate in Personal Data Protection (Singapore)",
          recipient: {
            name: "93c37dd3-8416-49f8-81b7-1716d3aefa5f:string:Goi Jia Jian",
          },
          issuedOn: "42286912-67d2-4185-a481-2c7821131283:string:2020-04-14T08:00:00+08:00",
          issuers: [
            {
              name: "90757fa9-c143-45bb-9769-bc1f266058c4:string:Demo Academy",
              documentStore: "48030765-2463-4d83-878d-79db52b0d877:string:0x8Fc57204c35fb9317D91285eF52D6b892EC08cD3",
              network: "49d75ef9-d606-4923-9492-9cf4da012a64:string:ETHEREUM",
              identityProof: {
                type: "0bd3fb8f-c065-4808-b128-29cc13fb1cc1:string:DNS-TXT",
                location: "71b2f120-a613-44aa-8cf0-13ae660cdb0b:string:example.openattestation.com",
              },
            },
          ],
          additionalData: {
            certSignatories: [
              {
                name: "b2d4a5fc-7e0a-43ad-a224-97c21c3adb85:string:Professor Demo of all Demos",
                designation: "5226c4c8-df28-4eed-8d9f-0cf41b09dbdb:string:Dean of Demos",
              },
            ]
          },
          $template: {
            name: "10af685b-06c1-49dd-92bb-af3a52fcf705:string:SMU-A-TIS-2019-4",
            type: "f81508ff-2f40-4bf5-a6ec-7b907d1a9898:string:EMBEDDED_RENDERER",
            url: "fe4ef2ba-e773-4ba4-ba14-c9e88bc35abe:string:https://demo-cnm.openattestation.com",
          },
        },
        privacy: {
          obfuscatedData: [],
        },
        signature: {
          type: "SHA3MerkleProof",
          targetHash: "64f7b1322fdb86be136a23eb65b93351bdf5128a0e5afb64019e179cb66f078b",
          proof: [
            "f5dab77712afd47a8b87b4b3bc685c1c6827843e38357697e52c01593ed7fb22",
            "516794e14a69074a1437ddb972a063d04b4733ad6076fdd335f2d5bdab52ec05",
            "74f086ebff10a10158233dbbdc207d4514f7bd8df9cbcadf4a384c1cf0de96f7",
            "eddfd98891328db274321edc5985d839772e3bc1e481d8f7d6fa972cad7ed68f",
          ],
          merkleRoot: "6b5bb39220415b92c321cb981fccf6e8cdc16287d8eb2e56a2ad33f757ccfae2",
        },
      };

      triggerErrorLogging(certificate, [
        "CERTIFICATE_HASH", // Document has been tampered, naughty naughty!
        "UNISSUED_CERTIFICATE", // Document isn't issued by the given store
        "REVOKED_CERTIFICATE", // Document has been revoked by the given store
      ]);
      expect(window.ga).toHaveBeenCalledWith(
        "send",
        "event",
        "CERTIFICATE_ERROR",
        "ERROR - example.openattestation.com",
        "CERTIFICATE_HASH,UNISSUED_CERTIFICATE,REVOKED_CERTIFICATE",
        undefined,
        {
          dimension1: "0x8Fc57204c35fb9317D91285eF52D6b892EC08cD3",
          dimension2: "MyAwesomeCertID",
          dimension3: "Practitioner Certificate in Personal Data Protection (Singapore)",
          dimension4: "2020-04-14T08:00:00+08:00",
          dimension5: "example.openattestation.com",
          dimension6: "(not set)",
          dimension7: "CERTIFICATE_HASH,UNISSUED_CERTIFICATE,REVOKED_CERTIFICATE",
          nonInteraction: true,
        }
      );
    });
  });
});
