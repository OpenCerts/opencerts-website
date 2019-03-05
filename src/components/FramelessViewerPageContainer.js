import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { certificateData, obfuscateFields } from "@govtechsg/open-certificate";

import {
  updateCertificate,
  sendCertificate,
  sendCertificateReset,
  getCertificate,
  getVerifying,
  getIssuerIdentityStatus,
  getHashStatus,
  getIssuedStatus,
  getNotRevokedStatus,
  getVerified,
  getEmailSendingState,
  updateObfuscatedCertificate
} from "../reducers/certificate";
import FramelessCertificateViewer from "./FramelessCertificateViewer";

class MainPageContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    // const { document } = this.props;
    // if (!document) {
    //   Router.replace("/");
    // }
  }


  handleChange(e) {
    this.props.updateCertificate(JSON.parse(e.target.value))
  }

  handleObfuscation(field) {
    const updatedDocument = obfuscateFields(this.props.document, field);
    this.props.updateObfuscatedCertificate(updatedDocument);
  }

  handleCertificateChange(certificate) {
    this.props.updateCertificate(certificate);
  }

  render() {
    if (!this.props.document) { return (
      <>
            <input id="certificateContentsString" onChange={this.handleChange} />
      </>
    ) };
    return (
      <FramelessCertificateViewer
        document={this.props.document}
        certificate={certificateData(this.props.document)}
      />
    );
  }
}

const mapStateToProps = store => ({
  document: getCertificate(store)
});

const mapDispatchToProps = dispatch => ({
  updateCertificate: payload => dispatch(updateCertificate(payload)),
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
  updateObfuscatedCertificate: PropTypes.func
};
