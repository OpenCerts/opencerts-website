import { get, groupBy } from "lodash";
import { format } from "date-fns";

export const fullWidthStyle = {
  width: "100%",
  height: "auto"
};
export const tableStyle = {
  width: "100%",
  height: "auto"
};

export const alignCenter = {
  width: "20%",
  textAlign: "center"
};
export const alignRight = {
  width: "20%",
  textAlign: "right"
};
export const alignLeft = {
  width: "13%",
  textAlign: "left"
};
export const subjectCodeWidth = {
  width: "20%",
  textAlign: "left"
};

export const renderSemester = (semester = {}) => {
  const subjectRows = semester.map((s, i) => (
    <tr key={i}>
      <td style={subjectCodeWidth}>{s.subjectCode}</td>
      <td>{s.name}</td>
      <td style={alignRight}>{s.level}</td>
      <td style={alignCenter}>{s.courseCredit}</td>
      <td style={alignLeft}>{s.grade}</td>
    </tr>
  ));
  const term = get(semester, "[0].term");
  const termAverage = get(semester, "[0].termAverage");
  const cumalativeAverage = get(semester, "[0].cumalativeAverage");
  return (
    <div style={fullWidthStyle}>
      <table className="ml-3" style={tableStyle}>
        <tbody>
          <div className="row m-0 mb-2 mt-3">
            <div style={{ fontWeight: 700 }}>{term}&nbsp;&nbsp;TERM</div>
            <div className="ml-auto" style={{ fontWeight: 700 }} />
          </div>
          {subjectRows}
        </tbody>
      </table>
      <br />
      <div className="row m-0 mb-2 ml-3">
        <div>
          Term Grade Point Average&nbsp;:&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          <b>{termAverage}</b>
        </div>
      </div>
      <div className="row m-0 mb-2 ml-3">
        <div>
          Cumalative Grade Point Average&nbsp;:&nbsp;&nbsp;
          <b>{cumalativeAverage}</b>
        </div>
      </div>
      <div className="row d-flex justify-content-center ">
        <h3>*****</h3>
      </div>
    </div>
  );
};

export const renderTableHeader = () => (
  <div style={fullWidthStyle}>
    <table style={fullWidthStyle}>
      <tbody>
        <tr
          style={{
            border: "solid black",
            borderLeft: "0px",
            borderRight: "0px"
          }}
        >
          <th>Subject Code</th>
          <th>
            Subject Title&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
          </th>
          <th>Level&nbsp;</th>
          <th>Credits</th>
          <th>Grade</th>
        </tr>
      </tbody>
    </table>
  </div>
);

export const renderHeader = logo => (
  <div className="row">
    <div className="col">
      <br />
      <br />
      <br />
      <h5
        style={{
          color: "maroon"
        }}
      >
        <b>Academic Transcript</b>
      </h5>
    </div>
    <div className="col text-right">
      <img
        style={{
          fwidth: "100%",
          height: "100%"
        }}
        src={logo}
      />
    </div>
  </div>
);

export const renderCourse = (certificate, course, courseId) => {
  // Get student info and course description

  const recipientName = get(certificate, "recipient.name");
  const recipientDOB = get(certificate, "recipient.dob");
  const studentId = get(certificate, "additionalData.studentId");
  const admissionDate = get(certificate, "admissionDate");
  const currentCourse = get(course, "[0].programDescription");
  const programme = get(certificate, "additionalData.programme");

  // Group all modules by semesters
  const groupedSubjects = groupBy(course, "semester");
  const renderedSemesters = Object.keys(groupedSubjects).map(semester =>
    renderSemester(groupedSubjects[semester])
  );

  return (
    <div key={courseId}>
      <hr />
      <br />
      <br />
      <div className="row">
        <div className="col">
          <div>
            Name&nbsp;:&nbsp;<b>{recipientName}</b>
          </div>
          <div>
            NCS ID&nbsp;:&nbsp;<b>{studentId}</b>
          </div>
          <div>
            Date of Birth&nbsp;:&nbsp;
            <b>{format(recipientDOB, "DD MMM YYYY")}</b>
          </div>
          <div>
            Date of Admission&nbsp;:&nbsp;
            <b>{format(admissionDate, "DD MMM YYYY")}</b>
          </div>
          <br />

          <div className="row">
            <div className="col-3">Programme&nbsp;:</div>
            <div className="col-9">
              &nbsp;&nbsp;&nbsp;&nbsp;
              <b>{programme}</b>
            </div>
          </div>
          <div className="row">
            <div className="col-3">Plan&nbsp;:</div>
            <div className="col-9">
              &nbsp;&nbsp;&nbsp;&nbsp;
              <b>{currentCourse}</b>
            </div>
          </div>
        </div>
        <div className="col" />
        <div className="col">
          <div className="row">
            <div className="col">&nbsp;</div>
          </div>
          <div className="row">
            <div className="col">&nbsp;</div>
          </div>
          <div className="row">
            <div className="col">&nbsp;</div>
          </div>
          <div className="row">
            <div className="col">&nbsp;</div>
          </div>
          <div className="row">
            <div className="col">&nbsp;</div>
          </div>
          <div className="row">
            <div className="col text-right">
              Status&nbsp;:&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <b>Completed Program</b>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      {renderTableHeader()}
      <div className="row">{renderedSemesters}</div>
      <br />
      <br />
    </div>
  );
};

