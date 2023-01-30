import { SchemaId, v2, v3, WrappedDocument } from "@govtechsg/open-attestation";
import ReactGA from "react-ga4";
import dnsDidSigned from "../tests/fixture/dns-did-signed.json";
import {
  analyticsEvent,
  sendV2EventCertificateViewedDetailed,
  sendV3EventCertificateViewedDetailed,
  stringifyEvent,
  triggerV2ErrorLogging,
  triggerV3ErrorLogging,
  validateEvent,
} from "./index";

jest.mock("react-ga4");

const evt = {
  category: "TEST_CATEGORY",
  label: "TEST_LABEL",
  value: 2,
};
const v3Document: v3.WrappedDocument = {
  version: SchemaId.v3,
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://schemata.openattestation.com/com/openattestation/1.0/DrivingLicenceCredential.json",
    "https://schemata.openattestation.com/com/openattestation/1.0/OpenAttestation.v3.json",
    "https://schemata.openattestation.com/com/openattestation/1.0/CustomContext.json",
  ],
  reference: "SERIAL_NUMBER_123",
  name: "Republic of Singapore Driving Licence",
  issuanceDate: "2010-01-01T19:23:24Z",
  validFrom: "2010-01-01T19:23:24Z",
  issued: "2010-01-01T19:23:24Z",
  issuer: { id: "https://example.com", name: "DEMO STORE" },
  id: "REF_123456",
  type: ["VerifiableCredential", "DrivingLicenceCredential"],
  credentialSubject: {
    id: "did:example:JOHN_DOE_DID",
    name: "John Doe",
    class: [
      { type: "3", effectiveDate: "2010-01-01T19:23:24Z" },
      { type: "3A", effectiveDate: "2010-01-01T19:23:24Z" },
    ],
  },
  openAttestationMetadata: {
    template: {
      name: "DRIVING_LICENSE",
      type: v3.TemplateType.EmbeddedRenderer,
      url: "https://tutorial-renderer.openattestation.com",
    },
    proof: {
      type: v3.ProofType.OpenAttestationProofMethod,
      method: v3.Method.Did,
      value: "did:ethr:0xB26B4941941C51a4885E5B7D3A1B861E54405f90",
      revocation: {
        type: v3.RevocationType.None,
      },
    },
    identityProof: {
      type: v3.IdentityProofType.DNSDid,
      identifier: "example.openattestation.com",
    },
  },
  proof: {
    merkleRoot: "",
    proofPurpose: "assertionMethod",
    proofs: [],
    targetHash: "",
    type: "OpenAttestationMerkleProofSignature2018",
    salts: "",
    privacy: {
      obfuscated: [],
    },
  },
};

describe("stringifyEvent", () => {
  it("prints the event", () => {
    const evtString = stringifyEvent(evt);
    expect(evtString).toBe("Category*: TEST_CATEGORY, Value: 2");
  });
});

describe("validateEvent", () => {
  it("throws if category is missing", () => {
    expect(() =>
      // @ts-expect-error we expect this error to be thrown
      validateEvent({})
    ).toThrow("Category is required");
  });

  it("throws if value is not number", () => {
    expect(() => validateEvent({ category: "CATEGORY", value: "STRING" })).toThrow("Value must be a number");
  });

  it("passes for minimum values", () => {
    expect(() =>
      validateEvent({
        category: "CATEGORY",
        value: undefined,
      })
    ).not.toThrow();
  });

  it("passes for all values", () => {
    expect(() =>
      validateEvent({
        category: "CATEGORY",
        value: 2,
      })
    ).not.toThrow();
  });
});

describe("event", () => {
  it("sends and log ga event", () => {
    analyticsEvent(evt);
    expect(ReactGA.event).toHaveBeenCalledWith("TEST_CATEGORY", {
      nonInteraction: undefined,
      value: 2,
    });
  });

  it("throws if there is a validation error", () => {
    const errEvt = { ...evt, value: "STRING" };
    expect(() => analyticsEvent(errEvt)).toThrow("Value must be a number");
  });
});

