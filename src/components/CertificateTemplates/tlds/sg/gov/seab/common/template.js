import PropTypes from "prop-types";
import { SOR_TRANSCRIPT_FONT_SIZE_12, SOR_TRANSCRIPT_FONT_SIZE_11 } from ".";

export const RENDER_SOR_HEADER = ({ certificate }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-12" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>I certify that in the</strong>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-11" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
          {certificate.name}
        </div>
      </div>
    </div>
  </div>
);

export const RENDER_SOR_FOOTER = ({ certificate }) => (
  <div className="row" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-4" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>This statement is issued to</strong>
        </div>
        <div className="col-md-8">{certificate.recipient.name}</div>
      </div>
      <div className="row">
        <div className="col-md-2">
          <img src={certificate.additionalData.certifierSignature} />
        </div>
        <div className="col-md-10" />
      </div>
      <div className="row">
        <div className="col-md-12">
          {certificate.additionalData.certifierName}
          <div className="row">
            <div className="col-md-6">
              {certificate.additionalData.certifierDesignation}
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-4" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
                  <strong>Date of Issue</strong>
                </div>
                <div className="col-md-8">
                  {certificate.additionalData.issueDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <strong>{certificate.additionalData.issuername}</strong>
        </div>
      </div>
      <div className="row">&nbsp;</div>
    </div>
  </div>
);

export const RENDER_SOR_INFO = ({ certificate }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-4" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>Examination held in the year</strong>
        </div>
        <div className="col-md-8" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
          {certificate.additionalData.examYear}
        </div>
      </div>
      <div className="row">&nbsp;</div>
      <div className="row">
        <div className="col-md-2" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>Candidate</strong>
        </div>
        <div className="col-md-10" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
          {certificate.recipient.name}
        </div>
      </div>
      <div className="row">&nbsp;</div>
      <div className="row">
        <div className="col-md-4" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>NRIC/Foreign Identification No.</strong>
        </div>
        <div className="col-md-2" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
          {certificate.recipient.did}
        </div>
        <div className="col-md-2" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>Index No.</strong>
        </div>
        <div className="col-md-4" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
          {certificate.additionalData.indexNo}
        </div>
      </div>
    </div>
  </div>
);

export const RENDER_SOR_INFO_PSLE = ({ certificate }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-4" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>held in the year</strong>
        </div>
        <div className="col-md-8" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
          {certificate.additionalData.examYear}
        </div>
      </div>
      <div className="row">&nbsp;</div>
      <div className="row">
        <div className="col-md-2" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>Candidate</strong>
        </div>
        <div className="col-md-10" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
          {certificate.recipient.name}
        </div>
      </div>
      <div className="row">&nbsp;</div>
      <div className="row">
        <div className="col-md-12" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>of</strong>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>NRIC/Foreign Identification No.</strong>
        </div>
        <div className="col-md-2" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
          {certificate.recipient.did}
        </div>
        <div className="col-md-2" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>Index No.</strong>
        </div>
        <div className="col-md-4" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
          {certificate.additionalData.indexNo}
        </div>
      </div>
    </div>
  </div>
);

RENDER_SOR_HEADER.propTypes = {
  certificate: PropTypes.object.isRequired
};

RENDER_SOR_FOOTER.propTypes = {
  certificate: PropTypes.object.isRequired
};

RENDER_SOR_INFO.propTypes = {
  certificate: PropTypes.object.isRequired
};

RENDER_SOR_INFO_PSLE.propTypes = {
  certificate: PropTypes.object.isRequired
};