import { isValidOpenCert, VerificationFragment } from "@trustvc/trustvc";
import React, { ReactNode } from "react";
import {
  CERTIFICATE_VERIFICATION_FAILED_HEADING,
  DEMO_CERTIFICATE_LOAD_MESSAGE,
  ignoredFilesMessage,
} from "../../constants/verificationMessages";
import { WrappedOrSignedOpenCertsDocument } from "../../shared";
import { DropzoneViewWrapper } from "../Layout/DropzoneViewWrapper";
import { DefaultView } from "./Views/DefaultView";
import { RetrievalErrorView } from "./Views/RetrievalErrorView";
import { ErrorHeading, TryAnother, UnverifiedView, WhatShouldIDo } from "./Views/UnverifiedView";
import { VerifyingView } from "./Views/VerifyingView";

interface CertificateVerificationStatusProps {
  resetData: () => void;
  fileError: boolean;
  demoLoadError: boolean;
  /** Set when the drop contained more than one file. */
  ignoredFileName: string | null;
  verifying: boolean;
  hover: boolean;
  verificationStatus: VerificationFragment[] | null;
  /** Set when verification throws, for example when every provider request fails. */
  verificationError: string | null;
  retrieveCertificateByActionError: string | null;
  /** The document being verified — a presentation is reported differently from a certificate. */
  document: WrappedOrSignedOpenCertsDocument | null;
}

export const CertificateVerificationStatus: React.FunctionComponent<CertificateVerificationStatusProps> = (props) => {
  const {
    resetData,
    verifying,
    fileError,
    demoLoadError,
    ignoredFileName,
    verificationStatus,
    verificationError,
    hover,
    retrieveCertificateByActionError,
    document,
  } = props;
  const ignoredNotice = ignoredFileName ? (
    <p className="text-gray-700 mt-4" data-testid="ignored-files-note" role="status">
      {ignoredFilesMessage(ignoredFileName)}
    </p>
  ) : null;
  const frame = (accept: boolean, content: ReactNode) => (
    <DropzoneViewWrapper hover={hover} accept={accept}>
      {content}
      {!hover && ignoredNotice}
    </DropzoneViewWrapper>
  );

  if (hover) {
    return frame(true, <DefaultView fileError={fileError} />);
  }
  if (demoLoadError) {
    return frame(
      false,
      <div role="alert" data-testid="demo-load-error">
        <p className="text-pink">{DEMO_CERTIFICATE_LOAD_MESSAGE}</p>
      </div>
    );
  }
  if (fileError) {
    return frame(false, <DefaultView fileError={fileError} />);
  }
  if (verifying) {
    return frame(true, <VerifyingView />);
  }
  if (retrieveCertificateByActionError) {
    return frame(
      false,
      <RetrievalErrorView
        resetData={() => resetData()}
        retrieveCertificateByActionError={retrieveCertificateByActionError}
      />
    );
  }
  if (verificationStatus && !isValidOpenCert(verificationStatus)) {
    return frame(
      false,
      <UnverifiedView resetData={() => resetData()} verificationStatus={verificationStatus} document={document} />
    );
  }
  if (verificationError) {
    return frame(
      false,
      <div role="alert">
        <ErrorHeading title={CERTIFICATE_VERIFICATION_FAILED_HEADING} />
        <div data-testid="verification-error" className="text-pink mt-4 mb-4">
          <p className="break-words">{verificationError}</p>
        </div>
        <WhatShouldIDo />
        <TryAnother resetData={() => resetData()} />
      </div>
    );
  }
  return frame(true, <DefaultView fileError={fileError} />);
};
