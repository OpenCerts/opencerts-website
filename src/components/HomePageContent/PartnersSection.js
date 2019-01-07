import css from "./partnersPage.scss";

const CarouselSection = () => {
  const images = [
    {
      key: "NP",
      value: "/static/images/NP_logo.svg"
    },
    {
      key: "TP",
      value: "/static/images/TP_logo.svg"
    },
    {
      key: "NYP",
      value: "/static/images/NYP_logo.svg"
    },
    {
      key: "RP",
      value: "/static/images/RP_logo.svg"
    },
    {
      key: "SP",
      value: "/static/images/SP_logo.svg"
    },
    {
      key: "NUS",
      value: "/static/images/NUS_logo.png"
    },
    {
      key: "NTU",
      value: "/static/images/NTU_logo.png"
    },
    {
      key: "SIM",
      value: "/static/images/SIM_logo.png"
    },
    {
      key: "SUTD",
      value: "/static/images/SUTD_logo.png"
    },
    {
      key: "SUSS",
      value: "/static/images/SUSS_logo.png"
    },
    {
      key: "SIT",
      value: "/static/images/SIT_logo.png"
    },
    {
      key: "SEAB",
      value: "/static/images/SEAB_logo.png"
    },
    {
      key: "ITE",
      value: "/static/images/ITE_logo.png"
    },
    {
      key: "CSC",
      value: "/static/images/CSC_logo.png"
    },
    {
      key: "govtech",
      value: "/static/images/GOVTECH_logo.png"
    }
  ];
  const items = images.map((item, i) => (
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
