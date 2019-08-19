import PropTypes from "prop-types";
import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import { storeAddresses } from "../common";
import Degree from "../NUS-K1-2019/degree";

const templates = [
  {
    id: "degree",
    label: "Certificate",
    template: Degree
  }
];

const Cert = props => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={storeAddresses}
    {...props}
  />
);

Cert.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Cert;
