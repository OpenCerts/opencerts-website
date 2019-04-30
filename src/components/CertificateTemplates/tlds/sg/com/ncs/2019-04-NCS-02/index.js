import PropTypes from "prop-types";
import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import Certificate from "./certificate";
import Transcript from "./transcript";
import Guide from "./guide";
import { approvedAddresses } from "./common";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: Certificate
  },
  {
    id: "transcript",
    label: "Transcript",
    template: Transcript
  },
  {
    id: "guide",
    label: "Static-Details",
    template: Guide
  }
];

const ComGlobal = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={approvedAddresses}
  />
);

ComGlobal.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default ComGlobal;
