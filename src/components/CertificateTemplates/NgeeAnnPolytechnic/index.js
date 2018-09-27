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
  "0x1C4B83f39DA76d39B3ABbb1AfFf5cB4e629edBF4", 
  "0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4F"
];

export default { templates, addresses };
