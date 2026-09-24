import singleCredential from "../components/tests/fixture/presentations/valid/single_credential.json";
import twoCredentials from "../components/tests/fixture/presentations/valid/two_credentials.json";
import {
  getCredentialFileName,
  getCredentialIssuer,
  getCredentialLabel,
  getPresentationCredentials,
  getPresentationFileName,
  getPresentationHolder,
  getW3CVersionLabel,
  isVerifiablePresentation,
} from "./presentation";

describe("utils/presentation", () => {
  describe("isVerifiablePresentation", () => {
    it("recognises a signed presentation", () => {
      expect(isVerifiablePresentation(singleCredential)).toBe(true);
    });

    it("recognises an unsigned presentation, so it can be reported as unsigned rather than treated as a credential", () => {
      const { proof: _proof, ...unsigned } = singleCredential as Record<string, unknown>;

      expect(isVerifiablePresentation(unsigned)).toBe(true);
    });

    it("recognises a presentation with an empty credential list, matching the verifier's own routing", () => {
      expect(isVerifiablePresentation({ type: ["VerifiablePresentation"], verifiableCredential: [] })).toBe(true);
    });

    it("rejects a credential", () => {
      expect(isVerifiablePresentation(getPresentationCredentials(singleCredential)[0])).toBe(false);
    });

    it.each([[null], [undefined], ["a string"], [{}], [{ type: ["VerifiablePresentation"] }]])(
      "rejects %p",
      (document) => {
        expect(isVerifiablePresentation(document)).toBe(false);
      }
    );
  });

  describe("getPresentationCredentials", () => {
    it("returns every embedded credential", () => {
      expect(getPresentationCredentials(twoCredentials)).toHaveLength(2);
    });

    it("wraps a single non-array credential", () => {
      const credential = getPresentationCredentials(singleCredential)[0];
      const presentation = { type: ["VerifiablePresentation"], verifiableCredential: credential };

      expect(getPresentationCredentials(presentation)).toStrictEqual([credential]);
    });

    it("returns nothing for a document that is not a presentation", () => {
      expect(getPresentationCredentials({ type: ["VerifiableCredential"] })).toStrictEqual([]);
    });
  });

  describe("getPresentationHolder", () => {
    it("returns the holder DID in upper case", () => {
      expect(getPresentationHolder(singleCredential)).toBe("DID:KEY:ZDNAETXQNRYC14UDE5HAT6EHYCG2HTPDNOAUSRUZP4QOHXX2P");
    });

    it("reads an object holder", () => {
      const presentation = { type: ["VerifiablePresentation"], verifiableCredential: [], holder: { id: "did:web:a" } };

      expect(getPresentationHolder(presentation)).toBe("DID:WEB:A");
    });

    it("returns Unknown when no holder is named", () => {
      expect(getPresentationHolder({ type: ["VerifiablePresentation"], verifiableCredential: [] })).toBe("Unknown");
    });
  });

  describe("getCredentialLabel", () => {
    it("prefers the renderer template name, which is what the tab is recognised by", () => {
      expect(getCredentialLabel({ renderMethod: [{ templateName: "BILL_OF_LADING" }] }, 0)).toBe("BILL OF LADING");
    });

    it("falls back to the specific type, not the generic VerifiableCredential", () => {
      expect(getCredentialLabel({ type: ["VerifiableCredential", "DegreeCredential"] }, 0)).toBe("DegreeCredential");
    });

    it("falls back to a 1-based position", () => {
      expect(getCredentialLabel({}, 1)).toBe("Credential 2");
    });
  });

  describe("getCredentialIssuer", () => {
    it("reads a string issuer", () => {
      expect(getCredentialIssuer({ issuer: "did:web:example.com" })).toBe("DID:WEB:EXAMPLE.COM");
    });

    it("reads an object issuer", () => {
      expect(getCredentialIssuer({ issuer: { id: "did:web:example.com" } })).toBe("DID:WEB:EXAMPLE.COM");
    });

    it("returns Unknown when the credential declares no issuer", () => {
      expect(getCredentialIssuer(undefined)).toBe("Unknown");
    });
  });

  describe("getW3CVersionLabel", () => {
    it("reads V2.0 off the first context entry", () => {
      expect(getW3CVersionLabel(singleCredential)).toBe("V2.0");
    });

    it("treats anything else as V1.1", () => {
      expect(getW3CVersionLabel({ "@context": ["https://www.w3.org/2018/credentials/v1"] })).toBe("V1.1");
    });
  });

  describe("getCredentialFileName", () => {
    // Every tab sharing the presentation's own name would save different credentials over
    // each other.
    it("qualifies the presentation name with the credential label", () => {
      expect(getCredentialFileName({ renderMethod: [{ templateName: "BILL_OF_LADING" }] }, 0, "bundle")).toBe(
        "bundle-bill-of-lading.opencert"
      );
    });

    it("falls back to the position when a credential has no label", () => {
      expect(getCredentialFileName({}, 1, "bundle")).toBe("bundle-credential-2.opencert");
    });
  });

  describe("getPresentationFileName", () => {
    it("uses the presentation id when it has one", () => {
      expect(getPresentationFileName({ id: "urn:uuid:abc" })).toBe("urn:uuid:abc");
    });

    it("falls back to a fixed name, since id is optional on a presentation", () => {
      expect(getPresentationFileName(singleCredential)).toBe("presentation");
    });
  });
});
