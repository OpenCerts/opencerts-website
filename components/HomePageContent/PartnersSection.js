const TitleSection = () => <div className="h2">Partners</div>;

const CarouselSection = () => {
  const images = Array(8).fill("http://via.placeholder.com/150x80");
  const items = images.map((item, i) => (
    <img src={item} key={i} className="m-2" />
  ));
  return <div className="d-flex flex-wrap justify-content-center">{items}</div>;
};

const PartnerSection = () => (
  <div className="row my-3 p-4">
    <div className="container-fluid">
      <TitleSection />
      <CarouselSection />
    </div>
  </div>
);

export default PartnerSection;
