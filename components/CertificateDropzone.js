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
      <div className="grow h-100 pa6">
        <div className="pa3">
          <i className="fas fa-check-circle fa-10x black-40" />
        </div>
        <div className="f4 black-40 fw6">Drop a certificate here&hellip;</div>
      </div>
    );
  }
  if (isDragActive && isDragReject) {
    return (
      <div className="grow h-100 pa6">
        <div className="pa3">
          <i className="fas fa-times-circle fa-10x black-40" />
        </div>
        <div className="f4 black-40 fw6">File format is incorrect</div>
      </div>
    );
  }
  return (
    <div className="grow h-100 pa6">
      <div className="pa3">
        <i className="fas fa-download fa-10x black-40" />
      </div>
      <div className="f4 black-40 fw6">Drop a certificate here&hellip;</div>
    </div>
  );
};

const CertificateDropzone = ({ handleCertificateChange }) => (
  <div>
    <Dropzone
      accept="application/json"
      onDrop={acceptedFiles =>
        onFileDrop(acceptedFiles, handleCertificateChange)
      }
      className="w-100 tc br3 ba b--dashed bw3 b--mid-gray noselect pointer"
      acceptClassName="w-100 bg-green tc br3"
      rejectClassName="w-100 bg-red tc br3"
    >
      {renderDropzoneContent}
    </Dropzone>
  </div>
);

CertificateDropzone.propTypes = {
  handleCertificateChange: PropTypes.func
};
renderDropzoneContent.propTypes = {
  isDragActive: PropTypes.bool,
  isDragReject: PropTypes.bool
};

export default CertificateDropzone;
