import PropTypes from "prop-types";

const Profile = props => (
  <div>
    {props.title ? <h3>{props.title}</h3> : null}
    <table className="w-100">
      <tbody>
        {props.identities && props.identities.filter
          ? props.identities.filter(p => p.identity != null).map((p, i) => (
              <tr key={i}>
                <td className="w-20" style={{ verticalAlign: "top" }}>
                  {p.type}
                </td>
                <td style={{ wordBreak: "break-all" }}>{p.identity}</td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  </div>
);

Profile.propTypes = {
  title: PropTypes.string,
  identities: PropTypes.arrayOf(PropTypes.object)
};

const renderHeader = (name, issuer) => (
  <div className="pb3">
    <h2>{issuer.name}</h2>
    <h2>{name}</h2>
  </div>
);

const filterValueButton = (path, editable, handleFilter) => {
  if (!editable) return null;
  return (
    <div
      onClick={() => handleFilter(path)}
      className="dib hover-red pointer black-30"
    >
      <i className="fas fa-times-circle" />
    </div>
  );
};

const renderTranscript = (
  evidencePrivacyFilter,
  evidence,
  editable,
  handleFilter
) => {
  if (!evidence || !evidencePrivacyFilter) return null;

  const { saltLength } = evidencePrivacyFilter;
  const { transcript } = evidence;

  if (!transcript) return null;

  const removeFilterCurry = filterLength => word =>
    word ? word.substring(filterLength + 1) : "";
  const removeFilter = removeFilterCurry(Number(saltLength));

  const subjectComponents = transcript.map((subject, i) => (
    <tr key={i}>
      {subject.courseCode ? (
        <td>
          {removeFilter(subject.courseCode)}{" "}
          {filterValueButton(
            `transcript.${i}.courseCode`,
            editable,
            handleFilter
          )}
        </td>
      ) : (
        <td />
      )}

      {subject.name ? (
        <td>
          {removeFilter(subject.name)}{" "}
          {filterValueButton(`transcript.${i}.name`, editable, handleFilter)}
        </td>
      ) : (
        <td />
      )}

      {subject.grade ? (
        <td>
          {removeFilter(subject.grade)}{" "}
          {filterValueButton(`transcript.${i}.grade`, editable, handleFilter)}
        </td>
      ) : (
        <td />
      )}

      {subject.courseCredit ? (
        <td>
          {removeFilter(subject.courseCredit)}{" "}
          {filterValueButton(
            `transcript.${i}.courseCredit`,
            editable,
            handleFilter
          )}
        </td>
      ) : (
        <td />
      )}
    </tr>
  ));

  return (
    <div>
      <table className="fl tl w-100" cellSpacing={0}>
        <thead>
          <tr>
            <th style={{ width: "14%" }}>Course</th>
            <th className="w-70" />
            <th className="w-10">Grade</th>
            <th className="w-10">Credit</th>
          </tr>
        </thead>

        <tbody>{subjectComponents}</tbody>
      </table>

      <div className="cb" />
    </div>
  );
};

const CertificateViewer = ({
  certificate,
  verify,
  editable,
  toggleEditable,
  handleFilter
}) => {
  const {
    badge: { name, criteria, issuer, evidence, evidencePrivacyFilter },
    profile,
    issuedOn
  } = certificate;

  return (
    <div>
      <div
        className="bg-purple white tc pa3"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          display: editable ? "block" : "none"
        }}
      >
        <i className="fas fa-user-secret" />
        &nbsp;Privacy filtering enabled
        <a className="white pointer hover fr dim" onClick={toggleEditable}>
          <i className="fas fa-times" />
        </a>
      </div>
      <div className="w-100 cf">
        <div className="fl w-70 pr3">
          {renderHeader(name, issuer)}

          <div className="mb3">
            <Profile title="Issued to" identities={profile} />

            <Profile
              title="Issued by"
              identities={["name", "url", "email"].map(type => ({
                type,
                identity: issuer[type]
              }))}
            />

            <div>
              <h3>Issued at</h3>
              <div>{issuedOn}</div>
            </div>
          </div>
        </div>
        <div className="fl w-30 mt1">{verify || <div>Verify</div>}</div>
      </div>

      <h3>Transcript</h3>
      {renderTranscript(
        evidencePrivacyFilter,
        evidence,
        editable,
        handleFilter
      )}

      <h3>Details</h3>
      <p>{criteria}</p>

      <div className="mt4 fr">
        <a
          className={`button hover-bg-light-purple ${
            editable ? "white bg-purple" : ""
          }`}
          onClick={toggleEditable}
        >
          <i className="fas fa-user-secret" />
          &nbsp;{editable ? "Stop" : "Start"} privacy filtering
        </a>
        <a
          className="button ml3"
          href={`data:application/text,${encodeURI(
            JSON.stringify(certificate, null, 2)
          )}`}
          download="Certificate.json"
        >
          <i className="fas fa-download" />
          &nbsp;Download certificate
        </a>
      </div>
    </div>
  );
};

CertificateViewer.propTypes = {
  certificate: PropTypes.object,
  verify: PropTypes.object,
  editable: PropTypes.bool,
  toggleEditable: PropTypes.func,
  handleFilter: PropTypes.func
};

export default CertificateViewer;
