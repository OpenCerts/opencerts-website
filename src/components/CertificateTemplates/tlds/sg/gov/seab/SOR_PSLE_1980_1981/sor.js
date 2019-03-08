import PropTypes from "prop-types";
import { get } from "lodash";
import {
  RENDER_SOR_INFO_PSLE,
  SOR_BOLD_TEXT,
  SOR_BORDER_PSLE,
  SOR_TOP_LOGO,
  SOR_TOP_HEADER,
  SOR_TITLE,
  RENDER_SOR_HEADER,
  RENDER_SOR_FOOTER,
  SOR_TRANSCRIPT_FONT_SIZE_11,
  SOR_TRANSCRIPT_FONT_SIZE_12
} from "../common";

export const renderTranscript = ({ certificate }) => {
  // Get transcript info
  const transcript = get(certificate, "transcript");

  const transcriptDetailsPSLE = transcript.map(trn => (
    <div className="row" style={SOR_TRANSCRIPT_FONT_SIZE_11} key={trn.id}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-2">&nbsp;</div>
          <div className="col-md-4">{trn.name}</div>
          <div className="col-md-2">{trn.grade}</div>
          <div className="col-md-3">{trn.languageMedium}</div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="row" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">&nbsp;</div>
        </div>
        <div className="row" style={SOR_BOLD_TEXT}>
          <div className="col-md-12">
            obtained the grades for the subjects stated below:
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">&nbsp;</div>
        </div>
        <div className="row">
          <div className="col-md-2">&nbsp;</div>
          <div className="col-md-4">
            <strong>SUBJECT</strong>
          </div>
          <div className="col-md-2">
            <strong>GRADE</strong>
          </div>
          <div className="col-md-3">
            <strong>LANGUAGE MEDIUM</strong>
          </div>
        </div>
        {transcriptDetailsPSLE}
        <div className="row">&nbsp;</div>
        <div className="row">&nbsp;</div>
        <div className="row">
          <div className="col-md-2">&nbsp;</div>
          <div className="col-md-3">
            <strong>AGGREGATE SCORE</strong>
          </div>
          <div className="col-md-1" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            :&nbsp;&nbsp;{certificate.additionalData.aggregateScore}
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">&nbsp;</div>
          <div className="col-md-3">
            <strong>OVERALL RESULTS</strong>
          </div>
          <div className="col-md-1" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            :&nbsp;&nbsp;{certificate.additionalData.overallResults}
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">&nbsp;</div>
          <div className="col-md-3">
            <strong>STREAM ELIGIBLE FOR</strong>
          </div>
          <div className="col-md-1" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            :&nbsp;&nbsp;{certificate.additionalData.streamEligibleFor}
          </div>
        </div>
        <div className="row">&nbsp;</div>
        <div className="row">&nbsp;</div>
        <div className="row">&nbsp;</div>
      </div>
    </div>
  );
};

const Template = certificate => (
  <div className="container-fluid">
    <div className="row justify-content-md-center">
      <div className="col-md-2" />
      <div className="col-md-8" style={SOR_BORDER_PSLE}>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-1">
              <img
                src='/static/images/SEAB_logo.png'
                className="img-responsive"
                style={SOR_TOP_LOGO}
              />
            </div>
            <div className="col-md-11" style={SOR_TOP_HEADER}>
              SINGAPORE EXAMINATIONS AND ASSESSMENT BOARD
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-12" style={SOR_TITLE}>
              STATEMENT OF RESULTS
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-12">{RENDER_SOR_HEADER(certificate)}</div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-12">{RENDER_SOR_INFO_PSLE(certificate)}</div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-12">{renderTranscript(certificate)}</div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-12">{RENDER_SOR_FOOTER(certificate)}</div>
          </div>
        </div>
      </div>
      <div className="col-md-2" />
    </div>
  </div>
);

renderTranscript.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Template;
