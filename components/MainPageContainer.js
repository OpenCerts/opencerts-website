import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateCertificate,
  verifyCertificate,
  getCertificate,
  getCertificateStore,
  getVerifyTriggered,
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
      <div>
        <a href="#" onClick={() => this.handleCertificateChange(null)}>
          ← Upload another
        </a>
        <CertificateViewer
          {...this.props}
          handleCertificateVerify={this.handleCertificateVerify}
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

  // Verification statuses used in verifier block
  verifyTriggered: getVerifyTriggered(store),
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
  certificate: PropTypes.object,
  certificateStore: PropTypes.object,
  verifyCertificate: PropTypes.func,
  verifyTriggered: PropTypes.bool,
  verifying: PropTypes.bool
};
