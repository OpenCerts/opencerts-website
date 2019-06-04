import PropTypes from "prop-types";

import PartTimeRecipient from "../common/partTimeRecipient";
import PartTimeExamResults from "../common/partTimeExamResults";
import PartTimeGradingScheme from "../common/partTimeGradingScheme";
import ExemptionFootNote from "../common/exemptionFootNote";
import StatementOfResultsHeader from "./statementOfResultsHeader";
import TranscriptFooter from "../common/transcriptFooter";
import TranscriptStyles from "../common/transcriptStyles";

const StatementOfResults = ({ certificate }) => (
  <div className="container">
    <TranscriptStyles />

    <div className="transcript-content">
      <StatementOfResultsHeader />

      <PartTimeRecipient certificate={certificate} />

      <PartTimeExamResults certificate={certificate} />

      <PartTimeGradingScheme />

      <ExemptionFootNote certificate={certificate} />

      <TranscriptFooter certificate={certificate} />
    </div>
  </div>
);

StatementOfResults.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default StatementOfResults;
