import css from "./aboutSection.scss";
import images from "./AboutImages";

const BenefitsSection = () => (
  <div className={css.section}>
    <h3>What we can help you do</h3>
    <div className={css.container}>
      <div className="col-lg-4 col-sm-12">
        <div className={css.benefits}>
          {images.valid()}
          <div className={css["benefit-text"]}>
            <h4 className={css["benefit-header"]}>View</h4>
            <p>Easy way to view your certificate</p>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-sm-12">
        <div className={css.benefits}>
          {images.genuine()}
          <div className={css["benefit-text"]}>
            <h4 className={css["benefit-header"]}>Check</h4>
            <p>Make sure it has not been tampered with</p>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-sm-12">
        <div className={css.benefits}>
          {images.institution()}
          <div className={css["benefit-text"]}>
            <h4 className={css["benefit-header"]}>Verify</h4>
            <p>Find out if it is from a recognised institution</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HowItWorks = () => {
  const sections = [
    {
      key: "onetwo",
      text:
        "When an OpenCerts certificate is created, a unique digital code is tagged to it. This code, together with condensed information from the certificate, is stored on the blockchain."
    },
    {
      key: "three",
      text:
        "When you open the .opencert file on this site, its contents will be compared with what was stored on the blockchain."
    },
    {
      key: "four",
      text:
        "We'll check if the contents match and if the certificate comes from a recognised insitution.\n\nThis way, you'll know if the certificate is valid when you try to view it."
    }
  ];

  const section = sections.map((item, i) => (
    <div key={i} id={css[item.key]}>
      {images[item.key]()}
      <p>{item.text}</p>
    </div>
  ));

  return (
    <div className={css.howitworks}>
      <div className={css["hiw-container"]}>{section}</div>
    </div>
  );
};

const AboutSection = () => (
  <div>
    <div className="row bg-light" id={css.benefits}>
      <div className={css.main}>
        <BenefitsSection />
      </div>
    </div>
    <div className="row bg-light" id="how-it-works">
      <div className={css.main}>
        <div className={css.section}>
          <h3>How it works</h3>
          <HowItWorks />
        </div>
      </div>
    </div>
  </div>
);

export default AboutSection;
