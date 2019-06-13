import css from "./registry.scss";

const members = [
  {
    name: "NextID",
    description:
      "NextCert helps you produce next-generation academic and professional certificates, that are cryptographically secure and verifiable.",
    website: "https://nextid.com",
    key: "nextid",
    logo: "/static/images/collaborate/NEXTID_logo.png"
  },
  {
    name: "Edufied",
    description:
      "Edufied provides a  secured and decentralized system for Certificate Issuers, Individuals and Employers to store & verify certifications and credentials using Blockchain Technology.",
    website: "https://edufied.network",
    key: "edified",
    logo: "/static/images/collaborate/EDUFIED_logo.png"
  },
  {
    name: "Ceito",
    description:
      "Ceito makes it easy to integrate blockchain by providing a suite of lightweight APIs to help you create the best possible product for your users.",
    website: "https://www.ceito.io/",
    key: "ceito",
    logo: "/static/images/collaborate/CEITO_logo.png"
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

const CollaboratePage = () => (
  <>
    <div className="container-fluid" style={{ backgroundColor: "#324353" }}>
      <div className={`conatiner bg-brand-dark text-white ${css["r-section"]}`}>
        <h1 className={`col-12 ${css["m-pd-0"]} ${css["section-width"]}`}>
          Collaborate
        </h1>
      </div>
      <div className={`conatiner bg-brand-dark text-white ${css["r-section"]}`}>
        <div className={css["section-width"]}>
          <div className={`col-lg-68 col-md-12 my-3 ${css["m-pd-0"]}`}>
            <p>
              If you are from an institution and would like to get started on
              OpenCerts, here are some companies that can help to issue your
              certificates.
            </p>
            <p>
              If you are from a company that can help to issue certificates and
              would like to be added to this list, please &nbsp;
              <a
                href="https://form.gov.sg/5d01b2542ce4bb0011a86934"
                target="_blank"
                rel="noopener noreferrer"
              >
                fill in this form.
              </a>
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

export default CollaboratePage;
