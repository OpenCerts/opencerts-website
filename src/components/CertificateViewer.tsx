import { VerificationFragment } from "@govtechsg/oa-verify";
import { utils, v2, v3, v4, OpenAttestationDocument } from "@govtechsg/open-attestation";
import dynamic from "next/dynamic";
import React from "react";
import { connect } from "react-redux";
import { updateObfuscatedCertificate as updateObfuscatedCertificateAction } from "../reducers/certificate.actions";
import { WrappedOrSignedOpenCertsDocument } from "../shared";
import { CertificateShareLinkFormContainer } from "./CertificateShareLink/CertificateShareLinkForm";
import { CertificateVerifyBlock } from "./CertificateVerifyBlock";
import { ErrorBoundary } from "./ErrorBoundary";
import { Modal } from "./Modal";

const CertificateSharingForm = dynamic(import("./CertificateSharing/CertificateSharingForm"));

const DecentralisedRenderer = dynamic(() => import("./DecentralisedTemplateRenderer/DecentralisedRenderer"), {
  ssr: false,
});

// https://github.com/zeit/next.js/issues/4957#issuecomment-413841689
// eslint-disable-next-line react/display-name
const ForwardedRefDecentralisedRenderer = React.forwardRef<
  { print: () => void } | undefined,
  {
    rawDocument: WrappedOrSignedOpenCertsDocument;
    updateObfuscatedCertificate: (updatedDoc: WrappedOrSignedOpenCertsDocument) => void;
  }
>((props, ref) => <DecentralisedRenderer {...props} forwardedRef={ref} />);

const isObfuscated = (document: v3.WrappedDocument | v2.WrappedDocument | v4.WrappedDocument) => {
  try {
    return utils.isObfuscated(document);
  } catch (e) {
    return false;
  }
};

export interface CertificateViewerProps {
  document: WrappedOrSignedOpenCertsDocument;
  certificate: OpenAttestationDocument;
  verifying: boolean;
  shareLink: { id?: string; key?: string };
  copiedLink: boolean;
  verificationStatus: VerificationFragment[] | null;
  showSharing: boolean;
  showShareLink: boolean;
  emailSendingState: string;
  handleSharingToggle: () => void;
  handleSendCertificate: (event: { email: string; captcha: string }) => void;
  handleShareLinkToggle: () => void;
  updateObfuscatedCertificate: (updatedDoc: WrappedOrSignedOpenCertsDocument) => void;
  handleCopyLink: (certificateLink: string) => void;
}
export const CertificateViewer: React.FunctionComponent<CertificateViewerProps> = (props) => {
  if (!props.verificationStatus) throw new Error("Verification status can't be null");
  const { document } = props;
  const childRef = React.useRef<{ print: () => void }>();

  return (
    <ErrorBoundary>
      {
        <>
          <section className="bg-blue-100 py-4">
            <div className="container">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2 xl:w-1/3">
                  <CertificateVerifyBlock verificationStatus={props.verificationStatus} document={props.document} />
                </div>
                <div className="w-full lg:w-1/2 xl:w-2/3">
                  <div className="flex flex-wrap gap-y-2">
                    <div className="w-auto lg:ml-auto mr-2">
                      <div
                        className="icon-utility"
                        id="btn-print"
                        onClick={() => {
                          if (childRef.current) childRef.current.print();
                        }}
                      >
                        <i className="fas fa-print text-md" />
                        <span>Print</span>
                      </div>
                    </div>
                    <div className="mr-2 w-auto" onClick={() => props.handleSharingToggle()}>
                      <div className="icon-utility" id="btn-email">
                        <i className="fas fa-envelope text-md" />
                        <span>Email</span>
                      </div>
                    </div>
                    <div className="w-auto">
                      <a
                        className="icon-utility"
                        download={`${props.certificate.id}.opencert`}
                        target="_blank"
                        href={`data:text/json;,${encodeURIComponent(JSON.stringify(props.document, null, 2))}`}
                        rel="noreferrer"
                      >
                        <button id="btn-download" title="Download">
                          <i className="fas fa-file-download text-md" />
                        </button>
                        <span>Download OpenCert</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {isObfuscated(document) && (
                <div className="text-md font-bold text-red pt-4" id="obfuscation-note">
                  The owner of this certificate have chosen not to share certain information in the certificate with
                  you. Please note that this does not affect the authenticity of the certificate.
                </div>
              )}
            </div>
            <Modal show={props.showSharing} toggle={props.handleSharingToggle}>
              <CertificateSharingForm
                emailSendingState={props.emailSendingState}
                handleSendCertificate={props.handleSendCertificate}
                handleSharingToggle={props.handleSharingToggle}
              />
            </Modal>
            <Modal show={props.showShareLink} toggle={props.handleShareLinkToggle}>
              <CertificateShareLinkFormContainer
                shareLink={props.shareLink}
                copiedLink={props.copiedLink}
                handleShareLinkToggle={props.handleShareLinkToggle}
                handleCopyLink={props.handleCopyLink}
              />
            </Modal>
          </section>
          <section>
            <ForwardedRefDecentralisedRenderer
              updateObfuscatedCertificate={props.updateObfuscatedCertificate}
              rawDocument={document}
              ref={childRef}
            />
          </section>
        </>
      }
    </ErrorBoundary>
  );
};

export const CertificateViewerContainer = connect(null, (dispatch) => ({
  updateObfuscatedCertificate: (updatedDoc: WrappedOrSignedOpenCertsDocument) =>
    dispatch(updateObfuscatedCertificateAction(updatedDoc)),
}))(CertificateViewer);
