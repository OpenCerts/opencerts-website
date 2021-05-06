import {
  AllVerificationFragment,
  OpenAttestationDnsTxtIdentityProofInvalidFragmentV2,
  OpenAttestationDnsTxtIdentityProofValidFragmentV2,
} from "@govtechsg/oa-verify";
import { SchemaId, v2, WrappedDocument } from "@govtechsg/open-attestation";
import {
  OpencertsRegistryVerifierInvalidFragmentV2,
  OpencertsRegistryVerifierValidFragmentV2,
} from "@govtechsg/opencerts-verify";
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

const buildOpencertsRegistryVerifierValidFragment = ({
  name,
}: {
  name: string | string[];
}): OpencertsRegistryVerifierValidFragmentV2 => {
  const names = ([] as string[]).concat(name);
  return {
    name: "OpencertsRegistryVerifier",
    type: "ISSUER_IDENTITY",
    status: "VALID",
    data: names.map((name) => ({
      name,
      status: "VALID",
      value: "value",
      displayCard: true,
    })),
  };
};
const buildOpencertsRegistryVerifierInvalidFragment = ({
  name,
}: {
  name: string | string[];
}): OpencertsRegistryVerifierInvalidFragmentV2 => {
  const names = ([] as string[]).concat(name);
  return {
    name: "OpencertsRegistryVerifier",
    type: "ISSUER_IDENTITY",
    status: "INVALID",
    data: names.map((name) => ({
      name,
      status: "INVALID",
      value: "value",
      reason: {
        code: 0,
        codeString: "INVALID_IDENTITY",
        message: "Document store 0x8FC57204C35FB9317D91285EF52D6B892EC08CD3 not found in the registry",
      },
    })),
    reason: {
      code: 0,
      codeString: "INVALID_IDENTITY",
      message: "Document store 0x8FC57204C35FB9317D91285EF52D6B892EC08CD3 not found in the registry",
    },
  };
};

const buildDnsTxtValidFragment = ({
  location,
}: {
  location: string | string[];
}): OpenAttestationDnsTxtIdentityProofValidFragmentV2 => {
  const locations = ([] as string[]).concat(location);
  return {
    name: "OpenAttestationDnsTxtIdentityProof",
    type: "ISSUER_IDENTITY",
    status: "VALID",
    data: locations.map((location) => ({
      status: "VALID",
      location,
      value: "value",
    })),
  };
};
const buildDnsTxtInvalidFragment = ({
  location,
}: {
  location: string | string[];
}): OpenAttestationDnsTxtIdentityProofInvalidFragmentV2 => {
  const fragment = buildDnsTxtValidFragment({ location });
  return {
    ...fragment,
    status: "INVALID",
    data: fragment.data.map((data) => ({
      ...data,
      status: "INVALID",
      reason: {
        code: 0,
        codeString: "INVALID_IDENTITY",
        message: "error",
      },
    })),
    reason: {
      codeString: "codeString",
      message: "message",
      code: 1,
    },
  };
};

describe("certificate verify block getIdentityVerificationText", () => {
  describe("wWhen registry is verified", () => {
    it("should return appropriate display identity from registry before when dns and registry are valid", () => {
      const fragments: AllVerificationFragment[] = [
        buildOpencertsRegistryVerifierValidFragment({ name: "Govtech" }),
        buildDnsTxtValidFragment({ location: "abc.com" }),
      ];
      expect(getIdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }]))).toStrictEqual(
        "GOVTECH"
      );
    });

    it("should return appropriate display text when registry is verified but dns is unverified", () => {
      const fragments: AllVerificationFragment[] = [
        buildOpencertsRegistryVerifierValidFragment({ name: "Demo" }),
        buildDnsTxtInvalidFragment({ location: "abc.com" }),
      ];
      expect(getIdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }]))).toStrictEqual(
        "DEMO"
      );
    });

    it("should return appropriate display identity from registry sort identities", () => {
      const fragments: AllVerificationFragment[] = [
        buildOpencertsRegistryVerifierValidFragment({ name: ["Govtech", "Demo"] }),
        buildDnsTxtValidFragment({ location: ["demo.com", "abc.com"] }),
      ];
      expect(
        getIdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }, { name: "Issuer 2" }]))
      ).toStrictEqual("DEMO, GOVTECH");
    });

    it("should return appropriate display identity from registry or dns when available and sort by giving priority to registry", () => {
      const ocFragment = buildOpencertsRegistryVerifierValidFragment({ name: ["Govtech", "Demo"] });
      ocFragment.data[0] = {
        status: "INVALID",
        value: "0x8FC57204C35FB9317D91285EF52D6B892EC08CD3",
        reason: {
          code: 0,
          codeString: "INVALID_IDENTITY",
          message: "Document store 0x8FC57204C35FB9317D91285EF52D6B892EC08CD3 not found in the registry",
        },
      };
      const dnsTextFragment = buildDnsTxtInvalidFragment({ location: ["abc.com", "demo.com"] });
      dnsTextFragment.data[0].status = "VALID";
      const fragments: AllVerificationFragment[] = [ocFragment, dnsTextFragment];

      expect(
        getIdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }, { name: "Issuer 2" }]))
      ).toStrictEqual("DEMO, ABC.COM");
    });

    it("should return Certificate issued by Unknown when registry and dns don't resolve any value", () => {
      const fragments: AllVerificationFragment[] = [
        buildOpencertsRegistryVerifierInvalidFragment({ name: "Govtech" }),
        buildDnsTxtInvalidFragment({ location: "abc.com" }),
      ];

      expect(getIdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }]))).toStrictEqual(
        "Unknown"
      );
    });

    it("should return registry identity when dns is skipped", () => {
      const fragments: AllVerificationFragment[] = [
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
      const fragments: AllVerificationFragment[] = [
        buildOpencertsRegistryVerifierInvalidFragment({ name: "Govtech" }),
        buildDnsTxtValidFragment({ location: "abc.com" }),
      ];
      expect(getIdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }]))).toStrictEqual(
        "ABC.COM"
      );
    });

    it("should return appropriate display text when multiple dns is verified", () => {
      const fragments: AllVerificationFragment[] = [
        buildOpencertsRegistryVerifierInvalidFragment({ name: ["Govtech", "demo"] }),
        buildDnsTxtValidFragment({ location: ["xyz.com", "demo.com"] }),
      ];
      expect(
        getIdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }, { name: "Issuer 2" }]))
      ).toStrictEqual("DEMO.COM, XYZ.COM");
    });
  });
});
