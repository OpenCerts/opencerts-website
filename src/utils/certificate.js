export const getDocumentStore = issuer =>
  issuer.certificateStore || issuer.documentStore;

export const getDocumentIssuerStores = document => {
  if (document.issuers && Array.isArray(document.issuers)) {
    // v2 documents
    return document.issuers.map(getDocumentStore).join(",");
  }
  if (document.issuer && document.proof) {
    // v3 documents
    return [document.proof.value];
  }
  throw new Error(`Unexpected document, ${document}`);
};
