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
  getVerificationStatus
} from "../../reducers/certificate";
import { updateNetworkId } from "../../reducers/application";
import CertificateDropZone from "./CertificateDropZone";

class CertificateDropZoneContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCertificateChange = this.handleCertificateChange.bind(this);
  }

  componentDidMount() {
    this.props.updateNetworkId();
    Router.prefetch("/viewer");
  }

  handleCertificateChange(certificate) {
    this.props.updateCertificate(certificate);
  }

  render() {
    return (
      <CertificateDropZone
        document={this.props.document}
        handleCertificateChange={this.handleCertificateChange}
        verifying={this.props.verifying}
        issuerIdentityStatus={this.props.issuerIdentityStatus}
        hashStatus={this.props.hashStatus}
        issuedStatus={this.props.issuedStatus}
        notRevokedStatus={this.props.notRevokedStatus}
        verificationStatus={this.props.verificationStatus}
      />
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
  verificationStatus: getVerificationStatus(store)
});

const mapDispatchToProps = dispatch => ({
  updateNetworkId: () => dispatch(updateNetworkId()),
  updateCertificate: payload => dispatch(updateCertificate(payload))
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
  verifying: PropTypes.bool,
  issuerIdentityStatus: PropTypes.object,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  verificationStatus: PropTypes.array
};
