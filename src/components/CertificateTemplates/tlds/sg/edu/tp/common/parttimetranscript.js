import PropTypes from "prop-types";

import PartTimeRecipient from "./parttimerecipient";
import PartTimeExamResults from "./parttimeexamresults";
import PartTimeGradingScheme from "./parttimegradingscheme";
import ExemptionFootNote from "./exemptionfootnote";
import TranscriptHeader from "./transcriptheader";
import TranscriptFooter from "./transcriptfooter";

const PartTimeTranscript = ({ certificate }) => (
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
