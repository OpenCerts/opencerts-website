import PropTypes from "prop-types";
import css from "./viewerstyles.scss";

const View = ({ hover, accept }) => (
  <div
    className={`${css["viewer-container"]} ${
      // eslint-disable-next-line no-nested-ternary
      hover ? (accept ? css.accept : css.invalid) : css.default
    }`}
    style={{ borderRadius: 10 }}
  >
    <div className={css["image-container"]}>
      <i>
        <img src="/static/images/dropzone/dropzone_illustration.svg" />
      </i>
    </div>
    <div
      className="text-brand-dark"
      style={{ fontSize: "1.2rem", fontWeight: 500 }}
    >
      Drag and drop your .opencert file
    </div>
    <div className="text-muted">to view its contents</div>
    <div className="text-muted row">
      <div className="col-2" />
      <div className="col-3">
        <hr />
      </div>
      <div className="col-2">or</div>
      <div className="col-3">
        <hr />
      </div>
    </div>
    <div className="text-muted row">
      <div className="col-4" />
      <div className="col-4">
        <button type="button" className={`pointer ${css.btn}`}>
          Select File
        </button>
      </div>
    </div>
  </div>
);

export default View;

View.propTypes = {
  hover: PropTypes.bool,
  accept: PropTypes.bool
};
