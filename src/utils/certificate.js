import { get } from "lodash";

export const getDocumentStore = issuer =>
  issuer.certificateStore || issuer.documentStore;

export const getDocumentIssuerStores = document => {
  const issuers = get(document, "issuers", []);
  return issuers.map(getDocumentStore).join(",");
};
