import React from "react";
import { mount } from "enzyme";
import FramelessCertificateViewer from "./FramelessCertificateViewer";
import templates from "../CertificateTemplates";

const SelectedTemplate = templates.default;
console.log("Selected", templates.default);

// jest.mock("./utils", () => ({
//   documentTemplates: jest.fn()
// }));

it("renders the right template depending on the tabIndex", () => {
  /* eslint-disable */
  SelectedTemplate.mockReturnValue([
    { template: ({ document }) => <div id="content">{document.foo}</div> },
    { template: ({ document }) => <div id="content">{document.cow}</div> }
  ]);
  /* eslint-enable */

  const document = { foo: "bar", cow: "moo" };
  const component = mount(
    <FramelessCertificateViewer
      activeTab={0}
      document={document}
      updateParentHeight={() => {}}
      updateParentTemplates={() => {}}
      updateParentCertificate={() => {}}
    />
  );
  // Check content from tab 1
  expect(component.find("#content").text()).toBe("bar");

  // Check content from tab 2
  component.setProps({ tabIndex: 1 });
  expect(component.find("#content").text()).toBe("moo");
});
