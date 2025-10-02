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
      {/* <div
        className="bg-yellow-100 border-b border-yellow-300 text-yellow-900 px-4 py-3 text-center text-sm sm:text-base"
        role="alert"
      >
        <div className="max-w-5xl mx-auto">
          <p className="font-semibold">🚧 Scheduled Maintenance Notice 🚧</p>
          <p className="mt-1">
            OpenCerts services will be undergoing scheduled maintenance from 30 September to 1 October.
          </p>
          <p className="mt-1">During this period, the platform may be unavailable or experience interruptions.</p>
          <p className="mt-1">We appreciate your patience and understanding as we work to improve our services.</p>
        </div>
      </div> */}
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
