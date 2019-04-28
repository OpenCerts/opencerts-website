import PropTypes from "prop-types";

import Recipient from "./recipient";
import ExamResults from "./examresults";
import PfpGradingScheme from "./pfpgradingscheme";
import ExemptionFootNote from "./exemptionfootnote";
import TranscriptHeader from "./transcriptheader";
import TranscriptFooter from "./transcriptfooter";

const Transcript = ({ certificate }) => (
  <div className="container">
    <style>
      {`
      .transcript-content {
        font: 90%/1.6 Helvetica, Arial, sans-serif;
        *font-size: 1em;
      }

      `}
    </style>

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
