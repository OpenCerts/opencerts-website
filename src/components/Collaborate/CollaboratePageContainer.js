import css from "../registry.scss";
import collaborators from "./collaborators";
import Card from "../UI/Card/card";

const renderMembers = () =>
  collaborators.map((collaborator, index) => (
    <Card key={index} info={collaborator} />
  ));

const CollaboratePage = () => (
  <>
    <div className="container-fluid" style={{ backgroundColor: "#324353" }}>
      <div className={`container bg-brand-dark text-white ${css["r-section"]}`}>
        <h1
          id="page-title"
          className={`col-12 ${css["m-pd-0"]} ${css["section-width"]}`}
        >
          Collaborate
        </h1>
      </div>
      <div
        id="page-description"
        className={`container bg-brand-dark text-white ${css["r-section"]}`}
      >
        <div className={css["section-width"]}>
          <div className={`col-lg-6 col-md-12 my-3 ${css["m-pd-0"]}`}>
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
