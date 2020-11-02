import React, { ReactNode } from "react";

interface ModalProps {
  show: boolean;
  toggle: () => void;
  children: ReactNode;
}
export const Modal: React.FunctionComponent<ModalProps> = ({ show, toggle, children }) =>
  show ? (
    <>
      <div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-75" />
      <div
        className="fixed z-20 p-4 rounded bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ maxWidth: "500px", width: "calc(100% - 20px)" }}
      >
        <div className="absolute top-0 right-0">
          <i className="fa fa-times p-4 ml-auto cursor-pointer" onClick={() => toggle()} />
        </div>
        {children}
      </div>
      <div style={{ position: "fixed", zIndex: 10 }} className="modal-backdrop fade show" onClick={() => toggle()} />
    </>
  ) : null;
