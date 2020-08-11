import { v2 } from "@govtechsg/open-attestation";
import registry from "../../../public/static/registry.json";
import { getLogger } from "../../utils/logger";
import { get } from "lodash";

const { trace } = getLogger("components:Analytics:");
const { trace: traceDev } = getLogger("components:Analytics(Inactive):");

interface Event {
  category: string;
  action: string;
  value?: string | number;
  label?: string;
  options?: UniversalAnalytics.FieldsObject;
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

export const sendEventCertificateViewedDetailed = ({
  issuer,
  certificateData,
}: {
  issuer: v2.Issuer;
  certificateData: { id?: string; name?: string; issuedOn?: string };
}): void => {
  let label = "";
  let issuerName = "";

  const separator = ";";
  const store = issuer.certificateStore ?? issuer.documentStore ?? issuer.tokenRegistry ?? "";
  const id = certificateData?.id ?? "";
  const name = certificateData?.name ?? "";
  const issuedOn = certificateData?.issuedOn ?? "";
  const registryIssuer = get(registry.issuers, store);

  if (registryIssuer) {
    issuerName = registryIssuer.name;
    label = `"store":"${store}"${separator}"document_id":"${id}"${separator}"name":"${name}"${separator}"issued_on":"${issuedOn}"${separator}"issuer_name":"${
      issuerName ?? ""
    }"${separator}"issuer_id":"${registryIssuer.id ?? ""}"`;
  } else if (issuer.identityProof) {
    issuerName = issuer.identityProof.location;
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
      dimension6: registryIssuer?.id || "(not set)",
    },
  });
};
