import PropTypes from "prop-types";
import { tz } from "moment-timezone";
import { NYP_CERT_BG, NYP_CERT_LOGO } from "./images";

export const TIMEZONE = "Asia/Singapore";

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

const calibri23ptBold = {
  fontFamily: "Calibri",
  fontSize: "32px",
  fontWeight: "bold",
  textAlign: "center",
  color: "black",
  whiteSpace: "pre-wrap"
};

const calibri9pt = {
  fontFamily: "Calibri",
  fontSize: "12px",
  textAlign: "center",
  color: "black"
};

export const fullWidthStyle = {
  width: "100%",
  height: "auto"
};

export const signatureWidthStyle = {
  width: "auto",
  height: "100px"
};

const borderImgStyle = {
  border: "1px solid transparent",
  borderColor: "black",
  backgroundPosition: "-2px",
  backgroundRepeat: "repeat",
  backgroundImage: `url(${NYP_CERT_BG})`,
  backgroundSize: "88px 758px",
  minWidth: "900px",
  minHeight: "760px"
};

const logoImgStyle = {
  width: "350px",
  height: "756px",
  marginLeft: "-15px"
};

export const formatDateFullMonthProper = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return tz(date, TIMEZONE).format("D MMMM YYYY");
};
export const formatCertName = courseName =>
  courseName.length > 50 ? courseName.replace("(", "\r\n(") : courseName;

const Template = ({ certificate }) => (
  <div className="container" style={borderImgStyle}>
    <img
      src={NYP_CERT_LOGO}
      style={logoImgStyle}
      className="pull-left float-left"
    />
    <div style={{ marginLeft: "0px", marginRight: "5rem" }}>
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "7rem" }}
      >
        <span style={calibri22pt}>It is hereby certified that</span>
      </div>
      <div
        className="row d-flex justify-content-center align-items-center"
        style={{ height: "100px", lineHeight: "175%" }}
      >
        <span style={calibri24ptBold}>{certificate.recipient.name}</span>
      </div>
      <div
        className="row d-flex justify-content-center"
        style={{ marginBottom: "10px" }}
      >
        <span style={calibri22pt}>
          having satisfied the requirements of <br />
          the course of study was awarded the
        </span>
      </div>
      <div
        className="row d-flex justify-content-center align-items-center"
        style={{ height: "100px", lineHeight: "190%" }}
      >
        <span style={calibri23ptBold}>{formatCertName(certificate.name)}</span>
      </div>
      <div className="row d-flex justify-content-center">
        <span style={calibri22pt}>on</span>
      </div>
      <div className="row d-flex justify-content-center">
        <span style={calibri24ptBold}>
          {formatDateFullMonthProper(certificate.attainmentDate)}
        </span>
      </div>
    </div>
    <div style={{ marginLeft: "0px", marginRight: "5rem" }}>
      <div>
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "3rem" }}
        >
          <div className="col-0" />
          <div className="col-3  justify-content-center">
            <div className="px-0 text-left " style={{ lineHeight: "100%" }}>
              <img
                style={signatureWidthStyle}
                src={certificate.additionalData.certSignatories[0].signature}
              />
            </div>
            <div
              className="text-left"
              style={{ marginLeft: "2rem", lineHeight: "100%" }}
            >
              <span style={calibri10pt}>
                Chairman <br />
                Board of Governors
              </span>
            </div>
          </div>
          <div className="col-1" />

          <div className="col-3">
            <div className="px-0 text-center">
              <img
                style={signatureWidthStyle}
                src={certificate.additionalData.certSignatories[1].signature}
              />
            </div>
            <div className="text-center">
              <span style={calibri10pt}>Principal & CEO</span>
            </div>
          </div>
          <div className="col-1" />

          <div className="col-3">
            <div className="px-0 text-center">
              <img
                style={signatureWidthStyle}
                src={certificate.additionalData.certSignatories[2].signature}
              />
            </div>
            <div className="text-center" style={{ marginLeft: "4rem" }}>
              <span style={calibri10pt}>Registrar</span>
            </div>
            <div className="col-1" />
          </div>
        </div>
      </div>
    </div>
    <div style={{ marginLeft: "10rem", marginRight: "2rem" }}>
      <div className="row d-flex justify-content-center">&nbsp;</div>
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "2rem", marginBottom: "1px" }}
      >
        <span style={calibri9pt}>NANYANG POLYTECHNIC, SINGAPORE</span>
      </div>
    </div>
  </div>
);

export default Template;
Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
