import PropTypes from "prop-types";
import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import { storeAddresses } from "../common";
import Degree from "./degree";

const templates = [
  {
    id: "degree",
    label: "NUS Degree",
    template: Degree
  }
];

const Cert = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={storeAddresses}
  />
);

Cert.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Cert;
