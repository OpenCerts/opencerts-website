import PropTypes from "prop-types";
import { storeAddresses } from "../common";
import Degree from "./degree";
import { MultiCertificateRenderer } from "../../../../../utils/MultiCertificateRenderer";

const templates = [
  {
    id: "degree",
    label: "NUS Degree",
    template: Degree
  }
];

const Cert = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={storeAddresses}
  />
);

Cert.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Cert;
