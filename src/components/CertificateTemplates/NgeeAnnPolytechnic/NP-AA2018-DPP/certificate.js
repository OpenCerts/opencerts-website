import PropTypes from "prop-types";
import { get } from "lodash";
import {
  fullWidthStyle,
  printTextStyle,
  nameTextStyle,
  titleTextStyle,
  renderSingapore,
  renderLogoNP,
  renderIssuingDate,
  renderFooter
} from "../common/certificate";

export const renderAwardText = certificate => (
  <div>
    <div
      className="row d-flex justify-content-center"
      style={{ marginTop: "3rem" }}
    >
      <p style={printTextStyle}>This is to certify that</p>
    </div>
    <div className="row d-flex justify-content-center">
      <p style={nameTextStyle}>{certificate.recipient.name}</p>
    </div>
    <div className="row d-flex justify-content-center">
      <p style={printTextStyle}>was awarded the</p>
    </div>
    <div className="row d-flex justify-content-center">
      <p style={titleTextStyle}>
        {" "}
        Diploma Plus Certificate
        <br />
        in
        <br />
        {certificate.name}
      </p>
    </div>
  </div>
);

const renderSignatures = certificate => (
  <div
    className="row d-flex justify-content-center align-items-end"
    style={{ marginTop: "8rem", marginBottom: "3rem" }}
  >
    <div className="col-1" />
    <div className="col-4">
      <div className="px-4">
        <img
          style={fullWidthStyle}
          src={get(certificate, "additionalData.certSignatories[0].signature")}
        />
        <hr />
      </div>
      <div className="text-center">
        {get(certificate, "additionalData.certSignatories[0].name")}
      </div>
      <div className="text-center">
        {get(certificate, "additionalData.certSignatories[0].position")}
      </div>
    </div>
    <div className="col-2" />
    <div className="col-4">
      <div className="px-4">
        <img
          style={fullWidthStyle}
          src={get(certificate, "additionalData.certSignatories[1].signature")}
        />
        <hr />
      </div>
      <div className="text-center">
        {get(certificate, "additionalData.certSignatories[1].name")}
      </div>
      <div className="text-center">
        {get(certificate, "additionalData.certSignatories[1].position")}
      </div>
    </div>
    <div className="col-1" />
  </div>
);

// eslint-disable-next-line react/display-name
const Template = ({ certificate }) => (
  <div>
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid" }}
    >
      {renderLogoNP()}
      {renderSingapore()}
      {renderAwardText(certificate)}
      {renderSignatures(certificate)}
      {renderIssuingDate(certificate)}
    </div>
    {renderFooter(certificate)}
  </div>
);

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
