import PropTypes from "prop-types";

import Niec from "./NiecRecipient";
import NiecExamResults from "./NiecExamResults";
import CommonFastGradingScheme from "../common/fastGradingScheme";
import CommonExemptionFootNote from "../common/exemptionFootNote";
import NiecTranscriptHeader from "./NiecTranscriptHeader";
import NiecTranscriptFooter from "./NiecTranscriptFooter";
import CommonTranscriptStyles from "../common/transcriptStyles";

const Transcript = ({ certificate }) => (
  <div className="container">
    <CommonTranscriptStyles />

    <div className="transcript-content">
      <NiecTranscriptHeader />

      <Niec certificate={certificate} />

      <NiecExamResults certificate={certificate} />

      <CommonFastGradingScheme />

      <CommonExemptionFootNote certificate={certificate} />

      <NiecTranscriptFooter certificate={certificate} />
    </div>
  </div>
);

Transcript.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Transcript;
