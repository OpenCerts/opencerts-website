import PropTypes from "prop-types";
import { MultiCertificateRenderer } from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import SEABSOR from "./sor";
import SEABEXPLANATORYNOTES from "../common/explnotes_a3";

const templates = [
  {
    id: "sor",
    label: "Statement of Results",
    template: SEABSOR
  },
  {
    id: "explanatorydtl",
    label: "Explanatory Notes",
    template: SEABEXPLANATORYNOTES
  }
];

const SEABCert = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={approvedAddresses}
  />
);

SEABCert.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default SEABCert;
