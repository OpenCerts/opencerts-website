import Dropzone from "react-dropzone";
import PropTypes from "prop-types";

const onFileDrop = (acceptedFiles, handleCertificateChange) => {
  // eslint-disable-next-line no-undef
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const json = JSON.parse(reader.result);
      handleCertificateChange(json);
    } catch (e) {
      // TODO add in error handling
      console.log(e); // eslint-disable-line
    }
  };
  if (acceptedFiles && acceptedFiles.length && acceptedFiles.length > 0)
    acceptedFiles.map(f => reader.readAsBinaryString(f));
};

const renderDropzoneContent = ({
  isDragActive,
  isDragReject
  // acceptedFiles,
  // rejectedFiles,
}) => {
  if (isDragActive && !isDragReject) {
    return (
      <div className="text-center bg-light h-100 d-flex flex-column justify-content-center p-4">
        <div className="text-muted mb-3">
          Drop a OpenCerts file here to view
        </div>
        <div className="p-3">
          <i className="fas fa-download fa-10x text-muted" />
        </div>
      </div>
    );
  }
  if (isDragActive && isDragReject) {
    return (
      <div className="text-center bg-red h-100 d-flex flex-column justify-content-center p-4">
        <div className="text-muted mb-3">File format is incorrect</div>
        <div className="p-3">
          <i className="fas fa-times-circle fa-10x text-muted" />
        </div>
      </div>
    );
  }
  return (
    <div className="text-center bg-light h-100 d-flex flex-column justify-content-center p-4">
      <div className="text-muted mb-3">Drop a OpenCerts file here to view</div>
      <div className="p-3">
        <i className="fas fa-download fa-10x text-muted" />
      </div>
    </div>
  );
};

const CertificateDropzone = ({ handleCertificateChange }) => (
  <Dropzone
    accept="application/json"
    onDrop={acceptedFiles => onFileDrop(acceptedFiles, handleCertificateChange)}
    className="pointer h-100"
    acceptClassName=""
    rejectClassName="w-100 bg-warning tc br3"
  >
    {renderDropzoneContent}
  </Dropzone>
);

CertificateDropzone.propTypes = {
  handleCertificateChange: PropTypes.func
};
renderDropzoneContent.propTypes = {
  isDragActive: PropTypes.bool,
  isDragReject: PropTypes.bool
};

export default CertificateDropzone;
