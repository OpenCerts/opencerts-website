import PropTypes from "prop-types";

import { get } from "lodash";

export const SOR_TRANSCRIPT_FONT_SIZE_12 = {
  fontSize: "12px",
  fontFamily: "Arial"
};

export const SOR_TRANSCRIPT_FONT_SIZE_11 = {
  fontSize: "11px",
  fontFamily: "Arial",
  lineHeight: "2.0"
};

export const SOR_INDENT_TEXT = {
  marginLeft: "0.5em"
};

export const EXAM_LVL_TEXT = {
  fontSize: "11px",
  fontFamily: "Arial",
  lineHeight: "2.0",
  marginLeft: "4.2em"
};

export const FORMATDATEPREFIX = dateString => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let dayValue = "";

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];

  const lengthday = day.toString().length;
  if (lengthday === 1) {
    dayValue = `0${day}`;
  } else {
    dayValue = day;
  }

  return (
    <span>
      {dayValue}/{months[month]}/{year}
    </span>
  );
};

export const FORMATYEARPREFIX = dateString => {
  const date = new Date(dateString);
  const year = date.getFullYear();

  return year;
};

export const GETIDENTIFICATION = certificate => {
  const fin = get(certificate, "recipient.fin");
  const nric = get(certificate, "recipient.nric");
  const passportNumber = get(certificate, "recipient.passportNumber");

  let value = "";

  if (nric !== undefined) {
    value = nric;
  } else if (fin !== undefined) {
    value = fin;
  } else if (passportNumber !== undefined) {
    value = passportNumber;
  }

  return <span>{value}</span>;
};

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
        <div className="col-md-12" style={EXAM_LVL_TEXT}>
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
        <div className="col-md-12" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>This statement is issued to</strong>&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            {certificate.recipient.name}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2" style={SOR_INDENT_TEXT}>
          <img
            width="50px"
            height="80px"
            src={certificate.additionalData.certifierSignature}
          />
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
                <div className="col-md-12" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
                  <strong>Date of Issue</strong>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
                    {FORMATDATEPREFIX(certificate.issuedOn)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <strong>Singapore Examinations and Assessment Board</strong>
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
        <div className="col-md-12" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>Examination held in the year</strong>&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            {FORMATYEARPREFIX(certificate.attainmentDate)}
          </span>
        </div>
      </div>
      <div className="row">&nbsp;</div>
      <div className="row">
        <div className="col-md-12" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>Candidate</strong>&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            {certificate.recipient.name}
          </span>
        </div>
      </div>
      <div className="row">&nbsp;</div>
      <div className="row">
        <div className="col-md-6" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>NRIC/Foreign Identification No.</strong>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            {GETIDENTIFICATION(certificate)}
          </span>
        </div>
        <div className="col-md-6" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>Index No.</strong>&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            {certificate.additionalData.indexNo}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export const RENDER_SOR_INFO_PSLE = ({ certificate }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-12" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>held in the year</strong>&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            {FORMATYEARPREFIX(certificate.attainmentDate)}
          </span>
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            {certificate.additionalData.schoolName}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>NRIC/Foreign Identification No.</strong>
        </div>
        <div className="col-md-2" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
          {GETIDENTIFICATION(certificate)}
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
