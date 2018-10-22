import css from "./aboutsection.scss";

const BenefitsSection = () => (
  <div className={css.section}>
    <div className={css["flex-container"]}>
      <h3 className="col-md-3">What we can help you do</h3>
      <div className="col-md-3">
        <div className={css.benefits}>
          <img src="static/images/aboutsection/valid.svg" />
          <p>Easy way to view your certificate</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className={css.benefits}>
          <img src="static/images/aboutsection/genuine.svg" />
          <p>Make sure it has not been tampered with</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className={css.benefits}>
          <img src="static/images/aboutsection/institution.svg" />
          <p>Check if it has been issued by the right institution</p>
        </div>
      </div>
    </div>
  </div>
);

const HowItWorks = () => (
  <div className={css.section}>
    <h3>How it works</h3>
    <div className={css.howitworks}>
      <img src="/static/images/aboutsection/howitworksgraphic.png" />
    </div>
  </div>
);

const AboutSection = () => (
  <div className="row p-4 bg-light" id="how-it-works">
    <div className={css.main}>
      <BenefitsSection />
      {/* {renderTabTitle()}
      {renderTabContent()} */}
      <HowItWorks />
    </div>
  </div>
);

export default AboutSection;
