import PropTypes from "prop-types";
import { get } from "lodash";
import {
  SOR_BORDER_GCEA,
  SOR_TOP_LOGO,
  SOR_TOP_HEADER,
  SOR_TITLE,
  SOR_BOLD_TEXT,
  SOR_INDENT_TEXT,
  SOR_TRANSCRIPT_FONT_SIZE_12,
  SOR_TRANSCRIPT_FONT_SIZE_11,
  SOR_TRANSCRIPT_FONT_SIZE_9,
  SOR_CENTER_ALIGN,
  RENDER_SOR_HEADER,
  RENDER_SOR_FOOTER,
  RENDER_SOR_INFO
} from "../common";

export const renderTranscript = ({ certificate }) => {
  // Get transcript info
  const transcript = get(certificate, "transcript");

  const transcriptDetailsGCEA2 = transcript.map(trn => (
    <div className="row" style={SOR_TRANSCRIPT_FONT_SIZE_11} key={trn.id}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-3">{trn.name}</div>
          <div className="col-md-4" style={SOR_CENTER_ALIGN}>
            <div className="row">
              <div className="col-md-6">{trn.grade}</div>
              <div className="col-md-6">{trn.score}</div>
            </div>
          </div>
          <div className="col-md-2">{trn.level}</div>
          <div className="col-md-2">{trn.languageMedium}</div>
        </div>
      </div>
      {trn.subTranscript !== "" ? (
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-3">
              <span style={SOR_INDENT_TEXT}>{trn.subTranscript}</span>
            </div>
            <div className="col-md-4" style={SOR_CENTER_ALIGN}>
              <div className="row">
                <div className="col-md-6">{trn.pAlphaGrade}</div>
                <div className="col-md-6">{trn.pNumGrade}</div>
              </div>
            </div>
            <div className="col-md-2">-</div>
            <div className="col-md-2">{trn.languageMedium}</div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  ));

  return (
    <div className="row" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-3">&nbsp;</div>
        </div>
        <div className="row" style={SOR_BOLD_TEXT}>
          <div className="col-md-12">
            obtained the grades for the subject stated below:
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">&nbsp;</div>
        </div>
        <div className="row" style={SOR_BOLD_TEXT}>
          <div className="col-md-3">SUBJECT</div>
          <div className="col-md-4" style={SOR_CENTER_ALIGN}>
            <div className="row">
              <div className="col-md-12">GRADE</div>
            </div>
            <div className="row">
              <div className="col-md-6" style={SOR_TRANSCRIPT_FONT_SIZE_9}>
                ALPHABETICAL
              </div>
              <div className="col-md-6" style={SOR_TRANSCRIPT_FONT_SIZE_9}>
                NUMERICAL
              </div>
            </div>
          </div>
          <div className="col-md-2">LEVEL</div>
          <div className="col-md-2">
            LANGUAGE <br />
            MEDIUM
          </div>
        </div>
        <div className="row">&nbsp;</div>
        {transcriptDetailsGCEA2}
        <div className="row">&nbsp;</div>
        <div className="row">
          <div className="col-md-3">*****************************</div>
          <div className="col-md-4" style={SOR_CENTER_ALIGN}>
            <div className="row">
              <div className="col-md-6">*******</div>
              <div className="col-md-6">*******</div>
            </div>
          </div>
          <div className="col-md-2">***************</div>
          <div className="col-md-2">***************</div>
        </div>
        <div className="row">&nbsp;</div>
        <div className="row">
          <div className="col-md-5">
            <strong>Total number of subjects recorded:</strong>
          </div>
          <div className="col-md-3" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            <center>{certificate.additionalData.totSubjects}</center>
          </div>
          <div className="col-md-4" />
        </div>
      </div>
    </div>
  );
};

const Template = certificate => (
  <div className="container-fluid">
    <div className="row justify-content-md-center">
      <div className="col-md-2" />
      <div className="col-md-8" style={SOR_BORDER_GCEA}>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-1">&nbsp;</div>
            <div className="col-md-1">
              <img
                src='/static/images/SEAB_logo.png'
                className="img-responsive"
                style={SOR_TOP_LOGO}
              />
            </div>
            <div className="col-md-10" style={SOR_TOP_HEADER}>
              SINGAPORE EXAMINATIONS AND ASSESSMENT BOARD
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-1">&nbsp;</div>
            <div className="col-md-11" style={SOR_TITLE}>
              STATEMENT OF RESULTS
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-1">&nbsp;</div>
            <div className="col-md-11">{RENDER_SOR_HEADER(certificate)}</div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-1">&nbsp;</div>
            <div className="col-md-11">{RENDER_SOR_INFO(certificate)}</div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-1">&nbsp;</div>
            <div className="col-md-11">{renderTranscript(certificate)}</div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-1">&nbsp;</div>
            <div className="col-md-11">{RENDER_SOR_FOOTER(certificate)}</div>
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
