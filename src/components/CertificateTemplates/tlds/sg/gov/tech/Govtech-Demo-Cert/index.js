/* eslint-disable react/prop-types */
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

const GovtechDemoCert = ({
  document,
  activeTab,
  updateCurrentHeight,
  updateTemplateTabs
}) => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
    document={document}
    activeTab={activeTab}
    updateCurrentHeight={updateCurrentHeight}
    updateTemplateTabs={updateTemplateTabs}
  />
);

export default GovtechDemoCert;
