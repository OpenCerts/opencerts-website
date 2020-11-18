import { VerificationFragment } from "@govtechsg/oa-verify";
import { getIdentityVerificationText } from "./CertificateVerifyBlock";

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
          name: "OpenAttestationDnsTxt",
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
      expect(getIdentityVerificationText(fragments)).toStrictEqual("GOVTECH");
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
          name: "OpenAttestationDnsTxt",
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
      expect(getIdentityVerificationText(fragments)).toStrictEqual("DEMO");
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
          name: "OpenAttestationDnsTxt",
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
      expect(getIdentityVerificationText(fragments)).toStrictEqual("DEMO, GOVTECH");
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
          name: "OpenAttestationDnsTxt",
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

      expect(getIdentityVerificationText(fragments)).toStrictEqual("DEMO, ABC.COM");
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
          name: "OpenAttestationDnsTxt",
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

      expect(getIdentityVerificationText(fragments)).toStrictEqual("Unknown");
    });

    it("should return registry identity when dns is skipped", () => {
      const fragments: VerificationFragment[] = [
        {
          status: "SKIPPED",
          type: "ISSUER_IDENTITY",
          name: "OpenAttestationDnsTxt",
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

      expect(getIdentityVerificationText(fragments)).toStrictEqual(
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
          name: "OpenAttestationDnsTxt",
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
      expect(getIdentityVerificationText(fragments)).toStrictEqual("ABC.COM");
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
          name: "OpenAttestationDnsTxt",
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
      expect(getIdentityVerificationText(fragments)).toStrictEqual("DEMO.COM, XYZ.COM");
    });
  });
});
