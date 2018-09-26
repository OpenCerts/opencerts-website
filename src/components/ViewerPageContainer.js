import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Router from "next/router";
import { certificateData } from "@govtechsg/open-certificate";
import './main.scss'

import {
  updateCertificate,
  getCertificate,
  getVerifying,
  getIssuerIdentityStatus,
  getHashStatus,
  getIssuedStatus,
  getNotRevokedStatus,
  getVerified
} from "../reducers/certificate";
import CertificateViewer from "./CertificateViewer";

class MainPageContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCertificateChange = this.handleCertificateChange.bind(this);
  }

  componentDidMount() {
    const { document } = this.props;
    if (!document) {
      Router.replace("/");
    }
  }

  handleCertificateChange(certificate) {
    this.props.updateCertificate(certificate);
  }

  render() {
    if (!this.props.document) return null;
    return (
      <CertificateViewer
        document={this.props.document}
        certificate={certificateData(this.props.document)}
        verifying={this.props.verifying}
        hashStatus={this.props.hashStatus}
        issuedStatus={this.props.issuedStatus}
        notRevokedStatus={this.props.notRevokedStatus}
        issuerIdentityStatus={this.props.issuerIdentityStatus}
        handleCertificateChange={this.handleCertificateChange}
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

  verified: getVerified(store)
});

const mapDispatchToProps = dispatch => ({
  updateCertificate: payload => dispatch(updateCertificate(payload))
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
  verified: PropTypes.bool
};
