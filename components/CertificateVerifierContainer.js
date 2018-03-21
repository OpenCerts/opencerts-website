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
import CertificateDropzone from "./CertificateDropzone";
import CertificateViewer from "./CertificateViewer";
import CertificateVerifyBlock from "./CertificateVerifyBlock";
import { updateNetworkId } from "../reducers/application";

class CertificateVerifierContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false
    };

    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.renderCertificateViewer = this.renderCertificateViewer.bind(this);
    this.renderCertificateDropzone = this.renderCertificateDropzone.bind(this);
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


  
  renderCertificateDropzone() {
    return (
      <div>
        <h1>Certificate viewer and verifier</h1>
        <CertificateDropzone
          handleCertificateChange={this.handleCertificateChange}
        />
      </div>
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

  renderVerifyButton() {
    return (
      <CertificateVerifyBlock
        {...this.props}
        handleCertificateVerify={this.handleCertificateVerify}
      />
    );
  }

  render() {
    const verify = this.props.certificate ? this.renderVerifyButton() : null;

    const content = this.props.certificate
      ? this.renderCertificateViewer(verify)
      : this.renderCertificateDropzone();

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

export default connect(mapStateToProps, mapDispatchToProps)(
  CertificateVerifierContainer
);

CertificateVerifierContainer.propTypes = {
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
