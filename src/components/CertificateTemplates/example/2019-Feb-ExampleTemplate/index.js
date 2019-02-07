import PropTypes from "prop-types";
import { MultiCertificateRenderer } from "template-utils/MultiCertificateRenderer";
import Certificate from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: Certificate
  }
];

const Template2019FebExample = ({ certificate }) => (
  <MultiCertificateRenderer certificate={certificate} templates={templates} />
);

Template2019FebExample.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Template2019FebExample;
