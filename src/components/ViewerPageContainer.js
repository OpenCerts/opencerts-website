import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Router from "next/router";
import copy from "clipboard-copy";
import { getData } from "@govtechsg/open-attestation";

import {
  updateCertificate,
  sendCertificate,
  sendCertificateReset,
  generateShareLink,
  getCertificate,
  getVerifying,
  getIssuerIdentityStatus,
  getHashStatus,
  getIssuedStatus,
  getNotRevokedStatus,
  getVerified,
  getEmailSendingState,
  getShareLink,
  getShareLinkState,
  updateObfuscatedCertificate
} from "../reducers/certificate";
import CertificateViewer from "./CertificateViewer";

class MainPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSharing: false,
      detailedVerifyVisible: false,
      copiedLink: false
    };
    this.toggleDetailedView = this.toggleDetailedView.bind(this);
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
      copiedLink: false
    });
  }

  handleCopyLink(certificateLink) {
    copy(certificateLink);
    this.setState({ copiedLink: true });
  }

  toggleDetailedView() {
    this.setState({
      detailedVerifyVisible: !this.state.detailedVerifyVisible
    });
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
      <CertificateViewer
        document={this.props.document}
        certificate={getData(this.props.document)}
        verifying={this.props.verifying}
        hashStatus={this.props.hashStatus}
        issuedStatus={this.props.issuedStatus}
        notRevokedStatus={this.props.notRevokedStatus}
        issuerIdentityStatus={this.props.issuerIdentityStatus}
        handleCertificateChange={this.handleCertificateChange}
        showSharing={this.state.showSharing}
        showShareLink={this.state.showShareLink}
        shareLink={this.props.shareLink}
        emailAddress={this.state.emailAddress}
        handleSendCertificate={this.handleSendCertificate}
        handleSharingToggle={this.handleSharingToggle}
        handleShareLinkToggle={this.handleShareLinkToggle}
        handleCopyLink={this.handleCopyLink}
        copiedLink={this.state.copiedLink}
        emailSendingState={this.props.emailSendingState}
        toggleDetailedView={this.toggleDetailedView}
        detailedVerifyVisible={this.state.detailedVerifyVisible}
      />
    );
  }
}

const mapStateToProps = store => ({
  document: getCertificate(store),

  // Verification statuses used in verifier block
  emailSendingState: getEmailSendingState(store),
  shareLink: getShareLink(store),
  shareLinkState: getShareLinkState(store),
  verifying: getVerifying(store),
  issuerIdentityStatus: getIssuerIdentityStatus(store),
  hashStatus: getHashStatus(store),
  issuedStatus: getIssuedStatus(store),
  notRevokedStatus: getNotRevokedStatus(store),
  verified: getVerified(store)
});

const mapDispatchToProps = dispatch => ({
  updateCertificate: payload => dispatch(updateCertificate(payload)),
  sendCertificate: payload => dispatch(sendCertificate(payload)),
  sendCertificateReset: () => dispatch(sendCertificateReset()),
  generateShareLink: () => dispatch(generateShareLink()),
  updateObfuscatedCertificate: updatedDoc =>
    dispatch(updateObfuscatedCertificate(updatedDoc))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPageContainer);

MainPageContainer.propTypes = {
  updateCertificate: PropTypes.func,
  document: PropTypes.object,
  certificate: PropTypes.object,
  verifying: PropTypes.bool,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  issuerIdentityStatus: PropTypes.object,
  verified: PropTypes.bool,
  emailSendingState: PropTypes.string,
  sendCertificate: PropTypes.func,
  sendCertificateReset: PropTypes.func,
  generateShareLink: PropTypes.func,
  shareLink: PropTypes.object,
  updateObfuscatedCertificate: PropTypes.func
};
