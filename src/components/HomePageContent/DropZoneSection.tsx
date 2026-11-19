import { captureException } from "@sentry/nextjs";
import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { NETWORK_NAME } from "../../config";
import { RootState } from "../../reducers";
import { getVerifying } from "../../reducers/certificate.selectors";
import { setIgnoredCertificateFile, updateCertificate } from "../../reducers/certificate.slice";
import { WrappedOrSignedOpenCertsDocument } from "../../shared";
import { CertificateDropZoneContainer } from "../CertificateDropZone";

const DEMO_CERT = `/static/demo/${NETWORK_NAME}.opencert`;

const DraggableDemoCertificate: React.FunctionComponent = () => (
  <div className="hidden lg:block">
    <div className="flex flex-wrap py-12">
      <div className="w-1/2 lg:pr-8">
        <div
          className="animate-pulsing"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData(DEMO_CERT, "true")}
        >
          <a
            href={DEMO_CERT}
            className="cursor-grab"
            download="demo.opencert"
            rel="noindex nofollow"
            title="Demo certificate"
          >
            <img src="/static/images/dropzone/cert.png" alt="drag and drop demo certificate" />
          </a>
        </div>
      </div>
      <div className="w-1/2">
        <img src="/static/images/dropzone/arrow.png" draggable="false" alt="instructional arrow" />
        <p className="text-orange mb-2">Drag me over here to see a demo certificate and other features</p>
        <img src="/static/images/opencertslogo.svg" draggable="false" alt="opencerts logo" />
      </div>
    </div>
  </div>
);

const MobileDemoCertificate: React.FunctionComponent<{ disabled: boolean; onClick: () => void }> = ({
  disabled,
  onClick,
}) => (
  <button
    className="button bg-green hover:bg-green-300 mx-auto my-8 block lg:hidden"
    role="button"
    draggable="false"
    id="demoClick"
    disabled={disabled}
    onClick={onClick}
  >
    Click me for a demo certificate!
  </button>
);

interface DropZoneSectionProps {
  updateCertificate: (certificate: WrappedOrSignedOpenCertsDocument) => void;
  clearIgnoredCertificateFile: () => void;
  verifying: boolean;
}
class DropZoneSection extends Component<DropZoneSectionProps> {
  constructor(props: DropZoneSectionProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(): void {
    if (this.props.verifying) return;
    this.props.clearIgnoredCertificateFile();
    window
      .fetch(DEMO_CERT)
      .then((res) => res.json())
      .then((res) => {
        this.props.updateCertificate(res);
      })
      .catch((e) => captureException(e, { tags: { area: "demoCert" } }));
  }

  render(): ReactNode {
    return (
      <section className="bg-navy text-white py-12">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3 lg:pr-10 text-center lg:text-left">
              <h1 className="font-poppins mb-5">An easy way to check and verify your OpenCerts certificates</h1>
              <p>Whether you are a student or an employer, verify any OpenCerts certificate here.</p>
              <DraggableDemoCertificate />
              <MobileDemoCertificate disabled={this.props.verifying} onClick={this.handleClick} />
            </div>
            <div className="w-full lg:w-2/3 lg:pl-10" id="demoDrop" data-testid="demo-drop">
              <CertificateDropZoneContainer />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export const DropZoneSectionContainer = connect(
  (store: RootState) => ({
    verifying: getVerifying(store),
  }),
  (dispatch) => ({
    updateCertificate: (payload: WrappedOrSignedOpenCertsDocument) => dispatch(updateCertificate(payload)),
    clearIgnoredCertificateFile: () => dispatch(setIgnoredCertificateFile(null)),
  })
)(DropZoneSection);
