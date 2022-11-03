import { v2, WrappedDocument, getData, v3, utils } from "@govtechsg/open-attestation";
import { RegistryEntry } from "@govtechsg/opencerts-verify";
import ReactGA from "react-ga4";
import registry from "../../../public/static/registry.json";
import { getLogger } from "../../utils/logger";
const { trace } = getLogger("components:Analytics:");
const { trace: traceDev } = getLogger("components:Analytics(Inactive):");

interface Event {
  category: string;
  action: string;
  value?: number | string;
  nonInteraction?: boolean;
  options?: {
    documentStore?: string;
    documentId?: string;
    documentName?: string;
    issuedOn?: string;
    issuerName?: string;
    registryId?: string;
    rendererUrl?: string;
    templateName?: string;
    errors?: string;
  };
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

export const stringifyEvent = ({ category, action, value }: Event): string =>
  `Category*: ${category}, Action*: ${action}, Value: ${value}`;

export const analyticsEvent = (event: Event): void => {
  validateEvent(event);
  const { category, action, value, nonInteraction, options = undefined } = event;
  trace(stringifyEvent(event));
  traceDev(stringifyEvent(event));
  // Use snake_case for event custom dimensions
  return ReactGA.event(category, {
    action,
    value,
    nonInteraction,
    document_store: options?.documentStore || "(not set)",
    document_id: options?.documentId || "(not set)",
    document_name: options?.documentName || "(not set)",
    issued_on: options?.issuedOn || "(not set)",
    issuer_name: options?.issuerName || "(not set)",
    registry_id: options?.registryId || "(not set)",
    renderer_url: options?.rendererUrl || "(not set)",
    template_name: options?.templateName || "(not set)",
    errors: options?.errors || "(not set)",
  });
};

export const sendV2EventCertificateViewedDetailed = ({
  issuer,
  certificateData,
}: {
  issuer: v2.Issuer;
  certificateData: { id?: string; name?: string; issuedOn?: string };
}): void => {
  let issuerName = "";
  let registryId = null;

  const documentStore = issuer.certificateStore ?? issuer.documentStore ?? issuer.tokenRegistry ?? issuer.id ?? ""; // use id for DID
  const documentId = certificateData?.id ?? "";
  const documentName = certificateData?.name ?? "";
  const issuedOn = certificateData?.issuedOn ?? "";

  if (isInRegistry(documentStore)) {
    const registryIssuer: RegistryEntry = registry.issuers[documentStore];
    registryId = registryIssuer.id;
    issuerName = registry.issuers[documentStore].name;
  } else if (issuer.identityProof) {
    issuerName = issuer.identityProof.location || "";
  }
  analyticsEvent({
    category: "CERTIFICATE_DETAILS",
    action: `VIEWED - ${issuerName}`,
    nonInteraction: true,
    options: {
      documentStore: documentStore || "(not set)",
      documentId: documentId || "(not set)",
      documentName: documentName || "(not set)",
      issuedOn: issuedOn || "(not set)",
      issuerName: issuerName || "(not set)",
      registryId: registryId || "(not set)",
    },
  });
};

export const sendV3EventCertificateViewedDetailed = ({
  certificateData,
}: {
  certificateData: v3.OpenAttestationDocument;
}): void => {
  const documentStore = utils.getIssuerAddress(certificateData);
  const documentId = certificateData?.id ?? "";
  const documentName = certificateData?.name ?? "";
  const issuedOn = certificateData?.issued ?? "";
  const issuerName = certificateData.openAttestationMetadata.identityProof.identifier || "";
  analyticsEvent({
    category: "CERTIFICATE_DETAILS",
    action: `VIEWED - ${issuerName}`,
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
  const certificate: v2.OpenAttestationDocument & { name?: string; issuedOn?: string } = getData(rawCertificate);

  const documentId = certificate?.id;
  const documentName = certificate?.name;
  const issuedOn = certificate?.issuedOn;
  const errorsList = errors.join(",");

  // If there are multiple issuers in a certificate, we send multiple events!
  certificate.issuers.forEach((issuer: v2.Issuer) => {
    const documentStore = issuer.certificateStore ?? issuer.documentStore ?? issuer.tokenRegistry ?? issuer.id ?? ""; // use id for DID
    let issuerName = issuer.name;
    let registryId = null;

    if (isInRegistry(documentStore)) {
      const registryIssuer: RegistryEntry = registry.issuers[documentStore];
      issuerName = registryIssuer.name;
      registryId = registryIssuer.id;
    } else if (issuer.identityProof) {
      issuerName = issuer.identityProof.location || "";
    }

    analyticsEvent({
      category: "CERTIFICATE_ERROR",
      action: `ERROR - ${issuerName}`,
      nonInteraction: true,
      options: {
        documentStore: documentStore || "(not set)",
        documentId: documentId || "(not set)",
        documentName: documentName || "(not set)",
        issuedOn: issuedOn || "(not set)",
        issuerName: issuerName || "(not set)",
        registryId: registryId || "(not set)",
        errors: errorsList,
      },
    });
  });
}

export function triggerV3ErrorLogging(
  rawCertificate: WrappedDocument<v3.OpenAttestationDocument>,
  errors: string[]
): void {
  const documentId = rawCertificate?.id;
  const documentName = rawCertificate?.name;
  const issuedOn = rawCertificate?.issued;
  const errorsList = errors.join(",");

  // If there are multiple issuers in a certificate, we send multiple events!
  const documentStore = utils.getIssuerAddress(rawCertificate);
  const issuerName = rawCertificate.openAttestationMetadata.identityProof.identifier;

  analyticsEvent({
    category: "CERTIFICATE_ERROR",
    action: `ERROR - ${issuerName}`,
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
    let registryId = null;

    if (isInRegistry(documentStore)) {
      const registryIssuer: RegistryEntry = registry.issuers[documentStore];
      issuerName = registryIssuer.name;
      registryId = registryIssuer.id;
    } else if (issuer.identityProof) {
      issuerName = issuer.identityProof.location || "";
    }

    analyticsEvent({
      category: "CERTIFICATE_RENDERER_TIMEOUT",
      action: `RENDERER TIMEOUT - ${issuerName}`,
      nonInteraction: true,
      options: {
        documentStore: documentStore || "(not set)",
        documentId: documentId || "(not set)",
        documentName: documentName || "(not set)",
        issuedOn: issuedOn || "(not set)",
        issuerName: issuerName || "(not set)",
        registryId: registryId || "(not set)",
        rendererUrl: rendererUrl || "(not set)",
        templateName: templateName || "(not set)",
      },
    });
  });
}

export function triggerV3RendererTimeoutLogging(rawCertificate: WrappedDocument<v3.OpenAttestationDocument>): void {
  const documentId = rawCertificate?.id;
  const documentName = rawCertificate?.name;
  const issuedOn = rawCertificate?.issued;
  const rendererUrl = rawCertificate?.openAttestationMetadata.template?.url;
  const templateName = rawCertificate?.openAttestationMetadata.template?.name;

  // If there are multiple issuers in a certificate, we send multiple events!
  const documentStore = utils.getIssuerAddress(rawCertificate);
  const issuerName = rawCertificate.openAttestationMetadata.identityProof.identifier;

  analyticsEvent({
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
