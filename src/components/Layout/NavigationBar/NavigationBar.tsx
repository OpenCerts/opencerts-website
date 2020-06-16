import Link from "next/link";
import React from "react";
import css from "./navBar.module.scss";

const navItems: { id: string; label: string; path: string }[] = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "collaborate",
    label: "Collaborate",
    path: "/collaborate",
  },
  {
    id: "faq",
    label: "FAQ",
    path: "/faq",
  },
];
interface NavigationBarProps {
  active?: string;
}

// TODO use next-link
const NavigationBar: React.FunctionComponent<NavigationBarProps> = ({ active }) => (
  <nav className={`${css.navbar} ${"navbar-expand-md navbar-dark bg-brand-dark"}`}>
    <div className={css.innerbar}>
      <Link href="/">
        <a className="navbar-brand">
          <img src="/static/images/opencertslogo.svg" alt="OpenCerts" />
        </a>
      </Link>
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
        <ul className="navbar-nav ml-auto d-none d-lg-flex d-xl-flex">
          {navItems.map((n, i) => (
            <li className={`${css["nav-item"]} ${n.id === active ? css.active : ""}`} key={i}>
              <Link href={n.path}>
                <a>{n.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </nav>
);

export default NavigationBar;
