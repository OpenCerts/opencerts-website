import { getData, utils } from "@govtechsg/open-attestation";
import { LEGACY_OPENCERTS_RENDERER } from "../config";
import { WrappedOrSignedOpenCertsDocument } from "../shared";

export const opencertsGetData = (rawDocument: WrappedOrSignedOpenCertsDocument) =>
  utils.isWrappedV2Document(rawDocument) ? getData(rawDocument) : rawDocument;

export const getTemplate = (rawDocument: WrappedOrSignedOpenCertsDocument) => {
  if (utils.isWrappedV2Document(rawDocument)) {
    const documentData = getData(rawDocument);
    return typeof documentData.$template === "object" ? documentData.$template.url : LEGACY_OPENCERTS_RENDERER;
  } else {
    return rawDocument.openAttestationMetadata.template?.url;
  }
};
