import NetworkSelector from "./NetworkSelector";
import css from "./footer.scss";

const NavigationBar = () => (
  <div className="bg-brand-dark p-1 m-0" id={css["footer-print"]}>
    <div className={css.footer}>
      <div>
        <a href="/faq">FAQ</a>
      </div>
      <div>
        <a href="https://github.com/OpenCerts/open-certificate">Github</a>
      </div>
      <div>
        <a href="/registry">Registry</a>
      </div>
      <div className={css.networkselector}>
        <NetworkSelector />
      </div>
    </div>
  </div>
);

export default NavigationBar;
