import { SchemaId, VerificationFragment, InvalidVerificationFragment, SkippedVerificationFragment, v2, v3 } from "@trustvc/trustvc";
import dnsDidV2Signed from "../components/tests/fixture/dns-did-signed.json";
import dnsDidV3Signed from "../integration/v3/fixture/dns-did-signed.json";
import { WrappedOrSignedOpenCertsDocument } from "../shared";
import { pushGTMEvent } from "./gtm";
import {
  DocumentVerificationEvent,
  buildVerificationEvent,
  getDocumentSchema,
  getErrorCode,
  getIssuerIdentity,
  getIssuerMethod,
  getSigningAlgorithm,
  pushVerificationEvent,
} from "./verificationAnalytics";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

jest.mock("./gtm", () => ({ pushGTMEvent: jest.fn() }));

// ---------------------------------------------------------------------------
// Shared test fixtures
// ---------------------------------------------------------------------------

/**
 * OA V3 document — DNS-DID identity proof, OpenAttestationMerkleProofSignature2018
 * Mirrors the fixture used in analytics.test.ts so we stay consistent.
 */
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
      revocation: { type: v3.RevocationType.None },
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
    privacy: { obfuscated: [] },
  },
};

/** Minimal W3C VC with did:web issuer */
const w3cDocWithDidWeb = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  type: ["VerifiableCredential"],
  issuer: "did:web:example.com",
  proof: { type: "BbsBlsSignature2020" },
  credentialSubject: {},
} as unknown as WrappedOrSignedOpenCertsDocument;

/** Minimal W3C VC with object issuer */
const w3cDocWithObjectIssuer = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  type: ["VerifiableCredential"],
  issuer: { id: "did:web:university.edu", name: "Test University" },
  proof: { type: "BbsBlsSignature2020" },
  credentialSubject: {},
} as unknown as WrappedOrSignedOpenCertsDocument;

/** Minimal W3C VC with a non-did:web issuer */
const w3cDocWithEthrIssuer = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  type: ["VerifiableCredential"],
  issuer: "did:ethr:0xABC123",
  proof: { type: "EcdsaSecp256k1Signature2019" },
  credentialSubject: {},
} as unknown as WrappedOrSignedOpenCertsDocument;

/** V2 document with DNS-TXT identity proof and a document store NOT in registry */
const v2DnsTxtDoc: WrappedOrSignedOpenCertsDocument = {
  version: SchemaId.v2,
  data: {
    id: "test-id",
    name: "Test Cert",
    issuedOn: "2024-01-01",
    issuers: [
      {
        name: "Test Issuer",
        documentStore: "0xNOTINREGISTRY",
        identityProof: {
          type: v2.IdentityProofType.DNSTxt,
          location: "test.example.com",
        },
      },
    ],
    $template: { name: "TEMPLATE", type: "EMBEDDED_RENDERER", url: "https://renderer.example.com" },
    recipient: {},
  },
  privacy: { obfuscatedData: [] },
  signature: {
    type: "SHA3MerkleProof",
    targetHash: "abc123",
    proof: [],
    merkleRoot: "abc123",
  },
} as unknown as WrappedOrSignedOpenCertsDocument;

/** V2 document with DNS-TXT identity proof and a document store IN registry */
const v2RegistryDoc: WrappedOrSignedOpenCertsDocument = {
  version: SchemaId.v2,
  data: {
    id: "registry-id",
    name: "Registry Cert",
    issuedOn: "2024-01-01",
    issuers: [
      {
        name: "Some Issuer Name",
        // 0x007d40224f6562461633ccfbaffd359ebb2fc9ba → "ROPSTEN: OpenCerts" in registry
        documentStore: "0x007d40224f6562461633ccfbaffd359ebb2fc9ba",
        identityProof: {
          type: v2.IdentityProofType.DNSTxt,
          location: "opencerts.io",
        },
      },
    ],
    $template: { name: "TEMPLATE", type: "EMBEDDED_RENDERER", url: "https://renderer.example.com" },
    recipient: {},
  },
  privacy: { obfuscatedData: [] },
  signature: {
    type: "SHA3MerkleProof",
    targetHash: "abc123",
    proof: [],
    merkleRoot: "abc123",
  },
} as unknown as WrappedOrSignedOpenCertsDocument;