describe("analytics*", () => {
  // eslint-disable-next-line jest/no-hooks
  beforeEach(() => {
    jest.spyOn(ReactGA, "event").mockImplementation();
  });

  describe("sendV2EventCertificateViewedDetailed", () => {
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
        sendV2EventCertificateViewedDetailed({ issuer, certificateData });
        expect(ReactGA.event).toHaveBeenCalledWith("CERTIFICATE_DETAILS", {
          document_id: "id1",
          document_name: "cert name",
          document_store: `"0x007d40224f6562461633ccfbaffd359ebb2fc9ba"`,
          issued_on: "a date",
          registry_id: "govtech-registry",
          issuer_name: "Government Technology Agency of Singapore (GovTech)",
          nonInteraction: true,
          value: undefined,
        });
      });
      it("should use key to retrieve registry information (not available)", () => {
        const issuer: v2.Issuer = {
          id: "did:ethr:0xE712878f6E8d5d4F9e87E10DA604F9cB564C9a89",
          name: "aaa",
          identityProof: {
            key: "did:ethr:0xE712878f6E8d5d4F9e87E10DA604F9cB564C9a89#controller",
            location: "aa.com",
            type: v2.IdentityProofType.DNSTxt,
          },
        };
        const certificateData = { id: "id1", name: "cert name", issuedOn: "a date" };
        sendV2EventCertificateViewedDetailed({ issuer, certificateData });
        expect(ReactGA.event).toHaveBeenCalledWith("CERTIFICATE_DETAILS", {
          document_id: "id1",
          document_name: "cert name",
          document_store: `"did:ethr:0xE712878f6E8d5d4F9e87E10DA604F9cB564C9a89"`,
          issued_on: "a date",
          issuer_name: "aa.com",
          nonInteraction: true,
          value: undefined,
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
        sendV2EventCertificateViewedDetailed({ issuer, certificateData });
        expect(ReactGA.event).toHaveBeenCalledWith("CERTIFICATE_DETAILS", {
          document_id: "id1",
          document_name: "cert name",
          document_store: `"0x007d40224f6562461633ccfbaffd359ebb2fc9ba"`,
          issued_on: "a date",
          registry_id: "govtech-registry",
          issuer_name: "Government Technology Agency of Singapore (GovTech)",
          nonInteraction: true,
          value: undefined,
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
        sendV2EventCertificateViewedDetailed({ issuer, certificateData });
        expect(ReactGA.event).toHaveBeenCalledWith("CERTIFICATE_DETAILS", {
          document_id: "id1",
          document_name: "cert name",
          document_store: `"0x5CA3b9daC85DA4DE4030e59C1a0248004209e348"`,
          issued_on: "a date",
          registry_id: "nyp-registry",
          issuer_name: "Nanyang Polytechnic",
          nonInteraction: true,
          value: undefined,
        });
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
        sendV2EventCertificateViewedDetailed({ issuer, certificateData });
        expect(ReactGA.event).toHaveBeenCalledWith("CERTIFICATE_DETAILS", {
          document_id: "id1",
          document_name: "cert name",
          document_store: `"0xabcdef"`,
          issued_on: "a date",
          issuer_name: "aa.com",
          nonInteraction: true,
          value: undefined,
        });
      });
    });
  });

  describe("sendV3EventCertificateViewedDetailed", () => {
    it("should work", () => {
      sendV3EventCertificateViewedDetailed({ certificateData: v3Document });
      expect(ReactGA.event).toHaveBeenCalledWith("CERTIFICATE_DETAILS", {
        document_id: "REF_123456",
        document_name: "Republic of Singapore Driving Licence",
        document_store: `"did:ethr:0xB26B4941941C51a4885E5B7D3A1B861E54405f90"`,
        issued_on: "2010-01-01T19:23:24Z",
        issuer_name: "example.openattestation.com",
        nonInteraction: true,
        value: undefined,
      });
    });
  });

  describe("triggerV2ErrorLogging", () => {
    interface Certificate extends v2.OpenAttestationDocument {
      attainmentDate?: string;
      description?: string;
      name?: string;
      issuedOn?: string;
      transcript?: {
        grade: string;
        name: string;
      }[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      additionalData?: Record<string, any>;
      issuers: (v2.Issuer & { network?: string })[];
    }
    it("should send cert details (certificateStore) and errors (tampered/unissued/revoked) to Google Analytics", () => {
      const certificate: WrappedDocument<Certificate> = {
        version: SchemaId.v2,
        data: {
          attainmentDate: "a6474204-94a4-499b-af95-b161ea0f6996:string:2012-12-31T23:59:00+08:00",
          transcript: [
            {
              grade: "0312dcfb-460d-4b01-b154-676ae307f91c:string:1",
              name: "191170f2-7c47-497f-954f-09b7b4b2fc25:string:ADDITIONAL MATHEMATICS",
            },
          ],
          $template: "87387e89-58ac-41cb-abb8-66af522dd5f5:string:sg/gov/seab/SOR_GCEO",
          name: "3185297a-bb47-4853-8f45-9cb60cf98608:string:SINGAPORE-CAMBRIDGE GENERAL CERTIFICATE OF EDUCATION ORDINARY LEVEL",
          recipient: {},
          id: "5dd55da3-8e32-4ee6-b23b-5c17a3395792:string:MyAwesomeCertID",
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
          proof: [],
          merkleRoot: "64f8058107cda314c437a1d22fd8906fdf6e08bde1d50293e0806c1dcf29f49b",
        },
      };

      triggerV2ErrorLogging(certificate, [
        "CERTIFICATE_HASH", // Document has been tampered, naughty naughty!
        "UNISSUED_CERTIFICATE", // Document isn't issued by the given store
        "REVOKED_CERTIFICATE", // Document has been revoked by the given store
      ]);

      expect(ReactGA.event).toHaveBeenCalledWith("CERTIFICATE_ERROR", {
        document_id: "MyAwesomeCertID",
        document_name: "SINGAPORE-CAMBRIDGE GENERAL CERTIFICATE OF EDUCATION ORDINARY LEVEL",
        document_store: `"0xE4a94Ef9C26904A02Cd6735F7D4De1D840146a0f"`,
        errors: "CERTIFICATE_HASH,UNISSUED_CERTIFICATE,REVOKED_CERTIFICATE",
        issued_on: "2019-09-02T18:51:14+08:00",
        registry_id: "seab-registry",
        issuer_name: "Singapore Examinations and Assessment Board",
        nonInteraction: true,
        value: undefined,
      });
    });
    it("should send cert details (document_store/DNS-TXT) and errors (tampered/unissued/revoked) to Google Analytics", () => {
      const certificate: WrappedDocument<Certificate> = {
        version: SchemaId.v2,
        data: {
          id: "e160ddc1-3e9f-496a-8e96-d3c0873c7561:string:MyAwesomeCertID",
          description: "d24c312f-86b0-4446-a03d-38fb9957aefc:string:The course...",
          name: "b5fae7b2-ca9a-4ebc-a732-63f1c208263e:string:Practitioner Certificate in Personal Data Protection (Singapore)",
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
          proof: [],
          merkleRoot: "64f7b1322fdb86be136a23eb65b93351bdf5128a0e5afb64019e179cb66f078b",
        },
      };

      triggerV2ErrorLogging(certificate, [
        "CERTIFICATE_HASH", // Document has been tampered, naughty naughty!
        "UNISSUED_CERTIFICATE", // Document isn't issued by the given store
        "REVOKED_CERTIFICATE", // Document has been revoked by the given store
      ]);
      expect(ReactGA.event).toHaveBeenCalledWith("CERTIFICATE_ERROR", {
        document_id: "MyAwesomeCertID",
        document_name: "Practitioner Certificate in Personal Data Protection (Singapore)",
        document_store: `"0x8Fc57204c35fb9317D91285eF52D6b892EC08cD3"`,
        errors: "CERTIFICATE_HASH,UNISSUED_CERTIFICATE,REVOKED_CERTIFICATE",
        issued_on: "2020-04-14T08:00:00+08:00",
        issuer_name: "example.openattestation.com",
        nonInteraction: true,
        value: undefined,
      });
    });
    it("should send cert details (document_store/DNS-TXT) and error (invalid argument) to Google Analytics", () => {
      const certificate: WrappedDocument<Certificate> = {
        version: SchemaId.v2,
        schema: "opencerts/v2.0",
        data: {
          id: "e160ddc1-3e9f-496a-8e96-d3c0873c7561:string:41368",
          name: "b5fae7b2-ca9a-4ebc-a732-63f1c208263e:string:Practitioner Certificate in Personal Data Protection (Singapore)",
          recipient: {
            name: "93c37dd3-8416-49f8-81b7-1716d3aefa5f:string:Goi Jia Jian",
          },
          issuedOn: "42286912-67d2-4185-a481-2c7821131283:string:2020-04-14T08:00:00+08:00",
          issuers: [
            {
              name: "90757fa9-c143-45bb-9769-bc1f266058c4:string:SMU Academy",
              documentStore: "48030765-2463-4d83-878d-79db52b0d877:string:0x6c806e3E0Ea393eC7E8b7E7fa62eF92Fcd039404",
              network: "49d75ef9-d606-4923-9492-9cf4da012a64:string:ETHEREUM",
              identityProof: {
                type: "0bd3fb8f-c065-4808-b128-29cc13fb1cc1:string:DNS-TXT",
                location: "71b2f120-a613-44aa-8cf0-13ae660cdb0b:string:certstore.smu.edu.sg",
              },
            },
          ],
          additionalData: {
            certSignatories: [
              {
                name: "b2d4a5fc-7e0a-43ad-a224-97c21c3adb85:string:Dr Lim Lai Cheng",
                designation: "5226c4c8-df28-4eed-8d9f-0cf41b09dbdb:string:Executive Director",
              },
            ],
            extra: {
              idType: "f4484005-7440-4e50-8b4a-1a44f6976a2f:string:SP",
            },
          },
          $template: {
            name: "10af685b-06c1-49dd-92bb-af3a52fcf705:string:SMU-A-TIS-2019-4",
            type: "f81508ff-2f40-4bf5-a6ec-7b907d1a9898:string:EMBEDDED_RENDERER",
            url: "fe4ef2ba-e773-4ba4-ba14-c9e88bc35abe:string:https://academy.smu.edu.sg/verify",
          },
        },
        privacy: {
          obfuscatedData: [
            "4c0ee8a39e52fd2c384bef1213b6784fcfac6a40ef9a3694d33ac315defa5d0f",
            "a162a4c136ec4a02cb3dd20ec281f55a0507ecf9b3f229a122a340e6786473ac",
            "a58d1e5760d6de35548e1eed358388d20040c91bf20f5658a6ef21c1f494c5eb",
            "ba4b4dc43e135ee233299e9b1206e84a7b440e4a0efe919988712643f5a4ce32",
            "1f0f651588668e132b1136359375eca2970acf7f0d355aad65b3e413dc017e93",
            "57fe916345aed42dc6308131ded36fccd06a3a924c59bdaeba279940d8d2474b",
            "da0030b16bfa4dcf9a5c04df5631b92f62146a4654b92b6630ac19aa9584cfa6",
          ],
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
          merkleRoot: "6b5bb39220415b92c321cb981fccf6e8cdc16287d8eb2e56a2ad33f757ccfae", // Removed the '2'
        },
      };

      triggerV2ErrorLogging(certificate, [
        "INVALID_ARGUMENT", // merkleRoot is odd-length
      ]);
      expect(ReactGA.event).toHaveBeenCalledWith("CERTIFICATE_ERROR", {
        document_id: "41368",
        document_name: "Practitioner Certificate in Personal Data Protection (Singapore)",
        document_store: `"0x6c806e3E0Ea393eC7E8b7E7fa62eF92Fcd039404"`,
        errors: "INVALID_ARGUMENT",
        issued_on: "2020-04-14T08:00:00+08:00",
        registry_id: "smu-registry-academy",
        issuer_name: "Singapore Management University Academy",
        nonInteraction: true,
        value: undefined,
      });
    });
    it("should send cert details (document_store/DNS-TXT) and error (HTTP response error) to Google Analytics", () => {
      const certificate: WrappedDocument<Certificate> = {
        version: SchemaId.v2,
        schema: "opencerts/v2.0",
        data: {
          id: "e160ddc1-3e9f-496a-8e96-d3c0873c7561:string:41368",
          name: "b5fae7b2-ca9a-4ebc-a732-63f1c208263e:string:Practitioner Certificate in Personal Data Protection (Singapore)",
          recipient: {
            name: "93c37dd3-8416-49f8-81b7-1716d3aefa5f:string:Goi Jia Jian",
          },
          issuedOn: "42286912-67d2-4185-a481-2c7821131283:string:2020-04-14T08:00:00+08:00",
          issuers: [
            {
              name: "90757fa9-c143-45bb-9769-bc1f266058c4:string:SMU Academy",
              documentStore: "48030765-2463-4d83-878d-79db52b0d877:string:0x6c806e3E0Ea393eC7E8b7E7fa62eF92Fcd039404",
              network: "49d75ef9-d606-4923-9492-9cf4da012a64:string:ETHEREUM",
              identityProof: {
                type: "0bd3fb8f-c065-4808-b128-29cc13fb1cc1:string:DNS-TXT",
                location: "71b2f120-a613-44aa-8cf0-13ae660cdb0b:string:certstore.smu.edu.sg",
              },
            },
          ],
          additionalData: {
            certSignatories: [
              {
                name: "b2d4a5fc-7e0a-43ad-a224-97c21c3adb85:string:Dr Lim Lai Cheng",
                designation: "5226c4c8-df28-4eed-8d9f-0cf41b09dbdb:string:Executive Director",
              },
            ],
            extra: {
              idType: "f4484005-7440-4e50-8b4a-1a44f6976a2f:string:SP",
            },
          },
          $template: {
            name: "10af685b-06c1-49dd-92bb-af3a52fcf705:string:SMU-A-TIS-2019-4",
            type: "f81508ff-2f40-4bf5-a6ec-7b907d1a9898:string:EMBEDDED_RENDERER",
            url: "fe4ef2ba-e773-4ba4-ba14-c9e88bc35abe:string:https://academy.smu.edu.sg/verify",
          },
        },
        privacy: {
          obfuscatedData: [
            "4c0ee8a39e52fd2c384bef1213b6784fcfac6a40ef9a3694d33ac315defa5d0f",
            "a162a4c136ec4a02cb3dd20ec281f55a0507ecf9b3f229a122a340e6786473ac",
            "a58d1e5760d6de35548e1eed358388d20040c91bf20f5658a6ef21c1f494c5eb",
            "ba4b4dc43e135ee233299e9b1206e84a7b440e4a0efe919988712643f5a4ce32",
            "1f0f651588668e132b1136359375eca2970acf7f0d355aad65b3e413dc017e93",
            "57fe916345aed42dc6308131ded36fccd06a3a924c59bdaeba279940d8d2474b",
            "da0030b16bfa4dcf9a5c04df5631b92f62146a4654b92b6630ac19aa9584cfa6",
          ],
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

      triggerV2ErrorLogging(certificate, [
        "SERVER_ERROR", // HTTP response error (rate limit, bad gateway, etc.)
      ]);
      expect(ReactGA.event).toHaveBeenCalledWith("CERTIFICATE_ERROR", {
        document_id: "41368",
        document_name: "Practitioner Certificate in Personal Data Protection (Singapore)",
        document_store: `"0x6c806e3E0Ea393eC7E8b7E7fa62eF92Fcd039404"`,
        errors: "SERVER_ERROR",
        issued_on: "2020-04-14T08:00:00+08:00",
        registry_id: "smu-registry-academy",
        issuer_name: "Singapore Management University Academy",
        nonInteraction: true,
        value: undefined,
      });
    });
    it("should send cert details (document_store/DNS-TXT) and error (Ethers unhandled error) to Google Analytics", () => {
      const certificate: WrappedDocument<Certificate> = {
        version: SchemaId.v2,
        schema: "opencerts/v2.0",
        data: {
          id: "e160ddc1-3e9f-496a-8e96-d3c0873c7561:string:41368",
          name: "b5fae7b2-ca9a-4ebc-a732-63f1c208263e:string:Practitioner Certificate in Personal Data Protection (Singapore)",
          recipient: {
            name: "93c37dd3-8416-49f8-81b7-1716d3aefa5f:string:Goi Jia Jian",
          },
          issuedOn: "42286912-67d2-4185-a481-2c7821131283:string:2020-04-14T08:00:00+08:00",
          issuers: [
            {
              name: "90757fa9-c143-45bb-9769-bc1f266058c4:string:SMU Academy",
              documentStore: "48030765-2463-4d83-878d-79db52b0d877:string:0x6c806e3E0Ea393eC7E8b7E7fa62eF92Fcd039404",
              network: "49d75ef9-d606-4923-9492-9cf4da012a64:string:ETHEREUM",
              identityProof: {
                type: "0bd3fb8f-c065-4808-b128-29cc13fb1cc1:string:DNS-TXT",
                location: "71b2f120-a613-44aa-8cf0-13ae660cdb0b:string:certstore.smu.edu.sg",
              },
            },
          ],
          additionalData: {
            certSignatories: [
              {
                name: "b2d4a5fc-7e0a-43ad-a224-97c21c3adb85:string:Dr Lim Lai Cheng",
                designation: "5226c4c8-df28-4eed-8d9f-0cf41b09dbdb:string:Executive Director",
              },
            ],
            extra: {
              idType: "f4484005-7440-4e50-8b4a-1a44f6976a2f:string:SP",
            },
          },
          $template: {
            name: "10af685b-06c1-49dd-92bb-af3a52fcf705:string:SMU-A-TIS-2019-4",
            type: "f81508ff-2f40-4bf5-a6ec-7b907d1a9898:string:EMBEDDED_RENDERER",
            url: "fe4ef2ba-e773-4ba4-ba14-c9e88bc35abe:string:https://academy.smu.edu.sg/verify",
          },
        },
        privacy: {
          obfuscatedData: [
            "4c0ee8a39e52fd2c384bef1213b6784fcfac6a40ef9a3694d33ac315defa5d0f",
            "a162a4c136ec4a02cb3dd20ec281f55a0507ecf9b3f229a122a340e6786473ac",
            "a58d1e5760d6de35548e1eed358388d20040c91bf20f5658a6ef21c1f494c5eb",
            "ba4b4dc43e135ee233299e9b1206e84a7b440e4a0efe919988712643f5a4ce32",
            "1f0f651588668e132b1136359375eca2970acf7f0d355aad65b3e413dc017e93",
            "57fe916345aed42dc6308131ded36fccd06a3a924c59bdaeba279940d8d2474b",
            "da0030b16bfa4dcf9a5c04df5631b92f62146a4654b92b6630ac19aa9584cfa6",
          ],
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

      triggerV2ErrorLogging(certificate, [
        "ETHERS_UNHANDLED_ERROR", // some funky error that we didn't catch
      ]);
      expect(ReactGA.event).toHaveBeenCalledWith("CERTIFICATE_ERROR", {
        document_id: "41368",
        document_name: "Practitioner Certificate in Personal Data Protection (Singapore)",
        document_store: `"0x6c806e3E0Ea393eC7E8b7E7fa62eF92Fcd039404"`,
        errors: "ETHERS_UNHANDLED_ERROR",
        issued_on: "2020-04-14T08:00:00+08:00",
        registry_id: "smu-registry-academy",
        issuer_name: "Singapore Management University Academy",
        nonInteraction: true,
        value: undefined,
      });
    });

    it("should send cert details (DID) and errors (tampered/unissued/revoked) to Google Analytics", () => {
      triggerV2ErrorLogging(dnsDidSigned as WrappedDocument<v2.OpenAttestationDocument>, [
        "CERTIFICATE_HASH", // Document has been tampered, naughty naughty!
        "UNISSUED_CERTIFICATE", // Document isn't issued by the given store
        "REVOKED_CERTIFICATE", // Document has been revoked by the given store
      ]);

      expect(ReactGA.event).toHaveBeenCalledWith("CERTIFICATE_ERROR", {
        document_id: "SGCNM21566325",
        document_store: `"did:ethr:0xE712878f6E8d5d4F9e87E10DA604F9cB564C9a89"`,
        errors: "CERTIFICATE_HASH,UNISSUED_CERTIFICATE,REVOKED_CERTIFICATE",
        issuer_name: "example.tradetrust.io",
        nonInteraction: true,
        value: undefined,
      });
    });
  });
  describe("triggerV3ErrorLogging", () => {
    it("should work", () => {
      triggerV3ErrorLogging(v3Document, [
        "CERTIFICATE_HASH", // Document has been tampered, naughty naughty!
        "UNISSUED_CERTIFICATE", // Document isn't issued by the given store
        "REVOKED_CERTIFICATE", // Document has been revoked by the given store
      ]);

      expect(ReactGA.event).toHaveBeenCalledWith("CERTIFICATE_ERROR", {
        document_id: "REF_123456",
        document_name: "Republic of Singapore Driving Licence",
        document_store: `"did:ethr:0xB26B4941941C51a4885E5B7D3A1B861E54405f90"`,
        errors: "CERTIFICATE_HASH,UNISSUED_CERTIFICATE,REVOKED_CERTIFICATE",
        issued_on: "2010-01-01T19:23:24Z",
        issuer_name: "example.openattestation.com",
        nonInteraction: true,
        value: undefined,
      });
    });
  });
});
