import { MultiCertificateRenderer } from "../../../MultiCertificateRenderer";
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


const makeTabs = certificate => {
  return [
    {
      id: "certificate",
      label: "Certificate",
      content: NPCert({ certificate })
    },
    {
      id: "transcript",
      label: "Transcript",
      content: NPTranscript({ certificate })
    }
  ]
}

const addresses = approvedAddresses;

// export default { templates, addresses };

export default ({ certificate }) => {
  const renderedCertificate = makeTabs(certificate)
  console.log(renderedCertificate)
  return <MultiCertificateRenderer tabs={renderedCertificate} />;
}