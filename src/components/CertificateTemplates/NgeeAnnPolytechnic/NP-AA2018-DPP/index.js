import {
  MultiCertificateRenderer,
  renderTemplateToTab
} from "../../../MultiCertificateRenderer";
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

export default ({ certificate }) => {
  const renderedCertificate = templates.map(template =>
    renderTemplateToTab(template, certificate)
  );
  return (
    <MultiCertificateRenderer
      certificate={certificate}
      tabs={renderedCertificate}
      whitelist={approvedAddresses}
    />
  );
};
