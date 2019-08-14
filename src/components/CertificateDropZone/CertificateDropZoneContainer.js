import React, { Component } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { connect } from "react-redux";
import {
  updateCertificate,
  getCertificate,
  getVerifying,
  getIssuerIdentityStatus,
  getHashStatus,
  getIssuedStatus,
  getNotRevokedStatus,
  getVerificationStatus,
  resetCertificateState,
  getStoreStatus,
  processQrCode
} from "../../reducers/certificate";
import { updateNetworkId } from "../../reducers/application";
import CertificateDropZone from "./CertificateDropZone";
import QrReader from "../QrReader";

class CertificateDropZoneContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileError: false,
      qrReaderVisible: false
    };
    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleFileError = this.handleFileError.bind(this);
    this.toggleQrReaderVisible = this.toggleQrReaderVisible.bind(this);
    this.handleQrScanned = this.handleQrScanned.bind(this);
  }

  componentDidMount() {
    this.props.updateNetworkId();
    Router.prefetch("/viewer");
  }

  handleQrScanned(data) {
    this.props.processQr(data);
    this.setState({ qrReaderVisible: false });
  }

  handleCertificateChange(certificate) {
    this.setState({ fileError: false });
    this.props.updateCertificate(certificate);
  }

  handleFileError() {
    this.setState({ fileError: true });
  }

  toggleQrReaderVisible() {
    this.setState({ qrReaderVisible: !this.state.qrReaderVisible });
  }

  resetData() {
    this.props.resetData();
  }

  render() {
    return this.state.qrReaderVisible ? (
      <>
        <QrReader handleQrScanned={this.handleQrScanned} />
        <div onClick={this.toggleQrReaderVisible}>Disable</div>
      </>
    ) : (
      <>
        <CertificateDropZone
          document={this.props.document}
          fileError={this.state.fileError}
          handleCertificateChange={this.handleCertificateChange}
          handleFileError={this.handleFileError}
          verifying={this.props.verifying}
          issuerIdentityStatus={this.props.issuerIdentityStatus}
          hashStatus={this.props.hashStatus}
          issuedStatus={this.props.issuedStatus}
          notRevokedStatus={this.props.notRevokedStatus}
          verificationStatus={this.props.verificationStatus}
          resetData={this.resetData.bind(this)}
          storeStatus={this.props.storeStatus}
        />
        <div onClick={this.toggleQrReaderVisible}>Enable</div>
      </>
    );
  }
}

const mapStateToProps = store => ({
  document: getCertificate(store),

  // Verification statuses used in verifier block
  verifying: getVerifying(store),
  issuerIdentityStatus: getIssuerIdentityStatus(store),
  hashStatus: getHashStatus(store),
  issuedStatus: getIssuedStatus(store),
  notRevokedStatus: getNotRevokedStatus(store),
  verificationStatus: getVerificationStatus(store),
  storeStatus: getStoreStatus(store)
});

const mapDispatchToProps = dispatch => ({
  updateNetworkId: () => dispatch(updateNetworkId()),
  updateCertificate: payload => dispatch(updateCertificate(payload)),
  resetData: () => dispatch(resetCertificateState()),
  processQr: payload => dispatch(processQrCode(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CertificateDropZoneContainer);

CertificateDropZoneContainer.propTypes = {
  updateNetworkId: PropTypes.func,
  document: PropTypes.object,
  handleCertificateChange: PropTypes.func,
  updateCertificate: PropTypes.func,
  resetData: PropTypes.func,
  verifying: PropTypes.bool,
  issuerIdentityStatus: PropTypes.object,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  verificationStatus: PropTypes.array,
  storeStatus: PropTypes.object,
  processQr: PropTypes.func
};
