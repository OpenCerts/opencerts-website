import { v2, WrappedDocument, getData, v3, utils } from "@govtechsg/open-attestation";
import { RegistryEntry } from "@govtechsg/opencerts-verify";
import { isEmpty, omitBy } from "lodash";
import ReactGA from "react-ga4";
import registry from "../../../public/static/registry.json";
import { getLogger } from "../../utils/logger";
const { trace } = getLogger("components:Analytics:");
const { trace: traceDev } = getLogger("components:Analytics(Inactive):");

interface Options {
  documentStore?: string;
  documentId?: string;
  documentName?: string;
  issuedOn?: string;
  issuerName?: string;
  issuerId?: string;
  registryId?: string | null;
  rendererUrl?: string;
  templateName?: string;
  errors?: string;
}
interface Event {
  category: string;
  value?: number | string;
  nonInteraction?: boolean;
  options?: Options;
}

/*
 * This function checks if an address is in registry.json to provide property access.
 */
function isInRegistry(value: string): value is keyof typeof registry.issuers {
  return value in registry.issuers;
}

export const validateEvent = ({ category, value }: Event): void => {
  if (!category) throw new Error("Category is required");
  if (value && typeof value !== "number") throw new Error("Value must be a number");
};

export const stringifyEvent = ({ category, value }: Event): string => `Category*: ${category}, Value: ${value}`;

export const analyticsEvent = (event: Event): void => {
  validateEvent(event);
  const { category, value, nonInteraction, options = undefined } = event;
  trace(stringifyEvent(event));
  traceDev(stringifyEvent(event));
  // Use snake_case for event custom dimensions
  const customDimension = {
    // wrap with quotes if documentStore has a value; to prevent GA4 converting hexadecimal to decimal
    document_store: options?.documentStore ? `"${options?.documentStore}"` : undefined,
    document_id: options?.documentId,
    document_name: options?.documentName,
    issued_on: options?.issuedOn,
    issuer_name: options?.issuerName,
    issuer_id: options?.issuerId,
    registry_id: options?.registryId,
    renderer_url: options?.rendererUrl,
    template_name: options?.templateName,
    errors: options?.errors,
  };
  const cleanedCustomDimensions = omitBy(customDimension, isEmpty); // removes empty string, null and undefined parameters
  return ReactGA.event(category, {
    value,
    nonInteraction,
    ...cleanedCustomDimensions,
  });
};

export const sendV2EventCertificateViewedDetailed = ({
  issuer,
  certificateData,
}: {
  issuer: v2.Issuer;
  certificateData: {
    id?: string;
    name?: string;
    issuedOn?: string;
    $template?: string | { name?: string; url?: string };
  };
}): void => {
  let issuerName = "";
  let registryId = null;

  // We track either document store or issuer ID, where both are mutually exclusive
  // meaning documents will unlikely have both document store ID and issuer ID/ DID
  const documentStore = issuer.certificateStore ?? issuer.documentStore ?? issuer.tokenRegistry ?? "";
  const issuerId = issuer.id ?? "";
  const documentId = certificateData?.id ?? "";
  const documentName = certificateData?.name ?? "";
  const issuedOn = certificateData?.issuedOn ?? "";
  const rendererUrl =
    typeof certificateData.$template === "string" ? certificateData.$template : certificateData.$template?.url || "";
  const templateName =
    typeof certificateData.$template === "string" ? certificateData.$template : certificateData.$template?.name || "";

  if (isInRegistry(documentStore)) {
    const registryIssuer: RegistryEntry = registry.issuers[documentStore];
    issuerName = registryIssuer.name;
    registryId = registryIssuer.id;
  } else if (issuer.identityProof) {
    issuerName = issuer.identityProof.location || "";
  }
  analyticsEvent({
    category: "CERTIFICATE_DETAILS",
    nonInteraction: true,
    options: {
      documentStore: documentStore,
      documentId: documentId,
      documentName: documentName,
      issuedOn: issuedOn,
      issuerName: issuerName,
      issuerId: issuerId,
      registryId: registryId,
      rendererUrl: rendererUrl,
      templateName: templateName,
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
  const rendererUrl = certificateData.openAttestationMetadata.template?.url || "";
  const templateName = certificateData.openAttestationMetadata.template?.name || "";
  analyticsEvent({
    category: "CERTIFICATE_DETAILS",
    nonInteraction: true,
    options: {
      documentStore: documentStore,
      documentId: documentId,
      documentName: documentName,
      issuedOn: issuedOn,
      issuerName: issuerName,
      rendererUrl: rendererUrl,
      templateName: templateName,
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
  const templateName =
    typeof certificate.$template === "string" ? certificate.$template : certificate.$template?.name || "";
  const rendererUrl =
    typeof certificate.$template === "string" ? certificate.$template : certificate.$template?.url || "";

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
      nonInteraction: true,
      options: {
        documentStore: documentStore,
        documentId: documentId,
        documentName: documentName,
        issuedOn: issuedOn,
        issuerName: issuerName,
        registryId: registryId,
        errors: errorsList,
        rendererUrl: rendererUrl,
        templateName: templateName,
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
  const rendererUrl = rawCertificate.openAttestationMetadata.template?.url || "";
  const templateName = rawCertificate.openAttestationMetadata.template?.name || "";

  // If there are multiple issuers in a certificate, we send multiple events!
  const documentStore = utils.getIssuerAddress(rawCertificate);
  const issuerName = rawCertificate.openAttestationMetadata.identityProof.identifier;

  analyticsEvent({
    category: "CERTIFICATE_ERROR",
    nonInteraction: true,
    options: {
      documentStore: documentStore,
      documentId: documentId,
      documentName: documentName,
      issuedOn: issuedOn,
      issuerName: issuerName,
      errors: errorsList,
      rendererUrl: rendererUrl,
      templateName: templateName,
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
      nonInteraction: true,
      options: {
        documentStore: documentStore,
        documentId: documentId,
        documentName: documentName,
        issuedOn: issuedOn,
        issuerName: issuerName,
        registryId: registryId,
        rendererUrl: rendererUrl,
        templateName: templateName,
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
    nonInteraction: true,
    options: {
      documentStore: documentStore,
      documentId: documentId,
      documentName: documentName,
      issuedOn: issuedOn,
      issuerName: issuerName,
      rendererUrl: rendererUrl,
      templateName: templateName,
    },
  });
}
