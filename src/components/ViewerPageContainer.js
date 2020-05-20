import { getData } from "@govtechsg/open-attestation";
import copy from "clipboard-copy";
import Router from "next/router";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateCertificate,
  sendCertificate,
  sendCertificateReset,
  generateShareLink,
  getCertificate,
  getVerifying,
  getEmailSendingState,
  getVerificationStatus,
  getShareLink,
  getShareLinkState,
  updateObfuscatedCertificate,
} from "../reducers/certificate";
import { CertificateViewerContainer } from "./CertificateViewer";

class Viewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSharing: false,
      copiedLink: false,
    };
    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleSharingToggle = this.handleSharingToggle.bind(this);
    this.handleShareLinkToggle = this.handleShareLinkToggle.bind(this);
    this.handleSendCertificate = this.handleSendCertificate.bind(this);
    this.handleCopyLink = this.handleCopyLink.bind(this);
  }

  componentDidMount() {
    const { document } = this.props;
    if (!document) {
      Router.replace("/");
    }
  }

  handleSharingToggle() {
    this.props.sendCertificateReset();
    this.setState({ showSharing: !this.state.showSharing });
  }

  handleShareLinkToggle() {
    if (!this.state.showShareLink) {
      this.props.generateShareLink();
    }
    this.setState({
      showShareLink: !this.state.showShareLink,
      copiedLink: false,
    });
  }

  handleCopyLink(certificateLink) {
    copy(certificateLink);
    this.setState({ copiedLink: true });
  }

  handleCertificateChange(certificate) {
    this.props.updateCertificate(certificate);
  }

  handleSendCertificate({ email, captcha }) {
    this.props.sendCertificate({ email, captcha });
  }

  render() {
    if (!this.props.document) return null;
    return (
      <CertificateViewerContainer
        document={this.props.document}
        certificate={getData(this.props.document)}
        verifying={this.props.verifying}
        handleCertificateChange={this.handleCertificateChange}
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

const mapStateToProps = (store) => ({
  document: getCertificate(store),

  // Verification statuses used in verifier block
  emailSendingState: getEmailSendingState(store),
  shareLink: getShareLink(store),
  shareLinkState: getShareLinkState(store),
  verifying: getVerifying(store),
  verificationStatus: getVerificationStatus(store),
});

const mapDispatchToProps = (dispatch) => ({
  updateCertificate: (payload) => dispatch(updateCertificate(payload)),
  sendCertificate: (payload) => dispatch(sendCertificate(payload)),
  sendCertificateReset: () => dispatch(sendCertificateReset()),
  generateShareLink: () => dispatch(generateShareLink()),
  updateObfuscatedCertificate: (updatedDoc) => dispatch(updateObfuscatedCertificate(updatedDoc)),
});

export const ViewerContainer = connect(mapStateToProps, mapDispatchToProps)(Viewer);

Viewer.propTypes = {
  updateCertificate: PropTypes.func,
  document: PropTypes.object,
  certificate: PropTypes.object,
  verifying: PropTypes.bool,
  verificationStatus: PropTypes.array,
  emailSendingState: PropTypes.string,
  sendCertificate: PropTypes.func,
  sendCertificateReset: PropTypes.func,
  generateShareLink: PropTypes.func,
  shareLink: PropTypes.object,
  updateObfuscatedCertificate: PropTypes.func,
};
