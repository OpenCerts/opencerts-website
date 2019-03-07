import PropTypes from "prop-types";
import { IBS_LOGO } from "./images";

const title = {
  fontSize: "28px",
  fontWeight: "bold",
  textAlign: "center",
  color: "black"
};
const titlebig = {
  fontSize: "30px",
  fontWeight: "bold",
  textAlign: "center",
  color: "black"
};
const garamondItalic18Pt = {
  fontFamily: "Garamond",
  fontSize: "24px",
  fontStyle: "italic",
  textAlign: "center",
  color: "black"
};

const timesNewRoman18Pt = {
  fontFamily: "Times New Roman",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
  color: "black"
};

const helvetica12Pt = {
  fontFamily: "Helvetica",
  fontSize: "16px",
  textAlign: "center",
  color: "black"
};

const logoImgStyle = {
  width: "50%",
  height: "50%"
};

const presidentStyle = {
  width: "192px",
  height: "62px"
};

const Template = ({ certificate }) => (
  <div className="container">
    <div>
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "3rem" }}
      >
        <img src={IBS_LOGO} style={logoImgStyle} />
      </div>
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "1rem" }}
      >
        <span style={title}>PROFESSIONAL CERTIFICATE OF</span>
      </div>
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "1rem" }}
      >
        <span style={titlebig}>
          {certificate.additionalData.certificate}&trade;
        </span>
      </div>
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "1rem" }}
      >
        <span style={titlebig}>区块链顾问认证书</span>
      </div>
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "1rem" }}
      >
        <span style={garamondItalic18Pt}>is awarded to 颁于</span>
      </div>
      <div className="row d-flex justify-content-center">
        <span style={timesNewRoman18Pt}>{certificate.recipient.name}</span>
      </div>
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "2rem" }}
      >
        <span style={garamondItalic18Pt}>
          for successfully completed all courses and received passing grades
        </span>
      </div>
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "2rem" }}
      >
        <span style={garamondItalic18Pt}>
          offered by Institute of Blockchain&reg; (区块链学院)
        </span>
      </div>
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "1rem" }}
      >
        <span style={garamondItalic18Pt}>on 9 Jun 2018 (2018年6月9日)</span>
      </div>
      <div className="row d-flex justify-content-center">&nbsp;</div>
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "3rem" }}
      >
        <img
          src={certificate.additionalData.presidentSign.signature}
          style={presidentStyle}
        />
      </div>
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "1rem" }}
      >
        <span style={helvetica12Pt}>Mr Alvin Chua 蔡德伟 先生</span>
      </div>
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "1rem" }}
      >
        <span style={helvetica12Pt}>
          President, Institute of Blockchain&reg; 区块链学院院长
        </span>
      </div>
    </div>
  </div>
);

export default Template;
Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
