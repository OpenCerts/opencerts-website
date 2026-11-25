import React, { ReactNode, useEffect } from "react";

interface ModalProps {
  show: boolean;
  toggle: () => void;
  children: ReactNode;
}
export const Modal: React.FunctionComponent<ModalProps> = ({ show, toggle, children }) => {
  // Escape closes the modal: the keyboard equivalent of clicking the backdrop
  useEffect(() => {
    if (!show) return;
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") toggle();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [show, toggle]);

  if (!show) return null;

  return (
    <>
      <div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-75" />
      <div
        className="fixed z-20 p-4 rounded bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ maxWidth: "500px", width: "calc(100% - 20px)" }}
      >
        <div className="absolute top-0 right-0">
          <button type="button" className="p-4 ml-auto cursor-pointer" aria-label="Close" onClick={() => toggle()}>
            <i className="fa fa-times" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
      {/* Mouse-only shortcut for closing; keyboard users have Escape and the close button */}
      <div
        style={{ position: "fixed", zIndex: 10 }}
        className="modal-backdrop fade show"
        role="presentation"
        onClick={() => toggle()}
      />
    </>
  );
};
