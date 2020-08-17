import { VerificationFragment } from "@govtechsg/oa-verify";
import { getData, v2, WrappedDocument } from "@govtechsg/open-attestation";
import copy from "clipboard-copy";
import Router from "next/router";
import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import {
  generateShareLink,
  sendCertificate,
  sendCertificateReset,
  updateCertificate,
  updateObfuscatedCertificate,
} from "../reducers/certificate.actions";
import {
  getCertificate,
  getEmailSendingState,
  getShareLink,
  getShareLinkState,
  getVerificationStatus,
  getVerifying,
} from "../reducers/certificate.selectors";
import { CertificateViewerContainer } from "./CertificateViewer";

interface ViewerProps {
  updateCertificate: (certificate: WrappedDocument<v2.OpenAttestationDocument>) => void;
  document: WrappedDocument<v2.OpenAttestationDocument> | null;
  verifying: boolean;
  verificationStatus: VerificationFragment[] | null;
  emailSendingState: string;
  sendCertificate: (event: { email: string; captcha: string }) => void;
  sendCertificateReset: () => void;
  generateShareLink: () => void;
  shareLink: { id?: string; key?: string };
  updateObfuscatedCertificate: (updatedDoc: WrappedDocument<v2.OpenAttestationDocument>) => void;
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
    if (!this.props.document) return null;
    return (
      <CertificateViewerContainer
        document={this.props.document}
        certificate={getData(this.props.document)}
        verifying={this.props.verifying}
        showSharing={this.state.showSharing}
        showShareLink={this.state.showShareLink}
        shareLink={this.props.shareLink}
        handleSendCertificate={this.handleSendCertificate}
        handleSharingToggle={this.handleSharingToggle}
        handleShareLinkToggle={this.handleShareLinkToggle}
        handleCopyLink={this.handleCopyLink}
        copiedLink={this.state.copiedLink}
        emailSendingState={this.props.emailSendingState}
        verificationStatus={this.props.verificationStatus}
      />
    );
  }
}

export const ViewerContainer = connect(
  (store: RootState) => ({
    document: getCertificate(store),

    // Verification statuses used in verifier block
    emailSendingState: getEmailSendingState(store),
    shareLink: getShareLink(store),
    shareLinkState: getShareLinkState(store),
    verifying: getVerifying(store),
    verificationStatus: getVerificationStatus(store),
  }),
  (dispatch) => ({
    updateCertificate: (payload: WrappedDocument<v2.OpenAttestationDocument>) => dispatch(updateCertificate(payload)),
    sendCertificate: (payload: { email: string; captcha: string }) => dispatch(sendCertificate(payload)),
    sendCertificateReset: () => dispatch(sendCertificateReset()),
    generateShareLink: () => dispatch(generateShareLink()),
    updateObfuscatedCertificate: (updatedDoc: WrappedDocument<v2.OpenAttestationDocument>) =>
      dispatch(updateObfuscatedCertificate(updatedDoc)),
  })
)(Viewer);
