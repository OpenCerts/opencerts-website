import PropTypes from "prop-types";
import { get } from "lodash";
import {
  SOR_TRANSCRIPT_FONT_SIZE_11,
  SOR_TRANSCRIPT_FONT_SIZE_12,
  SOR_BORDER_GCEO,
  SOR_TOP_LOGO,
  SOR_TOP_HEADER,
  SOR_TITLE,
  SOR_BOLD_TEXT,
  SOR_CENTER_ALIGN,
  SOR_TRANSCRIPT_FONT_SIZE_9,
  SOR_SUBJECT_REM_RIGHT_PAD,
  RENDER_SOR_HEADER,
  RENDER_SOR_FOOTER,
  RENDER_SOR_INFO,
  GETNUMBER,
  GETSUBJGRADE_GCEO,
  GETSPAPERGRADE_GCEO,
  FORMATYEARPREFIX
} from "../common";

export const renderTranscript = ({ certificate }) => {
  // Get transcript info
  const transcript = get(certificate, "transcript");
  const totalsubjects = transcript.length;
  const examYr = FORMATYEARPREFIX(certificate.attainmentDate);

  const transcriptDetailsGCEO = transcript.map(trn => (
    <div className="row" style={SOR_TRANSCRIPT_FONT_SIZE_11} key={trn.name}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-3" style={SOR_SUBJECT_REM_RIGHT_PAD}>
            {trn.name}
            {trn.pExaminingAgency !== undefined &&
            trn.pExaminingAgency !== trn.examiningAuthority ? (
              <span>
                <br />
                &nbsp;&nbsp;{trn.pExaminingAgency}
              </span>
            ) : (
              <span />
            )}
          </div>
          <div className="col-md-3" style={SOR_CENTER_ALIGN}>
            {GETSUBJGRADE_GCEO(trn.grade, examYr)}
          </div>
          <div className="col-md-2">{trn.level}</div>
          <div className="col-md-2">{trn.languageMedium}</div>
          <div className="col-md-2">{trn.examiningAuthority}</div>
        </div>
      </div>
      {trn.subTranscript !== undefined ? (
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-3">
              &nbsp;&nbsp;&nbsp;{trn.subTranscript}
            </div>
            <div className="col-md-3" style={SOR_CENTER_ALIGN}>
              {GETSPAPERGRADE_GCEO(trn.paperGrade, examYr)}
            </div>
            <div className="col-md-2">-</div>
            <div className="col-md-2">{trn.languageMedium}</div>
            <div className="col-md-2">{trn.examiningAuthority}</div>
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
            obtained the grades for the subjects stated below:
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">&nbsp;</div>
        </div>
        <div className="row" style={SOR_BOLD_TEXT}>
          <div className="col-md-3">SUBJECT</div>
          <div className="col-md-3" style={SOR_CENTER_ALIGN}>
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
          <div className="col-md-2">
            EXAMINING <br />
            AUTHORITY
          </div>
        </div>
        <div className="row">&nbsp;</div>
        {transcriptDetailsGCEO}
        <div className="row">&nbsp;</div>
        <div className="row">
          <div className="col-md-3">*****************************</div>
          <div className="col-md-3" style={SOR_CENTER_ALIGN}>
            <div className="row">
              <div className="col-md-6">*******</div>
              <div className="col-md-6">*******</div>
            </div>
          </div>
          <div className="col-md-2">***************</div>
          <div className="col-md-2">***************</div>
          <div className="col-md-2">*************</div>
        </div>
        <div className="row">&nbsp;</div>
        <div className="row">
          <div className="col-md-12" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
            <strong>Total number of subjects recorded:</strong>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
              {GETNUMBER(totalsubjects)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Template = certificate => (
  <div className="container-fluid">
    <div className="row justify-content-md-center">
      <div className="col-md-2" />
      <div className="col-md-8" style={SOR_BORDER_GCEO}>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-1">
              <img
                src="/static/images/SEAB_logo.png"
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
            <div className="col-md-12">{RENDER_SOR_INFO(certificate)}</div>
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
            <div className="col-md-12">&nbsp;</div>
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
