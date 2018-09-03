import PropTypes from "prop-types";
import CertificateDropzone from "../CertificateDropZone";

const DropZoneSection = ({ handleCertificateChange }) => (
  <div
    className="row p-4 bg-brand-dark text-white"
    style={{ boxShadow: "inset 0 0 50px 0 rgba(102, 120, 138, 0.2)" }}
  >
    <div className="col">
      <div className="mb-3 py-4">
        <p>
          OpenCerts allows you to view and verify the authenticity of
          certificates.
        </p>
        <p>
          Each certificate has an unique signature, anchored onto the Ethereum
          blockchain which can be used to verify the authenticity and provenance
          of the document.
        </p>
      </div>
      <div>
        <a href="#how-it-works">Learn More</a>
      </div>
    </div>
    <div className="col">
      <CertificateDropzone handleCertificateChange={handleCertificateChange} />
    </div>
  </div>
);

export default DropZoneSection;

DropZoneSection.propTypes = {
  handleCertificateChange: PropTypes.func
};
