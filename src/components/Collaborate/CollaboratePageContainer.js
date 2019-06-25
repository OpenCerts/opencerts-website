import css from "../registry.scss";
import collaborators from "./collaborators";

const renderMembers = () =>
  collaborators.map((m, i) => (
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
