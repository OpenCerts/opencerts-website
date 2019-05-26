import _ from "lodash";
import PropTypes from "prop-types";
import ExamResultsStyles from "./examResultsStyles";
import SubjectGrades from "./partTimeSubjectGrades";

const PartTimeExamResults = ({ certificate }) => {
  const awardedCertificates = _.uniq(certificate.additionalData.awardedCertificates)
    .map((n, j) => (
      <span key={j}>
        {n.toUpperCase()}
        <br />
      </span>
    )
  );

  return (
    <div className="container">
      <ExamResultsStyles />

      <div className="exam-results-header row">
        <div className="col-2">SUBJECT CODE</div>
        <div className="col-6">SUBJECT NAME</div>
        <div className="col-2 credit-unit">CREDIT UNIT</div>
        <div className="col-2 grade">GRADE</div>
      </div>

      <SubjectGrades certificate={certificate} />

      <br />

      <div className="row">
        <div className="col-3">Total Credit Units earned</div>
        <div className="col-1">:</div>
        <div className="col-8">
          {certificate.additionalData.totalCreditUnitsEarned}
        </div>
      </div>
      <div className="row">
        <div className="col-3">Cumulative Grade Point Average</div>
        <div className="col-1">:</div>
        <div className="col-8">{certificate.cumulativeScore.toFixed(2)}</div>
      </div>
      <div className="row">
        <div className="col-3">Certificate/Diploma Awarded</div>
        <div className="col-1">:</div>
        <div className="col-8">{awardedCertificates}</div>
      </div>
      <br />
    </div>
  );
};

PartTimeExamResults.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default PartTimeExamResults;
