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

// export const addressesxx = approvedAddresses;

// export default { templates, addresses };

export default ({ certificate }) => {
  const renderedCertificate = templates.map(template =>
    renderTemplateToTab(template, certificate)
  );
  // TODO: refactor multicertificate render to take a whitelist of addresses instead of exporting it

  return (
    <MultiCertificateRenderer
      tabs={renderedCertificate}
      whitelist={approvedAddresses}
    />
  );
};
