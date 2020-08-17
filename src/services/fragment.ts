import {
  OpenAttestationEthereumDocumentStoreStatusCode,
  OpenAttestationEthereumTokenRegistryStatusCode,
  VerificationFragment,
} from "@govtechsg/oa-verify";

const getFragmentsFor = (fragments: VerificationFragment[], name: string): VerificationFragment =>
  fragments.filter((status) => status.name === name)[0];

// this function check if the reason of the error is that the document store or token registry is invalid
export const addressInvalid = (fragments: VerificationFragment[]): boolean => {
  const documentStoreIssuedFragment = getFragmentsFor(fragments, "OpenAttestationEthereumDocumentStoreStatus");
  const tokenRegistryMintedFragment = getFragmentsFor(fragments, "OpenAttestationEthereumTokenRegistryStatus");
  // 2 is the error code used by oa-verify in case of invalid address
  return (
    documentStoreIssuedFragment?.reason?.code ===
      OpenAttestationEthereumDocumentStoreStatusCode.CONTRACT_ADDRESS_INVALID ||
    tokenRegistryMintedFragment?.reason?.code ===
      OpenAttestationEthereumTokenRegistryStatusCode.CONTRACT_ADDRESS_INVALID
  );
};

// this function check if the reason of the error is that the document store or token has not been issued
export const certificateNotIssued = (fragments: VerificationFragment[]): boolean => {
  const documentStoreIssuedFragment = getFragmentsFor(fragments, "OpenAttestationEthereumDocumentStoreStatus");
  const tokenRegistryMintedFragment = getFragmentsFor(fragments, "OpenAttestationEthereumTokenRegistryStatus");
  // 1 is the error code used by oa-verify in case of document / token not issued / minted
  return (
    documentStoreIssuedFragment?.reason?.code === OpenAttestationEthereumDocumentStoreStatusCode.DOCUMENT_NOT_ISSUED ||
    tokenRegistryMintedFragment?.reason?.code === OpenAttestationEthereumTokenRegistryStatusCode.DOCUMENT_NOT_MINTED
  );
};

// this function check if the reason of the error is that the document store or token has not been issued
export const certificateRevoked = (fragments: VerificationFragment[]): boolean => {
  const documentStoreIssuedFragment = getFragmentsFor(fragments, "OpenAttestationEthereumDocumentStoreStatus");
  // 1 is the error code used by oa-verify in case of document / token not issued / minted
  return documentStoreIssuedFragment?.reason?.code === OpenAttestationEthereumDocumentStoreStatusCode.DOCUMENT_REVOKED;
};
