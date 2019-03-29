import PropTypes from "prop-types";
import { NYP_CERT_BG } from "./images";

const calibri10pt = {
  fontFamily: "Calibri",
  fontSize: "13px",
  fontStyle: "italic",
  textAlign: "center",
  color: "black"
};

const calibri22pt = {
  fontFamily: "Calibri",
  fontSize: "29px",
  textAlign: "center",
  color: "black"
};

const calibri24ptBold = {
  fontFamily: "Calibri",
  fontSize: "32px",
  fontWeight: "bold",
  textAlign: "center",
  color: "black"
};

const calibri9pt = {
  fontFamily: "Calibri",
  fontSize: "12px",
  textAlign: "center",
  color: "black"
};

const bgImgStyle = {
  backgroundRepeat: "repeat",
  backgroundImage: `url(${NYP_CERT_BG})`,
  addingRight: "0px",
  paddingLeft: "0px"
};

export const fullWidthStyle = {
  width: "100%",
  height: "auto"
};

const Template = ({ certificate }) => (
  <div style={bgImgStyle}>
    <div
      className="row d-flex justify-content-center"
      style={{ marginTop: "2rem" }}
    >
      <span style={calibri22pt}>It is hereby certified that</span>
    </div>
    <div className="row d-flex justify-content-center">
      <span style={calibri24ptBold}>{certificate.recipient.name}</span>
    </div>
    <div className="row d-flex justify-content-center">
      <span style={calibri22pt}>
        having satisfied the requirements of <br />
        the course of study was awarded the
      </span>
    </div>
    <div className="row d-flex justify-content-center">&nbsp;</div>
    <div className="row d-flex justify-content-center">
      <span style={calibri24ptBold}>
        {certificate.additionalData.courseName}
      </span>
    </div>
    <div className="row d-flex justify-content-center">
      <span style={calibri22pt}>on</span>
    </div>
    <div className="row d-flex justify-content-center">
      <span style={calibri24ptBold}>{certificate.additionalData.confDate}</span>
    </div>
    <div>
      <div
        className="row d-flex justify-content-center align-items-end"
        style={{ marginTop: "8rem", marginBottom: "1rem" }}
      >
        <div className="col-6" />
        <div className="col-4">
          <div className="px-4">
            <img
              style={fullWidthStyle}
              src={certificate.additionalData.certSignatories[0].signature}
            />
            <hr />
          </div>
          <div className="text-center">
            <span style={calibri10pt}>Chairman</span>
          </div>
          <div className="text-center">
            <span style={calibri10pt}>Board of Governors</span>
          </div>
        </div>
        <div className="col-2" />
      </div>

      <div className="col-2">
        <div className="px-2">
          <img
            style={fullWidthStyle}
            src={certificate.additionalData.certSignatories[1].signature}
          />
          <hr />
        </div>
        <div className="text-center">
          <span style={calibri10pt}>Principal & CEO</span>
        </div>
      </div>

      <div className="col-2">
        <div className="px-2">
          <img
            style={fullWidthStyle}
            src={certificate.additionalData.certSignatories[2].signature}
          />
          <hr />
        </div>
        <div className="text-center">
          <span style={calibri10pt}>Registrar</span>
        </div>
      </div>
    </div>
    <div className="row d-flex justify-content-center">&nbsp;</div>
    <div className="row d-flex justify-content-center">
      <span style={calibri9pt}>NANYANG POLYTECHNIC, SINGAPORE</span>
    </div>
  </div>
);

export default Template;
Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
