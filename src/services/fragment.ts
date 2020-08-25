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
export const contractNotFound = (fragments: VerificationFragment[]): boolean => {
  const documentStoreIssuedFragment = getFragmentsFor(fragments, "OpenAttestationEthereumDocumentStoreStatus");
  const tokenRegistryMintedFragment = getFragmentsFor(fragments, "OpenAttestationEthereumTokenRegistryStatus");
  // 404 is the error code used by oa-verify in case of contract not found
  return (
    documentStoreIssuedFragment?.reason?.code === OpenAttestationEthereumDocumentStoreStatusCode.CONTRACT_NOT_FOUND ||
    tokenRegistryMintedFragment?.reason?.code === OpenAttestationEthereumTokenRegistryStatusCode.CONTRACT_NOT_FOUND
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

// this function check if the reason of the error is that we can't connect to Ethereum (due to any HTTP 4xx or 5xx errors)
export const serverError = (fragments: VerificationFragment[]): boolean => {
  const documentStoreIssuedFragment = getFragmentsFor(fragments, "OpenAttestationEthereumDocumentStoreStatus");
  const tokenRegistryMintedFragment = getFragmentsFor(fragments, "OpenAttestationEthereumTokenRegistryStatus");
  // 429 is the error code used by oa-verify in case of Ethers returning a missing response error
  return (
    documentStoreIssuedFragment?.reason?.code === OpenAttestationEthereumDocumentStoreStatusCode.SERVER_ERROR ||
    tokenRegistryMintedFragment?.reason?.code === OpenAttestationEthereumTokenRegistryStatusCode.SERVER_ERROR
  );
};

// this function catches all other unhandled errors
export const unhandledError = (fragments: VerificationFragment[]): boolean => {
  const documentStoreIssuedFragment = getFragmentsFor(fragments, "OpenAttestationEthereumDocumentStoreStatus");
  const tokenRegistryMintedFragment = getFragmentsFor(fragments, "OpenAttestationEthereumTokenRegistryStatus");
  // 3 is the error code used by oa-verify in case of weird errors that we didn't foresee to handle
  return (
    documentStoreIssuedFragment?.reason?.code ===
      OpenAttestationEthereumDocumentStoreStatusCode.ETHERS_UNHANDLED_ERROR ||
    tokenRegistryMintedFragment?.reason?.code === OpenAttestationEthereumDocumentStoreStatusCode.ETHERS_UNHANDLED_ERROR
  );
};
