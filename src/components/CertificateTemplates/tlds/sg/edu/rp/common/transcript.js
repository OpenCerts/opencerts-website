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

export const renderGradingSystem = certificate => {
  // get the template name
  const strTemplate = get(certificate, "$template");
  // check it is PET template
  const isCET = strTemplate.substr(15, 6) === "P-MAIN" ? 0 : 1;
  // check whether it is DPLUS template
  const isNOTDPLUS = strTemplate.substr(15, 4) === "C-DP" ? 0 : 1;

  // if PET or DPLUS, display grading system otherwise do not display
  return isNOTDPLUS && isCET ? null : (
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
                  <th style={{ width: "25%", textDecoration: "underline" }}>
                    Point
                  </th>
                  <th style={{ width: "50%", textDecoration: "underline" }}>
                    Description
                  </th>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>A</td>
                  <td>4.0</td>
                  <td>Excellent</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>B+</td>
                  <td>3.5</td>
                  <td>Very Good</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>B</td>
                  <td>3.0</td>
                  <td>Good</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>C+</td>
                  <td>2.5</td>
                  <td>Satisfactory</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>C</td>
                  <td>2.0</td>
                  <td>Acceptable</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>D+</td>
                  <td>1.5</td>
                  <td>Conditional Pass</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>D</td>
                  <td>1.0</td>
                  <td>Conditional Pass</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <table style={fullTableWidthStyle}>
              <tbody>
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
                  <th style={{ width: "25%", textDecoration: "underline" }}>
                    Point
                  </th>
                  <th style={{ width: "50%", textDecoration: "underline" }}>
                    Description
                  </th>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>E</td>
                  <td>0.5</td>
                  <td>Fail</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>F</td>
                  <td>0.0</td>
                  <td>Fail</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>P</td>
                  <td>2.0</td>
                  <td>Pass</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>N</td>
                  <td>-</td>
                  <td>Null(Defaulted)</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>Pass*</td>
                  <td>-</td>
                  <td>Pass with Commendation</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>Pass</td>
                  <td>-</td>
                  <td>Pass</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>Fail</td>
                  <td>-</td>
                  <td>Fail</td>
                </tr>
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
                  <th style={{ width: "25%", textDecoration: "underline" }}>
                    Point
                  </th>
                  <th style={{ width: "50%", textDecoration: "underline" }}>
                    Description
                  </th>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>DIST</td>
                  <td>4.0</td>
                  <td>Distinction*</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>A</td>
                  <td>4.0</td>
                  <td>Excellent</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>B+</td>
                  <td>3.5</td>
                  <td>Very Good</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>B</td>
                  <td>3.0</td>
                  <td>Very Good</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>C+</td>
                  <td>2.5</td>
                  <td>Good</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>C</td>
                  <td>2.0</td>
                  <td>Good</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>D+</td>
                  <td>1.5</td>
                  <td>Pass</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <table style={fullTableWidthStyle}>
              <tbody>
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
                  <th style={{ width: "25%", textDecoration: "underline" }}>
                    Point
                  </th>
                  <th style={{ width: "50%", textDecoration: "underline" }}>
                    Description
                  </th>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>D</td>
                  <td>1.0</td>
                  <td>Pass</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>F</td>
                  <td>0.0</td>
                  <td>Fail</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>Pass*</td>
                  <td>-</td>
                  <td>Pass with Commendation</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>Pass</td>
                  <td>-</td>
                  <td>Pass</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>Fail</td>
                  <td>-</td>
                  <td>Fail</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>Exempted</td>
                  <td>-</td>
                  <td>Exempted from taking the module</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "10px" }}>Incomplete</td>
                  <td>-</td>
                  <td>Incomplete</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          ^Distinction is awarded from Academic Year 2012 onwards. <br />
          Incomplete Grade is implemented from Academic Year 2012 Semester 2
          onwards for G901 Character and Citizenship Education module. <br />A
          module for which grade point or modular credit is not accorded will
          not be considered in the computation of the cGPA.
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
  const studentId = get(certificate, "additionalData.studentId");
  const admissionDate = get(certificate, "admissionDate");
  const graduationDate = get(certificate, "graduationDate");
  const strTemplate = get(certificate, "$template");
  const isCET = strTemplate.substr(15, 6) === "P-MAIN" ? 0 : 1;

  // Group all modules by semesters
  const groupedSubjects = groupBy(course, "semester");

  const renderedSemesters = Object.keys(groupedSubjects).map(semester =>
    groupedSubjects[semester].map((s, i) => (
      <tr key={i}>
        <td>{i ? null : s.semester.toString()}</td>
        <td>{s.courseCode !== "ZZZ" ? s.courseCode : ""}</td>
        <td style={{ textAlign: "left" }}>
          {s.courseCode !== "ZZZ" ? s.name : formatBold(s.name)}
        </td>
        <td>{isCET > 0 || s.courseCode === "ZZZ" ? "" : s.courseCredit}</td>
        <td>{s.courseCode !== "ZZZ" ? s.grade : ""}</td>
      </tr>
    ))
  );

  return (
    <div>
      <br />
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col-3">Name</div>
            <div className="col-9">
              :&nbsp;&nbsp;
              {recipientName}
            </div>
          </div>
          <div className="row">
            <div className="col-3">Course</div>
            <div className="col-9">
              :&nbsp;&nbsp;
              {certificate.name}
            </div>
          </div>
          <div className="row">
            <div className="col-3">NRIC/FIN</div>
            <div className="col-9">
              :&nbsp;&nbsp;
              {recipientNric}
            </div>
          </div>
          <div className="row">
            <div className="col-3">Student ID</div>
            <div className="col-9">
              :&nbsp;&nbsp;
              {studentId}
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
            <div
              className="col-9 justify-content-right"
              style={{ textAlign: "right" }}
            >
              Date of Admission:
            </div>
            <div
              className="col-3 justify-content-right"
              style={{ textAlign: "right" }}
            >
              {formatDDMMMYYYY(admissionDate)}
            </div>
          </div>
          <div className="row">
            <div
              className="col-9 justify-content-right"
              style={{ textAlign: "right" }}
            >
              Date of Endorsement:
            </div>
            <div
              className="col-3 justify-content-right"
              style={{ textAlign: "right" }}
            >
              {formatDDMMMYYYY(graduationDate)}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col text-center">
          <table style={fullWidthStyle}>
            <tbody>
              <tr>
                <th>
                  <u>SEMESTER</u>
                </th>
                <th>
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

export const renderGPA = certificate => {
  const GPA = get(certificate, "cumulativeScore", undefined);
  const WithMerit = get(certificate, "additionalData.merit");
  const WithMeritTag = WithMerit === "Y" ? "with Merit" : "";
  const strTemplate = get(certificate, "$template");
  const isCET = strTemplate.substr(15, 6) === "P-MAIN" ? 0 : 1;
  const isNOTDPLUS = strTemplate.substr(15, 4) === "C-DP" ? 0 : 1;

  return GPA ? (
    <div className="row">
      <div className="col-3"> </div>
      <div className="col-6" style={boxStyle}>
        <br />
        {isNOTDPLUS && isCET
          ? null
          : "Grade Point Average (GPA): ".concat(GPA, " /4.00")}
        <br />
        Awarded the {formatBold(certificate.name)} {formatBold(WithMeritTag)}
        <br />
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
