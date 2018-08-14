import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { certificateData } from "@govtechsg/open-certificate";
import {
  updateCertificate,
  verifyCertificate,
  getCertificate,
  getCertificateStore,
  getVerifying,
  getIssuerIdentityStatus,
  getHashStatus,
  getIssuedStatus,
  getNotRevokedStatus
} from "../reducers/certificate";
import CertificateViewer from "./CertificateViewer";
import MainContent from "./MainContent";
import { updateNetworkId } from "../reducers/application";

class MainPageContainer extends Component {
  constructor(props) {
    super(props);

    this.renderMainContent = this.renderMainContent.bind(this);
    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleCertificateVerify = this.handleCertificateVerify.bind(this);
  }

  componentWillMount() {
    this.props.updateNetworkId();
  }

  handleCertificateChange(certificate) {
    this.props.updateCertificate(certificate);
  }

  handleCertificateVerify() {
    const { certificate, certificateStore } = this.props;

    this.props.verifyCertificate({
      certificate,
      certificateStore
    });
  }

  renderMainContent() {
    return (
      <MainContent handleCertificateChange={this.handleCertificateChange} />
    );
  }

  renderCertificateViewer() {
    return (
      <CertificateViewer
        document={this.props.document}
        certificate={certificateData(this.props.document)}
        certificateStore={this.props.certificateStore}
        verifying={this.props.verifying}
        hashStatus={this.props.hashStatus}
        issuedStatus={this.props.issuedStatus}
        notRevokedStatus={this.props.notRevokedStatus}
        issuerIdentityStatus={this.props.issuerIdentityStatus}
        handleCertificateChange={this.handleCertificateChange}
        handleCertificateVerify={this.handleCertificateVerify}
      />
    );
  }

  render() {
    const content = this.props.document
      ? this.renderCertificateViewer()
      : this.renderMainContent();

    return <div>{content}</div>;
  }
}

const mapStateToProps = store => ({
  document: getCertificate(store),
  certificateStore: getCertificateStore(store),

  // Verification statuses used in verifier block
  verifying: getVerifying(store),
  issuerIdentityStatus: getIssuerIdentityStatus(store),
  hashStatus: getHashStatus(store),
  issuedStatus: getIssuedStatus(store),
  notRevokedStatus: getNotRevokedStatus(store)
});

const mapDispatchToProps = dispatch => ({
  updateNetworkId: () => dispatch(updateNetworkId()),
  updateCertificate: payload => dispatch(updateCertificate(payload)),
  verifyCertificate: payload => dispatch(verifyCertificate(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPageContainer);

MainPageContainer.propTypes = {
  updateNetworkId: PropTypes.func,
  updateCertificate: PropTypes.func,
  document: PropTypes.object,
  certificate: PropTypes.object,
  certificateStore: PropTypes.object,
  verifyCertificate: PropTypes.func,
  verifying: PropTypes.bool,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  issuerIdentityStatus: PropTypes.object
};
