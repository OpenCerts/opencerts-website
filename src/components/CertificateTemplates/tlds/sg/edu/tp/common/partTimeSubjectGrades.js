import _ from "lodash";
import PropTypes from "prop-types";

const PartTimeSubjectGrades = ({ certificate }) => {
  const semesterHeader = s => {
    if (s.semester.startsWith("AY")) {
      const semesterParts = s.semester.split(" ");
      const acadYear = semesterParts[0];
      const semesterName = `${semesterParts[1]} ${semesterParts[2]}`;

      return (
        <div className="row">
          <div className="semester-header col-2">{acadYear}</div>
          <div className="semester-header col-10">{semesterName}</div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="semester-header exemption col-12">{s.semester}</div>
      </div>
    );
  };

  const moduleHeader = m => (
    <div className="row">
      <div className="col-12">{m.mcname}</div>
    </div>
  );

  const moduleSubjects = m =>
    m.grades.map((t, i) => (
      <div className="row" key={i}>
        <div className="col-2">{t.courseCode}</div>
        <div className="col-6">{t.name}</div>
        <div className="col-2 credit-unit">{t.courseCredit}</div>
        <div className="col-2 grade">{t.grade}</div>
      </div>
    ));

  const semesters = _(certificate.transcript)
    .groupBy(t => t.semester)
    .map((values, key) => ({ semester: key, grades: values }))
    .orderBy(s => s.semester)
    .value();

  const subjects = semesters.map((s, j) => {
    const modules = _(s.grades)
      .groupBy(g => g.mcname)
      .map((values, key) => ({ mcname: key, grades: values }))
      .orderBy(g => g.mcname)
      .value();

    const semesterSubjects = modules.map((m, i) => (
      <div key={i}>
        {moduleHeader(m)}
        {moduleSubjects(m)}
      </div>
    ));

    return (
      <div key={j}>
        {semesterHeader(s)}
        {semesterSubjects}
        <br />
      </div>
    );
  });

  return <div>{subjects}</div>;
};

PartTimeSubjectGrades.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default PartTimeSubjectGrades;
