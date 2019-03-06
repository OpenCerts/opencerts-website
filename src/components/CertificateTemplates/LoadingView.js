import style from "./loadingView.scss";

const LoadingView = () => (
  <div className={`container-fluid ${style.background}`}>
    <div className={`${style.container}`}>
      <div
        className={`d-flex flex-column justify-content-center ${
          style["inner-container"]
        }`}
      >
        <div className="d-flex flex-column justify-content-center align-items-center text-blue">
          <div>
            <i className="fas fa-spinner fa-pulse fa-3x" />
          </div>
          <div className="m-4 h3">Loading Templates...</div>
        </div>
      </div>
    </div>
  </div>
);

export default LoadingView;
