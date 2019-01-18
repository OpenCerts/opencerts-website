import PropTypes from "prop-types";
import {
  SIT_CERT_BORDER,
  SIT_CERT_BG,
  SIT_CERT_LOGO,
  SIT_CERT_SEAL
} from "./images";

const garamondItalic18Pt = {
  fontFamily: "Garamond",
  fontSize: "24px",
  fontStyle: "italic",
  textAlign: "center",
  color: "black"
};

const arial18PtRed = {
  fontFamily: "Arial",
  fontSize: "24px",
  textAlign: "center",
  color: "red"
};

const arial18PtRedBold = {
  fontFamily: "Arial",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
  color: "red"
};

const timesNewRoman18Pt = {
  fontFamily: "Times New Roman",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
  color: "black"
};

const timesNewRoman18PtRed = {
  fontFamily: "Times New Roman",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
  color: "red"
};

const helvetica12Pt = {
  fontFamily: "Helvetica",
  fontSize: "16px",
  textAlign: "center",
  color: "black"
};

const bgImgStyle = {
  backgroundRepeat: "repeat",
  backgroundImage: `url(${SIT_CERT_BG})`,
  backgroundSize: "100px 100px"
};

const borderImgStyle = {
  border: "90px solid transparent",
  borderImage: `url(${SIT_CERT_BORDER})`,
  borderImageSlice: "35%",
  borderImageRepeat: "repeat",
  paddingRight: "0px",
  paddingLeft: "0px"
};

const logoImgStyle = {
  width: "268px",
  height: "130px"
};

const sealImgStyle = {
  width: "180px",
  height: "180px"
};

const presidentStyle = {
  width: "192px",
  height: "62px"
};

const depPresidentStyle = {
  width: "174px",
  height: "82px"
};

const Template = ({ certificate }) => (
  <div className="container" style={borderImgStyle}>
    <div style={bgImgStyle}>
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "-2rem" }}
      >
        <img src={SIT_CERT_LOGO} style={logoImgStyle} />
      </div>
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "2rem" }}
      >
        <span style={garamondItalic18Pt}>This is to certify that</span>
      </div>
      <div className="row d-flex justify-content-center">
        <span style={timesNewRoman18Pt}>{certificate.recipient.name}</span>
      </div>
      <div className="row d-flex justify-content-center">
        <span style={garamondItalic18Pt}>
          having fulfilled the requirements of the University was conferred the
          degree of
        </span>
      </div>
      <div className="row d-flex justify-content-center">&nbsp;</div>
      <div className="row d-flex justify-content-center">
        <span style={arial18PtRedBold}>
          {certificate.additionalData.degreeName1}
        </span>
      </div>
      <div className="row d-flex justify-content-center">
        <span style={arial18PtRed}>
          {certificate.additionalData.degreeName2}
        </span>
      </div>
      <div className="row d-flex justify-content-center">
        <p style={garamondItalic18Pt}>
          {certificate.additionalData.degreeName3}
          <br />
          {certificate.additionalData.confDate}
        </p>
      </div>
      {certificate.additionalData.degreeName2.length === 0 && (
        <div className="row d-flex justify-content-center">
          <span style={timesNewRoman18PtRed}>&nbsp;</span>
        </div>
      )}
      <div className="row" style={{ marginTop: "1rem", marginBottom: "-2rem" }}>
        <div className="col-md-4 text-left">
          <br />
          <img src={SIT_CERT_SEAL} style={sealImgStyle} />
        </div>
        <div className="col-md-4">&nbsp;</div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-12 text-center">
              <img
                src={certificate.additionalData.sitPresidentSign}
                style={presidentStyle}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <span style={helvetica12Pt}>President</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <img
                src={certificate.additionalData.sitDepPresidentSign}
                style={depPresidentStyle}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <span style={helvetica12Pt}>
                Deputy President (Academic) & Provost
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Template;
Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
