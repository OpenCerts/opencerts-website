import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper: React.FunctionComponent<WrapperProps> = ({ children }) => (
  <div className="flex flex-col min-h-screen wrapper">{children}</div>
);

interface MainProps {
  children: React.ReactNode;
}

export const Main: React.FunctionComponent<MainProps> = ({ children }) => (
  <main className="flex-1 main">{children}</main>
);
