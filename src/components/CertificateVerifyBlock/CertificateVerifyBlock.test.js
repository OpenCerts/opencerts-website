import { getIdentityVerificationText } from "./CertificateVerifyBlock";

describe("Certificate verify block getIdentityVerificationText", () => {
  describe("When registry is verified", () => {
    test("should return appropriate display text when singular registry is verified", () => {
      const fragments = [
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
      expect(getIdentityVerificationText(fragments)).toStrictEqual("Certificate issued by GOVTECH");
    });

    test("should return appropriate display text when registry is verified but dns is unverified", () => {
      const fragments = [
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
      expect(getIdentityVerificationText(fragments)).toStrictEqual("Certificate issued by DEMO");
    });

    test("should return appropriate display text when multiple registry is verified", () => {
      const fragments = [
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
              location: "abc.com",
            },
            {
              status: "VALID",
              location: "demo.com",
            },
          ],
        },
      ];
      expect(getIdentityVerificationText(fragments)).toStrictEqual("Certificate issued by GOVTECH");
    });

    test("should return appropriate display text when one of each registry and dns verified", () => {
      const fragments = [
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

      expect(getIdentityVerificationText(fragments)).toStrictEqual("Certificate issued by DEMO");
    });

    test("should return Certificate issued by Unknown when registry and dns don't resolve any value", () => {
      const fragments = [
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

      expect(getIdentityVerificationText(fragments)).toStrictEqual("Certificate issued by Unknown");
    });
  });

  describe("should return appropriate display text when dns is verified", () => {
    test("when registry is unverified but dns is verified", () => {
      const fragments = [
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
      expect(getIdentityVerificationText(fragments)).toStrictEqual("Certificate issued by ABC.COM");
    });

    test("should return appropriate display text when multiple dns is verified", () => {
      const fragments = [
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
      expect(getIdentityVerificationText(fragments)).toStrictEqual("Certificate issued by DEMO.COM");
    });
  });
});
