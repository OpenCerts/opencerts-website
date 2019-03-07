import PropTypes from "prop-types";
import { get } from "lodash";
import { TOP_IMG } from "../common/images";
import {
  SOR_BORDER_GCEA,
  SOR_TOP_LOGO,
  SOR_TOP_HEADER,
  SOR_TITLE,
  SOR_BOLD_TEXT,
  SOR_INDENT_TEXT,
  SOR_TRANSCRIPT_FONT_SIZE_12,
  SOR_TRANSCRIPT_FONT_SIZE_11,
  RENDER_SOR_HEADER,
  RENDER_SOR_FOOTER,
  RENDER_SOR_INFO
} from "../common";

export const renderTranscript = ({ certificate }) => {
  // Get transcript info
  const transcript = get(certificate, "transcript");

  const transcriptDetailsGCEA3 = transcript.map(trn => (
    <div className="row" style={SOR_TRANSCRIPT_FONT_SIZE_11} key={trn.id}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-4">
            {trn.name}
            {trn.pExaminingAgency !== "" &&
            trn.pExaminingAgency !== trn.examiningAuthority ? (
              <span>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{trn.pExaminingAgency}
              </span>
            ) : (
              <span />
            )}
          </div>
          <div className="col-md-2">{trn.level}</div>
          <div className="col-md-2">{trn.grade}</div>
          <div className="col-md-2">{trn.examiningAuthority}</div>
        </div>
      </div>
      {trn.subTranscript !== "" ? (
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4">
              <span style={SOR_INDENT_TEXT}>{trn.subTranscript}</span>
            </div>
            <div className="col-md-2">-</div>
            <div className="col-md-2">{trn.pGrade}</div>
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
            obtained the grades for the subject stated below:
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">&nbsp;</div>
        </div>
        <div className="row" style={SOR_BOLD_TEXT}>
          <div className="col-md-4">SUBJECT</div>
          <div className="col-md-2">LEVEL</div>
          <div className="col-md-2">GRADE</div>
          <div className="col-md-2">
            EXAMINING <br />
            AUTHORITY
          </div>
        </div>
        {transcriptDetailsGCEA3}
        <div className="row">&nbsp;</div>
        <div className="row">
          <div className="col-md-4">*****************************</div>
          <div className="col-md-2">***************</div>
          <div className="col-md-2">***************</div>
          <div className="col-md-2">***************</div>
        </div>
        <div className="row">&nbsp;</div>
        <div className="row">
          <div className="col-md-5" style={SOR_BOLD_TEXT}>
            Total number of subjects recorded:
          </div>
          <div className="col-md-1" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            {certificate.additionalData.totSubjects}
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
            <div className="col-md-1">
              <img
                src={TOP_IMG}
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
