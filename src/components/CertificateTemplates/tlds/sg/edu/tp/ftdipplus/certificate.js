import PropTypes from "prop-types";
import CertificateHeader from "../common/certificateHeader";
import CertificateFooter from "../common/certificateFooter";
import CertificateBody from "./certificateBody";

const Certificate = ({ certificate }) => (
  <div className="container">
    <CertificateHeader />
    <CertificateBody certificate={certificate} />
    <CertificateFooter />
  </div>
);

Certificate.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Certificate;
