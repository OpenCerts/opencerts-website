import Dropzone from "react-dropzone";
import PropTypes from "prop-types";

import DefaultView from "./Views/DefaultView";
import VerifyingView from "./Views/VerifyingView";
import UnverifiedView from "./Views/UnverifiedView";

const renderDropzoneContent = props => {
  const {
    handleRenderOverwrite,
    resetData,
    isDragAccept,
    isDragReject,
    verifying,
    fileError,
    issuerIdentityStatus,
    hashStatus,
    issuedStatus,
    notRevokedStatus,
    document,
    verificationStatus
  } = props;
  // isDragReject is checking for mimetype (but we skipped it)
  // fileError is when the file is not in JSON format and threw when deserilising
  // valid JSON files will be handled by handleCertificateChange()
  if (isDragReject || fileError) {
    return <DefaultView hover={true} accept={false} />;
  }
  if (isDragAccept) {
    return <DefaultView hover={true} accept={true} />;
  }
  if (verifying) {
    return <VerifyingView verificationStatus={verificationStatus} />;
  }
  if (
    document &&
    (!hashStatus.verified ||
      !issuedStatus.verified ||
      !notRevokedStatus.verified)
  ) {
    return (
      <UnverifiedView
        handleRenderOverwrite={handleRenderOverwrite}
        resetData={() => resetData()}
        hashStatus={hashStatus}
        issuedStatus={issuedStatus}
        notRevokedStatus={notRevokedStatus}
        issuerIdentityStatus={issuerIdentityStatus}
      />
    );
  }
  return <DefaultView hover={false} accept={true} />;
};

// Injects additional props on top of isDragReject, isDragActive, acceptedFiles & rejectedFiles
const renderDropzoneContentCurry = additionalProps => props =>
  renderDropzoneContent({ ...props, ...additionalProps });

const onFileDrop = (
  acceptedFiles,
  handleCertificateChange,
  handleFileError
) => {
  // eslint-disable-next-line no-undef
  const reader = new FileReader();
  if (reader.error) {
    handleFileError(reader.error);
  }
  reader.onload = () => {
    try {
      const json = JSON.parse(reader.result);
      handleCertificateChange(json);
    } catch (e) {
      handleFileError(e);
    }
  };
  if (acceptedFiles && acceptedFiles.length && acceptedFiles.length > 0)
    acceptedFiles.map(f => reader.readAsText(f));
};

const CertificateDropzone = ({
  handleCertificateChange,
  resetData,
  handleFileError,
  handleRenderOverwrite,
  fileError,
  verifying,
  issuerIdentityStatus,
  hashStatus,
  issuedStatus,
  notRevokedStatus,
  document,
  verificationStatus
}) => (
  <Dropzone
    id="certificate-dropzone"
    onDrop={acceptedFiles =>
      onFileDrop(acceptedFiles, handleCertificateChange, handleFileError)
    }
    className="h-100"
  >
    {renderDropzoneContentCurry({
      handleCertificateChange,
      resetData,
      handleRenderOverwrite,
      fileError,
      verifying,
      issuerIdentityStatus,
      hashStatus,
      issuedStatus,
      notRevokedStatus,
      document,
      verificationStatus
    })}
  </Dropzone>
);

CertificateDropzone.propTypes = {
  document: PropTypes.object,
  resetData: PropTypes.func,
  handleCertificateChange: PropTypes.func,
  handleFileError: PropTypes.func,
  handleRenderOverwrite: PropTypes.func,
  updateCertificate: PropTypes.func,
  fileError: PropTypes.bool,
  verifying: PropTypes.bool,
  issuerIdentityStatus: PropTypes.object,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  verificationStatus: PropTypes.array
};

renderDropzoneContent.propTypes = {
  handleRenderOverwrite: PropTypes.func,
  resetData: PropTypes.func,
  document: PropTypes.object,
  fileError: PropTypes.bool,
  verifying: PropTypes.bool,
  isDragAccept: PropTypes.bool,
  isDragReject: PropTypes.bool,
  issuerIdentityStatus: PropTypes.object,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  verificationStatus: PropTypes.array
};

export default CertificateDropzone;
