import css from "./footer.scss";

const NavigationBar = () => (
  <div className={css.footer}>
    <div>
      <a href="/faq">FAQ</a>
    </div>
    <div>
      <a href="/registry">Registry</a>
    </div>
    <div>
      <a href="/privacy">Privacy Policy</a>
    </div>
    <div>
      <a href="https://github.com/OpenCerts">Github</a>
    </div>
  </div>
);

export default NavigationBar;
