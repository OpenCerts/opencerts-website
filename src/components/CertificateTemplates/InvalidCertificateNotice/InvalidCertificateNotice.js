import style from "./invalidCertificateNotice.scss";

const renderHeader = () => (
  <div id={style["header-ui"]}>
    <div className={style["header-container"]}>
      <div className="nav nav-tabs py-3">
        <a href="/" className={style["view-another"]}>
          View another
        </a>
      </div>
    </div>
  </div>
);

const renderContent = () => (
  <div className={`container-fluid`}>
    <div className={`${style.container}`}>
      <div
        className={`d-flex flex-column justify-content-center ${
          style["inner-container"]
        }`}
      >
        <div className="d-flex flex-column justify-content-center align-items-center text-red">
          <div>
            <i className="fas fa-times-circle fa-5x" />
          </div>
          <div className="m-4 h3">No Permission To Render Template</div>
        </div>
      </div>
    </div>
  </div>
);

const InvalidCertificateNotice = () => (
  <div>
    {renderHeader()}
    {renderContent()}
  </div>
);

export default InvalidCertificateNotice;
