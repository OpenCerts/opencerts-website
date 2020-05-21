import { VerificationFragment } from "@govtechsg/oa-verify";
import { isValid } from "@govtechsg/opencerts-verify";
import React from "react";
import { DefaultView } from "./Views/DefaultView";
import { RetrievalErrorView } from "./Views/RetrievalErrorView";
import { UnverifiedView } from "./Views/UnverifiedView";
import { VerifyingView } from "./Views/VerifyingView";

interface CertificateVerificationStatusProps {
  resetData: () => void;
  fileError: boolean;
  verifying: boolean;
  hover: boolean;
  verificationStatus: VerificationFragment[];
  retrieveCertificateByActionError: () => void;
}

const CertificateVerificationStatus: React.FunctionComponent<CertificateVerificationStatusProps> = (props) => {
  const { resetData, verifying, fileError, verificationStatus, hover, retrieveCertificateByActionError } = props;
  if (hover) {
    return <DefaultView hover={true} accept={true} />;
  }
  if (fileError) {
    return <DefaultView hover={true} accept={false} />;
  }
  if (verifying) {
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

export default CertificateVerificationStatus;
