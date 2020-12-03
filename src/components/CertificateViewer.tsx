import { VerificationFragment } from "@govtechsg/oa-verify";
import { WrappedDocument, v2 } from "@govtechsg/open-attestation";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { updateObfuscatedCertificate as updateObfuscatedCertificateAction } from "../reducers/certificate.actions";
import { CertificateShareLinkFormContainer } from "./CertificateShareLink/CertificateShareLinkForm";
import { CertificateVerifyBlock } from "./CertificateVerifyBlock";
import { ErrorBoundary } from "./ErrorBoundary";
import { FeatureFlagContainer } from "./FeatureFlag";
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
    rawDocument: WrappedDocument<v2.OpenAttestationDocument>;
    updateObfuscatedCertificate: (updatedDoc: WrappedDocument<v2.OpenAttestationDocument>) => void;
  }
>((props, ref) => <DecentralisedRenderer {...props} forwardedRef={ref} />);

interface StatusBannerProps {
  isInRegistry?: boolean;
}

const StatusBanner: React.FunctionComponent<StatusBannerProps> = ({ isInRegistry }: StatusBannerProps) => {
  return (
    <section
      id="status-banner-container"
      className={`${isInRegistry ? "bg-green-200 text-green-400" : "bg-gray-300 text-gray-800"} exact-print`}
    >
      <div className="container text-center py-4">
        {isInRegistry ? (
          <p className="mb-0">Certificate issuer is in the SkillsFuture Singapore registry for Opencerts.</p>
        ) : (
          <p className="mb-0">
            Certificate issuer is <b>not</b> in the SkillsFuture Singapore registry for Opencerts.
            <br />
            <Link href="/faq#verifications-issuers-not-in-registry-meaning">
              <a className="underline text-gray-800 hover:text-gray-600">
                <small>What does this mean ?</small>
              </a>
            </Link>
          </p>
        )}
      </div>
    </section>
  );
};

export interface CertificateViewerProps {
  document: WrappedDocument<v2.OpenAttestationDocument>;
  certificate: v2.OpenAttestationDocument;
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
  updateObfuscatedCertificate: (updatedDoc: WrappedDocument<v2.OpenAttestationDocument>) => void;
  handleCopyLink: (certificateLink: string) => void;
}
export const CertificateViewer: React.FunctionComponent<CertificateViewerProps> = (props) => {
  if (!props.verificationStatus) throw new Error("Verification status can't be null");
  const { document } = props;
  const childRef = React.useRef<{ print: () => void }>();

  const registryFragmentName = "OpencertsRegistryVerifier";
  const registryFragment = props.verificationStatus.find((status) => status.name === registryFragmentName);
  const isInRegistry = registryFragment && registryFragment.status === "VALID";

  return (
    <ErrorBoundary>
      {
        <>
          <StatusBanner isInRegistry={isInRegistry} />
          <section className="bg-blue-100 py-4">
            <div className="container">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2 xl:w-1/3">
                  <CertificateVerifyBlock verificationStatus={props.verificationStatus} document={props.document} />
                </div>
                <div className="w-full lg:w-1/2 xl:w-2/3">
                  <div className="flex flex-wrap">
                    <div className="w-auto lg:ml-auto">
                      <div
                        className="icon-utility"
                        id="btn-print"
                        onClick={() => {
                          if (childRef.current) childRef.current.print();
                        }}
                      >
                        <i className="fas fa-print text-md" />
                      </div>
                    </div>
                    <FeatureFlagContainer
                      name="SHARE_LINK"
                      render={() => (
                        <div className="ml-2 w-auto" onClick={() => props.handleShareLinkToggle()}>
                          <div className="icon-utility" id="btn-link">
                            <i className="fas fa-link text-md" />
                          </div>
                        </div>
                      )}
                    />
                    <div className="ml-2 w-auto" onClick={() => props.handleSharingToggle()}>
                      <div className="icon-utility" id="btn-email">
                        <i className="fas fa-envelope text-md" />
                      </div>
                    </div>
                    <div className="ml-2 w-auto">
                      <a
                        className="icon-utility"
                        download={`${props.certificate.id}.opencert`}
                        target="_black"
                        href={`data:text/json;,${encodeURIComponent(JSON.stringify(props.document, null, 2))}`}
                      >
                        <button id="btn-download" title="Download">
                          <i className="fas fa-file-download text-md" />
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
      }{" "}
    </ErrorBoundary>
  );
};

export const CertificateViewerContainer = connect(null, (dispatch) => ({
  updateObfuscatedCertificate: (updatedDoc: WrappedDocument<v2.OpenAttestationDocument>) =>
    dispatch(updateObfuscatedCertificateAction(updatedDoc)),
}))(CertificateViewer);
