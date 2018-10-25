import css from "./aboutsection.scss";
import images from "./AboutImages";

const BenefitsSection = () => (
  <div className={css.section}>
    <div className={css["flex-container"]}>
      <h3 className="col-md-3">What we can help you do</h3>
      <div className="col-md-3">
        <div className={css.benefits}>
          {images.valid()}
          <p>Easy way to view your certificate</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className={css.benefits}>
          {images.genuine()}
          <p>Make sure it has not been tampered with</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className={css.benefits}>
          {images.institution()}
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
  <div>
    <div className="row p-4 bg-white" id="how-it-works">
      <div className={css.main}>
        <BenefitsSection />
      </div>
    </div>
    <div className="row p-4 bg-light" id="how-it-works">
      <div className={css.main}>
        <HowItWorks />
      </div>
    </div>
  </div>
);

export default AboutSection;
