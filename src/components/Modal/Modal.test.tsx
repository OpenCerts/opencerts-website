import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Modal } from "./Modal";

describe("modal", () => {
  it("renders nothing when hidden, and ignores Escape", () => {
    const toggle = jest.fn();
    render(
      <Modal show={false} toggle={toggle}>
        content
      </Modal>
    );

    expect(screen.queryByText("content")).not.toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle).not.toHaveBeenCalled();
  });

  it("closes from the labelled close button", () => {
    const toggle = jest.fn();
    render(
      <Modal show toggle={toggle}>
        content
      </Modal>
    );

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(toggle).toHaveBeenCalledTimes(1);
  });

  it("closes on Escape but not on other keys", () => {
    const toggle = jest.fn();
    render(
      <Modal show toggle={toggle}>
        content
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Enter" });
    expect(toggle).not.toHaveBeenCalled();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle).toHaveBeenCalledTimes(1);
  });

  it("closes when the backdrop is clicked", () => {
    const toggle = jest.fn();
    render(
      <Modal show toggle={toggle}>
        content
      </Modal>
    );

    fireEvent.click(screen.getByRole("presentation", { hidden: true }));
    expect(toggle).toHaveBeenCalledTimes(1);
  });

  it("stops listening for Escape once closed", () => {
    const toggle = jest.fn();
    const { rerender } = render(
      <Modal show toggle={toggle}>
        content
      </Modal>
    );
    rerender(
      <Modal show={false} toggle={toggle}>
        content
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle).not.toHaveBeenCalled();
  });
});
