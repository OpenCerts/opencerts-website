import {
  OpenAttestationEthereumDocumentStoreStatusCode,
  OpenAttestationEthereumTokenRegistryStatusCode,
  VerificationFragment,
  utils,
} from "@govtechsg/oa-verify";

// this function check if the reason of the error is that the document store or token registry is invalid
export const addressInvalid = (fragments: VerificationFragment[]): boolean => {
  const documentStoreIssuedFragment = utils.getOpenAttestationEthereumDocumentStoreStatusFragment(fragments);
  const tokenRegistryMintedFragment = utils.getOpenAttestationEthereumTokenRegistryStatusFragment(fragments);
  // 2 is the error code used by oa-verify in case of invalid address
  return (
    (documentStoreIssuedFragment?.reason?.code === OpenAttestationEthereumDocumentStoreStatusCode.DOCUMENT_NOT_ISSUED &&
      documentStoreIssuedFragment?.reason?.message.toLowerCase() === "Invalid document store address".toLowerCase()) ||
    (tokenRegistryMintedFragment?.reason?.code === OpenAttestationEthereumTokenRegistryStatusCode.DOCUMENT_NOT_MINTED &&
      tokenRegistryMintedFragment?.reason?.message.toLowerCase() === "Invalid token registry address".toLowerCase())
  );
};

// this function check if the reason of the error is that the document store
export const contractNotFound = (fragments: VerificationFragment[]): boolean => {
  const documentStoreIssuedFragment = utils.getOpenAttestationEthereumDocumentStoreStatusFragment(fragments);
  // 404 is the error code used by oa-verify in case of contract not found
  return (
    documentStoreIssuedFragment?.reason?.code === OpenAttestationEthereumDocumentStoreStatusCode.DOCUMENT_NOT_ISSUED &&
    documentStoreIssuedFragment?.reason?.message.toLowerCase() === "Contract is not found".toLowerCase()
  );
};

// this function check if the reason of the error is that the document store or token has not been issued
export const certificateNotIssued = (fragments: VerificationFragment[]): boolean => {
  const documentStoreIssuedFragment = utils.getOpenAttestationEthereumDocumentStoreStatusFragment(fragments);
  const tokenRegistryMintedFragment = utils.getOpenAttestationEthereumTokenRegistryStatusFragment(fragments);
  // 1 is the error code used by oa-verify in case of document / token not issued / minted
  return (
    documentStoreIssuedFragment?.reason?.code === OpenAttestationEthereumDocumentStoreStatusCode.DOCUMENT_NOT_ISSUED ||
    tokenRegistryMintedFragment?.reason?.code === OpenAttestationEthereumTokenRegistryStatusCode.DOCUMENT_NOT_MINTED
  );
};

// this function check if the reason of the error is that the document store or token has not been issued
export const certificateRevoked = (fragments: VerificationFragment[]): boolean => {
  const didSignedFragment = utils.getOpenAttestationDidSignedDocumentStatusFragment(fragments);
  const documentStoreIssuedFragment = utils.getOpenAttestationEthereumDocumentStoreStatusFragment(fragments);
  // 1 is the error code used by oa-verify in case of document / token not issued / minted
  return (
    didSignedFragment?.data?.revokedOnAny === true ||
    documentStoreIssuedFragment?.reason?.code === OpenAttestationEthereumDocumentStoreStatusCode.DOCUMENT_REVOKED
  );
};

// this function check if the error is caused by an invalid merkle root (incorrect length/odd length/invalid characters)
export const invalidArgument = (fragments: VerificationFragment[]): boolean => {
  const documentStoreIssuedFragment = utils.getOpenAttestationEthereumDocumentStoreStatusFragment(fragments);
  const tokenRegistryMintedFragment = utils.getOpenAttestationEthereumTokenRegistryStatusFragment(fragments);
  // why INVALID_ARGUMENT is because we follow the error codes returned by Ethers (https://docs.ethers.io/v5/api/utils/logger/#errors)
  return (
    (documentStoreIssuedFragment?.reason?.code === OpenAttestationEthereumDocumentStoreStatusCode.DOCUMENT_NOT_ISSUED &&
      documentStoreIssuedFragment?.reason?.message.toLowerCase() === "Invalid call arguments".toLowerCase()) ||
    (tokenRegistryMintedFragment?.reason?.code === OpenAttestationEthereumTokenRegistryStatusCode.INVALID_ARGUMENT &&
      tokenRegistryMintedFragment?.reason?.message.toLowerCase() === "Invalid contract arguments".toLowerCase())
  );
};

// this function check if the reason of the error is that we can't connect to Ethereum (due to any HTTP 4xx or 5xx errors)
export const serverError = (fragments: VerificationFragment[]): boolean => {
  const documentStoreIssuedFragment = utils.getOpenAttestationEthereumDocumentStoreStatusFragment(fragments);
  const tokenRegistryMintedFragment = utils.getOpenAttestationEthereumTokenRegistryStatusFragment(fragments);
  // 429 is the error code used by oa-verify in case of Ethers returning a missing response error
  const serverErrValue = OpenAttestationEthereumDocumentStoreStatusCode.SERVER_ERROR;
  return (
    documentStoreIssuedFragment?.data?.error?.code === OpenAttestationEthereumDocumentStoreStatusCode[serverErrValue] ||
    documentStoreIssuedFragment?.reason?.code === OpenAttestationEthereumDocumentStoreStatusCode.SERVER_ERROR ||
    tokenRegistryMintedFragment?.reason?.code === OpenAttestationEthereumTokenRegistryStatusCode.SERVER_ERROR
  );
};

// this function catches all other unhandled errors
export const unhandledError = (fragments: VerificationFragment[]): boolean => {
  const documentStoreIssuedFragment = utils.getOpenAttestationEthereumDocumentStoreStatusFragment(fragments);
  const tokenRegistryMintedFragment = utils.getOpenAttestationEthereumTokenRegistryStatusFragment(fragments);
  // 3 is the error code used by oa-verify in case of weird errors that we didn't foresee to handle
  return (
    documentStoreIssuedFragment?.reason?.code ===
      OpenAttestationEthereumDocumentStoreStatusCode.ETHERS_UNHANDLED_ERROR ||
    tokenRegistryMintedFragment?.reason?.code === OpenAttestationEthereumDocumentStoreStatusCode.ETHERS_UNHANDLED_ERROR
  );
};
