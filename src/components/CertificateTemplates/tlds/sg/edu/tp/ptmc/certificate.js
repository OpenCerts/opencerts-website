import PropTypes from "prop-types";
import CertificateHeader from "../common/certificateHeader";
import PartTimeCertificateFooter from "../common/partTimeCertificateFooter";
import CertificateBody from "./certificateBody";

const Certificate = ({ certificate }) => (
  <div className="container">
    <CertificateHeader />
    <CertificateBody certificate={certificate} />
    <PartTimeCertificateFooter />
  </div>
);

Certificate.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Certificate;
