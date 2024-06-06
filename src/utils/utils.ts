import { getData, utils } from "@govtechsg/open-attestation";
import { LEGACY_OPENCERTS_RENDERER } from "../config";
import { WrappedOrSignedOpenCertsDocument } from "../shared";

export const opencertsGetData = (rawDocument: WrappedOrSignedOpenCertsDocument) => {
  if (utils.isWrappedV2Document(rawDocument)) {
    return getData(rawDocument);
  } else if (utils.isWrappedV4Document(rawDocument)) {
    return rawDocument.credentialSubject;
  } else {
    return rawDocument;
  }
};

export const getTemplate = (rawDocument: WrappedOrSignedOpenCertsDocument) => {
  if (utils.isWrappedV2Document(rawDocument)) {
    const documentData = getData(rawDocument);
    return typeof documentData.$template === "object" ? documentData.$template.url : LEGACY_OPENCERTS_RENDERER;
  } else if (utils.isWrappedV3Document(rawDocument)) {
    return rawDocument.openAttestationMetadata.template?.url;
  } else {
    return rawDocument.renderMethod?.find((method) => method.type === "OpenAttestationEmbeddedRenderer")?.id;
  }
};
