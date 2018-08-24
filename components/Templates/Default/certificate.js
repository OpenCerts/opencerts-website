// Ref: https://getbootstrap.com/docs/4.1/examples/navbars/
const NavigationBar = () => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark">
    <a className="navbar-brand" href="#">
      OpenCerts
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExample04"
      aria-controls="navbarsExample04"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarsExample04">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">
            About <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Registry
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Github
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavigationBar;
