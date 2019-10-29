import React from "react";
import renderer from "react-test-renderer";
import Card from "./card";

describe("default card", () => {
  it("matches snapshot", () => {
    const fakeData = {
      id: "Test Id",
      name: "Test Name",
      description: "Test Description",
      website: "Test Website",
      email: "Test Email",
      phone: "Test Phone",
      key: "Test Key",
      logo: "Test Logo"
    };
    const component = renderer.create(<Card info={fakeData} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
