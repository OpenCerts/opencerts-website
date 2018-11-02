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

const addresses = [
  "0xa5d801265D29A6F1015a641BfC0e39Ee3dA2AC76",
  "0xD939B3934fB024517296e0b9091E72F222F81c1E"
];

export default { templates, addresses };
