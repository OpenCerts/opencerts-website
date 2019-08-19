import PropTypes from "prop-types";
import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import { storeAddresses } from "../common";
import Degree from "./degree";
import Transcript from "../NUSTS-GENERAL-2019/transcript";

const templates = [
  {
    id: "degree",
    label: "Certificate",
    template: Degree
  },
  {
    id: "transcript",
    label: "Transcript",
    template: Transcript
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
