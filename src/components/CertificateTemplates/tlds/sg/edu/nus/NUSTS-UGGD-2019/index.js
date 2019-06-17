import PropTypes from "prop-types";
import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import { storeAddresses } from "../common";
import Transcript from "./transcript";

const templates = [
  {
    id: "transcript",
    label: "NUS Transcript",
    template: Transcript
  }
];

const Cert = () => (
  <MultiCertificateRenderer templates={templates} whitelist={storeAddresses} />
);

Cert.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Cert;
