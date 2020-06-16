import React from "react";
import Partners from "../../constants/PartnerLogo.json";
import css from "./partnersPage.module.scss";

const CarouselSection: React.FunctionComponent = () => {
  const items = Partners.map((item, i) => (
    <div className={css["logo-container"]} key={i}>
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        <img className="mx-auto" src={item.value} title={item.name} alt={item.name} id={css[item.key]} />
      </a>
    </div>
  ));
  return <div className="d-flex flex-wrap">{items}</div>;
};

const PartnerSection: React.FunctionComponent = () => (
  <div className="row" id={css.partners}>
    <div className={css.main}>
      <CarouselSection />
    </div>
  </div>
);

export default PartnerSection;
