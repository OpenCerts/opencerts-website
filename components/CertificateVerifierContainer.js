import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
  getNotRevoked,
  getHashError,
  getIssuedError,
  getNotRevokedError
} from "../reducers/certificate";
import CertificateDropzone from "./CertificateDropzone";
import CertificateViewer from "./CertificateViewer";
import CertificateVerifyBlock from "./CertificateVerifyBlock";

class CertificateVerifierContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.renderCertificateViewer = this.renderCertificateViewer.bind(this);
    this.renderCertificateDropzone = this.renderCertificateDropzone.bind(this);
    this.handleCertificateVerify = this.handleCertificateVerify.bind(this);
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
        />
      </div>
    );
  }

  renderVerifyButton() {
    const {
      certificateStore,
      verifyTriggered,
      verifying,
      isHashVerified,
      isIssued,
      isNotRevoked,
      hashError,
      storeError,
      revokedError
    } = this.props;

    return (
      <CertificateVerifyBlock
        certificateStore={certificateStore}
        handleCertificateVerify={this.handleCertificateVerify}
        verifyTriggered={verifyTriggered}
        verifying={verifying}
        isHashVerified={isHashVerified}
        isIssued={isIssued}
        isNotRevoked={isNotRevoked}
        hashError={hashError}
        storeError={storeError}
        revokedError={revokedError}
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
  hashError: getHashError(store),
  storeError: getIssuedError(store),
  revokedError: getNotRevokedError(store)
});

const mapDispatchToProps = dispatch => ({
  updateCertificate: payload => dispatch(updateCertificate(payload)),
  verifyCertificate: payload => dispatch(verifyCertificate(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CertificateVerifierContainer
);

CertificateVerifierContainer.propTypes = {
  updateCertificate: PropTypes.func,
  certificate: PropTypes.object,
  certificateStore: PropTypes.object,
  verifyCertificate: PropTypes.func,
  verifyTriggered: PropTypes.bool,
  verifying: PropTypes.bool,
  isHashVerified: PropTypes.bool,
  isIssued: PropTypes.bool,
  isNotRevoked: PropTypes.bool,
  hashError: PropTypes.string,
  storeError: PropTypes.string,
  revokedError: PropTypes.string
};
