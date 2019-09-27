// const verify = require("@govtechsg/oa-verify");
// const doc = require("./sample.json");
import { isIssuerIdentityVerified, getIssuersIdentities } from "./index";
import * as dnsprove from "@govtechsg/dnsprove";

jest.mock("@govtechsg/dnsprove");

describe("isIssuerIdentityVerified", () => {
  it("returns true when there is a matching DNS record", async () => {
    dnsprove.getDocumentStoreRecords.mockResolvedValue([
      {
        type: "openatts",
        net: "ethereum",
        netId: "3",
        addr: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
        dnssec: true
      },
      {
        type: "openatts",
        net: "ethereum",
        netId: "3",
        addr: "0x53f3a47C129Ea30D80bC727556b015F02bE63811",
        dnssec: true
      }
    ]);
    const issuer = {
      documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
      identityProof: {
        type: "DNS-TXT",
        location: "example.openattestation.com"
      }
    };
    const identified = await isIssuerIdentityVerified(issuer);
    expect(identified).toEqual(true);
  });

  it("returns false when matching DNS record does not exist", async () => {
    dnsprove.getDocumentStoreRecords.mockResolvedValue([
      {
        type: "openatts",
        net: "ethereum",
        netId: "3",
        addr: "0x53f3a47C129Ea30D80bC727556b015F02bE63811",
        dnssec: true
      }
    ]);
    const issuer = {
      documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
      identityProof: {
        type: "DNS-TXT",
        location: "example.openattestation.com"
      }
    };
    const identified = await isIssuerIdentityVerified(issuer);
    expect(identified).toEqual(false);
  });

  it("throws when the type does not exist", () => {
    const issuer = {
      documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
      identityProof: {
        type: "FOO-BAR",
        location: "example.openattestation.com"
      }
    };
    const identified = isIssuerIdentityVerified(issuer);
    expect(identified).rejects.toThrow("not supported");
  });

  it("throws when the location does not exist", () => {
    const issuer = {
      documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
      identityProof: { type: "DNS-TXT" }
    };
    const identified = isIssuerIdentityVerified(issuer);
    expect(identified).rejects.toThrow("not specified");
  });
});

describe("getIssuersIdentities", () => {
  it("returns identities given a list of issuers", async () => {
    dnsprove.getDocumentStoreRecords.mockResolvedValueOnce([
      {
        type: "openatts",
        net: "ethereum",
        netId: "3",
        addr: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
        dnssec: true
      }
    ]);
    dnsprove.getDocumentStoreRecords.mockResolvedValueOnce([
      {
        type: "openatts",
        net: "ethereum",
        netId: "3",
        addr: "0x53f3a47C129Ea30D80bC727556b015F02bE63811",
        dnssec: true
      }
    ]);
    const issuers = [
      {
        documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
        identityProof: { location: "domain1.com", type: "DNS-TXT" }
      },
      {
        documentStore: "0x53f3a47C129Ea30D80bC727556b015F02bE63811",
        identityProof: { location: "domain2.com", type: "DNS-TXT" }
      }
    ];
    const expectedResults = [
      {
        dns: "domain1.com",
        smartContract: "0x2f60375e8144e16Adf1979936301D8341D58C36C"
      },
      {
        dns: "domain2.com",
        smartContract: "0x53f3a47C129Ea30D80bC727556b015F02bE63811"
      }
    ];
    const identities = await getIssuersIdentities(issuers);
    expect(identities).toEqual(expectedResults);
  });

  it("throws when any issuers is not correctly formatted", () => {
    const issuers = [
      {
        documentStore: "0x2f60375e8144e16Adf1979936301D8341D58C36C",
        identityProof: { location: "domain1.com" }
      }
    ];
    const identities = getIssuersIdentities(issuers);
    expect(identities).rejects.toThrow("not supported");
  });
});
