import PropTypes from "prop-types";
import CertificateHeader from "../common/certificateHeader";
import CertificateBody from "./certificateBody";
import CertificateFooter from "./certificateFooter";

const Certificate = ({ certificate }) => (
  <div className="container">
    <CertificateHeader />
    <CertificateBody certificate={certificate} />
    <CertificateFooter certificate={certificate} />
  </div>
);

Certificate.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Certificate;
