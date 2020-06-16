import React, { ReactNode } from "react";
import css from "./modal.module.scss";

interface ModalProps {
  show: boolean;
  toggle: () => void;
  children: ReactNode;
}
const Modal: React.FunctionComponent<ModalProps> = ({ show, toggle, children }) =>
  show ? (
    <div className={css.modal}>
      <div className={`${css["modal-content"]} p-3`}>
        <div className={`${css["modal-cross"]} pointer`} onClick={() => toggle()}>
          <i className="fa fa-times text-muted" />
        </div>
        {children}
      </div>
      <div style={{ position: "fixed", zIndex: 10 }} className="modal-backdrop fade show" onClick={() => toggle()} />
    </div>
  ) : null;

export default Modal;
