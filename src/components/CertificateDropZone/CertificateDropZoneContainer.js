import React, { Component } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Dropzone from "react-dropzone";
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
  getEncryptedCertificateStatus,
  getStoreStatus
} from "../../reducers/certificate";
import { updateNetworkId } from "../../reducers/application";
import CertificateVerificationStatus from "./CertificateVerificationStatus";

const onFileDrop = (
  acceptedFiles,
  handleCertificateChange,
  handleFileError
) => {
  // eslint-disable-next-line no-undef
  const reader = new FileReader();
  if (reader.error) {
    handleFileError(reader.error);
  }
  reader.onload = () => {
    try {
      const json = JSON.parse(reader.result);
      handleCertificateChange(json);
    } catch (e) {
      handleFileError(e);
    }
  };
  if (acceptedFiles && acceptedFiles.length && acceptedFiles.length > 0)
    acceptedFiles.map(f => reader.readAsText(f));
};
class CertificateDropZoneContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileError: false
    };
    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleFileError = this.handleFileError.bind(this);
  }

  componentDidMount() {
    this.props.updateNetworkId();
    Router.prefetch("/viewer");
  }

  handleCertificateChange(certificate) {
    this.setState({ fileError: false });
    this.props.updateCertificate(certificate);
  }

  handleFileError() {
    this.setState({ fileError: true });
  }

  resetData() {
    this.props.resetData();
  }

  render() {
    return (
      <Dropzone
        id="certificate-dropzone"
        onDrop={acceptedFiles =>
          onFileDrop(
            acceptedFiles,
            this.handleCertificateChange,
            this.handleFileError
          )
        }
        className="h-100"
      >
        {props => (
          <CertificateVerificationStatus
            document={this.props.document}
            retrieveCertificateStatus={this.props.encryptedCertificateStatus}
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
            hover={props.isDragAccept}
          />
        )}
      </Dropzone>
    );
  }
}

const mapStateToProps = store => ({
  document: getCertificate(store),

  // Verification statuses used in verifier block
  encryptedCertificateStatus: getEncryptedCertificateStatus(store),
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
  resetData: () => dispatch(resetCertificateState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CertificateDropZoneContainer);

CertificateDropZoneContainer.propTypes = {
  updateNetworkId: PropTypes.func,
  document: PropTypes.object,
  encryptedCertificateStatus: PropTypes.string,
  handleCertificateChange: PropTypes.func,
  updateCertificate: PropTypes.func,
  resetData: PropTypes.func,
  verifying: PropTypes.bool,
  issuerIdentityStatus: PropTypes.object,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  verificationStatus: PropTypes.array,
  storeStatus: PropTypes.object
};
