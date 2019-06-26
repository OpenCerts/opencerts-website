import React from "react";
import { mount } from "enzyme";
import FramelessCertificateViewer from "./FramelessCertificateViewer";

jest.mock("./FramelessViewerPageContainer.js", () => jest.fn());

jest.mock("../CertificateTemplates/", () => ({
  default: () => <div>Default</div>,
  custom: () => <div>Custom</div>
}));

it("renders default template if no other templates are specified", () => {
  const component = mount(<FramelessCertificateViewer />);
  expect(component.text()).toBe("Default");
});

it("renders default template if template key is not found", () => {
  const mockCertificate = { $template: "notFound" };
  const component = mount(
    <FramelessCertificateViewer certificate={mockCertificate} />
  );
  expect(component.text()).toBe("Default");
});

it("renders selected template if template key is found", () => {
  const mockCertificate = { $template: "custom" };
  const component = mount(
    <FramelessCertificateViewer certificate={mockCertificate} />
  );
  expect(component.text()).toBe("Custom");
});

it("props are passed correctly to SelectedTemplate", () => {
  const mockCertificate = { $template: "custom" };
  const mockUpdateParentCertificate = jest.fn();
  const mockUpdateParentHeight = jest.fn();
  const mockUpdateParentTemplates = jest.fn();

  const component = mount(
    <FramelessCertificateViewer
      certificate={mockCertificate}
      updateParentCertificate={mockUpdateParentCertificate}
      updateParentHeight={mockUpdateParentHeight}
      updateParentTemplates={mockUpdateParentTemplates}
    />
  );

  expect(component.children().prop("updateParentCertificate")).toEqual(
    mockUpdateParentCertificate
  );
  expect(component.children().prop("updateParentHeight")).toEqual(
    mockUpdateParentHeight
  );
  expect(component.children().prop("updateParentTemplates")).toEqual(
    mockUpdateParentTemplates
  );
});
