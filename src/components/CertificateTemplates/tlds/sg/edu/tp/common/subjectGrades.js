import _ from "lodash";
import PropTypes from "prop-types";

const SubjectGrades = ({ certificate }) => {
  const semesters = _(certificate.transcript)
    .groupBy(t => t.semester)
    .map((values, key) => ({ semester: key, grades: values }))
    .orderBy(s => s.semester)
    .value();

  const subjects = semesters.map((s, j) => {
    const semesterParts = s.semester.split(" ");
    const acadYear = semesterParts[0];
    const semesterName = `${semesterParts[1]} ${semesterParts[2]}`;

    const semesterSubjects = s.grades.map((t, i) => (
      <div className="row" key={i}>
        <div className="col-2">{t.courseCode}</div>
        <div className="col-6">{t.name}</div>
        <div className="col-2 credit-unit">{t.courseCredit}</div>
        <div className="col-2 grade">{t.grade}</div>
      </div>
    ));

    return (
      <div key={j}>
        <div className="row">
          <span className="semester-header col-2">{acadYear}</span>
          <span className="semester-header col-10">{semesterName}</span>
        </div>
        {semesterSubjects}
        <br />
      </div>
    );
  });

  return <div className="container">{subjects}</div>;
};

SubjectGrades.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default SubjectGrades;
