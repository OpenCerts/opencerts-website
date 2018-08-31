import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateCertificate,
  renderOverwrite,
  getCertificate,
  getVerifying,
  getIssuerIdentityStatus,
  getHashStatus,
  getIssuedStatus,
  getNotRevokedStatus
} from "../../reducers/certificate";
import CertificateDropZone from "./CertificateDropZone";

class CertificateDropZoneContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleRenderOverwrite = this.handleRenderOverwrite.bind(this);
  }

  handleRenderOverwrite() {
    this.props.renderOverwrite();
  }

  handleCertificateChange(certificate) {
    this.props.updateCertificate(certificate);
  }

  render() {
    return (
      <CertificateDropZone
        document={this.props.document}
        handleCertificateChange={this.handleCertificateChange}
        handleRenderOverwrite={this.handleRenderOverwrite}
        verifying={this.props.verifying}
        issuerIdentityStatus={this.props.issuerIdentityStatus}
        hashStatus={this.props.hashStatus}
        issuedStatus={this.props.issuedStatus}
        notRevokedStatus={this.props.notRevokedStatus}
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
  notRevokedStatus: getNotRevokedStatus(store)
});

const mapDispatchToProps = dispatch => ({
  updateCertificate: payload => dispatch(updateCertificate(payload)),
  renderOverwrite: () => dispatch(renderOverwrite())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CertificateDropZoneContainer);

CertificateDropZoneContainer.propTypes = {
  document: PropTypes.object,
  handleCertificateChange: PropTypes.func,
  updateCertificate: PropTypes.func,
  renderOverwrite: PropTypes.func,
  verifying: PropTypes.bool,
  issuerIdentityStatus: PropTypes.object,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object
};
