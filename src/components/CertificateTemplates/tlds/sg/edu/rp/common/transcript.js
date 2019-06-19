import PropTypes from "prop-types";
import { get, groupBy } from "lodash";
import { IMG_LOGO_RP_HORIZONTAL } from "./images";
import {
  formatDDMMMYYYY,
  formatBold,
  formatSignatoriesPosition
} from "./functions";

export const fullWidthStyle = {
  width: "100%",
  height: "auto"
};

export const fullTableWidthStyle = {
  width: "100%",
  border: "1px solid black",
  height: "auto"
};

export const thWidth60Left = {
  width: "60%",
  textAlign: "left"
};

export const signatureTextStyle = {
  color: "#050",
  fontSize: "1.0rem"
};

export const titleTextStyle = {
  fontSize: "2.0rem",
  textAlign: "center",
  fontWeight: "bold"
};

export const boxStyle = {
  border: 2,
  borderColor: "#AAA",
  borderStyle: "solid",
  textAlign: "center"
};

export const renderHeader = () => (
  <div className="row">
    <div className="col-4">
      <img style={fullWidthStyle} src={IMG_LOGO_RP_HORIZONTAL} />
    </div>
    <div className="col-2" />
    <div className="col-6">
      <div style={titleTextStyle}>TRANSCRIPT OF ACADEMIC RECORD</div>
    </div>
  </div>
);

// additional remarks for PET only
export const renderRemarksGradingSystem = isNOTDPLUS => (
  <span>
    <br />
    Incomplete Grade is implemented from Academic Year 2012 Semester 2 onwards
    {isNOTDPLUS ? " for G901 Character and Citizenship Education module" : null}
    . <br />A module for which grade point or modular credit is not accorded
    will not be considered in the computation of the cGPA.
  </span>
);

export const renderTableHeader = () => (
  <tr>
    <th
      style={{
        width: "25%",
        textDecoration: "underline",
        paddingLeft: "10px"
      }}
    >
      Grade
    </th>
    <th style={{ width: "25%", textDecoration: "underline" }}>Point</th>
    <th style={{ width: "50%", textDecoration: "underline" }}>Description</th>
  </tr>
);

export const renderGradeList = listGrade => {
  const strList = listGrade.map((obj, i) => (
    <tr key={i}>
      <td style={{ paddingLeft: "10px" }}>{obj.grade}</td>
      <td>{obj.score}</td>
      <td>{obj.desc}</td>
    </tr>
  ));
  return strList;
};

