import PropTypes from "prop-types";
import CertificateDropzone from "../CertificateDropZone";
import css from "./dropZoneSection.scss";

const DropZoneSection = ({ handleCertificateChange }) => (
  <div
    className="row p-5 bg-brand-dark text-white"
    // style={{ boxShadow: "inset 0 0 50px 0 rgba(102, 120, 138, 0.2)" }}
  >
    <div className={css.main}>
      <div className="col-lg-5 col-md-12">
        <div className={css.description}>
          <h2>An easy way to check and verify your certificates</h2>
          <p>
            Whether you&#39;re a student or an employer, OpenCerts lets you
            verify the certificates you have of anyone from any institution. All
            in one place.
          </p>
        </div>
      </div>
      <div className="col-lg-7 col-md-12 col-sm-12">
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