export const renderTranscript = certificate => {
  // Group all modules by courses
  const transcript = get(certificate, "transcript");
  const groupedCourses = groupBy(transcript, "programDescription");
  const renderedCourses = Object.keys(groupedCourses).map(course =>
    renderCourse(certificate, groupedCourses[course], course)
  );

  return <div>{renderedCourses}</div>;
};

export const renderNpfa = certificate => {
  const npfa = get(certificate, "additionalData.npfa", undefined);
  return npfa ? (
    <div className="row">
      National Physical Fitness Award: {npfa}
      <br />
      <br />
    </div>
  ) : null;
};

export const renderGPA = certificate => {
  const GPA = get(certificate, "cumulativeScore", undefined);
  return GPA ? (
    <div className="row">
      Graduating GPA: {GPA} (Graduating GPA is computed based on passed modules
      and has a maximum value of 4)
      <br />
      <br />
    </div>
  ) : null;
};

export const renderConclusion = certificate => {
  const issuingDate = get(certificate, "issuedOn", undefined);
  const certificateCourseName = get(
    certificate,
    "transcript[0].programDescription"
  );
  return (
    <div>
      <hr style={{ border: "1px solid black" }} />
      <div className="row m-0 mb-2">
        <div>Conferred the degree(s) of:&nbsp;&nbsp;&nbsp;</div>
      </div>
      <div className="row m-0 mb-2">
        <div>
          <ul>
            <li>{certificateCourseName}</li>
          </ul>
        </div>
      </div>
      <div className="row m-0 mb-2">
        <div>
          On: &nbsp;
          {format(issuingDate, "DD MMM YYYY")}
        </div>
      </div>
      <hr style={{ border: "1px solid black" }} />
    </div>
  );
};
export const renderRemarks = certificate => {
  const remarksArray = get(certificate, "additionalData.remarks");
  // const remark = get(remarksArray, "note");
  const remarksRows = remarksArray.map((r, j) => (
    <div className="mb-2" key={j}>
      <table>
        <tbody>
          <tr>
            <td style={subjectCodeWidth}>{r.note}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ));
  return remarksArray ? (
    <div>
      <hr style={{ border: "1px solid black" }} />
      <div className="row m-0 mb-2">
        <div>Remarks:&nbsp;&nbsp;&nbsp;</div>
      </div>
      <div className="row m-0 mb-2">
        <div>{remarksRows}</div>
      </div>
    </div>
  ) : null;
};

export const renderAwards = certificate => {
  const awardsArray = get(certificate, "additionalData.awards");
  const awardRows = awardsArray.map((r, k) => (
    <div className="mb-1 ml-5" style={tableStyle} key={k}>
      <table>
        <tbody>
          <tr style={{ width: "40%" }}>
            <td style={{ textAlign: "left" }}>{r.time}&nbsp;:</td>
            <td style={{ textAlign: "left" }}>
              &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            </td>
            <td style={{ textAlign: "left" }}>{r.name}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ));
  return awardsArray ? (
    <div>
      <div className="row m-0 mb-2">
        <div>Awards:&nbsp;&nbsp;&nbsp;</div>
      </div>
      <div className="row m-0 mb-2">
        <div>{awardRows}</div>
      </div>
    </div>
  ) : null;
};

export const renderFooter = () => (
  <div className="d-flex justify-content-center">
    <font size="3" family="Calibri">
      <b>
        <ul>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; -END OF RECORD-
        </ul>
        <ul>-No Entries Valid Below This Line-</ul>
      </b>
    </font>
  </div>
);

export const renderCourseNote = (gradCourse, course, courseId) => {
  const courseNotes = course.map((c, i) => <p key={i}>{c.note}</p>);

  return gradCourse === courseId ? (
    <div className="row" key={courseId}>
      {courseNotes}
    </div>
  ) : null;
};

export const renderFinalStatement = certificate => {
  const graduateCourse = get(certificate, "description");
  const transcriptSummaries = get(
    certificate,
    "additionalData.TranscriptSummary"
  );

  const groupedCourses = groupBy(transcriptSummaries, "course");

  const renderedCourseNotes = Object.keys(groupedCourses).map(course =>
    renderCourseNote(graduateCourse, groupedCourses[course], course)
  );

  return <div>{renderedCourseNotes}</div>;
};

export const renderSignature = certificate => (
  <div
    className="row d-flex justify-content-left align-items-end"
    style={{ marginTop: "8rem", marginBottom: "2rem" }}
  >
    <img
      style={{
        fwidth: "30%",
        height: "100%"
      }}
      src={get(
        certificate,
        "additionalData.transcriptSignatories[0].signature"
      )}
    />
  </div>
);
/* eslint-disable */
// Disabled eslint as there's no way to add 
//proptypes to an anonymous function like this
export default ({ logo }) => ({ certificate }) => (
  <div className="container" style={{ fontSize: "0.9rem" }}>
    {renderHeader(logo)}
    {renderTranscript(certificate)}
    {renderRemarks(certificate)}
    {renderAwards(certificate)}
    {renderConclusion(certificate)}
    {renderFooter()}
    {renderSignature(certificate)}
    <hr />
  </div>
);
