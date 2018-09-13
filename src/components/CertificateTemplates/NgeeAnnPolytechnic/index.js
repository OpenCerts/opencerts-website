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

const addresses = ["0x1C4B83f39DA76d39B3ABbb1AfFf5cB4e629edBF4"];

export default { templates, addresses };
