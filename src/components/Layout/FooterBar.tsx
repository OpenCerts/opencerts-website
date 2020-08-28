import Link from "next/link";
import React from "react";
import css from "./footer.module.scss";

export const FooterBar: React.FunctionComponent = () => (
  <footer className={css.footer}>
    <div className={`container ${css.content}`}>
      <div className="row">
        <div className="col-12 col-md-4 mb-4 mb-md-0">
          <Link href="/">
            <a>
              <img className={css.logo} src="/static/images/opencertslogo.svg" alt="OpenCerts logo" />
            </a>
          </Link>
        </div>
        <div className="col-12 col-md col-lg-2 mb-4 mb-md-0">
          <h6>Partners</h6>
          <ul className="reset-list">
            <li>
              <Link href="/registry">
                <a>Registry</a>
              </Link>
            </li>
            <li>
              <Link href="/collaborate">
                <a>Collaborate</a>
              </Link>
            </li>
            <li>
              <a href="https://go.gov.sg/opencerts-feedback" target="_blank" rel="noopener noreferrer">
                Feedback
              </a>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md col-lg-2 mb-4 mb-md-0">
          <h6>Support</h6>
          <ul className="reset-list">
            <li>
              <Link href="/faq">
                <a>FAQ</a>
              </Link>
            </li>
            <li>
              <a href="https://github.com/OpenCerts" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md col-lg-2 mb-4 mb-md-0">
          <h6>Legal</h6>
          <ul className="reset-list">
            <li>
              <Link href="/privacy">
                <a>Privacy Policy</a>
              </Link>
            </li>
            <li>
              <Link href="/terms">
                <a>Terms of Use</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="container text-center">
      <div className="row">
        <div className="col-12">
          <hr />
          <p>Copyright © 2020 OpenCerts</p>
        </div>
      </div>
    </div>
  </footer>
);
