import PropTypes from "prop-types";
import ExamResultsStyles from "../common/examResultsStyles";
import SubjectGrades from "../common/subjectGrades";

const NiecExamResults = ({ certificate }) => (
  <div className="container">
    <ExamResultsStyles />

    <div className="exam-results-header row">
      <div className="col-2">SUBJECT CODE</div>
      <div className="col-6">SUBJECT</div>
      <div className="col-2 credit-unit">CREDIT UNIT</div>
      <div className="col-2 grade">GRADE</div>
    </div>

    <SubjectGrades certificate={certificate} />

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

NiecExamResults.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default NiecExamResults;