export const renderGradingSystem = certificate => {
  // get the template name
  const strTemplate = get(certificate, "$template");
  // check it is PET template
  const isCET = strTemplate.substr(15, 6) === "P-MAIN" ? 0 : 1;
  // check whether it is DPLUS template
  const isNOTDPLUS = strTemplate.substr(15, 4) === "C-DP" ? 0 : 1;

  const listGradeText1L = [
    { grade: "A", score: "4.0", desc: "Excellent" },
    { grade: "B+", score: "3.5", desc: "Very Good" },
    { grade: "B", score: "3.0", desc: "Good" },
    { grade: "C+", score: "2.5", desc: "Satisfactory" },
    { grade: "C", score: "2.0", desc: "Acceptable" },
    { grade: "D+", score: "1.5", desc: "Conditional Pass" },
    { grade: "D", score: "1.0", desc: "Conditional Pass" }
  ];

  const listGradeText1R = [
    { grade: "E", score: "0.5", desc: "Fail" },
    { grade: "F", score: "0.0", desc: "Fail" },
    { grade: "P", score: "2.0", desc: "Pass" },
    { grade: "N", score: "-", desc: "Null(Defaulted)" },
    { grade: "Pass*", score: "-", desc: "Pass with Commendation" },
    { grade: "Pass", score: "-", desc: "Pass" },
    { grade: "Fail", score: "-", desc: "Fail" }
  ];

  const listGradeText2L = [
    { grade: "DIST", score: "4.0", desc: "Distinction^" },
    { grade: "A", score: "4.0", desc: "Excellent" },
    { grade: "B+", score: "3.5", desc: "Very Good" },
    { grade: "B", score: "3.0", desc: "Very Good" },
    { grade: "C+", score: "2.5", desc: "Good" },
    { grade: "C", score: "2.0", desc: "Good" },
    { grade: "D+", score: "1.5", desc: "Pass" }
  ];

  const listGradeText2R = [
    { grade: "D", score: "1.0", desc: "Pass" },
    { grade: "F", score: "0.0", desc: "Fail" },
    { grade: "Pass*", score: "-", desc: "Pass with Commendation" },
    { grade: "Pass", score: "-", desc: "Pass" },
    { grade: "Fail", score: "-", desc: "Fail" },
    { grade: "Exempted", score: "-", desc: "Exempted from taking the module" }
  ];

  // if PET or DPLUS, display grading system otherwise do not display
  return (
    <div className="row">
      <div className="col-12" />
      <div className="col-12" style={{ fontSize: "0.9rem" }}>
        <p style={{ fontWeight: "bold" }}>
          <br />
          Academic Year 2003 to 2010
        </p>
        <div className="row">
          <div className="col-6">
            <table style={fullTableWidthStyle}>
              <tbody>
                {renderTableHeader()}
                {renderGradeList(listGradeText1L)}
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <table style={fullTableWidthStyle}>
              <tbody>
                {renderTableHeader()}
                {renderGradeList(listGradeText1R)}
              </tbody>
            </table>
          </div>
        </div>
        <p style={{ fontWeight: "bold" }}>
          <br />
          Academic Year 2011 onwards
        </p>
        <div className="row">
          <div className="col-6">
            <table style={fullTableWidthStyle}>
              <tbody>
                {renderTableHeader()}
                {renderGradeList(listGradeText2L)}
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <table style={fullTableWidthStyle}>
              <tbody>
                {renderTableHeader()}
                {renderGradeList(listGradeText2R)}
                <tr>
                  <td style={{ paddingLeft: "10px" }}>
                    {isCET ? " " : "Incomplete"}&nbsp;
                  </td>
                  <td>{isCET ? null : "-"}</td>
                  <td>{isCET ? null : "Incomplete"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          ^Distinction is awarded from Academic Year 2012 onwards.
          {isCET ? null : renderRemarksGradingSystem(isNOTDPLUS)}
        </p>
        <div
          className="row"
          style={{ padding: "5px 5px 5px 5px", border: "1px solid black" }}
        >
          <p>
            <span style={{ fontWeight: "bold" }}>
              {" "}
              Advanced Placement Credits{" "}
            </span>{" "}
            <br />
            Advanced Placement Credits are granted by Republic Polytechnic for
            modules taken and awarded a passed grade prior to admission to the
            Polytechnic. In this regard, Republic Polytechnic recognises these
            modules that are completed either at another educational institution
            or based on performance placement tests set by the Polytechnic.
          </p>
        </div>
        <p style={{ fontWeight: "bold" }}>
          <br />
          The medium of instruction used in this Polytechnic is English.
        </p>
      </div>
    </div>
  );
};

export const renderCourse = (certificate, course) => {
  // Get student info and course description
  const recipientName = get(certificate, "recipient.name");
  const recipientNric = get(certificate, "recipient.nric");
  const recipientFin = get(certificate, "recipient.fin");
  const recipientNricFin = !recipientNric ? recipientFin : recipientNric;
  const studentId = get(certificate, "recipient.studentId");
  const admissionDate = get(certificate, "admissionDate");
  const graduationDate = get(certificate, "graduationDate");
  const strTemplate = get(certificate, "$template");
  const isCET = strTemplate.substr(15, 6) === "P-MAIN" ? 0 : 1;

  // Group all modules by semesters
  const groupedSubjects = groupBy(course, "semester");

  const renderedSemesters = Object.keys(groupedSubjects).map(semester =>
    groupedSubjects[semester].map((s, i) => (
      <tr key={i}>
        <td style={{ textAlign: "left" }}>
          {i || s.semester === "-" ? null : formatBold(s.semester.toString())}
        </td>
        <td style={{ textAlign: "left" }}>
          {s.courseCode !== "ZZZ" ? s.courseCode : ""}
        </td>
        <td style={{ textAlign: "left" }}>
          {s.courseCode !== "ZZZ" || s.semester === "-"
            ? s.name
            : formatBold(s.name)}
        </td>
        <td>
          {isCET > 0 || s.courseCredit === 0 || s.courseCredit === "0"
            ? ""
            : s.courseCredit}
        </td>
        <td>{s.courseCode !== "ZZZ" ? s.grade.padEnd(2, " ") : ""}&nbsp;</td>
      </tr>
    ))
  );

  return (
    <div>
      <br />

      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col-2">Name</div>
            <div className="col-10">
              :&nbsp;&nbsp;
              {recipientName}
            </div>
          </div>
          <div className="row">
            <div className="col-2">Course</div>
            <div className="col-10">
              :&nbsp;&nbsp;
              {certificate.name}
            </div>
          </div>
          <div className="row">
            <div className="col-2">NRIC/FIN</div>
            <div className="col-4">
              :&nbsp;&nbsp;
              {recipientNricFin}
            </div>
            <div
              className="col-4 justify-content-right"
              style={{ textAlign: "right" }}
            >
              Date of Admission:
            </div>
            <div
              className="col-2 justify-content-right"
              style={{ textAlign: "right" }}
            >
              {formatDDMMMYYYY(admissionDate)}
            </div>
          </div>
          <div className="row">
            <div className="col-2">Student ID</div>
            <div className="col-4">
              :&nbsp;&nbsp;
              {studentId || certificate.additionalData.studentId}
            </div>
            <div
              className="col-4 justify-content-right"
              style={{ textAlign: "right" }}
            >
              Date of Endorsement:
            </div>
            <div
              className="col-2 justify-content-right"
              style={{ textAlign: "right" }}
            >
              {formatDDMMMYYYY(graduationDate)}
            </div>
          </div>
        </div>
      </div>
      <hr style={{ borderWidths: "2rem" }} />
      <div className="row">
        <div className="col text-center">
          <table style={fullWidthStyle}>
            <tbody>
              <tr>
                <th style={{ textAlign: "left" }}>
                  <u>{isCET ? "TERM" : "SEMESTER"}</u>
                </th>
                <th style={{ textAlign: "left" }}>
                  <u>MODULE</u>
                </th>
                <th>&nbsp;</th>
                <th>
                  <u>{isCET > 0 ? "" : "MODULAR CREDITS"}</u>
                </th>
                <th>
                  <u>GRADE</u>
                </th>
              </tr>
              {renderedSemesters}
            </tbody>
          </table>
        </div>
      </div>
      <br />
    </div>
  );
};

export const renderTranscript = certificate => {
  // Group all modules by courses
  const transcript = get(certificate, "transcript");
  // const groupedCourses = groupBy(transcript, "semester");
  const renderedCourses = renderCourse(certificate, transcript);

  return <div>{renderedCourses}</div>;
};

// display GPA for PET and DPLUS
export const renderPETGPA = GPA => (
  <span>
    Grade Point Average (GPA): {GPA} /4.00
    <br />
  </span>
);

export const renderGPA = certificate => {
  const GPA = get(certificate, "cumulativeScore", undefined);
  const WithMerit = get(certificate, "additionalData.merit");
  const WithMeritTag = WithMerit === "Y" ? "with Merit" : "";
  const strTemplate = get(certificate, "$template");
  const isCET = strTemplate.substr(15, 6) === "P-MAIN" ? 0 : 1;
  const isNOTDPLUS = strTemplate.substr(15, 4) === "C-DP" ? 0 : 1;
  const isNOTDCN = strTemplate.substr(15, 5) === "C-DCN" ? 0 : 1;

  return GPA ? (
    <div className="row">
      <div className="col-3"> </div>
      <div className="col-6" style={boxStyle}>
        {isNOTDPLUS && isCET && isNOTDCN ? null : renderPETGPA(GPA)}
        Awarded the {formatBold(certificate.name)} {formatBold(WithMeritTag)}
        <br />
      </div>
      <div className="col-3"> </div>

      <div className="col-12 text-center">
        <br />
        ----------------------------------------------------{" "}
        <strong>End of Transcript</strong>
        ----------------------------------------------------{" "}
      </div>
    </div>
  ) : null;
};

export const renderSignature = certificate => {
  const certSign = formatSignatoriesPosition(
    certificate.additionalData.transcriptSignatories[0].position
  );
  return (
    <div
      className="row d-flex justify-content-center align-items-end"
      style={{ marginTop: "8rem", marginBottom: "2rem" }}
    >
      <div className="col-6" />

      <div className="col-4">
        <div className="px-4">
          <img
            style={fullWidthStyle}
            src={certificate.additionalData.transcriptSignatories[0].signature}
          />
          <hr />
        </div>
        <div className="text-center">
          <span style={signatureTextStyle}>{certSign[0]}</span>
          <br />
          <span style={signatureTextStyle}>
            {certSign.length > 0 ? certSign[1] : null}
          </span>
          <br />
          <br />
          <br />
          {certificate.additionalData.transcriptId}
        </div>
      </div>

      <div className="col-2" />
    </div>
  );
};

const Template = ({ certificate }) => (
  <div className="container" style={{ fontSize: "0.9rem" }}>
    {renderHeader()}
    {renderTranscript(certificate)}
    {renderGPA(certificate)}
    {renderSignature(certificate)}
    {renderGradingSystem(certificate)}
  </div>
);

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
