import { VerificationFragment } from "@trustvc/trustvc";
import Router from "next/router";
import React, { Component, ReactNode } from "react";
import Dropzone, { DropEvent } from "react-dropzone";
import { connect } from "react-redux";
import { NETWORK_NAME } from "../../config";
import { RootState } from "../../reducers";
import {
  getCertificate,
  getCertificateByActionError,
  getVerificationError,
  getVerificationStatus,
  getVerifying,
} from "../../reducers/certificate.selectors";
import { resetCertificateState, updateCertificate } from "../../reducers/certificate.slice";
import { WrappedOrSignedOpenCertsDocument } from "../../shared";
import { CertificateVerificationStatus } from "./CertificateVerificationStatus";
import { collectCertificateFiles, readFirstFileText, selectCertificateFile } from "./collectCertificateFiles";

const DEMO_CERT = `/static/demo/${NETWORK_NAME}.opencert`;

interface CertificateDropZoneContainerProps {
  updateCertificate: (certificate: WrappedOrSignedOpenCertsDocument) => void;
  resetData: () => void;
  verifying: boolean;
  verificationStatus: VerificationFragment[] | null;
  verificationError: string | null;
  retrieveCertificateByActionError: string | null;
  document: WrappedOrSignedOpenCertsDocument | null;
}
interface CertificateDropZoneContainerState {
  fileError: boolean;
  ignoredFileName: string | null;
}

class CertificateDropZone extends Component<CertificateDropZoneContainerProps, CertificateDropZoneContainerState> {
  constructor(props: CertificateDropZoneContainerProps) {
    super(props);

    this.state = {
      fileError: false,
      ignoredFileName: null,
    };
    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleFileError = this.handleFileError.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount(): void {
    Router.prefetch("/viewer");
  }

  handleCertificateChange(certificate: WrappedOrSignedOpenCertsDocument): void {
    this.setState({ fileError: false });
    this.props.updateCertificate(certificate);
  }

  handleFileError(): void {
    this.setState({ fileError: true });
  }

  resetData(): void {
    this.setState({ fileError: false, ignoredFileName: null });
    this.props.resetData();
  }

  render(): ReactNode {
    const handleDrop = (acceptedFiles: File[]) => {
      const chosen = selectCertificateFile(acceptedFiles);
      if (!chosen) return;
      this.setState({ ignoredFileName: acceptedFiles.length > 1 ? chosen.name : null });
      readFirstFileText(acceptedFiles)
        .then((text) => {
          try {
            const json = JSON.parse(text);
            this.handleCertificateChange(json);
          } catch (_error) {
            this.handleFileError();
          }
        })
        .catch(() => {
          this.handleFileError();
        });
    };

    const myCustomFileGetter = (event: DropEvent): Promise<File[]> => collectCertificateFiles(event, DEMO_CERT);

    return (
      <Dropzone onDrop={handleDrop} getFilesFromEvent={(event) => myCustomFileGetter(event)}>
        {({ getRootProps, getInputProps, isDragAccept }) => (
          <div {...getRootProps()} id="certificate-dropzone" data-testid="certificate-dropzone">
            <input {...getInputProps()} />
            <CertificateVerificationStatus
              fileError={this.state.fileError}
              ignoredFileName={this.state.ignoredFileName}
              verifying={this.props.verifying}
              verificationStatus={this.props.verificationStatus}
              verificationError={this.props.verificationError}
              document={this.props.document}
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

export const CertificateDropZoneContainer = connect(
  (store: RootState) => ({
    retrieveCertificateByActionError: getCertificateByActionError(store),
    verifying: getVerifying(store),
    verificationStatus: getVerificationStatus(store),
    verificationError: getVerificationError(store),
    document: getCertificate(store),
  }),
  (dispatch) => ({
    updateCertificate: (payload: WrappedOrSignedOpenCertsDocument) => dispatch(updateCertificate(payload)),
    resetData: () => dispatch(resetCertificateState()),
  })
)(CertificateDropZone);
