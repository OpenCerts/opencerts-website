import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper: React.FunctionComponent<WrapperProps> = ({ children }) => (
  <div className="flex flex-col h-screen wrapper">{children}</div>
);

interface MainProps {
  children: React.ReactNode;
}

export const Main: React.FunctionComponent<MainProps> = ({ children }) => (
  // https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
  <main className="main" style={{ flex: "1 0 auto" }}>
    {children}
  </main>
);
