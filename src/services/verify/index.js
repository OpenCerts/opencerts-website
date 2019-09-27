import { getDocumentStoreRecords } from "@govtechsg/dnsprove";
import { get, zipWith } from "lodash";
import { NETWORK_ID } from "../../config";
const getSmartContractAddress = issuer =>
  issuer.certificateStore || issuer.documentStore || issuer.tokenRegistry;

// Resolve identity of an issuer, currently supporting only DNS-TXT
export const isIssuerIdentityVerified = async issuer => {
  const smartContractAddress = getSmartContractAddress(issuer);
  const type = get(issuer, "identityProof.type");
  const location = get(issuer, "identityProof.location");
  if (type !== "DNS-TXT") throw new Error("Identifier not supported");
  if (!location) throw new Error("Location is not specified");
  const records = await getDocumentStoreRecords(location);
  const matchingRecord = records.find(
    record =>
      record.addr.toLowerCase() === smartContractAddress.toLowerCase() &&
      record.netId === NETWORK_ID &&
      record.type === "openatts" &&
      record.net === "ethereum"
  );
  return matchingRecord ? true : false;
};

export const getIssuersIdentities = async issuers => {
  const identitiesVerified = await Promise.all(
    issuers.map(isIssuerIdentityVerified)
  );
  return zipWith(issuers, identitiesVerified, (issuer, verified) => ({
    dns: verified ? get(issuer, "identityProof.location") : null,
    smartContract: getSmartContractAddress(issuer)
  }));
};
