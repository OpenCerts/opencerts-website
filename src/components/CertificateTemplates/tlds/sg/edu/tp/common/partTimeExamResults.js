import _ from "lodash";
import PropTypes from "prop-types";
import ExamResultsStyles from "./examResultsStyles";
import SubjectGrades from "./partTimeSubjectGrades";

const PartTimeExamResults = ({ certificate }) => {
  const lastOne = certificate.additionalData.awardedCertificates.length
    ? certificate.additionalData.awardedCertificates.length - 1
    : 999;

  const displayCertName = (value, index) => {
    if (index !== lastOne) {
      return <span>{value.toUpperCase()}</span>;
    }
    return (
      <b>
        {value.toUpperCase()}
        {certificate.additionalData.isMerit && <span>&nbsp;WITH MERIT</span>}
      </b>
    );
  };

  const awardedCertificates = _.uniq(
    certificate.additionalData.awardedCertificates
  ).map((n, j) => (
    <span key={j}>
      {displayCertName(n, j)}
      <br />
    </span>
  ));

  const awardedCertificatesLabel =
    certificate.additionalData.awardedCertificates &&
    certificate.additionalData.awardedCertificates.length > 1
      ? "Certificate/Diploma Awarded"
      : "Certificate Awarded";

  return (
    <div className="container">
      <ExamResultsStyles />
      <style>
        {`
        .bold {
          font-weight:bold;
        }
      `}
      </style>

      <div className="exam-results-header row">
        <div className="col-2">SUBJECT CODE</div>
        <div className="col-6">SUBJECT NAME</div>
        <div className="col-2 credit-unit">CREDIT UNIT</div>
        <div className="col-2 grade">GRADE</div>
      </div>

      <SubjectGrades certificate={certificate} />

      <br />

      <div className="row bold">
        <div className="col-3">Total Credit Units earned</div>
        <div className="col-1">:</div>
        <div className="col-8">
          {certificate.additionalData.totalCreditUnitsEarned}
        </div>
      </div>
      <div className="row bold">
        <div className="col-3">Cumulative Grade Point Average</div>
        <div className="col-1">:</div>
        <div className="col-8">{certificate.cumulativeScore.toFixed(2)}</div>
      </div>
      <div className="row">
        <div className="col-3 bold">{awardedCertificatesLabel}</div>
        <div className="col-1 bold">:</div>
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
