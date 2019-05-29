import { get } from "lodash";
import { IMG_SEAL, IMG_SSGLOGO } from "../common";
import {
  renderLogoWSQ,
  renderIssuingDate,
  renderAwardTextSOA
} from "../common/functions";
import fonts from "../common/fonts";
import * as styles from "../common/style";

export const renderSignatureSFSOA = certificate => (
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
      <div style={styles.footerTextStyle} className="RobotoLight">
        The training and assessment of the above mentioned learner are
        accredited
        <br />
        in accordance with the Singapore Workforce Skills Qualifications System.
        <br />
        This WSQ programme is aligned to the Skills Framework
      </div>
      <div style={styles.footerTextStyle} className="RobotoLight">
        <a style={{ color: "rgb(51,0,144)" }} href="https://www.ssg.gov.sg">
          www.ssg.gov.sg
        </a>
        <br />
        For verification of this certificate, please visit
        https://myskillsfuture.sg/verify_eCert.html
      </div>
    </div>
    <div className="col-lg-3 col-xs-12">
      <div style={{ marginBottom: "70px", marginTop: "60px" }}>
        <p style={styles.printTextStyle} className="RobotoRegular">
          Cert No: {get(certificate, "additionalData.serialNum")}
        </p>
      </div>
      <div>
        <img style={styles.soaFooterLogoStyle} src={IMG_SSGLOGO} />
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
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid", paddingLeft:"6%", paddingRight:"6%", paddingTop:"100px", paddingBottom:"100px", width:"100%", fontFamily:"Arial" }}
    >
      {fonts()}
      {renderLogoWSQ()}
      {renderAwardTextSOA(certificate)}
      {renderIssuingDate(certificate)}
      {certificate.additionalData.certSignatories
        ? renderSignatureSFSOA(certificate)
        : ""}
    </div>
  </div>
);
