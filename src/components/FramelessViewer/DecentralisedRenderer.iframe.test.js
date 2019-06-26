import React from "react";
import { shallow } from "enzyme";
import connectToParent from "penpal/lib/connectToParent";
import FramelessViewerPageContainer from "./FramelessViewerPageContainer";

const mockCertificateTemplates = [
  { id: "template1", label: "Template 1" },
  { id: "template2", label: "Template 2" }
];

const mockCertificate = { foo: "bar", cow: "moo" };

jest.mock("./FramelessCertificateViewer", () => jest.fn());
jest.mock("penpal/lib/connectToParent", () => jest.fn());

jest.mock("./utils", () => ({
  inIframe: () => true,
  formatTemplate: () => mockCertificateTemplates
}));

const mockParent = {
  updateHeight: jest.fn(),
  updateTemplates: jest.fn(),
  updateCertificate: jest.fn(),
  selectTemplateTab: jest.fn()
};

connectToParent.mockReturnValue({ promise: Promise.resolve(mockParent) });

const resetMocks = () => {
  connectToParent.mockClear();
  mockParent.updateHeight.mockClear();
  mockParent.updateTemplates.mockClear();
};

beforeEach(() => {
  resetMocks();
});

it("returns null if there are no document", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  expect(component.isEmptyRender()).toBe(true);
});

it("initialise and save connection to parent on mount to parentFrameConnection", () => {
  const component = shallow(<FramelessViewerPageContainer />);

  expect(connectToParent).toHaveBeenCalled();
  expect(
    connectToParent.mock.calls[0][0].methods.renderCertificate
  ).toBeTruthy();
  expect(
    connectToParent.mock.calls[0][0].methods.renderCertificate
  ).toBeTruthy();
  expect(component.state("parentFrameConnection")).toBeTruthy();
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

it("calls parent frame's updateCertificate when updateParentCertificate is called", async () => {
  const component = shallow(<FramelessViewerPageContainer />);
  resetMocks();
  await component.instance().updateParentCertificate(mockCertificate);
  expect(mockParent.updateCertificate).toHaveBeenCalledWith(mockCertificate);
});

it("calls parent frame's selectTemplateTab when selectTemplateTab is called", async () => {
  const component = shallow(<FramelessViewerPageContainer />);
  resetMocks();
  await component.instance().selectTemplateTab(1);
  expect(mockParent.selectTemplateTab).toHaveBeenCalledWith(1);
});
