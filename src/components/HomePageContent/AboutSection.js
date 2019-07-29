import css from "./aboutSection.scss";
import images from "./AboutImages";

const HowItWorks = () => {
  const sections = [
    {
      key: "onetwo",
      text:
        "When a TradeTrust certificate is created, a unique digital code is tagged to it. This code, together with condensed information from the document, is stored on the blockchain."
    },
    {
      key: "three",
      text:
        "When you open the .tt file on this site, its contents will be compared with what was stored on the blockchain."
    },
    {
      key: "four",
      text:
        "We'll check if the contents match and if the document comes from a recognised issuer.\n\nThis way, you'll know if the document is valid when you try to view it."
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
  <div className="row bg-light" id="how-it-works">
    <div className={css.main}>
      <div className={css.section}>
        <h3>How it works</h3>
        <HowItWorks />
      </div>
    </div>
  </div>
);

export default AboutSection;
