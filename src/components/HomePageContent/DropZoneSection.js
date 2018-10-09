import PropTypes from "prop-types";
import CertificateDropzone from "../CertificateDropZone";
import css from "./dropzonesection.scss";

const DropZoneSection = ({ handleCertificateChange }) => (
  <div
    className="row p-4 bg-brand-dark text-white"
    // style={{ boxShadow: "inset 0 0 50px 0 rgba(102, 120, 138, 0.2)" }}
  >
    <div className="main">
      <div className="col-md-5">
        <div className={css.description}>
          <h3>An easy way to check and verify your certificates</h3>
          <p>
            Whether you&#39;re a student or an employer, OpenCerts lets you
            verify the certificates you have of anyone from any institution. All
            in one place.
          </p>
        </div>
      </div>
      <div className="col-md-7">
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
