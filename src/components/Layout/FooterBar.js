import NetworkSelector from "./NetworkSelector";
import css from "./footer.scss";

const NavigationBar = () => (
  <div className="bg-brand-dark py-3 m-0" id={css["footer-print"]}>
    <div className={css.footer}>
      <div className={css.networkselector}>
        <NetworkSelector />
      </div>
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
        <a href="https://github.com/OpenCerts/open-certificate">Github</a>
      </div>
    </div>
  </div>
);

export default NavigationBar;
