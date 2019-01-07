import { get, groupBy } from "lodash";

const fullWidthStyle = {
  width: "100%",
  height: "auto"
};

const boldText = {
  fontWeight: "bold"
};

const centerAlign = {
  textAlign: "center"
};

const indentText = {
  marginLeft: "1em"
};

const formatDate = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];
  const month = date.getMonth();
  const year = date.getUTCFullYear();
  return `${months[month]} ${year}`;
};

const renderHeader = certificate => (
  <div className="row">
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-12">
          <strong>I certify that in the</strong>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-11">{certificate.name}</div>
      </div>
    </div>
  </div>
);

const renderCandidateInfo = certificate => {
  // Get exam level
  const examLevel = get(certificate, "additionalData.examLevel", undefined);

  if (examLevel === "PSLE") {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-2">
              <strong>held in the year</strong>
            </div>
            <div className="col-md-10">
              {certificate.additionalData.examYear}
            </div>
          </div>
          <div className="row">&nbsp;</div>
          <div className="row">
            <div className="col-md-1">
              <strong>Candidate</strong>
            </div>
            <div className="col-md-11">{certificate.recipient.name}</div>
          </div>
          <div className="row">&nbsp;</div>
          <div className="row">
            <div className="col-md-1">
              <strong>of</strong>
            </div>
            <div className="col-md-11">
              {certificate.additionalData.candidateSchool}
            </div>
          </div>
          <div className="row">&nbsp;</div>
          <div className="row">
            <div className="col-md-3">
              <strong>NRIC/Foreign Identification No.</strong>
            </div>
            <div className="col-md-3">{certificate.recipient.did}</div>
            <div className="col-md-3">
              <strong>Index No.</strong>
            </div>
            <div className="col-md-3">{certificate.additionalData.indexNo}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-3">
            <strong>Examination held in the year</strong>
          </div>
          <div className="col-md-9">{certificate.additionalData.examYear}</div>
        </div>
        <div className="row">&nbsp;</div>
        <div className="row">
          <div className="col-md-1">
            <strong>Candidate</strong>
          </div>
          <div className="col-md-11">{certificate.recipient.name}</div>
        </div>
        <div className="row">&nbsp;</div>
        <div className="row">
          <div className="col-md-3">
            <strong>NRIC/Foreign Identification No.</strong>
          </div>
          <div className="col-md-3">{certificate.recipient.did}</div>
          <div className="col-md-3">
            <strong>Index No.</strong>
          </div>
          <div className="col-md-3">{certificate.additionalData.indexNo}</div>
        </div>
      </div>
    </div>
  );
};

const renderTranscript = certificate => {
  // Get exam level
  const examLevel = get(certificate, "additionalData.examLevel", undefined);

  // Get transcript info
  const transcript = get(certificate, "transcript");

  const transcriptDetailsPSLE = transcript.map(trn => (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-2">&nbsp;</div>
          <div className="col-md-6">{trn.name}</div>
          <div className="col-md-3">{trn.grade}</div>
          <div className="col-md-1">&nbsp;</div>
        </div>
      </div>
    </div>
  ));

  const transcriptDetailsGCEON = transcript.map(trn => (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-3">
            <span style={trn.subTranscript === "Y" ? indentText : {}}>
              {trn.name}
            </span>
          </div>
          <div className="col-md-3" style={centerAlign}>
            <div className="row">
              <div className="col-md-6">{trn.grade}</div>
              <div className="col-md-6">{trn.score}</div>
            </div>
          </div>
          <div className="col-md-2">{trn.level}</div>
          <div className="col-md-2">{trn.languageMedium}</div>
          <div className="col-md-2">{trn.examAuth}</div>
        </div>
      </div>
    </div>
  ));

  const transcriptDetailsGCEA = transcript.map(trn => (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6">{trn.name}</div>
          <div className="col-md-2">{trn.level}</div>
          <div className="col-md-2">{trn.grade}</div>
          <div className="col-md-2">{trn.examAuth}</div>
        </div>
      </div>
    </div>
  ));

  if (examLevel === "PSLE") {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row" style={boldText}>
            <div className="col-md-12">
              obtained the grades for the subject stated below:
            </div>
          </div>
          <div className="row">&nbsp;</div>
          <div className="row" style={boldText}>
            <div className="col-md-2">&nbsp;</div>
            <div className="col-md-6">SUBJECT</div>
            <div className="col-md-3">GRADE</div>
            <div className="col-md-1">&nbsp;</div>
          </div>
          <div className="row">&nbsp;</div>
          {transcriptDetailsPSLE}
        </div>
      </div>
    );
  }
  if (examLevel === "GCEO" || examLevel === "GCEN") {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row" style={boldText}>
            <div className="col-md-12">
              obtained the grades for the subject stated below:
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">&nbsp;</div>
          </div>
          <div className="row" style={boldText}>
            <div className="col-md-3">SUBJECT</div>
            <div className="col-md-3" style={centerAlign}>
              <div className="row">
                <div className="col-md-12">GRADE</div>
              </div>
              <div className="row">
                <div className="col-md-6">ALPHABETICAL</div>
                <div className="col-md-6">NUMERICAL</div>
              </div>
            </div>
            <div className="col-md-2">LEVEL</div>
            <div className="col-md-2">LANGUAGE MEDIUM</div>
            <div className="col-md-2">EXAMINING AUTHORITY</div>
          </div>
          <div className="row">&nbsp;</div>
          {transcriptDetailsGCEON}
          <div className="row">&nbsp;</div>
          <div className="row">
            <div className="col-md-3">*****************************</div>
            <div className="col-md-3" style={centerAlign}>
              <div className="row">
                <div className="col-md-6">*******</div>
                <div className="col-md-6">*******</div>
              </div>
            </div>
            <div className="col-md-2">***************</div>
            <div className="col-md-2">***************</div>
            <div className="col-md-2">*************</div>
          </div>
          <div className="row">&nbsp;</div>
          <div className="row">&nbsp;</div>
          <div className="row">
            <div className="col-md-3">
              <strong>Total number of subjects recorded:</strong>
            </div>
            <div className="col-md-3">
              <center>{certificate.additionalData.totSubjects}</center>
            </div>
            <div className="col-md-6" />
          </div>
        </div>
      </div>
    );
  }
  if (examLevel === "GCEA") {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row" style={boldText}>
            <div className="col-md-12">
              obtained the grades for the subject stated below:
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">&nbsp;</div>
          </div>
          <div className="row" style={boldText}>
            <div className="col-md-6">SUBJECT</div>
            <div className="col-md-2">LEVEL</div>
            <div className="col-md-2">GRADE</div>
            <div className="col-md-2">EXAMINING AUTHORITY</div>
          </div>
          <div className="row">&nbsp;</div>
          {transcriptDetailsGCEA}
          <div className="row">&nbsp;</div>
          <div className="row">
            <div className="col-md-6">*****************************</div>
            <div className="col-md-2">***************</div>
            <div className="col-md-2">***************</div>
            <div className="col-md-2">*************</div>
          </div>
          <div className="row">&nbsp;</div>
          <div className="row">&nbsp;</div>
          <div className="row">
            <div className="col-md-3">
              <strong>Total number of subjects recorded:</strong>
            </div>
            <div className="col-md-3">
              <center>{certificate.additionalData.totSubjects}</center>
            </div>
            <div className="col-md-6" />
          </div>
        </div>
      </div>
    );
  }
};

