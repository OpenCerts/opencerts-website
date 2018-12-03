// import dynamic from "next/dynamic"
// const DefaultCert = dynamic(import("./certificate"));
import { MultiCertificateRenderer } from "../../MultiCertificateRenderer";
import DefaultCert from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: DefaultCert
  }
];

// export default { templates };

const makeTabs = certificate => {
  return [
    {
      id: "certificate",
      label: "Certificate",
      content: DefaultCert({ certificate })
    }
  ];
};

export default ({ certificate }) => {
  const renderedCertificate = makeTabs(certificate)
  console.log(renderedCertificate)
  return <MultiCertificateRenderer tabs={renderedCertificate} />;
};
