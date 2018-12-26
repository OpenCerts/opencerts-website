import PropTypes from "prop-types";
import { get, groupBy } from "lodash";
import {
  renderHeader,
  renderSignature,
  renderFinalStatement,
  fullWidthStyle,
  thWidth60Left
} from "../common/transcript";

import { formatDate } from "../common/functions";

const renderDPPGradingSystem = () => (
  <div className="row">
    <div className="col-6" />
    <div className="col-6 border" style={{ fontSize: "0.6rem" }}>
      <div className="text-center">
        <u>GRADING SYSTEM</u>
      </div>
      <div className="text-center" style={{ fontSize: "0.5rem" }}>
        (EFFECTIVE FOR JULY 2001 INTAKE)
      </div>
      <div className="row">
        <div className="col">
          <table>
            <tbody>
              <tr>
                <th>GRADE</th>
                <th>MARKS</th>
                <th>DESCRIPTION</th>
              </tr>
              <tr>
                <td>AD*</td>
                <td>80 - 100%</td>
                <td>DISTINCTION</td>
              </tr>
              <tr>
                <td>A+</td>
                <td>85 - 100%</td>
                <td>EXCELLENT</td>
              </tr>
              <tr>
                <td>A</td>
                <td>80 - 84%</td>
                <td>EXCELLENT</td>
              </tr>
              <tr>
                <td>B+</td>
                <td>75 - 79%</td>
                <td>VERY GOOD</td>
              </tr>
              <tr>
                <td>B</td>
                <td>70 - 74%</td>
                <td>VERY GOOD</td>
              </tr>
              <tr>
                <td>C+</td>
                <td>65 - 69%</td>
                <td>GOOD</td>
              </tr>
              <tr>
                <td>C</td>
                <td>60 - 64%</td>
                <td>GOOD</td>
              </tr>
              <tr>
                <td>D+</td>
                <td>55 - 59%</td>
                <td>PASS</td>
              </tr>
              <tr>
                <td>D</td>
                <td>50 - 54%</td>
                <td>PASS</td>
              </tr>
              <tr>
                <td>F</td>
                <td>0 - 49%</td>
                <td>FAIL</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col">
          <table>
            <tbody>
              <tr>
                <th>GRADE</th>
                <th>DESCRIPTION</th>
              </tr>
              <tr>
                <td>PX</td>
                <td>PASS IN MODULES GRADED PASS OR FAIL ONLY</td>
              </tr>
              <tr>
                <td>ABS</td>
                <td>ABSENT</td>
              </tr>
              <tr>
                <td>DB</td>
                <td>DEBARRED</td>
              </tr>
              <tr>
                <td>EX</td>
                <td>CREDIT EXEMPTION</td>
              </tr>
              <tr>
                <td>TRF</td>
                <td>CREDIT TRANSFER</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>* DISTINCTION GRADE IS AWARDED TO THE TOP 5% COHORT</div>
    </div>
  </div>
);

const renderExamDate = (examDate, examDateId) => {
  const subjectRows = examDate.map((s, i) => (
    <tr key={i}>
      <td style={thWidth60Left}>{s.name}</td>
      <td>{s.grade}</td>
    </tr>
  ));
  const date = get(examDate, "[0].examinationDate");
  return (
    <div className="col-6 my-4" key={examDateId}>
      <div className="row m-0 mb-2">
        <div style={{ fontWeight: 700 }}>
          DATE OF EXAM&nbsp;:&nbsp;
          {formatDate(date)}
        </div>
      </div>
      <table style={fullWidthStyle}>
        <tbody>
          <tr>
            <th>MODULE</th>
            <th>GRADE</th>
          </tr>
          {subjectRows}
        </tbody>
      </table>
    </div>
  );
};

const renderTranscript = certificate => {
  // Group all modules by exam dates
  const transcript = get(certificate, "transcript");
  const groupedSubjects = groupBy(transcript, "examinationDate");
  const renderedExamDates = Object.keys(groupedSubjects).map(examDate =>
    renderExamDate(groupedSubjects[examDate], examDate)
  );

  return <div className="row">{renderedExamDates}</div>;
};

const renderStudentInfo = certificate => (
  <div>
    <hr />
    <div className="row">
      <div className="col">
        <div className="row">
          <div style={{ fontFamily: "Black Han Sans" }} className="col-3">
            Name
          </div>
          <div className="col-9">
            :&nbsp;&nbsp;
            {get(certificate, "recipient.name")}
          </div>
        </div>
        <div className="row">
          <div className="col-3">COURSE</div>
          <div className="col-9">
            :&nbsp;&nbsp;
            {get(certificate, "description")}
          </div>
        </div>
        <div className="row">
          <div className="col-3">NRIC/FIN</div>
          <div className="col-9">
            :&nbsp;&nbsp;
            {get(certificate, "recipient.nric")}
          </div>
        </div>
        <div className="row">
          <div className="col-3">STUDENT NO</div>
          <div className="col-9">
            :&nbsp;&nbsp;
            {get(certificate, "additionalData.studentId")}
          </div>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <div className="col-12">&nbsp;</div>
        </div>
        <div className="row">
          <div className="col-12">&nbsp;</div>
        </div>
        <div className="row">
          <div className="col-12">&nbsp;</div>
        </div>
        <div className="row">
          <div className="col-5">DATE OF GRADUATION</div>
          <div className="col-7">
            :&nbsp;&nbsp;
            {formatDate(certificate.graduationDate)}
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div className="row">
      <div className="col-12" style={{ fontWeight: 700 }}>
        CERTIFICATE IN {get(certificate, "name", "").toUpperCase()}
      </div>
    </div>
  </div>
);

const Template = ({ certificate }) => (
  <div className="container" style={{ fontSize: "0.9rem" }}>
    <link
      href="https://fonts.googleapis.com/css?family=Black+Han+Sans"
      rel="stylesheet"
    />
    {renderHeader(certificate)}
    {renderDPPGradingSystem()}
    {renderStudentInfo(certificate)}
    {renderTranscript(certificate, { hideCredit: true })}
    {renderFinalStatement(certificate)}
    {renderSignature(certificate)}
    <hr />
  </div>
);

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
