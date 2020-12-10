import { VerificationFragment } from "@govtechsg/oa-verify";
import { SchemaId, v2, WrappedDocument } from "@govtechsg/open-attestation";
import { getIdentityVerificationText } from "./CertificateVerifyBlock";

const buildDocumentWithIssuers = (issuers: v2.Issuer[]): WrappedDocument<v2.OpenAttestationDocument> => {
  return {
    version: SchemaId.v2,
    signature: {
      type: "SHA3MerkleProof" as const,
      proof: [],
      targetHash: "",
      merkleRoot: "",
    },
    data: {
      issuers,
    },
  };
};

describe("certificate verify block getIdentityVerificationText", () => {
  describe("wWhen registry is verified", () => {
    it("should return appropriate display identity from registry before when dns and registry are valid", () => {
      const fragments: VerificationFragment[] = [
        {
          name: "OpencertsRegistryVerifier",
          type: "ISSUER_IDENTITY",
          status: "VALID",
          data: [
            {
              name: "Govtech",
              status: "VALID",
            },
          ],
        },
        {
          name: "OpenAttestationDnsTxtIdentityProof",
          type: "ISSUER_IDENTITY",
          status: "VALID",
          data: [
            {
              status: "VALID",
              location: "abc.com",
            },
          ],
        },
      ];
      expect(getIdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }]))).toStrictEqual(
        "GOVTECH"
      );
    });

    it("should return appropriate display text when registry is verified but dns is unverified", () => {
      const fragments: VerificationFragment[] = [
        {
          name: "OpencertsRegistryVerifier",
          type: "ISSUER_IDENTITY",
          status: "VALID",
          data: [
            {
              name: "Demo",
              status: "VALID",
            },
          ],
        },
        {
          name: "OpenAttestationDnsTxtIdentityProof",
          type: "ISSUER_IDENTITY",
          status: "VALID",
          data: [
            {
              status: "INVALID",
              location: "abc.com",
            },
          ],
        },
      ];
      expect(getIdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }]))).toStrictEqual(
        "DEMO"
      );
    });

    it("should return appropriate display identity from registry sort identities", () => {
      const fragments: VerificationFragment[] = [
        {
          name: "OpencertsRegistryVerifier",
          type: "ISSUER_IDENTITY",
          status: "VALID",
          data: [
            {
              name: "Govtech",
              status: "VALID",
            },
            {
              name: "Demo",
              status: "VALID",
            },
          ],
        },
        {
          name: "OpenAttestationDnsTxtIdentityProof",
          type: "ISSUER_IDENTITY",
          status: "VALID",
          data: [
            {
              status: "VALID",
              location: "demo.com",
            },
            {
              status: "VALID",
              location: "abc.com",
            },
          ],
        },
      ];
      expect(
        getIdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }, { name: "Issuer 2" }]))
      ).toStrictEqual("DEMO, GOVTECH");
    });

    it("should return appropriate display identity from registry or dns when available and sort by giving priority to registry", () => {
      const fragments: VerificationFragment[] = [
        {
          name: "OpencertsRegistryVerifier",
          type: "ISSUER_IDENTITY",
          status: "VALID",
          data: [
            {
              name: "Govtech",
              status: "INVALID",
            },
            {
              name: "Demo",
              status: "VALID",
            },
          ],
        },
        {
          name: "OpenAttestationDnsTxtIdentityProof",
          type: "ISSUER_IDENTITY",
          status: "VALID",
          data: [
            {
              status: "VALID",
              location: "abc.com",
            },
            {
              status: "INVALID",
              location: "demo.com",
            },
          ],
        },
      ];

      expect(
        getIdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }, { name: "Issuer 2" }]))
      ).toStrictEqual("DEMO, ABC.COM");
    });

    it("should return Certificate issued by Unknown when registry and dns don't resolve any value", () => {
      const fragments: VerificationFragment[] = [
        {
          name: "OpencertsRegistryVerifier",
          type: "ISSUER_IDENTITY",
          status: "INVALID",
          data: [
            {
              name: "Govtech",
              status: "INVALID",
            },
          ],
        },
        {
          name: "OpenAttestationDnsTxtIdentityProof",
          type: "ISSUER_IDENTITY",
          status: "INVALID",
          data: [
            {
              status: "INVALID",
              location: "abc.com",
            },
          ],
        },
      ];

      expect(getIdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }]))).toStrictEqual(
        "Unknown"
      );
    });

    it("should return registry identity when dns is skipped", () => {
      const fragments: VerificationFragment[] = [
        {
          status: "SKIPPED",
          type: "ISSUER_IDENTITY",
          name: "OpenAttestationDnsTxtIdentityProof",
          reason: {
            code: 2,
            codeString: "SKIPPED",
            message:
              'Document issuers doesn\'t have "documentStore" / "tokenRegistry" property or doesn\'t use DNS-TXT type',
          },
        },
        {
          type: "ISSUER_IDENTITY",
          name: "OpencertsRegistryVerifier",
          status: "VALID",
          data: [
            {
              status: "VALID",
              value: "0xdcA6Eea7024151c270b50FcA9E67161119B06BAD",
              name: "ROPSTEN: Government Technology Agency of Singapore (GovTech)",
              displayCard: false,
            },
          ],
        },
      ];

      expect(getIdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }]))).toStrictEqual(
        "ROPSTEN: GOVERNMENT TECHNOLOGY AGENCY OF SINGAPORE (GOVTECH)"
      );
    });
  });

  describe("should return appropriate display text when dns is verified", () => {
    it("when registry is unverified but dns is verified", () => {
      const fragments: VerificationFragment[] = [
        {
          name: "OpencertsRegistryVerifier",
          type: "ISSUER_IDENTITY",
          status: "INVALID",
          data: [
            {
              name: "Govtech",
              status: "INVALID",
            },
          ],
        },
        {
          name: "OpenAttestationDnsTxtIdentityProof",
          type: "ISSUER_IDENTITY",
          status: "VALID",
          data: [
            {
              status: "VALID",
              location: "abc.com",
            },
          ],
        },
      ];
      expect(getIdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }]))).toStrictEqual(
        "ABC.COM"
      );
    });

    it("should return appropriate display text when multiple dns is verified", () => {
      const fragments: VerificationFragment[] = [
        {
          name: "OpencertsRegistryVerifier",
          type: "ISSUER_IDENTITY",
          status: "INVALID",
          data: [
            {
              name: "Govtech",
              status: "INVALID",
            },
            {
              name: "Demo",
              status: "INVALID",
            },
          ],
        },
        {
          name: "OpenAttestationDnsTxtIdentityProof",
          type: "ISSUER_IDENTITY",
          status: "VALID",
          data: [
            {
              status: "VALID",
              location: "xyz.com",
            },
            {
              status: "VALID",
              location: "demo.com",
            },
          ],
        },
      ];
      expect(
        getIdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }, { name: "Issuer 2" }]))
      ).toStrictEqual("DEMO.COM, XYZ.COM");
    });
  });
});
