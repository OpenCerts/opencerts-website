import { get } from "lodash";
import { NICF_LOGO, IMG_LOGO, IMG_SEAL, IMG_SSGLOGO } from "../common";
import { renderIssuingDate, renderAwardTextQUAL } from "../common/functions";
import fonts from "../common/fonts";
import * as styles from "../common/style";

export const renderLogoWSQ = () => (
  <div className="row d-flex" style={{ marginTop: "3rem" }}>
    <div className="col-lg-5 col-12">
      <img style={styles.fullWidthStyle} src={NICF_LOGO} />
    </div>
    <div className="col-lg-6" />
  </div>
);

export const renderSignature = certificate => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    <div className="col-lg-2 col-6">
      <img style={styles.sealWidthStyle} src={IMG_SEAL} />
    </div>
    <div className="col-lg-10 col-12 row d-flex justify-content-center">
      <div className="col-lg-8">
        <div className="col-lg-4 col-12">
          <img
            style={styles.signatureWidthStyle}
            src={get(
              certificate,
              "additionalData.certSignatories[0].signature"
            )}
          />
        </div>
        <div style={styles.designationTextStyle} className="RobotoBold">
          {get(certificate, "additionalData.certSignatories[0].name")},{" "}
          {get(certificate, "additionalData.certSignatories[0].position")}
        </div>
        <div style={styles.designationTextStyle} className="RobotoBold">
          {get(certificate, "additionalData.certSignatories[0].organisation")}
        </div>
        <div style={styles.footerTextStyle} className="RobotoLight">
          The training and assessment of the abovementioned learner are
          accredited
          <br />
          in accordance with the Singapore Workforce Skills Qualifications
          System.
        </div>
      </div>
      <div className="col-lg-4 col-xs-12">
        <div style={{ marginBottom: "70px", marginTop: "60px" }}>
          <p style={styles.printTextStyle} className="RobotoRegular">
            Cert No: {get(certificate, "additionalData.serialNum")}
          </p>
        </div>
      </div>
      <div className="col-lg-5 col-12">
        <div style={styles.footerAboutTextStyle} className="RobotoLight">
          <a style={{ color: "rgb(51,0,144)" }} href="www.ssg.gov.sg">
            www.ssg.gov.sg
          </a>
          <br />
          For verification of this certificate, please visit{" "}
          <a
            style={{ color: "rgb(51,0,144)" }}
            href="https://myskillsfuture.sg/verify_eCert.html"
          >
            https://myskillsfuture.sg/verify_eCert.html
          </a>
        </div>
      </div>
      <div
        className="col-lg-7 col-12 d-flex justify-content-center"
        style={{ alignItems: "center" }}
      >
        <div>
          <img style={styles.dualLogoFooter} src={IMG_LOGO} />
          <img style={styles.dualLogoFooter} src={IMG_SSGLOGO} />
        </div>
        <div style={styles.certCodeStyle}>
          {get(certificate, "additionalData.certCode")}
        </div>
      </div>
    </div>
  </div>
);

/* eslint-disable */
// Disabled eslint as there's no way to add proptypes to an anonymous function like this
export default ({ logo }) => ({ certificate }) => (
  <div>
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid", paddingLeft:"6%", paddingRight:"6%", paddingBottom:"100px", paddingTop:"100px", width:"100%", fontFamily:"Arial" }}
    >
      {fonts()}
      {renderLogoWSQ()}
      {renderAwardTextQUAL(certificate)}
      {renderIssuingDate(certificate)}
      {certificate.additionalData.certSignatories
        ? renderSignature(certificate)
        : ""}
    </div>
  </div>
);
