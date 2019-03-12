import css from "./partnersPage.scss";
import { IMAGES } from "../../constants/PartnerLogo";

const CarouselSection = () => {
  const items = IMAGES.map((item, i) => (
    <div className={css["logo-container"]} key={i}>
      <img className="mx-auto" src={item.value} id={css[item.key]} />
    </div>
  ));
  return <div className="d-flex flex-wrap">{items}</div>;
};

const PartnerSection = () => (
  <div className="row" id={css.partners}>
    <div className={css.main}>
      <CarouselSection />
    </div>
  </div>
);

export default PartnerSection;