const renderFooter = certificate => {
  const issuers = get(certificate, "issuers");
  const issuerName = issuers.map(issuer => issuer.name);

  // Get exam level
  const examLevel = get(certificate, "additionalData.examLevel", undefined);

  if (examLevel === "PSLE") {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-1">&nbsp;</div>
            <div className="col-md-4">
              <strong>AGGREGATE SCORE</strong>
            </div>
            <div className="col-md-7">
              : {certificate.additionalData.aggregateScore}
            </div>
          </div>
          <div className="row">
            <div className="col-md-1">&nbsp;</div>
            <div className="col-md-4">
              <strong>OVERALL RESULTS</strong>
            </div>
            <div className="col-md-7">
              : {certificate.additionalData.overallResults}
            </div>
          </div>
          <div className="row">
            <div className="col-md-1">&nbsp;</div>
            <div className="col-md-4">
              <strong>STREAM ELIGIBLE FOR</strong>
            </div>
            <div className="col-md-7">
              : {certificate.additionalData.eligibleStream}
            </div>
          </div>
          <div className="row">&nbsp;</div>
          <div className="row">
            <div className="col-md-1">&nbsp;</div>
            <div className="col-md-4">
              <strong>HIGHEST AGGREGATE SCORE</strong>
            </div>
            <div className="col-md-7">
              : {certificate.additionalData.highestAggregateScore}
            </div>
          </div>
          <div className="row">
            <div className="col-md-1">&nbsp;</div>
            <div className="col-md-4">
              <strong>LOWEST AGGREGATE SCORE</strong>
            </div>
            <div className="col-md-7">
              : {certificate.additionalData.lowestAggregateScore}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-4">
            <strong>This statement is issued to</strong>
          </div>
          <div className="col-md-8">{certificate.recipient.name}</div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <img src={certificate.additionalData.certifierSignature} />
          </div>
          <div className="col-md-10" />
        </div>
        <div className="row">
          <div className="col-md-12">
            {certificate.additionalData.certifierName}
            <div className="row">&nbsp;</div>
            <div className="row">
              <div className="col-md-6">
                {certificate.additionalData.certifierTitle}
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <strong>Date of Issue</strong>
                  </div>
                  <div className="col-md-8">
                    {certificate.additionalData.issueDate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <strong>{issuerName}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

const Template = certificate => (
  <div className="container" style={{ fontSize: "0.9rem" }}>
    {renderHeader(certificate)}
    <div className="row">&nbsp;</div>
    {renderCandidateInfo(certificate)}
    <div className="row">&nbsp;</div>
    <div className="row">&nbsp;</div>
    {renderTranscript(certificate)}
    <div className="row">&nbsp;</div>
    <div className="row">&nbsp;</div>
    <div className="row">&nbsp;</div>
    {renderFooter(certificate)}
  </div>
);

export default Template;
