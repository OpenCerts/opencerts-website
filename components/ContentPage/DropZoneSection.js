import PropTypes from "prop-types";
import CertificateDropzone from "../CertificateDropzone";

const DropZoneSection = ({ handleCertificateChange }) => (
  <div className="row my-3">
    <div className="col">
      <div className="h1 mb-3">OpenCerts</div>
      <div className="mb-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <div>
        <a href="#">Learn More</a>
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
