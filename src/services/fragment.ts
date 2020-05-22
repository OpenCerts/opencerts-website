import { VerificationFragment } from "@govtechsg/oa-verify";

const getFragmentsFor = (fragments: VerificationFragment[], name: string): VerificationFragment =>
  fragments.filter((status) => status.name === name)[0];

export const getRevokeFragment = (fragments: VerificationFragment[]): VerificationFragment =>
  getFragmentsFor(fragments, "OpenAttestationEthereumDocumentStoreRevoked");

export const getAllButRevokeFragment = (fragments: VerificationFragment[]): VerificationFragment[] => {
  const revokeFragmentName = "OpenAttestationEthereumDocumentStoreRevoked";
  return fragments.filter((status) => status.name !== revokeFragmentName);
};

// this function check if the reason of the error is that the document store or token registry is invalid
export const addressInvalid = (fragments: VerificationFragment[]): boolean => {
  const documentStoreIssuedFragment = getFragmentsFor(fragments, "OpenAttestationEthereumDocumentStoreIssued");
  const tokenRegistryMintedFragment = getFragmentsFor(fragments, "OpenAttestationEthereumTokenRegistryMinted");
  // 2 is the error code used by oa-verify in case of invalid address
  return !!(
    (documentStoreIssuedFragment &&
      documentStoreIssuedFragment.reason &&
      documentStoreIssuedFragment.reason.code === 2) ||
    (tokenRegistryMintedFragment && tokenRegistryMintedFragment.reason && tokenRegistryMintedFragment.reason.code === 2)
  );
};

// this function check if the reason of the error is that the document store or token has not been issued
export const certificateNotIssued = (fragments: VerificationFragment[]): boolean => {
  const documentStoreIssuedFragment = getFragmentsFor(fragments, "OpenAttestationEthereumDocumentStoreIssued");
  const tokenRegistryMintedFragment = getFragmentsFor(fragments, "OpenAttestationEthereumTokenRegistryMinted");
  // 1 is the error code used by oa-verify in case of document / token not issued / minted
  return !!(
    (documentStoreIssuedFragment &&
      documentStoreIssuedFragment.reason &&
      documentStoreIssuedFragment.reason.code === 1) ||
    (tokenRegistryMintedFragment && tokenRegistryMintedFragment.reason && tokenRegistryMintedFragment.reason.code === 1)
  );
};
