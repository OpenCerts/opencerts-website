import React from "react";
import { Wogaa } from "../Analytics/wogaa";

interface WrapperProps {
  children: React.ReactNode;
  isLoadWogaa?: boolean;
}

export const Wrapper: React.FunctionComponent<WrapperProps> = ({ children, isLoadWogaa = true }) => {
  return (
    <>
      {isLoadWogaa ? <Wogaa /> : null}
      <div className="flex flex-col h-screen wrapper">{children}</div>
    </>
  );
};

interface MainProps {
  children: React.ReactNode;
}

export const Main: React.FunctionComponent<MainProps> = ({ children }) => (
  // https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
  <main className="main" style={{ flex: "1 0 auto" }}>
    {children}
  </main>
);
