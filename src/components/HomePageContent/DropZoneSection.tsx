import { v2, WrappedDocument } from "@govtechsg/open-attestation";
import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { UAParser } from "ua-parser-js";
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
  simpleBrowserCheck: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any;
  browserName?: string;
  isNotdraggable?: boolean;
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
      simpleBrowserCheck: "",
      result: {},
      browserName: "",
      isNotdraggable: false,
    };
  }
  componentDidMount(): void {
    const simpleBrowserCheck = (function (agent) {
      switch (true) {
        case agent.indexOf("edge") > -1:
          return "edge";
        case agent.indexOf("edg/") > -1:
          return "chromium based edge (dev or canary)"; // Match also / to avoid matching for the older Edge
        case agent.indexOf("opr") > -1 && !!window.opr:
          return "opera";
        case agent.indexOf("chrome") > -1 && !!window.chrome:
          return "chrome";
        case agent.indexOf("trident") > -1:
          return "ie";
        case agent.indexOf("firefox") > -1:
          return "firefox";
        case agent.indexOf("safari") > -1:
          return "safari";
        default:
          return "other";
      }
    })(window.navigator.userAgent.toLowerCase());

    const parser = new UAParser();
    const isUnsupportedBrowsers = parser.getBrowser().name === "IE" || parser.getBrowser().name === "Edge";

    this.setState({
      simpleBrowserCheck: simpleBrowserCheck,
      result: parser.getResult(),
      browserName: parser.getBrowser().name,
      isNotdraggable: isUnsupportedBrowsers,
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
              <div>what browser name? {this.state.browserName}</div>
              <code className="break-words">{JSON.stringify(this.state.result)}</code>
              <br />
              <br />
              <div>simpleBrowserCheck: {this.state.simpleBrowserCheck}</div>
              <div className={`${this.state.isNotdraggable ? "block" : "lg:hidden"}`}>
                <ButtonDemoCertificate />
              </div>
              <div className={`${this.state.isNotdraggable ? "lg:hidden" : "hidden"} lg:block`}>
                <DraggableDemoCertificate />
              </div>
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
