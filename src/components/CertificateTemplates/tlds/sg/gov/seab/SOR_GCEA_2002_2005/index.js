import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import SEABSOR from "./sor";
import SEABEXPLANATORYNOTES from "../common/explnotes_a2";

const templates = [
  {
    id: "sor",
    label: "Statement of Results",
    template: SEABSOR
  },
  {
    id: "explanatorydtl",
    label: "Explanatory Notes",
    template: SEABEXPLANATORYNOTES
  }
];

const SEABCert = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
  />
);

export default SEABCert;
