import React from "react";
import { shallow } from "enzyme";
import connectToParent from "penpal/lib/connectToParent";
import FramelessViewerPageContainer from "../FramelessViewerPageContainer";

const mockCertificateTemplates = [
  { id: "template1", label: "Template 1" },
  { id: "template2", label: "Template 2" }
];

const mockField = "Change Template";

jest.mock("../FramelessCertificateViewer", () => jest.fn());
jest.mock("penpal/lib/connectToParent", () => jest.fn());

jest.mock("../utils", () => ({
  inIframe: () => true,
  formatTemplate: () => mockCertificateTemplates
}));

const mockParent = {
  updateHeight: jest.fn(),
  updateTemplates: jest.fn(),
  updateCertificate: jest.fn(),
  selectTemplateTab: jest.fn(),
  renderCertificate: jest.fn()
};

connectToParent.mockReturnValue({ promise: Promise.resolve(mockParent) });

const resetMocks = () => {
  connectToParent.mockClear();
  mockParent.updateHeight.mockClear();
  mockParent.updateTemplates.mockClear();
  mockParent.updateCertificate.mockClear();
};

beforeEach(() => {
  resetMocks();
});

it("returns input text when there is no certificate", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  expect(component.isEmptyRender()).toBe(false);
});

it("initialise and save connection to parent on mount to parentFrameConnection", () => {
  const component = shallow(<FramelessViewerPageContainer />);

  expect(connectToParent).toHaveBeenCalled();
  expect(component.state("parentFrameConnection")).toBeTruthy();
  expect(
    connectToParent.mock.calls[0][0].methods.renderCertificate
  ).toBeTruthy();
  expect(
    connectToParent.mock.calls[0][0].methods.selectTemplateTab
  ).toBeTruthy();
});

it("calls parent frame's updateHeight when updateParentHeight is called", async () => {
  const component = shallow(<FramelessViewerPageContainer />);
  resetMocks();
  await component.instance().updateParentHeight();
  expect(mockParent.updateHeight).toHaveBeenCalledWith(0);
});

it("calls parent frame's updateTemplates when updateParentTemplates is called", async () => {
  const component = shallow(<FramelessViewerPageContainer />);
  resetMocks();
  await component.instance().updateParentTemplates(mockCertificateTemplates);
  expect(mockParent.updateTemplates).toHaveBeenCalledWith(
    mockCertificateTemplates
  );
});

it("calls parent frame's updateCertificate when obfuscateField is called", async () => {
  const component = shallow(<FramelessViewerPageContainer />);
  resetMocks();
  await component.instance().obfuscateField(mockField);
  expect(mockParent.updateCertificate).toHaveBeenCalledWith(mockField);
});

it("calls parent frame's selectTemplateTab when selectTemplateTab is called", async () => {
  const component = shallow(<FramelessViewerPageContainer />);
  resetMocks();
  await component.instance().selectTemplateTab(1);
  expect(mockParent.selectTemplateTab).toHaveBeenCalledWith(1);
  expect(mockParent.updateHeight).toHaveBeenCalled();
});
