import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { certificateData } from "@govtechsg/open-certificate";
import {
  updateCertificate,
  getCertificate,
  getVerifying,
  getIssuerIdentityStatus,
  getHashStatus,
  getIssuedStatus,
  getNotRevokedStatus,
  getVerified,
  getRenderOverwrite
} from "../reducers/certificate";
import CertificateViewer from "./CertificateViewer";
import MainContent from "./MainPageContent";
import { updateNetworkId } from "../reducers/application";

class MainPageContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCertificateChange = this.handleCertificateChange.bind(this);
  }

  componentDidMount() {
    this.props.updateNetworkId();
  }

  handleCertificateChange(certificate) {
    this.props.updateCertificate(certificate);
  }

  renderCertificateViewer() {
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

  render() {
    const { verified, renderOverwrite } = this.props;
    const content =
      verified || renderOverwrite ? ( // && !this.props.verifying
        this.renderCertificateViewer()
      ) : (
        <MainContent />
      );

    return <div>{content}</div>;
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

  verified: getVerified(store),
  renderOverwrite: getRenderOverwrite(store)
});

const mapDispatchToProps = dispatch => ({
  updateNetworkId: () => dispatch(updateNetworkId()),
  updateCertificate: payload => dispatch(updateCertificate(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPageContainer);

MainPageContainer.propTypes = {
  updateNetworkId: PropTypes.func,
  updateCertificate: PropTypes.func,
  document: PropTypes.object,
  certificate: PropTypes.object,
  verifying: PropTypes.bool,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  issuerIdentityStatus: PropTypes.object,
  verified: PropTypes.bool,
  renderOverwrite: PropTypes.bool
};
