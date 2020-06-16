import Link from "next/link";
import React from "react";
import css from "./footer.module.scss";

const NavigationBar: React.FunctionComponent = () => (
  <div className="bg-brand-dark" id={css["footer-print"]}>
    <div className={css.footer}>
      <div>
        <Link href="/collaborate">
          <a>Collaborate</a>
        </Link>
      </div>
      <div>
        <Link href="/faq">
          <a>FAQ</a>
        </Link>
      </div>
      <div>
        <Link href="/registry">
          <a>Registry</a>
        </Link>
      </div>
      <div>
        <Link href="/privacy">
          <a>Privacy Policy</a>
        </Link>
      </div>
      <div>
        <Link href="/terms">
          <a>Terms of Use</a>
        </Link>
      </div>
      <div>
        <a href="https://github.com/OpenCerts">Github</a>
      </div>
    </div>
  </div>
);

export default NavigationBar;
