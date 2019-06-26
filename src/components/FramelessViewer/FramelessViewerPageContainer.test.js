import React from "react";
import { shallow } from "enzyme";
import FramelessViewerPageContainer from "./FramelessViewerPageContainer";

jest.mock("./FramelessCertificateViewer", () => jest.fn());

// jest.mock("./utils", () => ({
//   inIframe: () => false
// }));

it("returns null if there are no document", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  expect(component.isEmptyRender()).toBe(true);
});

it("initialise window methods on mount", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  window.opencerts.renderCertificate("NEW_DOCUMENT");
  expect(component.state("document")).toBe("NEW_DOCUMENT");

  window.opencerts.selectTemplateTab(2);
  expect(component.state("activeTab")).toBe(2);
});

it("does not initialise connection to parent not in iframe on mount", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  expect(component.state("parentFrameConnection")).toBe(null);
});

it("sets document state when handleDocumentChange is called", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  component.instance().handleDocumentChange("DOCUMENT");
  expect(component.state("document")).toBe("DOCUMENT");
});

it("sets tabIndex state when selectTemplateTab is called", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  component.instance().selectTemplateTab(5);
  expect(component.state("activeTab")).toBe(5);
});

it("does not crash when updateParentTemplateTabs is called when not in iframe", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  component.instance().updateParentTemplates("TABS");
});

it("does not crash when updateParentHeight is called when not in iframe", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  component.instance().updateParentHeight(1);
});
