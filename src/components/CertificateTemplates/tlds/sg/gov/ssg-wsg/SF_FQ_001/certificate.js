import {
  renderLogoWSQ,
  renderIssuingDate,
  renderSignatureSOAHR,
  renderAwardTextQUAL
} from "../common/functions";
import fonts from "../common/fonts";

/* eslint-disable */
// Disabled eslint as there's no way to add proptypes to an anonymous function like this
export default ({ logo }) => ({ certificate }) => (
  <div>
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid",paddingTop:"100px",paddingBottom:"100px",paddingLeft:"6%",paddingRight:"6%", width:"100%", fontFamily:"Arial" }}
    >
      {fonts()}
      {renderLogoWSQ()}
      {renderAwardTextQUAL(certificate)}
      {renderIssuingDate(certificate)}
      {certificate.additionalData.certSignatories
        ? renderSignatureSOAHR(certificate)
        : ""}
    </div>
  </div>
);
