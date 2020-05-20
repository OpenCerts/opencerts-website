import React from "react";
import PropTypes from "prop-types";

import { isValid } from "@govtechsg/opencerts-verify";
import { DefaultView } from "./Views/DefaultView";
import { VerifyingView } from "./Views/VerifyingView";
import { UnverifiedView } from "./Views/UnverifiedView";
import { RetrievalErrorView } from "./Views/RetrievalErrorView";

const CertificateVerificationStatus = (props) => {
  const {
    resetData,
    verifying,
    fileError,
    verificationStatus,
    hover,
    retrieveCertificateStatus,
    retrieveCertificateByActionError,
  } = props;
  if (hover) {
    return <DefaultView hover={true} accept={true} />;
  }
  if (fileError) {
    return <DefaultView hover={true} accept={false} />;
  }
  if (verifying || retrieveCertificateStatus === "PENDING") {
    return <VerifyingView />;
  }
  if (retrieveCertificateByActionError) {
    return (
      <RetrievalErrorView
        resetData={() => resetData()}
        retrieveCertificateByActionError={retrieveCertificateByActionError}
      />
    );
  }
  if (verificationStatus && !isValid(verificationStatus)) {
    return <UnverifiedView resetData={() => resetData()} verificationStatus={verificationStatus} />;
  }
  return <DefaultView hover={false} accept={true} />;
};

CertificateVerificationStatus.propTypes = {
  resetData: PropTypes.func,
  fileError: PropTypes.bool,
  verifying: PropTypes.bool,
  hover: PropTypes.bool,
  retrieveCertificateStatus: PropTypes.string,
  verificationStatus: PropTypes.array,
  retrieveCertificateByActionError: PropTypes.string,
};

export default CertificateVerificationStatus;
