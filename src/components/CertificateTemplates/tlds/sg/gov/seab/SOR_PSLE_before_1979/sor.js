import { get } from "lodash";
import { TOP_IMG } from "../common/images";
import {
  RENDER_SOR_INFO_PSLE,
  SOR_BORDER_PSLE,
  SOR_TOP_LOGO,
  SOR_TOP_HEADER,
  SOR_TITLE,
  RENDER_SOR_HEADER,
  RENDER_SOR_FOOTER,
  SOR_TRANSCRIPT_FONT_SIZE_11
} from "../common";

export const renderTranscript = ({ certificate }) => {
  // Get transcript info
  const transcript = get(certificate, "transcript");

  const transcriptDetailsPSLE = transcript.map(trn => (
    <div className="row" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">&nbsp;</div>
        </div>
        <div className="row">
          <div className="col-md-2">&nbsp;</div>
          <div className="col-md-2">{trn.grade}</div>
          <div className="col-md-3">{trn.name}</div>
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
          <div className="col-md-12">&nbsp;</div>
        </div>
        <div className="row">
          <div className="col-md-12">&nbsp;</div>
        </div>
        <div className="row">
          <div className="col-md-12">&nbsp;</div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="row">
      <div className="col-md-12">{transcriptDetailsPSLE}</div>
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

export default Template;
