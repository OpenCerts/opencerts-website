import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MutiTabsContainer } from "./MultiTabs";

// The drawer (mobile) and the "View another" button aren't under test here
jest.mock("./UI/Drawer", () => ({ Drawer: () => null }));
jest.mock("./ViewAnotherButton", () => ({ ViewAnotherButtonContainer: () => null }));

const TEMPLATES = [
  { id: "certificate", label: "Certificate" },
  { id: "transcript", label: "Transcript" },
  { id: "media", label: "Media" },
];

const renderTabs = () => {
  const onSelectTemplate = jest.fn();
  render(<MutiTabsContainer templates={TEMPLATES} onSelectTemplate={onSelectTemplate} />);
  return { onSelectTemplate, tabs: screen.getAllByRole("tab") };
};

describe("multiTabs", () => {
  it("renders the templates as tabs, with only the selected one in the Tab order", () => {
    const { tabs } = renderTabs();

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(tabs.map((tab) => tab.textContent)).toStrictEqual(["Certificate", "Transcript", "Media"]);
    expect(tabs.map((tab) => tab.getAttribute("aria-selected"))).toStrictEqual(["true", "false", "false"]);
    expect(tabs.map((tab) => tab.getAttribute("tabindex"))).toStrictEqual(["0", "-1", "-1"]);
  });

  it("selects a template on click", () => {
    const { onSelectTemplate, tabs } = renderTabs();

    fireEvent.click(screen.getByTestId("transcript"));

    expect(onSelectTemplate).toHaveBeenCalledWith("transcript");
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveAttribute("tabindex", "0");
  });

  it("moves between tabs with the arrow, Home and End keys, wrapping at the ends", () => {
    const { onSelectTemplate, tabs } = renderTabs();
    const tablist = screen.getByRole("tablist");

    fireEvent.keyDown(tablist, { key: "ArrowLeft" });
    expect(onSelectTemplate).toHaveBeenLastCalledWith("media");
    expect(tabs[2]).toHaveFocus();

    fireEvent.keyDown(tablist, { key: "ArrowRight" });
    expect(onSelectTemplate).toHaveBeenLastCalledWith("certificate");
    expect(tabs[0]).toHaveFocus();

    fireEvent.keyDown(tablist, { key: "End" });
    expect(onSelectTemplate).toHaveBeenLastCalledWith("media");

    fireEvent.keyDown(tablist, { key: "Home" });
    expect(onSelectTemplate).toHaveBeenLastCalledWith("certificate");

    onSelectTemplate.mockClear();
    fireEvent.keyDown(tablist, { key: "a" });
    expect(onSelectTemplate).not.toHaveBeenCalled();
  });
});
