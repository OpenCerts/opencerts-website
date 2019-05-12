import { get } from "lodash";
import { IMG_SEAL, IMG_SSGLOGO, IMG_ORDNANCE } from "../common";
import {
  renderLogoWSQ,
  renderIssuingDate,
  renderAwardTextQUAL
} from "../common/functions";
import fonts from "../common/fonts";
import * as styles from "../common/style";

export const renderSignature = certificate => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    <div className="col-lg-2 col-6">
      <img style={styles.sealWidthStyle} src={IMG_SEAL} />
    </div>

    <div className="col-lg-7">
      <div className="col-lg-3 col-12">
        <img
          style={styles.signatureWidthStyle}
          src={get(certificate, "additionalData.certSignatories[0].signature")}
        />
      </div>
      <div style={styles.designationTextStyle} className="RobotoBold">
        {get(certificate, "additionalData.certSignatories[0].name")},{" "}
        {get(certificate, "additionalData.certSignatories[0].position")}
      </div>
      <div style={styles.designationTextStyle} className="RobotoBold">
        {get(certificate, "additionalData.certSignatories[0].organisation")}
      </div>
      <div style={{ paddingLeft: "0px" }} className="col-lg-5 col-12">
        <img style={styles.footerLogoStyle} src={IMG_SSGLOGO} />
      </div>
      <div className="col-lg-10 col-12" style={{ paddingLeft: "0px" }}>
        <div style={styles.footerTextStyle} className="RobotoLight">
          The training and assessment of the abovementioned learner are
          accredited
          <br />
          in accordance with the Singapore Workforce Skills Qualifications
          System.
        </div>
        <div style={styles.footerTextStyle} className="RobotoLight">
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
    </div>
    <div className="col-lg-3 col-xs-12">
      <div style={{ marginBottom: "70px", marginTop: "60px" }}>
        <p style={styles.printTextStyle} className="RobotoRegular">
          Cert No: {get(certificate, "additionalData.serialNum")}
        </p>
      </div>
      <div style={styles.footerTextStyle}>In partnership with</div>
      <img style={styles.footerLogoStyle} src={IMG_ORDNANCE} />
      <div style={styles.certCodeStyle}>
        {get(certificate, "additionalData.certCode")}
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
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid", paddingLeft:"80px", paddingRight:"80px", paddingTop:"100px", paddingBottom:"100px", width:"100%", fontFamily:"Arial" }}
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
