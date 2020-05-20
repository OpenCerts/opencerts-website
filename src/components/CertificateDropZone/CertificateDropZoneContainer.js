import Router from "next/router";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import {
  getCertificateByActionError,
  getVerificationStatus,
  getVerifying,
  resetCertificateState,
  updateCertificate,
} from "../../reducers/certificate";
import CertificateVerificationStatus from "./CertificateVerificationStatus";

const onFileDrop = (acceptedFiles, handleCertificateChange, handleFileError) => {
  // eslint-disable-next-line no-undef
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const json = JSON.parse(reader.result);
      handleCertificateChange(json);
    } catch (e) {
      handleFileError(e);
    }
  };
  if (acceptedFiles && acceptedFiles.length && acceptedFiles.length > 0) acceptedFiles.map((f) => reader.readAsText(f));
};
class CertificateDropZoneContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileError: false,
    };
    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleFileError = this.handleFileError.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
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
        onDrop={(acceptedFiles) => onFileDrop(acceptedFiles, this.handleCertificateChange, this.handleFileError)}
      >
        {({ getRootProps, getInputProps, isDragAccept }) => (
          <div {...getRootProps()} className="h-100" id="certificate-dropzone">
            <input {...getInputProps()} />
            <CertificateVerificationStatus
              fileError={this.state.fileError}
              handleCertificateChange={this.handleCertificateChange}
              handleFileError={this.handleFileError}
              verifying={this.props.verifying}
              verificationStatus={this.props.verificationStatus}
              retrieveCertificateByActionError={this.props.retrieveCertificateByActionError}
              resetData={this.resetData.bind(this)}
              hover={isDragAccept}
            />
          </div>
        )}
      </Dropzone>
    );
  }
}

const mapStateToProps = (store) => ({
  retrieveCertificateByActionError: getCertificateByActionError(store),
  verifying: getVerifying(store),
  verificationStatus: getVerificationStatus(store),
});

const mapDispatchToProps = (dispatch) => ({
  updateCertificate: (payload) => dispatch(updateCertificate(payload)),
  resetData: () => dispatch(resetCertificateState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CertificateDropZoneContainer);

CertificateDropZoneContainer.propTypes = {
  document: PropTypes.object,
  encryptedCertificateStatus: PropTypes.string,
  handleCertificateChange: PropTypes.func,
  updateCertificate: PropTypes.func,
  resetData: PropTypes.func,
  verifying: PropTypes.bool,
  verificationStatus: PropTypes.array,
  retrieveCertificateByActionError: PropTypes.string,
};
