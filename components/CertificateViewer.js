import PropTypes from "prop-types";

const Profile = props => (
  <div>
    {props.title ? <h3>{props.title}</h3> : null}
    <table className="w-100">
      <tbody>
        {props.identities.map((p, i) => (
          <tr key={i}>
            <td className="w-20" style={{ verticalAlign: "top" }}>
              {p.type}
            </td>
            <td style={{ wordBreak: "break-all" }}>{p.identity}</td>
          </tr>
        ))}
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

const renderTranscript = (evidencePrivacyFilter, evidence) => {
  if (!evidence || !evidencePrivacyFilter) return null;

  const { saltLength } = evidencePrivacyFilter;
  const { transcript } = evidence;

  if (!transcript) return null;

  const removeFilterCurry = filterLength => word =>
    word ? word.substring(filterLength + 1) : "[REDACTED]";
  const removeFilter = removeFilterCurry(Number(saltLength));

  const subjectComponents = transcript.map((subject, i) => (
    <tr key={i}>
      {subject.courseCode ? (
        <td>{removeFilter(subject.courseCode)}</td>
      ) : (
        <td />
      )}

      <td>{removeFilter(subject.name)}</td>

      {subject.grade ? <td>{removeFilter(subject.grade)}</td> : <td />}

      {subject.courseCredit ? (
        <td>{removeFilter(subject.courseCredit)}</td>
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

const CertificateViewer = ({ certificate, verify }) => {
  const {
    badge: { name, criteria, issuer, evidence, evidencePrivacyFilter },
    profile,
    issuedOn
  } = certificate;

  return (
    <div>
      <div className="w-100 cf">
        <div className="fl w-70">
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
        <div className="fl w-30">{verify || <div>Verify</div>}</div>
      </div>

      <h3>Transcript</h3>
      {renderTranscript(evidencePrivacyFilter, evidence)}

      <h3>Details</h3>
      {criteria}
    </div>
  );
};

CertificateViewer.propTypes = {
  certificate: PropTypes.object,
  verify: PropTypes.object
};

export default CertificateViewer;
