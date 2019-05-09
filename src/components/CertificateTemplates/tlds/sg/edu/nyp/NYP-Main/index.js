import PropTypes from "prop-types";
<<<<<<< HEAD
import { MultiCertificateRenderer } from "template-utils/MultiCertificateRenderer";
=======
import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
>>>>>>> ecea7975d867786bb02ec96b9bef1bf8ce275aea
import Certificate from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: Certificate
  }
];

const addresses = [
  "0x5f007251c78cA92d3053492cCf0EDC161063624c",
  "0x5CA3b9daC85DA4DE4030e59C1a0248004209e348"
];

<<<<<<< HEAD
const NYPCert = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={addresses}
  />
=======
const NYPCert = () => (
  <MultiCertificateRenderer templates={templates} whitelist={addresses} />
>>>>>>> ecea7975d867786bb02ec96b9bef1bf8ce275aea
);

NYPCert.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default NYPCert;
