import PropTypes from "prop-types";
import { get } from "lodash";
import { format } from "date-fns";
import { transcriptLogo } from "./resources";

import { trasnciptHeaderContainerClass, transciptLogoClass }from "./styles.scss";


const getTranscriptSummaries = transcriptSummaries => transcriptSummaries.map((summary, key) => (
  <div key={key} className="row mb-2 mb-lg-3">
    {summary.note}
  </div>
));

const getTranscriptSection = transcriptData => (
  <div style={{ overflowX: "auto" }} className="row mb-4">
    <table cellPadding="10" className="w-100">
      <tbody>
        <tr style={{ borderTop: "4px solid black", borderBottom: "4px solid black" }}>
          <th>Year</th>
          <th>Code</th>
          <th>Module Name</th>
          <th>Grade</th>
          <th>Description</th>
        </tr>
        {transcriptData.map((course, key) => (
          <tr key={key}>
            <td>
              {format(course.examinationDate, "YYYY")}
            </td>
            <td>
              {course.courseCode}
            </td>
            <td>
              {course.name}
            </td>
            <td>
              {course.grade}
            </td>
            <td>
              {course.gradeDescription}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const getTranscriptSignatories = transcriptSignatories => (
  <div className="col-3">
    {transcriptSignatories.map((signatorie, key) => (
      <div key={key} className="text-center mb-4 mb-lg-5">
        <img className="w-100" src={signatorie.signature} />
        <div>{signatorie.name}</div>
        <div>{signatorie.position}</div>
      </div>
    ))}
  </div>
);

const getGradeClassification = () => (
  <div
    className="col-6 mb-4 mb-lg-5"
    style={{ fontSize: "0.9rem", border: "1px solid #000000", overflowX: "auto" }}
  >
    <div className="text-center mt-2 mt-lg-3 mb-2 mb-lg-3">
      <u style={{ fontWeight: "bold" }}>GRADE CLASSIFICATION</u>
    </div>
    <table className="w-100 mb-2 mb-lg-3">
      <tbody>
        <tr>
          <td>A*</td>
          <td>High Distinction</td>
          <td>85 & above</td>
        </tr>
        <tr>
          <td>A</td>
          <td>Distinction</td>
          <td>75 - 84</td>
        </tr>
        <tr>
          <td>B</td>
          <td>Credit</td>
          <td>65 - 74</td>
        </tr>
        <tr>
          <td>C</td>
          <td>Pass</td>
          <td>55 - 64</td>
        </tr>
        <tr>
          <td>D</td>
          <td>Supplementary Pass +</td>
          <td>50 & above</td>
        </tr>
        <tr>
          <td>E</td>
          <td>Conditional Pass ++</td>
          <td>35 - 49</td>
        </tr>
        <tr>
          <td>F</td>
          <td>Fail</td>
          <td>34 & below</td>
        </tr>
        <tr>
          <td>NG</td>
          <td>Not Graded</td>
          <td>NG</td>
        </tr>
      </tbody>
    </table>
    <div className="mb-2 mb-lg-3">
      <table className="w-100 mb-2 mb-lg-3">
        <tbody>
          <tr>
            <th></th>
            <th style={{ textDecoration: "underline", fontWeight: "bold" }}>Notes</th>
          </tr>
          <tr>
            <td>+</td>
            <td>Applicable to candidates who pass after re-sit</td>
          </tr>
          <tr>
            <td>++</td>
            <td>
              Candidates must not exceed the minimun number of
              Conditional Passes to qualify for the Academic Award.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const Template = ({ certificate }) => {
  const certificateName = get(certificate, "name");
  const issuedOn = get(certificate, "issuedOn");
  const studentName = get(certificate, "recipient.name");
  const studentId = get(certificate, "recipient.nric");
  const transcriptData = get(certificate, "transcript", []);
  const transcriptSummaries = get(certificate, "TranscriptSummary", []);
  const additionalData = get(certificate, "additionalData", {});
  const transcriptSignatories = get(additionalData, "transcriptSignatories", []);

  return (
    <div style={{ fontFamily: "Arial", maxWidth: 900 }} className="container">
      <div className={`mb-4 mb-lg-5 ${trasnciptHeaderContainerClass}`}>
        <img
          src={transcriptLogo}
          className={`w-100 ${transciptLogoClass}`}
          style={{ maxWidth: 600, maxHeight: 85 }}
        />
        <div
          style={{ color: "#065f2c", fontFamily: "Times New Roman", fontWeight: "700" }}
          className="h2 text-center"
        >
          RESULT TRANSCRIPT
        </div>
      </div>
      <div className="row mb-4">
        {issuedOn && <div className="w-100">Date: ${format(issuedOn, "DD MMMM YYYY")}</div>}
        <div className="w-100">Name of Student: {studentName}</div>
        <div lassName="w-100">Student ID: {studentId}</div>
        <div className="w-100">Course Admitted: {certificateName}</div>
      </div>
      {transcriptSummaries !== [] && getTranscriptSummaries(transcriptSummaries)}
      {transcriptData !== [] && [
        getTranscriptSection(transcriptData),
        <div className="row d-flex mb-4 mb-lg-5">
          <div style={{ padding: 0, textDecoration: "underline" }} className="col-2">RESULT:</div>
          <div className="col-10">
            Student has satisfied all requirements for above Course and the Academic Board has
            approved the award of {transcriptData[0].programDescription}
            {additionalData.merit && ` (${additionalData.merit})`}
          </div>
        </div>
      ]}

      <div className="d-flex">
        {transcriptSignatories !== [] && getTranscriptSignatories(transcriptSignatories)}
        <div className="col-3" />
        {getGradeClassification()}
      </div>
      <div>Copy: Academic Record.</div>
    </div>
  );
}

Template.propTypes = {
  certificate: PropTypes.object.isRequired,
};

export default Template;
