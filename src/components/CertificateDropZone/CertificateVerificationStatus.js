import PropTypes from "prop-types";

import DefaultView from "./Views/DefaultView";
import VerifyingView from "./Views/VerifyingView";
import UnverifiedView from "./Views/UnverifiedView";

const CertificateVerificationStatus = props => {
  const {
    handleRenderOverwrite,
    resetData,
    verifying,
    fileError,
    issuerIdentityStatus,
    hashStatus,
    issuedStatus,
    notRevokedStatus,
    document,
    verificationStatus,
    storeStatus,
    hover,
    retrieveCertificateStatus
  } = props;
  if (hover) {
    return <DefaultView hover={true} accept={true} />;
  }
  if (fileError) {
    return <DefaultView hover={true} accept={false} />;
  }
  if (verifying || retrieveCertificateStatus === "PENDING") {
    return (
      <VerifyingView
        verificationStatus={verificationStatus}
        retrieveCertificateStatus={retrieveCertificateStatus}
      />
    );
  }
  if (
    document &&
    (!hashStatus.verified ||
      !issuedStatus.verified ||
      !notRevokedStatus.verified ||
      !issuerIdentityStatus.verified ||
      !storeStatus.verified)
  ) {
    return (
      <UnverifiedView
        handleRenderOverwrite={handleRenderOverwrite}
        resetData={() => resetData()}
        hashStatus={hashStatus}
        issuedStatus={issuedStatus}
        notRevokedStatus={notRevokedStatus}
        issuerIdentityStatus={issuerIdentityStatus}
        storeStatus={storeStatus}
      />
    );
  }
  return <DefaultView hover={false} accept={true} />;
};

CertificateVerificationStatus.propTypes = {
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
  verificationStatus: PropTypes.array,
  storeStatus: PropTypes.object,
  hover: PropTypes.bool,
  retrieveCertificateStatus: PropTypes.string
};

export default CertificateVerificationStatus;
