import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import NPCert from "./certificate";
import NPTranscript from "./transcript";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: NPCert
  },
  {
    id: "transcript",
    label: "Transcript",
    template: NPTranscript
  }
];

const NPCET2019SDPCN = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
  />
);

NPCET2019SDPCN.displayName = "NP-CET2019-SDPCN Template";

export default NPCET2019SDPCN;
