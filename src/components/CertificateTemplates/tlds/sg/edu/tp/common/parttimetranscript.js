import PropTypes from "prop-types";

import PartTimeRecipient from "./partTimeRecipient";
import PartTimeExamResults from "./partTimeExamResults";
import PartTimeGradingScheme from "./partTimeGradingScheme";
import ExemptionFootNote from "./exemptionFootNote";
import TranscriptHeader from "./transcriptHeader";
import TranscriptFooter from "./transcriptFooter";
import TranscriptStyles from "./transcriptStyles";

const PartTimeTranscript = ({ certificate }) => (
  <div className="container">
    <TranscriptStyles />

    <div className="transcript-content">
      <TranscriptHeader />

      <PartTimeRecipient certificate={certificate} />

      <PartTimeExamResults certificate={certificate} />

      <PartTimeGradingScheme />

      <ExemptionFootNote certificate={certificate} />

      <TranscriptFooter certificate={certificate} />
    </div>
  </div>
);

PartTimeTranscript.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default PartTimeTranscript;
