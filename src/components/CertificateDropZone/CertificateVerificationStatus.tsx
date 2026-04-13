import { isValidOpenCert, VerificationFragment } from "@trustvc/trustvc";
import React from "react";
import { DropzoneViewWrapper } from "../Layout/DropzoneViewWrapper";
import { DefaultView } from "./Views/DefaultView";
import { RetrievalErrorView } from "./Views/RetrievalErrorView";
import { UnverifiedView } from "./Views/UnverifiedView";
import { VerifyingView } from "./Views/VerifyingView";

interface CertificateVerificationStatusProps {
  resetData: () => void;
  fileError: boolean;
  verifying: boolean;
  hover: boolean;
  verificationStatus: VerificationFragment[] | null;
  retrieveCertificateByActionError: string | null;
}

export const CertificateVerificationStatus: React.FunctionComponent<CertificateVerificationStatusProps> = (props) => {
  const { resetData, verifying, fileError, verificationStatus, hover, retrieveCertificateByActionError } = props;
  if (hover) {
    return (
      <DropzoneViewWrapper hover={hover} accept={true}>
        <DefaultView fileError={fileError} />
      </DropzoneViewWrapper>
    );
  }
  if (fileError) {
    return (
      <DropzoneViewWrapper hover={hover} accept={false}>
        <DefaultView fileError={fileError} />
      </DropzoneViewWrapper>
    );
  }
  if (verifying) {
    return (
      <DropzoneViewWrapper hover={hover} accept={true}>
        <VerifyingView />
      </DropzoneViewWrapper>
    );
  }
  if (retrieveCertificateByActionError) {
    return (
      <DropzoneViewWrapper hover={hover} accept={false}>
        <RetrievalErrorView
          resetData={() => resetData()}
          retrieveCertificateByActionError={retrieveCertificateByActionError}
        />
      </DropzoneViewWrapper>
    );
  }
  if (verificationStatus && !isValidOpenCert(verificationStatus)) {
    return (
      <DropzoneViewWrapper hover={hover} accept={false}>
        <UnverifiedView resetData={() => resetData()} verificationStatus={verificationStatus} />
      </DropzoneViewWrapper>
    );
  }
  return (
    <DropzoneViewWrapper hover={hover} accept={true}>
      <DefaultView fileError={fileError} />
    </DropzoneViewWrapper>
  );
};
