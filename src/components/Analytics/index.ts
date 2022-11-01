import { v2, WrappedDocument, getData, v3, utils } from "@govtechsg/open-attestation";
import { RegistryEntry } from "@govtechsg/opencerts-verify";
import registry from "../../../public/static/registry.json";
import { getLogger } from "../../utils/logger";
const { trace } = getLogger("components:Analytics:");
const { trace: traceDev } = getLogger("components:Analytics(Inactive):");
import ReactGA from "react-ga4";

interface Event {
  category: string;
  action: string;
  value?: number;
  label?: string;
  nonInteraction?: boolean;
  options?: any;
}

/*
 * This function checks if an address is in registry.json to provide property access.
 */
function isInRegistry(value: string): value is keyof typeof registry.issuers {
  return value in registry.issuers;
}

export const validateEvent = ({ category, action, value }: Event): void => {
  if (!category) throw new Error("Category is required");
  if (!action) throw new Error("Action is required");
  if (value && typeof value !== "number") throw new Error("Value must be a number");
};

export const stringifyEvent = ({ category, action, label, value }: Event): string =>
  `Category*: ${category}, Action*: ${action}, Label: ${label}, Value: ${value}`;

export const analyticsEvent = (window: Partial<Window> | undefined, event: Event): void => {
  validateEvent(event);
  const { category, action, label, value, options = undefined } = event;
  trace(stringifyEvent(event));
  ReactGA.event(category, { action, label, value, ...options });
  traceDev(stringifyEvent(event));
  console.log("analyticsEvent OK", category, { action, label, value, ...options });
  return;
};

export const sendV2EventCertificateViewedDetailed = ({
  issuer,
  certificateData,
}: {
  issuer: v2.Issuer;
  certificateData: { id?: string; name?: string; issuedOn?: string };
}): void => {
  console.log("sendV2EventCertificateViewedDetailed");
  let label = "";
  let issuerName = "";
  let issuerId = null;

  const separator = ";";
  const documentStore = issuer.certificateStore ?? issuer.documentStore ?? issuer.tokenRegistry ?? issuer.id ?? ""; // use id for DID
  const documentId = certificateData?.id ?? "";
  const documentName = certificateData?.name ?? "";
  const issuedOn = certificateData?.issuedOn ?? "";

  if (isInRegistry(documentStore)) {
    const registryIssuer: RegistryEntry = registry.issuers[documentStore];
    issuerId = registryIssuer.id;
    issuerName = registry.issuers[documentStore].name;
    label = `"document_store":"${documentStore}"${separator}"document_id":"${documentId}"${separator}"document_name":"${documentName}"${separator}"issued_on":"${issuedOn}"${separator}"issuer_name":"${
      issuerName ?? ""
    }"${separator}"issuer_id":"${registryIssuer.id ?? ""}"`;
  } else if (issuer.identityProof) {
    issuerName = issuer.identityProof.location || "";
    label = `"document_store":"${documentStore}"${separator}"document_id":"${documentId}"${separator}"document_name":"${documentName}"${separator}"issued_on":"${issuedOn}"${separator}"issuer_name":"${
      issuerName ?? ""
    }"`;
  } else {
    label = "Something went wrong, please check the analytics code of sendV2EventCertificateViewedDetailed";
  }
  analyticsEvent(window, {
    category: "CERTIFICATE_DETAILS",
    action: `VIEWED - ${issuerName}`,
    label,
    nonInteraction: true,
    options: {
      documentStore: documentStore || "(not set)",
      documentId: documentId || "(not set)",
      documentName: documentName || "(not set)",
      issuedOn: issuedOn || "(not set)",
      issuerName: issuerName || "(not set)",
      issuerId: issuerId || "(not set)",
    },
  });
};

export const sendV3EventCertificateViewedDetailed = ({
  certificateData,
}: {
  certificateData: v3.OpenAttestationDocument;
}): void => {
  console.log("sendV3EventCertificateViewedDetailed");
  const separator = ";";
  const documentStore = utils.getIssuerAddress(certificateData);
  const documentId = certificateData?.id ?? "";
  const documentName = certificateData?.name ?? "";
  const issuedOn = certificateData?.issued ?? "";
  const issuerName = certificateData.openAttestationMetadata.identityProof.identifier || "";
  const label = `"document_store":"${documentStore}"${separator}"document_id":"${documentId}"${separator}"document_name":"${documentName}"${separator}"issued_on":"${issuedOn}"${separator}"issuer_name":"${
    issuerName ?? ""
  }"`;
  analyticsEvent(window, {
    category: "CERTIFICATE_DETAILS",
    action: `VIEWED - ${issuerName}`,
    label,
    nonInteraction: true,
    options: {
      documentStore: documentStore || "(not set)",
      documentId: documentId || "(not set)",
      documentName: documentName || "(not set)",
      issuedOn: issuedOn || "(not set)",
      issuerName: issuerName || "(not set)",
    },
  });
};

