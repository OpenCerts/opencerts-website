import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import approvedAddresses from "./common";
import Cert from "./certificate";
import Script from "./transcript";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: Cert
  },
  {
    id: "transcript",
    label: "Transcript",
    template: Script
  }
];

const DEMOCERT = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
  />
);

DEMOCERT.displayName = "Demo Cert Template";

export default DEMOCERT;
