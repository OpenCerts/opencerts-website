import {
  AllVerificationFragment,
  OpenAttestationDnsTxtIdentityProofInvalidFragmentV2,
  OpenAttestationDnsTxtIdentityProofValidFragmentV2,
} from "@govtechsg/oa-verify";
import { SchemaId, v2, v3, WrappedDocument } from "@govtechsg/open-attestation";
import {
  OpencertsRegistryVerifierInvalidFragmentV2,
  OpencertsRegistryVerifierValidFragmentV2,
} from "@govtechsg/opencerts-verify";
import { getV2IdentityVerificationText, getV3IdentityVerificationText } from "./CertificateVerifyBlock";

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

describe("certificate verify block getV2IdentityVerificationText", () => {
  describe("wWhen registry is verified", () => {
    it("should return appropriate display identity from registry before when dns and registry are valid", () => {
      const fragments: AllVerificationFragment[] = [
        buildOpencertsRegistryVerifierValidFragment({ name: "Govtech" }),
        buildDnsTxtValidFragment({ location: "abc.com" }),
      ];
      expect(getV2IdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }]))).toStrictEqual(
        "GOVTECH"
      );
    });

    it("should return appropriate display text when registry is verified but dns is unverified", () => {
      const fragments: AllVerificationFragment[] = [
        buildOpencertsRegistryVerifierValidFragment({ name: "Demo" }),
        buildDnsTxtInvalidFragment({ location: "abc.com" }),
      ];
      expect(getV2IdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }]))).toStrictEqual(
        "DEMO"
      );
    });

    it("should return appropriate display identity from registry sort identities", () => {
      const fragments: AllVerificationFragment[] = [
        buildOpencertsRegistryVerifierValidFragment({ name: ["Govtech", "Demo"] }),
        buildDnsTxtValidFragment({ location: ["demo.com", "abc.com"] }),
      ];
      expect(
        getV2IdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }, { name: "Issuer 2" }]))
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
        getV2IdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }, { name: "Issuer 2" }]))
      ).toStrictEqual("DEMO, ABC.COM");
    });

    it("should return Certificate issued by Unknown when registry and dns don't resolve any value", () => {
      const fragments: AllVerificationFragment[] = [
        buildOpencertsRegistryVerifierInvalidFragment({ name: "Govtech" }),
        buildDnsTxtInvalidFragment({ location: "abc.com" }),
      ];

      expect(getV2IdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }]))).toStrictEqual(
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

      expect(getV2IdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }]))).toStrictEqual(
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
      expect(getV2IdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }]))).toStrictEqual(
        "ABC.COM"
      );
    });

    it("should return appropriate display text when multiple dns is verified", () => {
      const fragments: AllVerificationFragment[] = [
        buildOpencertsRegistryVerifierInvalidFragment({ name: ["Govtech", "demo"] }),
        buildDnsTxtValidFragment({ location: ["xyz.com", "demo.com"] }),
      ];
      expect(
        getV2IdentityVerificationText(fragments, buildDocumentWithIssuers([{ name: "Issuer 1" }, { name: "Issuer 2" }]))
      ).toStrictEqual("DEMO.COM, XYZ.COM");
    });
  });
});

describe("getV3IdentityVerificationText", () => {
  it("should work", () => {
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
          identifier: "real.example.openattestation.com",
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
    expect(getV3IdentityVerificationText(v3Document)).toStrictEqual("REAL.EXAMPLE.OPENATTESTATION.COM");
  });
});