// ---------------------------------------------------------------------------
// Fragment factories
// ---------------------------------------------------------------------------

const makeValidFragment = (type: VerificationFragment["type"], name: string): VerificationFragment => ({
  name,
  type,
  status: "VALID",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeInvalidFragment = (type: VerificationFragment["type"], name: string, reason = {}): InvalidVerificationFragment<any> => ({
  name,
  type,
  status: "INVALID",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reason: reason as any,
  data: undefined,
});

const makeSkippedFragment = (type: VerificationFragment["type"], name: string): SkippedVerificationFragment => ({
  name,
  type,
  status: "SKIPPED",
  reason: { code: 0, codeString: "SKIPPED", message: "skipped" },
});

/** Fragments representing a fully valid OA document */
const allValidFragments: VerificationFragment[] = [
  makeValidFragment("DOCUMENT_INTEGRITY", "OpenAttestationHash"),
  makeValidFragment("DOCUMENT_STATUS", "OpenAttestationEthereumDocumentStoreStatus"),
  makeValidFragment("ISSUER_IDENTITY", "OpenAttestationDnsTxtIdentityProof"),
];

/** Fragments representing a document with a tampered hash */
const tamperedHashFragments: VerificationFragment[] = [
  makeInvalidFragment("DOCUMENT_INTEGRITY", "OpenAttestationHash"),
  makeValidFragment("DOCUMENT_STATUS", "OpenAttestationEthereumDocumentStoreStatus"),
  makeValidFragment("ISSUER_IDENTITY", "OpenAttestationDnsTxtIdentityProof"),
];

/** Fragments representing an issuer identity failure */
const issuerIdentityFailFragments: VerificationFragment[] = [
  makeValidFragment("DOCUMENT_INTEGRITY", "OpenAttestationHash"),
  makeValidFragment("DOCUMENT_STATUS", "OpenAttestationEthereumDocumentStoreStatus"),
  makeInvalidFragment("ISSUER_IDENTITY", "OpenAttestationDnsTxtIdentityProof"),
];

/** Fragments for W3C VC with BBS2023 signing (all checks pass) */
const bbsFragments: VerificationFragment[] = [
  makeValidFragment("DOCUMENT_INTEGRITY", "Bbs2023W3CSignatureIntegrity"),
  makeSkippedFragment("DOCUMENT_INTEGRITY", "EcdsaW3CSignatureIntegrity"),
  makeSkippedFragment("DOCUMENT_INTEGRITY", "W3CSignatureIntegrity"),
  makeValidFragment("DOCUMENT_STATUS", "w3cCredentialStatus"),
  makeValidFragment("ISSUER_IDENTITY", "w3cIssuerIdentity"),
];

/** Fragments for W3C VC with ECDSA2023 signing (all checks pass) */
const ecdsaFragments: VerificationFragment[] = [
  makeSkippedFragment("DOCUMENT_INTEGRITY", "Bbs2023W3CSignatureIntegrity"),
  makeValidFragment("DOCUMENT_INTEGRITY", "EcdsaW3CSignatureIntegrity"),
  makeSkippedFragment("DOCUMENT_INTEGRITY", "W3CSignatureIntegrity"),
  makeValidFragment("DOCUMENT_STATUS", "w3cCredentialStatus"),
  makeValidFragment("ISSUER_IDENTITY", "w3cIssuerIdentity"),
];

/** Fragments for W3C VC with generic/unknown signing */
const genericW3cFragments: VerificationFragment[] = [
  makeSkippedFragment("DOCUMENT_INTEGRITY", "Bbs2023W3CSignatureIntegrity"),
  makeSkippedFragment("DOCUMENT_INTEGRITY", "EcdsaW3CSignatureIntegrity"),
  makeValidFragment("DOCUMENT_INTEGRITY", "W3CSignatureIntegrity"),
  makeValidFragment("DOCUMENT_STATUS", "w3cCredentialStatus"),
  makeValidFragment("ISSUER_IDENTITY", "w3cIssuerIdentity"),
];

/** Fragments representing a failed W3C VC document */
const failedW3cFragments: VerificationFragment[] = [
  makeInvalidFragment("DOCUMENT_INTEGRITY", "Bbs2023W3CSignatureIntegrity"),
  makeSkippedFragment("DOCUMENT_INTEGRITY", "EcdsaW3CSignatureIntegrity"),
  makeSkippedFragment("DOCUMENT_INTEGRITY", "W3CSignatureIntegrity"),
  makeValidFragment("DOCUMENT_STATUS", "w3cCredentialStatus"),
  makeInvalidFragment("ISSUER_IDENTITY", "w3cIssuerIdentity"),
];

// ---------------------------------------------------------------------------
// Tests: getDocumentSchema
// ---------------------------------------------------------------------------

describe("getDocumentSchema", () => {
  it("returns 'OA v2' for an OA v2 document", () => {
    expect(getDocumentSchema(dnsDidV2Signed as unknown as WrappedOrSignedOpenCertsDocument)).toBe("OA v2");
  });

  it("returns 'OA v3' for an OA v3 document", () => {
    expect(getDocumentSchema(v3Document as unknown as WrappedOrSignedOpenCertsDocument)).toBe("OA v3");
  });

  it("returns 'W3C VC' for a W3C VC document", () => {
    expect(getDocumentSchema(w3cDocWithDidWeb)).toBe("W3C VC");
  });

  it("returns 'W3C VC' for a W3C VC with object issuer", () => {
    expect(getDocumentSchema(w3cDocWithObjectIssuer)).toBe("W3C VC");
  });
});

// ---------------------------------------------------------------------------
// Tests: getIssuerMethod
// ---------------------------------------------------------------------------

describe("getIssuerMethod", () => {
  it("returns 'DNS-TXT' for v2 documents with DNS-TXT identity proof", () => {
    expect(getIssuerMethod(v2DnsTxtDoc)).toBe("DNS-TXT");
  });

  it("returns 'DNS-DID' for v2 documents with DNS-DID identity proof", () => {
    expect(getIssuerMethod(dnsDidV2Signed as unknown as WrappedOrSignedOpenCertsDocument)).toBe("DNS-DID");
  });

  it("returns 'DNS-DID' for v3 documents with DNS-DID identity proof", () => {
    expect(getIssuerMethod(v3Document as unknown as WrappedOrSignedOpenCertsDocument)).toBe("DNS-DID");
  });

  it("returns 'DID:WEB' for W3C VC with did:web string issuer", () => {
    expect(getIssuerMethod(w3cDocWithDidWeb)).toBe("DID:WEB");
  });

  it("returns 'DID:WEB' for W3C VC with did:web object issuer", () => {
    expect(getIssuerMethod(w3cDocWithObjectIssuer)).toBe("DID:WEB");
  });

  it("returns 'unknown' for W3C VC with a non-did:web DID issuer", () => {
    expect(getIssuerMethod(w3cDocWithEthrIssuer)).toBe("unknown");
  });

  it("returns 'unknown' for v2 document with no identity proof", () => {
    const noProofDoc = {
      ...v2DnsTxtDoc,
      data: {
        ...(v2DnsTxtDoc as unknown as { data: Record<string, unknown> }).data,
        issuers: [{ name: "No Proof Issuer", documentStore: "0xABC" }],
      },
    } as unknown as WrappedOrSignedOpenCertsDocument;
    expect(getIssuerMethod(noProofDoc)).toBe("unknown");
  });

  it("returns 'unknown' for v3 document without DNS-DID identity proof type", () => {
    const v3DocOtherProof = {
      ...v3Document,
      openAttestationMetadata: {
        ...v3Document.openAttestationMetadata,
        identityProof: {
          ...v3Document.openAttestationMetadata.identityProof,
          type: "UNKNOWN_TYPE" as v3.IdentityProofType,
        },
      },
    } as unknown as WrappedOrSignedOpenCertsDocument;
    expect(getIssuerMethod(v3DocOtherProof)).toBe("unknown");
  });
});

// ---------------------------------------------------------------------------
// Tests: getIssuerIdentity
// ---------------------------------------------------------------------------

describe("getIssuerIdentity", () => {
  it("returns registry name for v2 document with document store in registry", () => {
    expect(getIssuerIdentity(v2RegistryDoc)).toBe("ROPSTEN: OpenCerts");
  });

  it("returns identity proof location for v2 document not in registry", () => {
    expect(getIssuerIdentity(v2DnsTxtDoc)).toBe("test.example.com");
  });

  it("returns identity proof location for v2 DNS-DID document not in registry", () => {
    // dnsDidV2Signed issuer has no documentStore, has id (did:ethr) → falls to identityProof.location
    const identity = getIssuerIdentity(dnsDidV2Signed as unknown as WrappedOrSignedOpenCertsDocument);
    expect(identity).toBe("example.tradetrust.io");
  });

  it("returns identityProof.identifier for v3 documents", () => {
    expect(getIssuerIdentity(v3Document as unknown as WrappedOrSignedOpenCertsDocument)).toBe(
      "example.openattestation.com"
    );
  });

  it("returns issuer string for W3C VC with string issuer", () => {
    expect(getIssuerIdentity(w3cDocWithDidWeb)).toBe("did:web:example.com");
  });

  it("returns issuer.id for W3C VC with object issuer", () => {
    expect(getIssuerIdentity(w3cDocWithObjectIssuer)).toBe("did:web:university.edu");
  });

  it("returns empty string for v2 document with no issuers", () => {
    const noIssuersDoc = {
      ...v2DnsTxtDoc,
      data: {
        ...(v2DnsTxtDoc as unknown as { data: Record<string, unknown> }).data,
        issuers: [],
      },
    } as unknown as WrappedOrSignedOpenCertsDocument;
    expect(getIssuerIdentity(noIssuersDoc)).toBe("");
  });
});

// ---------------------------------------------------------------------------
// Tests: getSigningAlgorithm
// ---------------------------------------------------------------------------

describe("getSigningAlgorithm", () => {
  it("returns 'merkleroot2018' for OA v2 documents regardless of fragments", () => {
    expect(getSigningAlgorithm(dnsDidV2Signed as unknown as WrappedOrSignedOpenCertsDocument, [])).toBe(
      "merkleroot2018"
    );
  });

  it("returns 'merkleroot2018' for OA v3 documents regardless of fragments", () => {
    expect(getSigningAlgorithm(v3Document as unknown as WrappedOrSignedOpenCertsDocument, [])).toBe("merkleroot2018");
  });

  it("returns 'BBS2023' for W3C VC when Bbs2023W3CSignatureIntegrity fragment is not skipped", () => {
    expect(getSigningAlgorithm(w3cDocWithDidWeb, bbsFragments)).toBe("BBS2023");
  });

  it("returns 'ECDSA2023' for W3C VC when EcdsaW3CSignatureIntegrity fragment is not skipped", () => {
    expect(getSigningAlgorithm(w3cDocWithDidWeb, ecdsaFragments)).toBe("ECDSA2023");
  });

  it("returns 'unknown' for W3C VC with only generic W3CSignatureIntegrity fragment", () => {
    expect(getSigningAlgorithm(w3cDocWithDidWeb, genericW3cFragments)).toBe("unknown");
  });

  it("returns 'unknown' for W3C VC with empty fragments", () => {
    expect(getSigningAlgorithm(w3cDocWithDidWeb, [])).toBe("unknown");
  });

  it("ignores SKIPPED BBS fragment and returns 'unknown' when no non-skipped algorithm fragment exists", () => {
    const allSkipped: VerificationFragment[] = [
      makeSkippedFragment("DOCUMENT_INTEGRITY", "Bbs2023W3CSignatureIntegrity"),
      makeSkippedFragment("DOCUMENT_INTEGRITY", "EcdsaW3CSignatureIntegrity"),
    ];
    expect(getSigningAlgorithm(w3cDocWithDidWeb, allSkipped)).toBe("unknown");
  });

  it("detects BBS2023 even when verification result was INVALID (algorithm still ran)", () => {
    const failedBbsFragments: VerificationFragment[] = [
      makeInvalidFragment("DOCUMENT_INTEGRITY", "Bbs2023W3CSignatureIntegrity"),
    ];
    expect(getSigningAlgorithm(w3cDocWithDidWeb, failedBbsFragments)).toBe("BBS2023");
  });
});

// ---------------------------------------------------------------------------
// Tests: getErrorCode
// ---------------------------------------------------------------------------

describe("getErrorCode", () => {
  it("returns undefined when all fragments are valid", () => {
    expect(getErrorCode(v2DnsTxtDoc, allValidFragments)).toBeUndefined();
  });

  it("returns 'CERTIFICATE_HASH' when DOCUMENT_INTEGRITY is invalid", () => {
    expect(getErrorCode(v2DnsTxtDoc, tamperedHashFragments)).toBe("CERTIFICATE_HASH");
  });

  it("returns 'ISSUER_IDENTITY' when ISSUER_IDENTITY is invalid", () => {
    expect(getErrorCode(v2DnsTxtDoc, issuerIdentityFailFragments)).toBe("ISSUER_IDENTITY");
  });

  it("returns comma-separated codes when multiple checks fail", () => {
    const multiFailFragments: VerificationFragment[] = [
      makeInvalidFragment("DOCUMENT_INTEGRITY", "OpenAttestationHash"),
      makeValidFragment("DOCUMENT_STATUS", "OpenAttestationEthereumDocumentStoreStatus"),
      makeInvalidFragment("ISSUER_IDENTITY", "OpenAttestationDnsTxtIdentityProof"),
    ];
    const code = getErrorCode(v2DnsTxtDoc, multiFailFragments);
    expect(code).toContain("CERTIFICATE_HASH");
    expect(code).toContain("ISSUER_IDENTITY");
    expect(code?.split(",")).toHaveLength(2);
  });

  it("returns 'INVALID_DOCUMENT' for any failed W3C VC document", () => {
    expect(getErrorCode(w3cDocWithDidWeb, failedW3cFragments)).toBe("INVALID_DOCUMENT");
  });

  it("returns 'INVALID_DOCUMENT' for failed W3C VC regardless of which fragments failed", () => {
    const onlyIntegrityFail: VerificationFragment[] = [
      makeInvalidFragment("DOCUMENT_INTEGRITY", "Bbs2023W3CSignatureIntegrity"),
      makeValidFragment("ISSUER_IDENTITY", "w3cIssuerIdentity"),
    ];
    expect(getErrorCode(w3cDocWithDidWeb, onlyIntegrityFail)).toBe("INVALID_DOCUMENT");
  });

  it("returns 'ETHERS_UNHANDLED_ERROR' as fallback for unknown DOCUMENT_STATUS failure", () => {
    const unknownStatusFail: VerificationFragment[] = [
      makeValidFragment("DOCUMENT_INTEGRITY", "OpenAttestationHash"),
      makeInvalidFragment("DOCUMENT_STATUS", "OpenAttestationEthereumDocumentStoreStatus", {
        code: 999,
        codeString: "UNKNOWN",
        message: "Some weird error",
      }),
      makeValidFragment("ISSUER_IDENTITY", "OpenAttestationDnsTxtIdentityProof"),
    ];
    expect(getErrorCode(v2DnsTxtDoc, unknownStatusFail)).toBe("ETHERS_UNHANDLED_ERROR");
  });
});

// ---------------------------------------------------------------------------
// Tests: buildVerificationEvent
// ---------------------------------------------------------------------------

describe("buildVerificationEvent", () => {
  it("builds a correct event for a valid OA v2 document", () => {
    const event: DocumentVerificationEvent = buildVerificationEvent(v2DnsTxtDoc, allValidFragments);

    expect(event.event).toBe("document_verification_completed");
    expect(event.environment).toBe("local");
    expect(event.document_schema).toBe("OA v2");
    expect(event.issuer_method).toBe("DNS-TXT");
    expect(event.issuer_identity).toBe("test.example.com");
    expect(event.signing_algorithm).toBe("merkleroot2018");
    expect(event.verification_result).toBe("valid");
    expect(event.error_code).toBeUndefined();
  });

  it("builds a correct event for an invalid OA v2 document", () => {
    const event: DocumentVerificationEvent = buildVerificationEvent(v2DnsTxtDoc, tamperedHashFragments);

    expect(event.verification_result).toBe("invalid");
    expect(event.error_code).toBe("CERTIFICATE_HASH");
  });

  it("builds a correct event for a valid OA v3 document", () => {
    const event = buildVerificationEvent(v3Document as unknown as WrappedOrSignedOpenCertsDocument, allValidFragments);

    expect(event.document_schema).toBe("OA v3");
    expect(event.issuer_method).toBe("DNS-DID");
    expect(event.issuer_identity).toBe("example.openattestation.com");
    expect(event.signing_algorithm).toBe("merkleroot2018");
    expect(event.verification_result).toBe("valid");
    expect(event.error_code).toBeUndefined();
  });

  it("builds a correct event for a valid W3C VC with BBS2023 signing", () => {
    const event = buildVerificationEvent(w3cDocWithDidWeb, bbsFragments);

    expect(event.environment).toBe("local");
    expect(event.document_schema).toBe("W3C VC");
    expect(event.issuer_method).toBe("DID:WEB");
    expect(event.issuer_identity).toBe("did:web:example.com");
    expect(event.signing_algorithm).toBe("BBS2023");
    expect(event.verification_result).toBe("valid");
    expect(event.error_code).toBeUndefined();
  });

  it("builds a correct event for a failed W3C VC", () => {
    const event = buildVerificationEvent(w3cDocWithDidWeb, failedW3cFragments);

    expect(event.document_schema).toBe("W3C VC");
    expect(event.signing_algorithm).toBe("BBS2023");
    expect(event.verification_result).toBe("invalid");
    expect(event.error_code).toBe("INVALID_DOCUMENT");
  });

  it("omits error_code entirely for valid documents (no undefined key pollution)", () => {
    const event = buildVerificationEvent(v2DnsTxtDoc, allValidFragments);
    expect(Object.prototype.hasOwnProperty.call(event, "error_code")).toBe(false);
  });

  it("includes error_code for invalid documents", () => {
    const event = buildVerificationEvent(v2DnsTxtDoc, issuerIdentityFailFragments);
    expect(Object.prototype.hasOwnProperty.call(event, "error_code")).toBe(true);
    expect(event.error_code).toBe("ISSUER_IDENTITY");
  });

  it("uses the v3 fixture document correctly", () => {
    const event = buildVerificationEvent(
      dnsDidV3Signed as unknown as WrappedOrSignedOpenCertsDocument,
      allValidFragments
    );
    expect(event.document_schema).toBe("OA v3");
    expect(event.issuer_method).toBe("DNS-DID");
  });
});

// ---------------------------------------------------------------------------
// Tests: pushVerificationEvent
// ---------------------------------------------------------------------------

describe("pushVerificationEvent", () => {
  it("pushes a GTM event for a valid v2 document", () => {
    jest.clearAllMocks();
    pushVerificationEvent(v2DnsTxtDoc, allValidFragments);

    expect(pushGTMEvent).toHaveBeenCalledTimes(1);
    expect(pushGTMEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "document_verification_completed",
        environment: "local",
        document_schema: "OA v2",
        verification_result: "valid",
      })
    );
  });

  it("pushes a GTM event with error_code for an invalid v2 document", () => {
    jest.clearAllMocks();
    pushVerificationEvent(v2DnsTxtDoc, tamperedHashFragments);

    expect(pushGTMEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        verification_result: "invalid",
        error_code: "CERTIFICATE_HASH",
      })
    );
  });

  it("pushes exactly one GTM event per call", () => {
    jest.clearAllMocks();
    pushVerificationEvent(v2DnsTxtDoc, allValidFragments);
    pushVerificationEvent(v2DnsTxtDoc, allValidFragments);

    expect(pushGTMEvent).toHaveBeenCalledTimes(2);
  });

  it("does not throw when buildVerificationEvent throws internally", () => {
    // Passing null as certificate forces an exception inside the service
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => pushVerificationEvent(null as any, allValidFragments)).not.toThrow();
  });

  it("does not call pushGTMEvent when an internal error occurs", () => {
    jest.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pushVerificationEvent(null as any, allValidFragments);
    expect(pushGTMEvent).not.toHaveBeenCalled();
  });

  it("pushes GTM event for a W3C VC document", () => {
    pushVerificationEvent(w3cDocWithDidWeb, bbsFragments);

    expect(pushGTMEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "document_verification_completed",
        document_schema: "W3C VC",
        issuer_method: "DID:WEB",
        signing_algorithm: "BBS2023",
      })
    );
  });

  it("pushes GTM event for a v3 document", () => {
    pushVerificationEvent(v3Document as unknown as WrappedOrSignedOpenCertsDocument, allValidFragments);

    expect(pushGTMEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "document_verification_completed",
        document_schema: "OA v3",
        signing_algorithm: "merkleroot2018",
      })
    );
  });
});
