import { render, screen } from "@testing-library/react";
import React from "react";
import { RegistryCard } from "./RegistryCard";

describe("registryCard", () => {
  it("should render with first contact info as main institute + number of contact infos correctly", () => {
    const logoSrc = "/static/images/GOVTECH_logo.png";
    const name = "Government Technology Agency of Singapore (GovTech)";
    const contact = [
      {
        id: "govtech-registry",
        website: "https://www.tech.gov.sg",
        name: name,
        address: "0x007d40224f6562461633ccfbaffd359ebb2fc9ba",
        logo: logoSrc,
        email: "info@tech.gov.sg",
        phone: "+65 6211 2100",
        description: "",
      },
      {
        id: "asd",
        website: "https://abc.com",
        name: "abc",
        address: "0xa",
        logo: "/static/images/abc.png",
        email: "contact@abc.com",
        phone: "123",
        description: "",
      },
      {
        id: "xyz",
        website: "https://xyz.com",
        name: "xyz",
        address: "0xb",
        logo: "/static/images/xyz.png",
        email: "contact@xyz.com",
        phone: "321",
        description: "",
      },
    ];

    render(<RegistryCard zIndex={0} search={``} contact={contact} />);
    expect(screen.getByTestId("institute-logo").getAttribute("src")).toStrictEqual(logoSrc);
    expect(screen.getAllByText(name)).toHaveLength(2);
    expect(screen.getAllByTestId("info")).toHaveLength(3);
    expect(screen.getByText("abc")).toBeInTheDocument();
    expect(screen.getByText("xyz")).toBeInTheDocument();
  });

  it("should render search results correctly", () => {
    const logoSrc = "/static/images/GOVTECH_logo.png";
    const name = "Government Technology Agency of Singapore (GovTech)";
    const contact = [
      {
        id: "govtech-registry",
        website: "https://www.tech.gov.sg",
        name: name,
        address: "0x007d40224f6562461633ccfbaffd359ebb2fc9ba",
        logo: logoSrc,
        email: "info@tech.gov.sg",
        phone: "+65 6211 2100",
        description: "",
      },
      {
        id: "asd",
        website: "https://abc.com",
        name: "abc",
        address: "0xa",
        logo: "/static/images/abc.png",
        email: "contact@abc.com",
        phone: "123",
        description: "",
      },
      {
        id: "xyz",
        website: "https://xyz.com",
        name: "xyz",
        address: "0xb",
        logo: "/static/images/xyz.png",
        email: "contact@xyz.com",
        phone: "321",
        description: "",
      },
    ];

    render(<RegistryCard zIndex={0} search={`0xb`} contact={contact} />);
    expect(screen.getAllByTestId("info")).toHaveLength(1);
    expect(screen.getByText("xyz")).toBeInTheDocument();
    expect(screen.queryByText("abc")).not.toBeInTheDocument();
  });
});
