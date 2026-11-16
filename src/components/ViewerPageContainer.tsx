import { v2, VerificationFragment, WrappedDocument } from "@trustvc/trustvc";
import copy from "clipboard-copy";
import Link from "next/link";
import Router from "next/router";
import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import {
  getCertificate,
  getEmailSendingError,
  getEmailSendingState,
  getShareLink,
  getShareLinkState,
  getVerificationError,
  getVerificationStatus,
  getVerifying,
} from "../reducers/certificate.selectors";
import {
  generateShareLink,
  sendCertificate,
  sendCertificateReset,
  updateCertificate,
  updateObfuscatedCertificate,
} from "../reducers/certificate.slice";
import { WrappedOrSignedOpenCertsDocument } from "../shared";
import { opencertsGetData } from "../utils/utils";
import { CertificateViewerContainer } from "./CertificateViewer";

interface ViewerProps {
  updateCertificate: (certificate: WrappedOrSignedOpenCertsDocument) => void;
  document: WrappedOrSignedOpenCertsDocument | null;
  verifying: boolean;
  verificationStatus: VerificationFragment[] | null;
  verificationError: string | null;
  emailSendingState: string;
  emailSendingError: string | null;
  sendCertificate: (event: { email: string; captcha: string }) => void;
  sendCertificateReset: () => void;
  generateShareLink: () => void;
  shareLink: { id?: string; key?: string };
  updateObfuscatedCertificate: (updatedDoc: WrappedOrSignedOpenCertsDocument) => void;
}

interface ViewerState {
  showShareLink: boolean;
  showSharing: boolean;
  copiedLink: boolean;
}
class Viewer extends Component<ViewerProps, ViewerState> {
  constructor(props: ViewerProps) {
    super(props);

    this.state = {
      showSharing: false,
      copiedLink: false,
      showShareLink: false,
    };
    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleSharingToggle = this.handleSharingToggle.bind(this);
    this.handleShareLinkToggle = this.handleShareLinkToggle.bind(this);
    this.handleSendCertificate = this.handleSendCertificate.bind(this);
    this.handleCopyLink = this.handleCopyLink.bind(this);
  }

  componentDidMount(): void {
    const { document } = this.props;
    if (!document) {
      Router.replace("/");
    }
  }

  handleSharingToggle(): void {
    this.props.sendCertificateReset();
    this.setState({ showSharing: !this.state.showSharing });
  }

  handleShareLinkToggle(): void {
    if (!this.state.showShareLink) {
      this.props.generateShareLink();
    }
    this.setState({
      showShareLink: !this.state.showShareLink,
      copiedLink: false,
    });
  }

  handleCopyLink(certificateLink: string): void {
    copy(certificateLink);
    this.setState({ copiedLink: true });
  }

  handleCertificateChange(certificate: WrappedDocument<v2.OpenAttestationDocument>): void {
    this.props.updateCertificate(certificate);
  }

  handleSendCertificate({ email, captcha }: { email: string; captcha: string }): void {
    this.props.sendCertificate({ email, captcha });
  }

  render(): ReactNode {
    const { document, verificationStatus, verificationError, verifying } = this.props;
    if (!document) return null;
    // verificationStatus stays null until the saga finishes, and a newer drop clears it
    // again. Rendering the viewer in that gap used to throw and hit the Next.js error page.
    if (!verificationStatus) {
      if (verificationError && !verifying) {
        return (
          <div className="container py-16 text-center" data-testid="verification-failed">
            <h2 className="font-bold text-orange mb-2">This certificate could not be verified</h2>
            <p className="mb-8 break-words">{verificationError}</p>
            <Link legacyBehavior href="/">
              <a className="button bg-navy">Go Back</a>
            </Link>
          </div>
        );
      }
      return (
        <div className="container text-blue text-center py-16" data-testid="verifying-certificate">
          <i className="fas fa-spinner fa-pulse fa-3x" />
          <div className="my-3">Verifying Certificate...</div>
        </div>
      );
    }
    return (
      <CertificateViewerContainer
        document={document}
        certificate={opencertsGetData(document)}
        verifying={verifying}
        showSharing={this.state.showSharing}
        showShareLink={this.state.showShareLink}
        shareLink={this.props.shareLink}
        handleSendCertificate={this.handleSendCertificate}
        handleSharingToggle={this.handleSharingToggle}
        handleShareLinkToggle={this.handleShareLinkToggle}
        handleCopyLink={this.handleCopyLink}
        copiedLink={this.state.copiedLink}
        emailSendingState={this.props.emailSendingState}
        emailSendingError={this.props.emailSendingError}
        verificationStatus={verificationStatus}
      />
    );
  }
}

export const ViewerContainer = connect(
  (store: RootState) => ({
    document: getCertificate(store),

    // Verification statuses used in verifier block
    emailSendingState: getEmailSendingState(store),
    emailSendingError: getEmailSendingError(store),
    shareLink: getShareLink(store),
    shareLinkState: getShareLinkState(store),
    verifying: getVerifying(store),
    verificationStatus: getVerificationStatus(store),
    verificationError: getVerificationError(store),
  }),
  (dispatch) => ({
    updateCertificate: (payload: WrappedOrSignedOpenCertsDocument) => dispatch(updateCertificate(payload)),
    sendCertificate: (payload: { email: string; captcha: string }) => dispatch(sendCertificate(payload)),
    sendCertificateReset: () => dispatch(sendCertificateReset()),
    generateShareLink: () => dispatch(generateShareLink()),
    updateObfuscatedCertificate: (updatedDoc: WrappedOrSignedOpenCertsDocument) =>
      dispatch(updateObfuscatedCertificate(updatedDoc)),
  })
)(Viewer);
