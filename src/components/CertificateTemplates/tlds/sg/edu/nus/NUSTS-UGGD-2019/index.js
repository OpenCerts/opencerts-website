import PropTypes from "prop-types";
import { storeAddresses } from "../common";
import Transcript from "./transcript";
import { MultiCertificateRenderer } from "../../../../../utils/MultiCertificateRenderer";

const templates = [
  {
    id: "transcript",
    label: "NUS Transcript",
    template: Transcript
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
