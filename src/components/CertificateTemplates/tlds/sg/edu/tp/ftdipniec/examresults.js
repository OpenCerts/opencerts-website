import _ from "lodash";
import PropTypes from "prop-types";

const ExamResults = ({ certificate }) => {
  const semesters = _(certificate.transcript)
    .groupBy(t => t.semester)
    .map((values, key) => ({ semester: key, grades: values }))
    .orderBy(s => s.semester)
    .value();

  const semesterResults = semesters.map((s, j) => {
    const semesterParts = s.semester.split(" ");
    const acadYear = semesterParts[0];
    const semesterName = `${semesterParts[1]} ${semesterParts[2]}`;

    const results = s.grades.map((t, i) => (
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
        {results}
        <br />
      </div>
    );
  });

  return (
    <div className="container">
      <style>
        {`
    .exam-results-header {
      border-top: 2px solid #212529;
      border-bottom: 2px solid #212529;
      margin-bottom:0.8em;
      font-weight: bold
    }

    .semester-header{
      font-weight: bold;
      text-transform:uppercase;
    }

    .credit-unit,
    .grade {
      text-align: center
    }

    .exam-results-footer{
      font-weight: bold
    }

    `}
      </style>

      <div className="exam-results-header row">
        <div className="col-2">SUBJECT CODE</div>
        <div className="col-6">SUBJECT</div>
        <div className="col-2 credit-unit">CREDIT UNIT</div>
        <div className="col-2 grade">GRADE</div>
      </div>

      {semesterResults}

      <br />

      <div className="row">
        <div className="col-2">&nbsp;</div>
        <div className="col-10 exam-results-footer">
          Cumulative Grade Point Average Score:{" "}
          {certificate.cumulativeScore.toFixed(1)}
          <br />
          Awarded the {certificate.name.toUpperCase()}
        </div>
      </div>

      <br />
    </div>
  );
};

ExamResults.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default ExamResults;
