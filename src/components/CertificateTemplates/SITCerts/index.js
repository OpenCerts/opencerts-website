import SITCert from "./certificate";
// import SITTranscript from "./transcript";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: SITCert
  }
  /*,
  {
    id: "transcript",
    label: "Transcript",
    template: SITTranscript
  }*/
];

const addresses = [
  "0x897E224a6a8b72535D67940B3B8CE53f9B596800"
];

export default { templates, addresses };
