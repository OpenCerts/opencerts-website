import PropTypes from "prop-types";
import CertificateDropzone from "../CertificateDropZone";

const DropZoneSection = ({ handleCertificateChange }) => (
  <div
    className="row p-4 bg-brand-dark text-white"
    // style={{ boxShadow: "inset 0 0 50px 0 rgba(102, 120, 138, 0.2)" }}
  >
    <div className="main">
      <div className="col-md-4">
        <div className="mb-3 py-4">
          <p>
            This OpenCerts site allows you to view and verify the authenticity
            of certificates.
          </p>
          <p>
            If you have received a certificate, dropping it into the box on the
            right will allow you to check its contents and verify its
            authenticity.
          </p>
        </div>
      </div>
      <div className="col-md-8">
        <CertificateDropzone
          handleCertificateChange={handleCertificateChange}
        />
      </div>
    </div>
  </div>
);

export default DropZoneSection;

DropZoneSection.propTypes = {
  handleCertificateChange: PropTypes.func
};
