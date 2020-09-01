import { v2, WrappedDocument } from "@govtechsg/open-attestation";
import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { NETWORK_NAME } from "../../config";
import { updateCertificate } from "../../reducers/certificate.actions";
import { analyticsEvent } from "../Analytics";
import { CertificateDropZoneContainer } from "../CertificateDropZone";
import css from "./dropZoneSection.module.scss";

const DEMO_CERT = `/static/demo/${NETWORK_NAME}.opencert`;

function demoCount(): void {
  analyticsEvent(window, {
    category: "USER_INTERACTION",
    action: "DEMO_CERTIFICATE_VIEWED",
  });
}

const DraggableDemoCertificate: React.FunctionComponent = () => (
  <div className="d-none d-lg-block">
    <div className="row">
      <div className="col">
        <div
          className={css.pulse}
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData(DEMO_CERT, "true")}
          onDragEnd={demoCount}
        >
          <a href={DEMO_CERT} download="demo.opencert" rel="noindex nofollow">
            <img style={{ cursor: "grabbing" }} src="/static/images/dropzone/cert.png" width="100%" />
          </a>
        </div>
      </div>
      <div className="col">
        <img src="/static/images/dropzone/arrow.png" width="100%" draggable="false" />
        <span
          style={{
            textAlign: "justify",
            color: "#ff9933",
          }}
        >
          Drag me over here to see a demo certificate and other features
        </span>
        <img src="/static/images/opencertslogo.svg" width="100%" draggable="false" />
      </div>
    </div>
  </div>
);

const MobileDemoCertificate: React.FunctionComponent = () => (
  <div className="d-block d-lg-none d-xl-none">
    <a
      className="btn btn-primary btn-lg"
      role="button"
      draggable="false"
      id="demoClick"
      style={{
        background: "#28a745",
        border: "none",
        cursor: "pointer",
      }}
      onClick={demoCount}
    >
      Click me for a demo certificate!
    </a>
  </div>
);

interface DropZoneSectionProps {
  updateCertificate: (certificate: WrappedDocument<v2.OpenAttestationDocument>) => void;
}
class DropZoneSection extends Component<DropZoneSectionProps> {
  constructor(props: DropZoneSectionProps) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(): void {
    const elementDrop = document.getElementById("demoDrop");
    if (elementDrop) {
      elementDrop.addEventListener("drop", this.handleDrop);
    }
    const elementClick = document.getElementById("demoClick");
    if (elementClick) {
      elementClick.addEventListener("click", this.handleClick);
    }
  }
  handleDrop(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.getData(DEMO_CERT)) {
      window
        .fetch(DEMO_CERT)
        .then((res) => res.json())
        .then((res) => {
          this.props.updateCertificate(res);
        });
    }
  }
  handleClick(): void {
    window
      .fetch(DEMO_CERT)
      .then((res) => res.json())
      .then((res) => {
        this.props.updateCertificate(res);
      });
  }

  componentWillUnmount(): void {
    const elementDrop = document.getElementById("demoDrop");
    if (elementDrop) {
      elementDrop.removeEventListener("drop", this.handleDrop);
    }
    const elementClick = document.getElementById("demoClick");
    if (elementClick) {
      elementClick.removeEventListener("click", this.handleClick);
    }
  }

  render(): ReactNode {
    return (
      <div className="row p-5 bg-brand-dark text-white">
        <div className={css.main}>
          <div className="col-lg-5 col-md-12">
            <div className={css.description}>
              <h1>An easy way to check and verify your certificates</h1>
              <p>
                Whether you&#39;re a student or an employer, OpenCerts lets you verify the certificates you have of
                anyone from any institution. All in one place.
              </p>
              <DraggableDemoCertificate />
              <MobileDemoCertificate />
            </div>
          </div>
          <div className="col-lg-7 col-md-12 col-sm-12" id="demoDrop">
            <CertificateDropZoneContainer />
          </div>
        </div>
      </div>
    );
  }
}

export const DropZoneSectionContainer = connect(null, (dispatch) => ({
  updateCertificate: (payload: WrappedDocument<v2.OpenAttestationDocument>) => dispatch(updateCertificate(payload)),
}))(DropZoneSection);
