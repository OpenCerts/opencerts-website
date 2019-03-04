import PropTypes from "prop-types";
import { IBS_LOGO, IBS_SIGN } from "./images";

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
  <div className="container">
    <div>
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "-2rem" }}
      >
        <img src={IBS_LOGO} style={logoImgStyle} />
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
          having fulfilled the requirements of the Certified Blockchain Consultant
        </span>
      </div>
      <div className="row d-flex justify-content-center">&nbsp;</div>
      <div className="row d-flex justify-content-center">
        <p style={garamondItalic18Pt}>
          {certificate.additionalData.certificate}
          <br />
          {certificate.additionalData.issueDate}
        </p>
      </div>
      <div className="row" style={{ marginTop: "1rem", marginBottom: "-2rem" }}>
        <div className="col-md-4 text-left">
          <br />
          <img src={IBS_SIGN} style={sealImgStyle} />
        </div>
        <div className="col-md-4">&nbsp;</div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-12 text-center">
              <img
                src={certificate.additionalData.presidentSign.signature}
                style={presidentStyle}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <span style={helvetica12Pt}>{certificate.additionalData.presidentSign.designation}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <span style={helvetica12Pt}>{certificate.additionalData.presidentSign.name}</span>
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
