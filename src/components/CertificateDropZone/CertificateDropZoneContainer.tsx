import { VerificationFragment } from "@govtechsg/oa-verify";
import { WrappedDocument } from "@govtechsg/open-attestation";
import Router from "next/router";
import React, { Component, ReactNode } from "react";
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

interface CertificateDropZoneContainerProps {
  updateCertificate: (certificate: WrappedDocument) => void;
  resetData: () => void;
  verifying: boolean;
  verificationStatus: VerificationFragment[];
  retrieveCertificateByActionError: () => void;
}
interface CertificateDropZoneContainerState {
  fileError: boolean;
}

class CertificateDropZoneContainer extends Component<
  CertificateDropZoneContainerProps,
  CertificateDropZoneContainerState
> {
  constructor(props: CertificateDropZoneContainerProps) {
    super(props);

    this.state = {
      fileError: false,
    };
    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleFileError = this.handleFileError.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount(): void {
    Router.prefetch("/viewer");
  }

  handleCertificateChange(certificate: WrappedDocument): void {
    this.setState({ fileError: false });
    this.props.updateCertificate(certificate);
  }

  handleFileError(): void {
    this.setState({ fileError: true });
  }

  resetData(): void {
    this.props.resetData();
  }

  render(): ReactNode {
    return (
      <Dropzone
        onDrop={(acceptedFiles) => {
          // eslint-disable-next-line no-undef
          const reader = new FileReader();
          reader.onload = () => {
            try {
              // TODO enhance this
              const json = JSON.parse(reader.result as string);
              this.handleCertificateChange(json);
            } catch (e) {
              this.handleFileError();
            }
          };
          if (acceptedFiles && acceptedFiles.length && acceptedFiles.length > 0)
            acceptedFiles.map((f) => reader.readAsText(f));
        }}
      >
        {({ getRootProps, getInputProps, isDragAccept }) => (
          <div {...getRootProps()} className="h-100" id="certificate-dropzone">
            <input {...getInputProps()} />
            <CertificateVerificationStatus
              fileError={this.state.fileError}
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

export default connect(
  (store) => ({
    retrieveCertificateByActionError: getCertificateByActionError(store),
    verifying: getVerifying(store),
    verificationStatus: getVerificationStatus(store),
  }),
  (dispatch) => ({
    updateCertificate: (payload: WrappedDocument) => dispatch(updateCertificate(payload)),
    resetData: () => dispatch(resetCertificateState()),
  })
)(CertificateDropZoneContainer);
