import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import Certificate from "./certificate";
import Transcript from "./transcript";
import Guide from "./guide";
import { approvedAddresses } from "./common";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: Certificate
  },
  {
    id: "transcript",
    label: "Transcript",
    template: Transcript
  },
  {
    id: "guide",
    label: "Static-Details",
    template: Guide
  }
];

const NCS2TEMPLATE = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
  />
);

export default NCS2TEMPLATE;
