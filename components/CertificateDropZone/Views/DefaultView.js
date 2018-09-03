const View = () => (
  <div
    className="text-center bg-light h-100 d-flex flex-column justify-content-center p-4"
    style={{ borderRadius: 10 }}
  >
    <div className="p-3">
      <i className="fas fa-download fa-8x text-muted" />
    </div>
    <div
      className="text-brand-dark"
      style={{ fontSize: "1.2rem", fontWeight: 500 }}
    >
      Have a OpenCert file?
    </div>
    <div className="text-muted">Drop the .json file here to view</div>
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
        <button type="button" className="btn btn-warning btn-block">
          Select File
        </button>
      </div>
    </div>
  </div>
);

export default View;
