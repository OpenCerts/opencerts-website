import { filter } from "lodash";
import css from "./registry.scss";
import registry from "../../static/RegistryInfo";

const members = Object.keys(registry.issuers).map(k => ({
  ...registry.issuers[k],
  address: k
}));

const finalmembers = filter(members, "displayCard");

const renderMembers = () =>
  finalmembers.map((m, i) => (
    <div
      key={i}
      className={`col ${css["mb-3"]} ${css["m-pd-0"]}`}
      style={{ padding: "10px" }}
    >
      <div className={css["partner-block"]}>
        <img
          className={`${css.logo}`}
          src={m.logo}
          id={css[m.key]}
          style={{
            maxHeight: "80px",
            maxWidth: "250px",
            height: "auto",
            width: "auto"
          }}
        />
        <h4 className={css["partner-name"]}>{m.name}</h4>
        {m.address ? (
          <div>
            Certificate Store:{" "}
            <a href={`https://etherscan.io/address/${m.address}`}>
              {m.address}
            </a>
          </div>
        ) : (
          ""
        )}
        {m.website ? (
          <div>
            Website:{" "}
            <a href={m.website} target="_blank" rel="noopener noreferrer">
              {m.website}
            </a>
          </div>
        ) : (
          ""
        )}
        {m.email ? (
          <div>
            Email: <a href={`mailto:${m.email}`}>{m.email}</a>
          </div>
        ) : (
          ""
        )}
        {m.phone ? (
          <div>
            Phone: <a href={`tel:${m.phone}`}>{m.phone}</a>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  ));

const RegistryPage = () => (
  <>
    <div className="container-fluid" style={{ backgroundColor: "#324353" }}>
      <div className={`conatiner bg-brand-dark text-white ${css["r-section"]}`}>
        <h1 className={`col-12 ${css["m-pd-0"]} ${css["section-width"]}`}>
          Registry
        </h1>
      </div>
      <div className={`conatiner bg-brand-dark text-white ${css["r-section"]}`}>
        <div className={css["section-width"]}>
          <div className={`col-lg-6 col-md-12 my-3 ${css["m-pd-0"]}`}>
            <p>
              The registry is a list of recognised issuers with their
              certificate store addresses. Certificates from these issuers can
              be recognised and verified by our viewer.
            </p>
            <p>
              Certificates with unverified issuer means that the certificate
              store address is not registered. This could mean that the issuer
              has not registered with OpenCerts.
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

export default RegistryPage;
