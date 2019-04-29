import PropTypes from "prop-types";
import { get, groupBy, find } from "lodash";
import { IMG_LOGO_NP_HORIZONTAL } from "./images";
import { formatDate } from "./functions";

export const fullWidthStyle = {
  width: "100%",
  height: "auto"
};

export const thWidth60Left = {
  width: "60%",
  textAlign: "left"
};

export const renderSemester = (semester, semesterId, { hideCredit } = {}) => {
  const subjectRows = semester.map((s, i) => (
    <tr key={i}>
      <td style={thWidth60Left}>{s.name}</td>
      <td>{s.courseCredit}</td>
      <td>{s.grade}</td>
    </tr>
  ));
  const sem = get(semester, "[0].semester");
  let semDisplay = "";
  if (sem > 0) {
    semDisplay = `SEMESTER OF STUDY  :  ${sem.toString()}`;
  }
  const date = get(semester, "[0].examinationDate");
  return (
    <div className="col-6 my-4" key={semesterId}>
      <div className="row m-0 mb-2">
        <div style={{ fontWeight: 700 }}>
          DATE OF EXAM&nbsp;:&nbsp;
          {formatDate(date)}
        </div>
        <div className="ml-auto" style={{ fontWeight: 700 }}>
          {semDisplay}
        </div>
      </div>
      <table style={fullWidthStyle}>
        <tbody>
          <tr>
            <th>MODULE</th>
            {hideCredit ? null : <th>CREDIT UNIT</th>}
            <th>GRADE</th>
          </tr>
          {subjectRows}
        </tbody>
      </table>
    </div>
  );
};

export const renderHeader = certificate => {
  const serial = get(certificate, "additionalData.transcriptId");
  return (
    <div className="row">
      <div className="col-4">
        <img style={fullWidthStyle} src={IMG_LOGO_NP_HORIZONTAL} />
      </div>
      <div className="col-4" />
      <div className="col-4">
        <div style={{ color: "navy", fontWeight: 500 }}>
          TRANSCRIPT OF ACADEMIC RECORD
        </div>
        <div className="mt-3">SERIAL No. : {serial}</div>
      </div>
    </div>
  );
};

export const renderGradingSystem = () => (
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
                <th>GRADE POINT</th>
                <th>MARKS</th>
                <th>DESCRIPTION</th>
              </tr>
              <tr>
                <td>AD*</td>
                <td>4.0</td>
                <td>80 - 100%</td>
                <td>DISTINCTION</td>
              </tr>
              <tr>
                <td>A+</td>
                <td>4.0</td>
                <td>85 - 100%</td>
                <td>EXCELLENT</td>
              </tr>
              <tr>
                <td>A</td>
                <td>4.0</td>
                <td>80 - 84%</td>
                <td>EXCELLENT</td>
              </tr>
              <tr>
                <td>B+</td>
                <td>3.5</td>
                <td>75 - 79%</td>
                <td>VERY GOOD</td>
              </tr>
              <tr>
                <td>B</td>
                <td>3.0</td>
                <td>70 - 74%</td>
                <td>VERY GOOD</td>
              </tr>
              <tr>
                <td>C+</td>
                <td>2.5</td>
                <td>65 - 69%</td>
                <td>GOOD</td>
              </tr>
              <tr>
                <td>C</td>
                <td>2.0</td>
                <td>60 - 64%</td>
                <td>GOOD</td>
              </tr>
              <tr>
                <td>D+</td>
                <td>1.5</td>
                <td>55 - 59%</td>
                <td>PASS</td>
              </tr>
              <tr>
                <td>D</td>
                <td>1.0</td>
                <td>50 - 54%</td>
                <td>PASS</td>
              </tr>
              <tr>
                <td>F</td>
                <td>0</td>
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
                <td>PM</td>
                <td>PASS WITH MERIT</td>
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

export const renderCourse = (certificate, course, courseId, opts) => {
  // Get student info and course description
  const graduateCourse = get(certificate, "description");
  const recipientName = get(certificate, "recipient.name");
  const recipientNric = get(certificate, "recipient.nric");
  const studentId = get(certificate, "additionalData.studentId");
  const admissionDate = get(certificate, "admissionDate");
  const graduationDate = get(certificate, "graduationDate");
  const currentCourse = get(course, "[0].programDescription");

  // Group all modules by semesters
  const groupedSubjects = groupBy(course, "semester");
  const renderedSemesters = Object.keys(groupedSubjects).map(semester =>
    renderSemester(groupedSubjects[semester], semester, opts)
  );

  // Get Course Note
  const transcriptSummaries = get(
    certificate,
    "additionalData.TranscriptSummary"
  );

  const courseSummary = find(transcriptSummaries, ["course", currentCourse]);
  const courseNote = get(courseSummary, "note");

  // only display the summary of non-diploma courses.
  const courseNoteDisplay =
    currentCourse !== graduateCourse ? courseNote : null;

  return (
    <div key={courseId}>
      <hr />
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
            <div className="col-3">COURSE</div>
            <div className="col-9">
              :&nbsp;&nbsp;
              {currentCourse}
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
            <div className="col-3">STUDENT NO</div>
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
            <div className="col-5">DATE OF ADMISSION</div>
            <div className="col-6">
              :&nbsp;&nbsp;
              {formatDate(admissionDate)}
            </div>
          </div>
          <div className="row">
            <div className="col-5">DATE OF GRADUATION</div>
            <div className="col-6">
              :&nbsp;&nbsp;
              {formatDate(graduationDate)}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">{renderedSemesters}</div>
      <br />
      <div className="row">{courseNoteDisplay}</div>
      <br />
    </div>
  );
};

export const renderTranscript = (certificate, opts) => {
  // Group all modules by courses
  const transcript = get(certificate, "transcript");
  const groupedCourses = groupBy(transcript, "programDescription");
  const renderedCourses = Object.keys(groupedCourses).map(course =>
    renderCourse(certificate, groupedCourses[course], course, opts)
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
        {certificate.additionalData.transcriptSignatories[0].position}
      </div>
    </div>

    <div className="col-2" />
  </div>
);

const Template = ({ certificate }) => (
  <div className="container" style={{ fontSize: "0.9rem" }}>
    {renderHeader(certificate)}
    {renderGradingSystem()}
    {renderTranscript(certificate)}
    {renderNpfa(certificate)}
    {renderGPA(certificate)}
    {renderFinalStatement(certificate)}
    {renderSignature(certificate)}
    <hr />
  </div>
);

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
