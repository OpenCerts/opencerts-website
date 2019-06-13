import PropTypes from "prop-types";
import css from "./navBar.scss";

const navItems = [
  {
    id: "home",
    label: "Home",
    path: "/"
  },
  {
    id: "collaborate",
    label: "Collaborate",
    path: "/collaborate"
  },
  {
    id: "faq",
    label: "FAQ",
    path: "/faq"
  }
];

const renderNavItem = active => {
  const items = navItems.map((n, i) => (
    <li
      className={`${css["nav-item"]} ${n.id === active ? css.active : ""}`}
      key={i}
    >
      <a href={n.path}>{n.label}</a>
    </li>
  ));
  return (
    <ul className="navbar-nav ml-auto d-none d-lg-flex d-xl-flex">{items}</ul>
  );
};

const NavigationBar = ({ active }) => (
  <nav
    className={`${css.navbar} ${"navbar-expand-md navbar-dark bg-brand-dark"}`}
  >
    <div className={css.innerbar}>
      <a className="navbar-brand" href="/">
        <img src="/static/images/opencertslogo.svg" alt="OpenCerts" />
      </a>
      <button
        className={`${css["navbar-toggler"]} d-none`}
        type="button"
        data-toggle="collapse"
        data-target="#top-nav"
        aria-controls="top-nav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className={`${css["toggler-icon"]} ${"navbar-toggler-icon"}`} />
      </button>

      <div className="collapse navbar-collapse" id="top-nav">
        {renderNavItem(active)}
      </div>
    </div>
  </nav>
);

export default NavigationBar;

NavigationBar.propTypes = {
  active: PropTypes.string
};
