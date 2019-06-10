import css from "./registry.scss";

const members = [
  {
    name: "NextID",
    description:
      "NextCert helps you produce next-generation academic and professional certificates, that are cryptographically secure and verifiable.",
    website: "https://nextid.com",
    key: "nextid",
    logo: "/static/images/partners/NEXTID_logo.png"
  },
  {
    name: "Edufied",
    description:
      "Edufied provides a  secured and decentralized system for Certificate Issuers, Individuals and Employers to store & verify certifications and credentials using Blockchain Technology.",
    website: "https://edufied.network",
    key: "edified",
    logo: "/static/images/partners/EDUFIED_logo.png"
  },
  {
    name: "Ceito",
    description:
      "Ceito makes it easy to integrate blockchain by providing a suite of lightweight APIs to help you create the best possible product for your users.",
    website: "https://www.ceito.io/",
    key: "ceito",
    logo: "/static/images/partners/CEITO_logo.png"
  }
];

const renderMembers = () =>
  members.map((m, i) => (
    <div
      key={i}
      className={`col-lg-4 col-md-6 col-sm-12 ${css["mb-3"]} ${css["m-pd-0"]}`}
      style={{ paddingBottom: "36px" }}
    >
      <a
        href={m.website}
        target="_blank"
        rel="noopener noreferrer nofollow"
        style={{ color: "#000", textDecoration: "none" }}
      >
        <div className={css["partner-block"]}>
          <img className={`${css.logo}`} src={m.logo} id={css[m.key]} />
          <h4 className={css["partner-name"]} style={{ fontWeight: "bold" }}>
            {m.name}
          </h4>
          {m.description ? <div>{m.description}</div> : ""}
        </div>
      </a>
    </div>
  ));

const PartnerPage = () => (
  <>
    <div className="container-fluid" style={{ backgroundColor: "#324353" }}>
      <div className={`conatiner bg-brand-dark text-white ${css["r-section"]}`}>
        <h1 className={`col-12 ${css["m-pd-0"]} ${css["section-width"]}`}>
          Partners
        </h1>
      </div>
      <div className={`conatiner bg-brand-dark text-white ${css["r-section"]}`}>
        <div className={css["section-width"]}>
          <div className={`col-lg-68 col-md-12 my-3 ${css["m-pd-0"]}`}>
            <p>
              OpenCerts has partnered with key companies to help you issue and
              distribute certificates easily.
            </p>
            <p>
              We work closely with these partners to provide a more transparent
              and efficient system for all.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className={`row ${css["r-section"]} ${css["section-width"]}`}>
      {renderMembers()}
    </div>
  </>
);

export default PartnerPage;
