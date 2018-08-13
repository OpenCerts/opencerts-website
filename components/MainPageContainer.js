import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Certificate } from "@govtechsg/open-certificate";
import {
  updateCertificate,
  verifyCertificate,
  getCertificate,
  getCertificateStore,
  getCertificateRoot,
  getContractStoreAddress,
  getVerifyTriggered,
  getVerifying,
  getHashVerified,
  getIssued,
  getIsIssuerVerified,
  getNotRevoked,
  getHashError,
  getIssuedError,
  getNotRevokedError,
  getIssuerError,
  updateFilteredCertificate,
  getCertificateHashVerifying,
  getCertificateIssuedVerifying,
  getCertificateNotRevokedVerifying,
  getCertificateIssuerVerifying,
  getIssuerIdentity
} from "../reducers/certificate";
import CertificateViewer from "./CertificateViewer";
import MainContent from "./MainContent";
import { updateNetworkId } from "../reducers/application";

class MainPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false
    };

    this.renderMainContent = this.renderMainContent.bind(this);
    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleCertificateVerify = this.handleCertificateVerify.bind(this);
    this.handleToggleEditable = this.handleToggleEditable.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentWillMount() {
    this.props.updateNetworkId();
  }

  handleToggleEditable() {
    this.setState({
      editable: !this.state.editable
    });
  }

  handleFilter(path) {
    const currentCertificate = new Certificate(this.props.certificate);
    const { certificate } = currentCertificate.privacyFilter(path);
    this.props.updateFilteredCertificate({ certificate });
  }

  handleCertificateChange(certificate) {
    this.props.updateCertificate(certificate);
  }

  handleCertificateVerify() {
    const { certificate, certificateStore, issuers } = this.props;

    this.props.verifyCertificate({
      certificate,
      certificateStore,
      issuers
    });
  }

  renderMainContent() {
    return (
      <MainContent handleCertificateChange={this.handleCertificateChange} />
    );
  }

  renderCertificateViewer(verify) {
    return (
      <div>
        <a href="#" onClick={() => this.handleCertificateChange(null)}>
          ← Upload another
        </a>
        <CertificateViewer
          certificate={this.props.certificate}
          verify={verify}
          editable={this.state.editable}
          handleFilter={this.handleFilter}
          toggleEditable={this.handleToggleEditable}
        />
      </div>
    );
  }

  render() {
    const content = this.props.certificate
      ? this.renderCertificateViewer()
      : this.renderMainContent();

    return <div>{content}</div>;
  }
}

const mapStateToProps = store => ({
  certificate: getCertificate(store),
  certificateStore: getCertificateStore(store),
  merkleRoot: getCertificateRoot(store),
  contractStoreAddress: getContractStoreAddress(store),
  verifyTriggered: getVerifyTriggered(store),
  verifying: getVerifying(store),
  isHashVerified: getHashVerified(store),
  isIssued: getIssued(store),
  isNotRevoked: getNotRevoked(store),
  isIssuerVerified: getIsIssuerVerified(store),
  hashError: getHashError(store),
  storeError: getIssuedError(store),
  revokedError: getNotRevokedError(store),
  issuerError: getIssuerError(store),
  issuerIdentity: getIssuerIdentity(store),
  certificateHashVerifying: getCertificateHashVerifying(store),
  certificateIssuedVerifying: getCertificateIssuedVerifying(store),
  certificateNotRevokedVerifying: getCertificateNotRevokedVerifying(store),
  certificateIssuerVerifying: getCertificateIssuerVerifying(store)
});

const mapDispatchToProps = dispatch => ({
  updateNetworkId: () => dispatch(updateNetworkId()),
  updateCertificate: payload => dispatch(updateCertificate(payload)),
  verifyCertificate: payload => dispatch(verifyCertificate(payload)),
  updateFilteredCertificate: payload =>
    dispatch(updateFilteredCertificate(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPageContainer);

MainPageContainer.propTypes = {
  updateNetworkId: PropTypes.func,
  updateFilteredCertificate: PropTypes.func,
  updateCertificate: PropTypes.func,
  certificate: PropTypes.object,
  certificateStore: PropTypes.object,
  verifyCertificate: PropTypes.func,
  verifyTriggered: PropTypes.bool,
  verifying: PropTypes.bool,
  issuers: PropTypes.object,
  isIssuerVerified: PropTypes.bool,
  isHashVerified: PropTypes.bool,
  isIssued: PropTypes.bool,
  isNotRevoked: PropTypes.bool,
  hashError: PropTypes.string,
  storeError: PropTypes.string,
  revokedError: PropTypes.string,
  issuerError: PropTypes.string,
  certificateHashVerifying: PropTypes.bool,
  certificateIssuedVerifying: PropTypes.bool,
  certificateNotRevokedVerifying: PropTypes.bool,
  certificateIssuerVerifying: PropTypes.bool,
  issuerIdentity: PropTypes.string
};
