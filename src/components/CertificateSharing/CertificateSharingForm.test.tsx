import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { states } from "../../reducers/shared";
import CertificateSharingForm from "./CertificateSharingForm";

const mockReset = jest.fn();
let mockSolveCount = 0;

// The real widget loads Google's script; the stand-in hands back a fresh token each time it is
// "solved" (captcha-token-1, captcha-token-2, ...) and records calls to reset(), which the form
// reaches through a ref, hence a class component.
jest.mock("react-google-recaptcha", () => {
  const { Component } = jest.requireActual<typeof import("react")>("react");
  class MockReCAPTCHA extends Component<{ onChange: (value: string | null) => void }> {
    reset() {
      mockReset();
    }

    render() {
      return (
        <button
          type="button"
          onClick={() => {
            mockSolveCount += 1;
            this.props.onChange(`captcha-token-${mockSolveCount}`);
          }}
        >
          Solve captcha
        </button>
      );
    }
  }
  return { __esModule: true, default: MockReCAPTCHA };
});

const EMAIL_HINT = "Please enter a valid email address";

const formWith = (handleSendCertificate: jest.Mock, emailSendingState: string, emailSendingError: string | null) => (
  <CertificateSharingForm
    emailSendingState={emailSendingState}
    emailSendingError={emailSendingError}
    handleSendCertificate={handleSendCertificate}
    handleSharingToggle={() => undefined}
  />
);

const showForm = (handleSendCertificate: jest.Mock = jest.fn()) => {
  mockSolveCount = 0; // so each test's first solve yields captcha-token-1 (mockReset is cleared by clearMocks)
  const { rerender } = render(formWith(handleSendCertificate, states.INITIAL, null));
  // Stands in for the store pushing a new emailSendingState down after a send.
  return (emailSendingState: string, emailSendingError: string | null = null) =>
    rerender(formWith(handleSendCertificate, emailSendingState, emailSendingError));
};

// Found by its accessible name, so every test also checks the input is labelled.
const emailInput = () => screen.getByRole("textbox", { name: "Recipient's email" });
const typeEmail = (value: string) => fireEvent.change(emailInput(), { target: { value } });
const solveCaptcha = () => fireEvent.click(screen.getByRole("button", { name: "Solve captcha" }));
const sendButton = () => screen.getByRole("button", { name: "Send" });

describe("certificateSharingForm email validation", () => {
  it.each([
    "a@example.com,b@example.com",
    "a@example.com;b@example.com",
    "a@example.com b@example.com",
    "Someone <a@example.com>",
    "group:a@example.com,b@example.com;",
    // accepted by the old, looser check but rejected by the backend
    "<a@example.com>",
    "a,b@example.com",
    "group:a@example.com",
    'quoted"name@example.com',
    "someone@example",
  ])("shows the hint and keeps Send disabled for %j", (value) => {
    const handleSendCertificate = jest.fn();
    showForm(handleSendCertificate);

    typeEmail(value);
    solveCaptcha();

    expect(screen.getByText(EMAIL_HINT)).toBeInTheDocument();
    expect(emailInput()).toHaveAttribute("aria-invalid", "true");
    expect(emailInput()).toHaveAccessibleDescription(EMAIL_HINT);
    expect(sendButton()).toBeDisabled();
    fireEvent.click(sendButton());
    expect(handleSendCertificate).not.toHaveBeenCalled();
  });

  it.each(["someone@example.com", "first.last+tag@sub.example.co", "o'brien@example.com"])(
    "accepts %j and sends it with the captcha",
    (value) => {
      const handleSendCertificate = jest.fn();
      showForm(handleSendCertificate);

      typeEmail(value);
      solveCaptcha();

      expect(screen.queryByText(EMAIL_HINT)).not.toBeInTheDocument();
      expect(emailInput()).toHaveAttribute("aria-invalid", "false");
      expect(emailInput()).not.toHaveAttribute("aria-describedby");
      expect(sendButton()).toBeEnabled();
      fireEvent.click(sendButton());
      expect(handleSendCertificate).toHaveBeenCalledWith({ email: value, captcha: "captcha-token-1" });
    }
  );

  it("asks for an email address, so browsers offer the email keyboard", () => {
    showForm();

    expect(emailInput()).toHaveAttribute("type", "email");
  });

  it("still requires the captcha for a valid address", () => {
    showForm();

    typeEmail("someone@example.com");

    expect(screen.queryByText(EMAIL_HINT)).not.toBeInTheDocument();
    expect(sendButton()).toBeDisabled();
  });
});

