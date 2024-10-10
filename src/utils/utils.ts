import type { CustomDnsResolver } from "@govtechsg/dnsprove";
import { getData, utils } from "@govtechsg/open-attestation";
import axios from "axios";
import { LEGACY_OPENCERTS_RENDERER } from "../config";
import { WrappedOrSignedOpenCertsDocument } from "../shared";

export const opencertsGetData = (rawDocument: WrappedOrSignedOpenCertsDocument) => {
  if (utils.isWrappedV2Document(rawDocument)) {
    return getData(rawDocument);
  } else if (utils.isWrappedV4Document(rawDocument)) {
    // Flattens the credentialSubject field so that the renderer can directly call document.ABC
    const flattenedV4 = { ...rawDocument.credentialSubject, ...rawDocument };
    return flattenedV4;
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

export const ocDnsResolver: CustomDnsResolver = async (domain) => {
  const { data } = await axios({
    method: "GET",
    url: `https://dns.opencerts.io/resolve?name=${domain}`,
  });
  return data;
};