export function triggerV2ErrorLogging(
  rawCertificate: WrappedDocument<v2.OpenAttestationDocument>,
  errors: string[]
): void {
  console.log("triggerV2ErrorLogging");
  const certificate: v2.OpenAttestationDocument & { name?: string; issuedOn?: string } = getData(rawCertificate);

  const documentId = certificate?.id;
  const documentName = certificate?.name;
  const issuedOn = certificate?.issuedOn;
  const errorsList = errors.join(",");

  // If there are multiple issuers in a certificate, we send multiple events!
  certificate.issuers.forEach((issuer: v2.Issuer) => {
    const documentStore = issuer.certificateStore ?? issuer.documentStore ?? issuer.tokenRegistry ?? issuer.id ?? ""; // use id for DID
    let issuerName = issuer.name;
    let issuerId = null;

    if (isInRegistry(documentStore)) {
      const registryIssuer: RegistryEntry = registry.issuers[documentStore];
      issuerName = registryIssuer.name;
      issuerId = registryIssuer.id;
    } else if (issuer.identityProof) {
      issuerName = issuer.identityProof.location || "";
    }

    analyticsEvent(window, {
      category: "CERTIFICATE_ERROR",
      action: `ERROR - ${issuerName}`,
      label: errorsList,
      nonInteraction: true,
      options: {
        documentStore: documentStore || "(not set)",
        documentId: documentId || "(not set)",
        documentName: documentName || "(not set)",
        issuedOn: issuedOn || "(not set)",
        issuerName: issuerName || "(not set)",
        issuerId: issuerId || "(not set)",
        errors: errorsList,
      },
    });
  });
}

export function triggerV3ErrorLogging(
  rawCertificate: WrappedDocument<v3.OpenAttestationDocument>,
  errors: string[]
): void {
  console.log("triggerV3ErrorLogging");
  const documentId = rawCertificate?.id;
  const documentName = rawCertificate?.name;
  const issuedOn = rawCertificate?.issued;
  const errorsList = errors.join(",");

  // If there are multiple issuers in a certificate, we send multiple events!
  const documentStore = utils.getIssuerAddress(rawCertificate);
  const issuerName = rawCertificate.openAttestationMetadata.identityProof.identifier;

  analyticsEvent(window, {
    category: "CERTIFICATE_ERROR",
    action: `ERROR - ${issuerName}`,
    label: errorsList,
    nonInteraction: true,
    options: {
      documentStore: documentStore || "(not set)",
      documentId: documentId || "(not set)",
      documentName: documentName || "(not set)",
      issuedOn: issuedOn || "(not set)",
      issuerName: issuerName || "(not set)",
      errors: errorsList,
    },
  });
}

export function triggerV2RendererTimeoutLogging(rawCertificate: WrappedDocument<v2.OpenAttestationDocument>): void {
  console.log("triggerV2RendererTimeoutLogging");
  const certificate: v2.OpenAttestationDocument & { name?: string; issuedOn?: string } = getData(rawCertificate);

  const documentId = certificate?.id;
  const documentName = certificate?.name;
  const issuedOn = certificate?.issuedOn;
  const rendererUrl = typeof certificate?.$template === "string" ? certificate?.$template : certificate?.$template?.url;
  const templateName =
    typeof certificate?.$template === "string" ? certificate?.$template : certificate?.$template?.name;

  // If there are multiple issuers in a certificate, we send multiple events!
  certificate.issuers.forEach((issuer: v2.Issuer) => {
    const documentStore = issuer.certificateStore ?? issuer.documentStore ?? issuer.tokenRegistry ?? issuer.id ?? ""; // use id for DID
    let issuerName = issuer.name;
    let issuerId = null;

    if (isInRegistry(documentStore)) {
      const registryIssuer: RegistryEntry = registry.issuers[documentStore];
      issuerName = registryIssuer.name;
      issuerId = registryIssuer.id;
    } else if (issuer.identityProof) {
      issuerName = issuer.identityProof.location || "";
    }

    analyticsEvent(window, {
      category: "CERTIFICATE_RENDERER_TIMEOUT",
      action: `RENDERER TIMEOUT - ${issuerName}`,
      nonInteraction: true,
      options: {
        documentStore: documentStore || "(not set)",
        documentId: documentId || "(not set)",
        documentName: documentName || "(not set)",
        issuedOn: issuedOn || "(not set)",
        issuerName: issuerName || "(not set)",
        issuerId: issuerId || "(not set)",
        rendererUrl: rendererUrl || "(not set)",
        templateName: templateName || "(not set)",
      },
    });
  });
}

export function triggerV3RendererTimeoutLogging(rawCertificate: WrappedDocument<v3.OpenAttestationDocument>): void {
  console.log("triggerV3RendererTimeoutLogging");
  const documentId = rawCertificate?.id;
  const documentName = rawCertificate?.name;
  const issuedOn = rawCertificate?.issued;
  const rendererUrl = rawCertificate?.openAttestationMetadata.template?.url;
  const templateName = rawCertificate?.openAttestationMetadata.template?.name;

  // If there are multiple issuers in a certificate, we send multiple events!
  const documentStore = utils.getIssuerAddress(rawCertificate);
  const issuerName = rawCertificate.openAttestationMetadata.identityProof.identifier;

  analyticsEvent(window, {
    category: "CERTIFICATE_RENDERER_TIMEOUT",
    action: `RENDERER TIMEOUT - ${issuerName}`,
    nonInteraction: true,
    options: {
      documentStore: documentStore || "(not set)",
      documentId: documentId || "(not set)",
      documentName: documentName || "(not set)",
      issuedOn: issuedOn || "(not set)",
      issuerName: issuerName || "(not set)",
      rendererUrl: rendererUrl || "(not set)",
      templateName: templateName || "(not set)",
    },
  });
}
