import {
  renderSignatureSOAHR,
  renderAwardTextSOAHR,
  renderLogoWSQ,
  renderIssuingDate
} from "./functions";
import fonts from "./fonts";

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
      {renderAwardTextSOAHR(certificate)}
      {renderIssuingDate(certificate)}
      {certificate.additionalData.certSignatories
        ? renderSignatureSOAHR(certificate)
        : ""}
    </div>
  </div>
);
