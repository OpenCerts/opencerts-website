import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import approvedAddresses from "./common";
import DemoCert from "./certificate";
import DemoTranscript from "./transcript";
import DemoMedia from "./media";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: DemoCert
  },
  {
    id: "transcript",
    label: "Transcript",
    template: DemoTranscript
  },
  {
    id: "media",
    label: "Media",
    template: DemoMedia
  }
];

const GovtechDemoCert = ({ document }) => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
    document={document}
  />
);

export default GovtechDemoCert;
