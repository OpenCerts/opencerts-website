import { v2, WrappedDocument, getData, v3, utils } from "@govtechsg/open-attestation";
import { RegistryEntry } from "@govtechsg/opencerts-verify";
import registry from "../../../public/static/registry.json";
import { getLogger } from "../../utils/logger";
const { trace } = getLogger("components:Analytics:");
const { trace: traceDev } = getLogger("components:Analytics(Inactive):");

interface Event {
  category: string;
  action: string;
  value?: string | number;
  label?: string;
  options?: UniversalAnalytics.FieldsObject;
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
  if (typeof window !== "undefined" && typeof window.ga !== "undefined") {
    const { category, action, label, value, options = undefined } = event;
    trace(stringifyEvent(event));
    return window.ga("send", "event", category, action, label, value, options);
  }
  traceDev(stringifyEvent(event));
};

export const sendV2EventCertificateViewedDetailed = ({
  issuer,
  certificateData,
}: {
  issuer: v2.Issuer;
  certificateData: { id?: string; name?: string; issuedOn?: string };
}): void => {
  let label = "";
  let issuerName = "";
  let registryId = null;

  const separator = ";";
  const store = issuer.certificateStore ?? issuer.documentStore ?? issuer.tokenRegistry ?? issuer.id ?? ""; // use id for DID
  const id = certificateData?.id ?? "";
  const name = certificateData?.name ?? "";
  const issuedOn = certificateData?.issuedOn ?? "";

  if (isInRegistry(store)) {
    const registryIssuer: RegistryEntry = registry.issuers[store];
    registryId = registryIssuer.id;
    issuerName = registry.issuers[store].name;
    label = `"store":"${store}"${separator}"document_id":"${id}"${separator}"name":"${name}"${separator}"issued_on":"${issuedOn}"${separator}"issuer_name":"${
      issuerName ?? ""
    }"${separator}"issuer_id":"${registryIssuer.id ?? ""}"`;
  } else if (issuer.identityProof) {
    issuerName = issuer.identityProof.location || "";
    label = `"store":"${store}"${separator}"document_id":"${id}"${separator}"name":"${name}"${separator}"issued_on":"${issuedOn}"${separator}"issuer_name":"${
      issuerName ?? ""
    }"`;
  } else {
    label = "Something went wrong, please check the analytics code of sendEventCertificateViewedDetailed";
  }
  analyticsEvent(window, {
    category: "CERTIFICATE_DETAILS",
    action: `VIEWED - ${issuerName}`,
    label,
    options: {
      nonInteraction: true,
      dimension1: store || "(not set)",
      dimension2: id || "(not set)",
      dimension3: name || "(not set)",
      dimension4: issuedOn || "(not set)",
      dimension5: issuerName || "(not set)",
      dimension6: registryId || "(not set)",
    },
  });
};

export const sendV3EventCertificateViewedDetailed = ({
  certificateData,
}: {
  certificateData: v3.OpenAttestationDocument;
}): void => {
  const separator = ";";
  const store = utils.getIssuerAddress(certificateData);
  const id = certificateData?.id ?? "";
  const name = certificateData?.name ?? "";
  const issuedOn = certificateData?.issued ?? "";
  const issuerName = certificateData.openAttestationMetadata.identityProof.identifier || "";
  const label = `"store":"${store}"${separator}"document_id":"${id}"${separator}"name":"${name}"${separator}"issued_on":"${issuedOn}"${separator}"issuer_name":"${
    issuerName ?? ""
  }"`;
  analyticsEvent(window, {
    category: "CERTIFICATE_DETAILS",
    action: `VIEWED - ${issuerName}`,
    label,
    options: {
      nonInteraction: true,
      dimension1: store || "(not set)",
      dimension2: id || "(not set)",
      dimension3: name || "(not set)",
      dimension4: issuedOn || "(not set)",
      dimension5: issuerName || "(not set)",
      dimension6: "(not set)",
    },
  });
};

export function triggerV2ErrorLogging(
  rawCertificate: WrappedDocument<v2.OpenAttestationDocument>,
  errors: string[]
): void {
  const certificate: v2.OpenAttestationDocument & { name?: string; issuedOn?: string } = getData(rawCertificate);

  const id = certificate?.id;
  const name = certificate?.name;
  const issuedOn = certificate?.issuedOn;
  const errorsList = errors.join(",");

  // If there are multiple issuers in a certificate, we send multiple events!
  certificate.issuers.forEach((issuer: v2.Issuer) => {
    const store = issuer.certificateStore ?? issuer.documentStore ?? issuer.tokenRegistry ?? issuer.id ?? ""; // use id for DID
    let issuerName = issuer.name;
    let registryId = null;

    if (isInRegistry(store)) {
      const registryIssuer: RegistryEntry = registry.issuers[store];
      issuerName = registryIssuer.name;
      registryId = registryIssuer.id;
    } else if (issuer.identityProof) {
      issuerName = issuer.identityProof.location || "";
    }

    analyticsEvent(window, {
      category: "CERTIFICATE_ERROR",
      action: `ERROR - ${issuerName}`,
      label: errorsList,
      options: {
        nonInteraction: true,
        dimension1: store || "(not set)",
        dimension2: id || "(not set)",
        dimension3: name || "(not set)",
        dimension4: issuedOn || "(not set)",
        dimension5: issuerName || "(not set)",
        dimension6: registryId || "(not set)",
        dimension7: errorsList,
      },
    });
  });
}

