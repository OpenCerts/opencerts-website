import { render, screen } from "@testing-library/react";
import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";

const ProblemChild: React.FunctionComponent = () => {
  throw new Error("Error thrown from problem child");
};
/* eslint-disable no-console */
// disabled lint for the overridden console to not show the error from the problem child.
const pauseErrorLogging = (codeToRun: () => void): void => {
  const logger = console.error;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.error = () => {};

  codeToRun();

  console.error = logger;
};

describe("<ErrorBoundary />", () => {
  it("should catch errors with componentDidCatch", () => {
    pauseErrorLogging(() => {
      jest.spyOn(ErrorBoundary.prototype, "componentDidCatch");
      render(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      );
      expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
      expect(
        screen.getByText("There is an error with this certificate, please contact your issuing institution.")
      ).toBeInTheDocument();
    });
  });
});
