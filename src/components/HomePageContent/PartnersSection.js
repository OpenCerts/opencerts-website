import css from './partnerspage.scss'

const TitleSection = () => <div><h2>Partners</h2></div>;


const CarouselSection = () => {
  // const images = Array(8).fill("http://via.placeholder.com/150x80");

  const images = [
    "/static/images/logo-govtech.png", 
    "/static/images/NP_logo.svg", 
    "/static/images/TP_logo.svg", 
    "/static/images/NYP_logo.svg",
    "/static/images/RP_logo.svg",
    "/static/images/SP_logo.svg",
    "/static/images/CSC_logo.png",
    "/static/images/ITE_logo.png",
    "/static/images/NTU_logo.png",
    "/static/images/SIM_logo.png"
  ]
  const items = images.map((item, i) => (
    <img src={item} key={i} className={css.partnerlogos} />
  ));
  return <div className="d-flex flex-wrap">{items}</div>;
};

const PartnerSection = () => (
  <div className="row my-3 p-4">
    <div className={css.main}>
      <TitleSection />
      <CarouselSection />
    </div>
  </div>
);

export default PartnerSection;
