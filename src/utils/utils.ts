import {
  type CustomDnsResolver,
  getDataV2,
  isWrappedV2Document,
  isWrappedV3Document,
  SignedVerifiableCredential,
  vc,
} from "@trustvc/trustvc";
import axios from "axios";
import { LEGACY_OPENCERTS_RENDERER } from "../config";
import { WrappedOrSignedOpenCertsDocument } from "../shared";

export const opencertsGetData = (rawDocument: WrappedOrSignedOpenCertsDocument) => {
  if (isWrappedV2Document(rawDocument)) {
    return getDataV2(rawDocument);
  } else {
    return rawDocument;
  }
};

export const getTemplate = (rawDocument: WrappedOrSignedOpenCertsDocument) => {
  if (vc.isSignedDocument(rawDocument) || vc.isRawDocument(rawDocument)) {
    return [(rawDocument as unknown as SignedVerifiableCredential).renderMethod]?.flat()?.[0]?.id;
  } else if (isWrappedV2Document(rawDocument)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const documentData = getDataV2(rawDocument as any);
    return typeof documentData.$template === "object" ? documentData.$template.url : LEGACY_OPENCERTS_RENDERER;
  } else if (isWrappedV3Document(rawDocument)) {
    return rawDocument.openAttestationMetadata.template?.url;
  } else {
    return undefined;
  }
};

export const ocDnsResolver: CustomDnsResolver = async (domain: string) => {
  const { data } = await axios({
    method: "GET",
    url: `https://dns.opencerts.io/resolve?name=${domain}`,
  });
  return data;
};
