import Router from "next/router";
import { shallow } from "enzyme";
import { CertificateDropZoneContainer } from "./CertificateDropZoneContainer";
import QrReader from "../QrReader";
import CertificateDropZone from "./CertificateDropZone";

// Prevent Router.prefetch from throwing;
jest.mock("next/router");

describe("CertificateDropZoneContainer", () => {
  it("runs updateNetworkId and prefetch on mount", () => {
    const updateNetworkId = jest.fn();
    shallow(<CertificateDropZoneContainer updateNetworkId={updateNetworkId} />);
    expect(Router.prefetch).toHaveBeenCalledTimes(1);
    expect(updateNetworkId).toHaveBeenCalledTimes(1);
    expect(Router.prefetch.mock.calls).toEqual([["/viewer"]]);
  });

  it("toggles qrReaderVisible when toggleQrReaderVisible is called", () => {
    const wrapper = shallow(
      <CertificateDropZoneContainer updateNetworkId={() => {}} />
    );
    expect(wrapper.state().qrReaderVisible).toBe(false);
    wrapper.instance().toggleQrReaderVisible();
    expect(wrapper.state().qrReaderVisible).toBe(true);
    wrapper.instance().toggleQrReaderVisible();
    expect(wrapper.state().qrReaderVisible).toBe(false);
  });

  it("shows QrReader when qrReaderVisible is true", () => {
    const wrapper = shallow(
      <CertificateDropZoneContainer updateNetworkId={() => {}} />
    );
    wrapper.instance().toggleQrReaderVisible();
    expect(wrapper.state().qrReaderVisible).toBe(true);
    expect(wrapper.find(QrReader).length).toBe(1);
    expect(wrapper.find(CertificateDropZone).length).toBe(0);
  });

  it("shows CertificateDropZone when qrReaderVisible is false", () => {
    const wrapper = shallow(
      <CertificateDropZoneContainer updateNetworkId={() => {}} />
    );
    expect(wrapper.state().qrReaderVisible).toBe(false);
    expect(wrapper.find(QrReader).length).toBe(0);
    expect(wrapper.find(CertificateDropZone).length).toBe(1);
  });

  it("dispatches processQr and set turn off QrReader when a code is scanned", () => {
    const processQr = jest.fn();
    const wrapper = shallow(
      <CertificateDropZoneContainer
        updateNetworkId={() => {}}
        processQr={processQr}
      />
    );
    wrapper.instance().toggleQrReaderVisible();
    wrapper.instance().handleQrScanned("SOME_QR_DATA");
    expect(processQr.mock.calls).toEqual([["SOME_QR_DATA"]]);
    expect(wrapper.state().qrReaderVisible).toBe(false);
  });

  it("dispatches updateCertificate and unset fileError when new certificate is presented", () => {
    const updateCertificate = jest.fn();
    const wrapper = shallow(
      <CertificateDropZoneContainer
        updateNetworkId={() => {}}
        updateCertificate={updateCertificate}
      />
    );
    wrapper.setState({ fileError: true });
    wrapper.instance().handleCertificateChange("SOME_DOCUMENT_DATA");
    expect(updateCertificate.mock.calls).toEqual([["SOME_DOCUMENT_DATA"]]);
    expect(wrapper.state().fileError).toBe(false);
  });
});
