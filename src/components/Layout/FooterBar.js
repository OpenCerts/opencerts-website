import css from "./footer.scss";

const NavigationBar = () => (
  <div className="bg-brand-dark" id={css["footer-print"]}>
    <div className={css.footer}>
      <div>
        <a href="https://github.com/TradeTrust">Github</a>
      </div>
    </div>
  </div>
);

export default NavigationBar;
