import PropTypes from "prop-types";

import Recipient from "./recipient";
import ExamResults from "./examResults";
import FastGradingScheme from "../common/fastGradingScheme";
import ExemptionFootNote from "../common/exemptionFootNote";
import TranscriptHeader from "./transcriptHeader";
import TranscriptFooter from "./transcriptFooter";
import TranscriptStyles from "../common/transcriptStyles";

const Transcript = ({ certificate }) => (
  <div className="container">
    <TranscriptStyles />

    <div className="transcript-content">
      <TranscriptHeader />

      <Recipient certificate={certificate} />

      <ExamResults certificate={certificate} />

      <FastGradingScheme />

      <ExemptionFootNote certificate={certificate} />

      <TranscriptFooter certificate={certificate} />
    </div>
  </div>
);

Transcript.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Transcript;
