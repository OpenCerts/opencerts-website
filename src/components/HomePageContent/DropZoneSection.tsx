import { v2, WrappedDocument } from "@govtechsg/open-attestation";
import Bowser from "bowser";
import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { NETWORK_NAME } from "../../config";
import { updateCertificate } from "../../reducers/certificate.actions";
import { analyticsEvent } from "../Analytics";
import { CertificateDropZoneContainer } from "../CertificateDropZone";

const DEMO_CERT = `/static/demo/${NETWORK_NAME}.opencert`;

function demoCount(): void {
  analyticsEvent(window, {
    category: "USER_INTERACTION",
    action: "DEMO_CERTIFICATE_VIEWED",
  });
}

const DraggableDemoCertificate: React.FunctionComponent = () => (
  <div className="flex flex-wrap py-12">
    <div className="w-1/2 lg:pr-8">
      <div
        className="animate-pulsing"
        draggable="true"
        onDragStart={(e) => e.dataTransfer.setData(DEMO_CERT, "true")}
        onDragEnd={demoCount}
      >
        <a href={DEMO_CERT} className="cursor-grab" download="demo.opencert" rel="noindex nofollow">
          <img src="/static/images/dropzone/cert.png" />
        </a>
      </div>
    </div>
    <div className="w-1/2">
      <img src="/static/images/dropzone/arrow.png" draggable="false" />
      <p className="text-orange mb-2">Drag me over here to see a demo certificate and other features</p>
      <img src="/static/images/opencertslogo.svg" draggable="false" />
    </div>
  </div>
);

const ButtonDemoCertificate: React.FunctionComponent = () => (
  <button
    className="button bg-green hover:bg-green-300 mx-auto my-8"
    role="button"
    draggable="false"
    id="demoClick"
    onClick={demoCount}
  >
    Click me for a demo certificate!
  </button>
);

type DropZoneSectionState = {
  isIeOrEdge?: boolean;
};

interface DropZoneSectionProps {
  updateCertificate: (certificate: WrappedDocument<v2.OpenAttestationDocument>) => void;
}
class DropZoneSection extends Component<DropZoneSectionProps, DropZoneSectionState> {
  constructor(props: DropZoneSectionProps) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isIeOrEdge: false,
    };
  }
  componentDidMount(): void {
    const browser = Bowser.getParser(window.navigator.userAgent);
    // https://github.com/lancedikson/bowser/blob/master/src/constants.js
    const isValidBrowser = browser.satisfies({
      windows: {
        ie: "~11",
        edge: "~84",
      },
    });
    this.setState({
      isIeOrEdge: isValidBrowser,
    });

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
      <section className="bg-navy text-white py-12">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3 lg:pr-10 text-center lg:text-left">
              <h1 className="font-montserrat mb-5">An easy way to check and verify your certificates</h1>
              <p>
                Whether you&#39;re a student or an employer, OpenCerts lets you verify the certificates you have of
                anyone from any institution. All in one place.
              </p>
              {this.state.isIeOrEdge ? (
                <ButtonDemoCertificate />
              ) : (
                <>
                  <div className="block lg:hidden">
                    <ButtonDemoCertificate />
                  </div>
                  <div className="hidden lg:block">
                    <DraggableDemoCertificate />
                  </div>
                </>
              )}
            </div>
            <div className="w-full lg:w-2/3 lg:pl-10" id="demoDrop">
              <CertificateDropZoneContainer />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export const DropZoneSectionContainer = connect(null, (dispatch) => ({
  updateCertificate: (payload: WrappedDocument<v2.OpenAttestationDocument>) => dispatch(updateCertificate(payload)),
}))(DropZoneSection);