export function triggerV3ErrorLogging(
  rawCertificate: WrappedDocument<v3.OpenAttestationDocument>,
  errors: string[]
): void {
  const id = rawCertificate?.id;
  const name = rawCertificate?.name;
  const issuedOn = rawCertificate?.issued;
  const errorsList = errors.join(",");

  // If there are multiple issuers in a certificate, we send multiple events!
  const store = utils.getIssuerAddress(rawCertificate);
  const issuerName = rawCertificate.openAttestationMetadata.identityProof.identifier;

  analyticsEvent(window, {
    category: "CERTIFICATE_ERROR",
    action: `ERROR - ${issuerName}`,
    label: errorsList,
    options: {
      nonInteraction: true,
      dimension1: store || "(not set)",
      dimension2: id || "(not set)",
      dimension3: name || "(not set)",
      dimension4: issuedOn || "(not set)",
      dimension5: issuerName || "(not set)",
      dimension6: "(not set)",
      dimension7: errorsList,
    },
  });
}

export function triggerV2RendererTimeoutLogging(rawCertificate: WrappedDocument<v2.OpenAttestationDocument>): void {
  const certificate: v2.OpenAttestationDocument & { name?: string; issuedOn?: string } = getData(rawCertificate);

  const id = certificate?.id;
  const name = certificate?.name;
  const issuedOn = certificate?.issuedOn;
  const rendererUrl = typeof certificate?.$template === "string" ? certificate?.$template : certificate?.$template?.url;
  const templateName =
    typeof certificate?.$template === "string" ? certificate?.$template : certificate?.$template?.name;

  // If there are multiple issuers in a certificate, we send multiple events!
  certificate.issuers.forEach((issuer: v2.Issuer) => {
    const store = issuer.certificateStore ?? issuer.documentStore ?? issuer.tokenRegistry ?? issuer.id ?? ""; // use id for DID
    let issuerName = issuer.name;
    let registryId = null;

    if (isInRegistry(store)) {
      const registryIssuer: RegistryEntry = registry.issuers[store];
      issuerName = registryIssuer.name;
      registryId = registryIssuer.id;
    } else if (issuer.identityProof) {
      issuerName = issuer.identityProof.location || "";
    }

    analyticsEvent(window, {
      category: "CERTIFICATE_RENDERER_TIMEOUT",
      action: `RENDERER TIMEOUT - ${issuerName}`,
      options: {
        nonInteraction: true,
        dimension1: store || "(not set)",
        dimension2: id || "(not set)",
        dimension3: name || "(not set)",
        dimension4: issuedOn || "(not set)",
        dimension5: issuerName || "(not set)",
        dimension6: registryId || "(not set)",
        dimension8: rendererUrl || "(not set)",
        dimension9: templateName || "(not set)",
      },
    });
  });
}

export function triggerV3RendererTimeoutLogging(rawCertificate: WrappedDocument<v3.OpenAttestationDocument>): void {
  const id = rawCertificate?.id;
  const name = rawCertificate?.name;
  const issuedOn = rawCertificate?.issued;
  const rendererUrl = rawCertificate?.openAttestationMetadata.template?.url;
  const templateName = rawCertificate?.openAttestationMetadata.template?.name;

  // If there are multiple issuers in a certificate, we send multiple events!
  const store = utils.getIssuerAddress(rawCertificate);
  const issuerName = rawCertificate.openAttestationMetadata.identityProof.identifier;

  analyticsEvent(window, {
    category: "CERTIFICATE_RENDERER_TIMEOUT",
    action: `RENDERER TIMEOUT - ${issuerName}`,
    options: {
      nonInteraction: true,
      dimension1: store || "(not set)",
      dimension2: id || "(not set)",
      dimension3: name || "(not set)",
      dimension4: issuedOn || "(not set)",
      dimension5: issuerName || "(not set)",
      dimension6: "(not set)",
      dimension8: rendererUrl || "(not set)",
      dimension9: templateName || "(not set)",
    },
  });
}
