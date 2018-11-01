import PropTypes from "prop-types";
import css from "./modal.scss";

const modal = ({ show, toggle, children }) =>
  show ? (
    <div className={css.modal}>
      <div className={`${css["modal-content"]} p-3`}>
        <div
          className={`${css["modal-cross"]} pointer`}
          onClick={() => toggle()}
        >
          <i className="fa fa-times text-muted" />
        </div>
        {children}
      </div>
      <div
        style={{ position: "fixed", zIndex: 10 }}
        className="modal-backdrop fade show"
        onClick={() => toggle()}
      />
    </div>
  ) : (
    ""
  );

export default modal;

modal.propTypes = {
  show: PropTypes.bool,
  toggle: PropTypes.func,
  children: PropTypes.object
};
