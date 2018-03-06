import PropTypes from "prop-types";

const iconText = (icon, text, key) => (
  <div key={key} className="fl w-third pa2 h4">
    <div className="fl w-third pa2 v-mid tc">
      <i className={icon} />
    </div>
    <div className="fl w-two-thirds pa2" style={{ overflowWrap: "break-word" }}>
      {text}
    </div>
  </div>
);

const renderProfiles = profiles => {
  const profileBox = (p, i) => {
    // TODO add support for hashed values
    const { type, identity } = p;

    let icon = "fas fa-id-badge fa-2x";

    if (type === "email") icon = "far fa-envelope fa-2x";
    if (type === "did") icon = "fas fa-id-card fa-2x";
    if (type === "url") icon = "fas fa-globe fa-2x";
    if (type === "telephone") icon = "fas fa-phone fa-2x";

    return iconText(icon, identity, i);
  };
  const profileBoxes = profiles.length
    ? profiles.map((p, i) => profileBox(p, i))
    : profileBox(profiles, null);

  return (
    <div>
      <h2>Issued To</h2>
      {profileBoxes}
      <div className="cb" />
    </div>
  );
};

const renderIssuer = issuer => {
  const { name, url, email } = issuer;

  const nameComponent = name ? iconText("fas fa-id-card fa-2x", name) : null;
  const urlComponent = url ? iconText("fas fa-globe fa-2x", url) : null;
  const emailComponent = email
    ? iconText("far fa-envelope fa-2x", email)
    : null;

  return (
    <div>
      <h2>Issued By</h2>
      {nameComponent}
      {urlComponent}
      {emailComponent}
      <div className="cb" />
    </div>
  );
};

const renderHeader = (name, criteria) => (
  <div className="pb3">
    <h1>{name}</h1>
    <div>{criteria}</div>
  </div>
);

const renderTranscript = (evidencePrivacyFilter, evidence) => {
  if (!evidence || !evidencePrivacyFilter) return null;

  const { saltLength } = evidencePrivacyFilter;
  const { transcript } = evidence;

  if (!transcript) return null;

  const removeFilterCurry = filterLength => word =>
    word ? word.substring(filterLength + 1) : "==REDACTED==";
  const removeFilter = removeFilterCurry(Number(saltLength));

  const subjectComponents = transcript.map((subject, i) => (
    <div key={i} className="fl w-third pa2 h4">
      <div className="f4 lh-copy underline">{removeFilter(subject.name)}</div>
      {subject.courseCode && (
        <div>Course Code: {removeFilter(subject.courseCode)}</div>
      )}
      {subject.courseCredit && (
        <div>Course Credit: {removeFilter(subject.courseCredit)}</div>
      )}
      {subject.grade && <div>Grade: {removeFilter(subject.grade)}</div>}
    </div>
  ));

  return (
    <div>
      <h2>Transcript</h2>
      {subjectComponents}
      <div className="cb" />
    </div>
  );
};

const CertificateViewer = ({ certificate }) => {
  const {
    badge: { name, criteria, issuer, evidence, evidencePrivacyFilter },
    profile
  } = certificate;

  return (
    <div>
      {renderHeader(name, criteria)}
      <hr />

      {renderTranscript(evidencePrivacyFilter, evidence)}

      {renderProfiles(profile)}

      {renderIssuer(issuer)}
    </div>
  );
};

CertificateViewer.propTypes = {
  certificate: PropTypes.object
};

export default CertificateViewer;