describe("certificateSharingForm after a send resolves", () => {
  const SEND_ERROR = "We could not send the email, please try again";

  // Fills in a valid address, solves the captcha and sends, leaving the form PENDING.
  const sendOnce = (handleSendCertificate: jest.Mock) => {
    const setEmailState = showForm(handleSendCertificate);
    typeEmail("someone@example.com");
    solveCaptcha();
    fireEvent.click(sendButton());
    setEmailState(states.PENDING);
    return setEmailState;
  };

  // The failure message is announced as an alert; the region stays mounted and empty in between.
  const sendError = () => screen.getByRole("alert");

  it("resets the captcha on failure and requires a new one before sending again", () => {
    const handleSendCertificate = jest.fn();
    const setEmailState = sendOnce(handleSendCertificate);
    expect(handleSendCertificate).toHaveBeenCalledTimes(1);
    expect(handleSendCertificate).toHaveBeenLastCalledWith({
      email: "someone@example.com",
      captcha: "captcha-token-1",
    });
    expect(mockReset).not.toHaveBeenCalled();

    setEmailState(states.FAILURE, SEND_ERROR);

    // error shows, widget is reset, and the spent token is gone: Send is back but disabled
    expect(sendError()).toHaveTextContent(SEND_ERROR);
    expect(mockReset).toHaveBeenCalledTimes(1);
    expect(sendButton()).toBeDisabled();
    fireEvent.click(sendButton());
    expect(handleSendCertificate).toHaveBeenCalledTimes(1);

    solveCaptcha();

    expect(sendButton()).toBeEnabled();
    fireEvent.click(sendButton());
    expect(handleSendCertificate).toHaveBeenCalledTimes(2);
    expect(handleSendCertificate).toHaveBeenLastCalledWith({
      email: "someone@example.com",
      captcha: "captcha-token-2",
    });
  });

  it("does not clear a newly solved captcha when re-rendered while still in FAILURE", () => {
    const setEmailState = sendOnce(jest.fn());
    setEmailState(states.FAILURE, SEND_ERROR);
    solveCaptcha();

    setEmailState(states.FAILURE, SEND_ERROR);

    expect(mockReset).toHaveBeenCalledTimes(1);
    expect(sendButton()).toBeEnabled();
  });

  it("keeps Send disabled after a failure until the address is valid as well", () => {
    const setEmailState = sendOnce(jest.fn());
    setEmailState(states.FAILURE, SEND_ERROR);

    typeEmail("a@example.com,b@example.com");
    solveCaptcha();
    expect(sendButton()).toBeDisabled();

    typeEmail("someone@example.com");
    expect(sendButton()).toBeEnabled();
  });

  it("replaces the Send button with the success message and leaves the captcha alone", () => {
    const setEmailState = sendOnce(jest.fn());

    setEmailState(states.SUCCESS);

    expect(screen.getByRole("status")).toHaveTextContent("Email successfully sent!");
    expect(sendError()).toBeEmptyDOMElement();
    expect(screen.queryByRole("button", { name: "Send" })).not.toBeInTheDocument();
    expect(mockReset).not.toHaveBeenCalled();
  });

  it("hides the spinner from screen readers while sending", () => {
    sendOnce(jest.fn());

    expect(sendButton()).toContainHTML('<i class="ml-2 fas fa-spinner fa-pulse" aria-hidden="true"></i>');
  });

  it("falls back to a generic message when the failure has none", () => {
    sendOnce(jest.fn())(states.FAILURE, null);

    expect(sendError()).toHaveTextContent("An error occurred, please check your email and captcha");
  });

  it.each([
    ["edits the address", () => typeEmail("someone.else@example.com")],
    ["solves a new captcha", solveCaptcha],
  ])("clears the error once the user %s, and shows the next failure again", (_action, act) => {
    const setEmailState = sendOnce(jest.fn());
    setEmailState(states.FAILURE, SEND_ERROR);
    expect(sendError()).toHaveTextContent(SEND_ERROR);

    act();
    expect(sendError()).toBeEmptyDOMElement();
    setEmailState(states.FAILURE, SEND_ERROR); // a re-render without a new send keeps it hidden
    expect(sendError()).toBeEmptyDOMElement();

    setEmailState(states.PENDING);
    setEmailState(states.FAILURE, "Another failure");
    expect(sendError()).toHaveTextContent("Another failure");
  });
});
