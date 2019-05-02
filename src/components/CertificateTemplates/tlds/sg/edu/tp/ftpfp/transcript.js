import PropTypes from "prop-types";

import Recipient from "./recipient";
import ExamResults from "./examResults";
import PfpGradingScheme from "./pfpGradingScheme";
import ExemptionFootNote from "../common/exemptionFootNote";
import TranscriptHeader from "./transcriptHeader";
import TranscriptFooter from "../common/transcriptFooter";
import TranscriptStyles from "../common/transcriptStyles";

const Transcript = ({ certificate }) => (
  <div className="container">
    <TranscriptStyles />

    <div className="transcript-content">
      <TranscriptHeader />

      <Recipient certificate={certificate} />

      <ExamResults certificate={certificate} />

      <PfpGradingScheme />

      <ExemptionFootNote certificate={certificate} />

      <TranscriptFooter certificate={certificate} />
    </div>
  </div>
);

Transcript.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Transcript;
