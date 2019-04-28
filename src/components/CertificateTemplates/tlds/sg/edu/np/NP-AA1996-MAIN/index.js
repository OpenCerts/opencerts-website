import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import NPCert from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: NPCert
  }
];

const NPAA1996MAIN = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
  />
);

NPAA1996MAIN.displayName = "NP-AA2018-OPTION Template";

export default NPAA1996MAIN;
