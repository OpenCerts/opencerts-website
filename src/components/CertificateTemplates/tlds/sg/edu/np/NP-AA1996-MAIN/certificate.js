import PropTypes from "prop-types";
import {
  fullWidthStyle,
  printTextStyle,
  nameTextStyle,
  titleTextStyle,
  renderTwoSignatures,
  renderIssuingDate,
  renderFooter
} from "../common/certificate";
import { IMG_LOGO_NP_1996 } from "../common/images";
import { formatCertName } from "../common/functions";

export const renderLogoNP = () => (
  <div className="row d-flex justify-content-center">
    <div className="col-2" />
    <div className="col-8">
      <img style={fullWidthStyle} src={IMG_LOGO_NP_1996} />
    </div>
    <div className="col-2" />
  </div>
);

export const renderAwardText = certificate => (
  <div>
    <div
      className="row d-flex justify-content-center"
      style={{ marginTop: "3rem" }}
    >
      <p style={printTextStyle}>It is hereby certified that</p>
    </div>
    <div className="row d-flex justify-content-center">
      <p style={nameTextStyle}>{certificate.recipient.name}</p>
    </div>
    <div className="row d-flex justify-content-center">
      <p style={printTextStyle}>
        having duly completed the approved course of study <br />
        and passed the prescribed examinations <br />
        was duly awarded the
      </p>
    </div>
    <div className="row d-flex justify-content-center">
      <div style={titleTextStyle}>
        {formatCertName(
          certificate.id,
          certificate.name,
          certificate.additionalData.merit
        )}
      </div>
    </div>
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
      {renderAwardText(certificate)}
      {renderTwoSignatures(certificate)}
      {renderIssuingDate(certificate)}
    </div>
    {renderFooter(certificate)}
  </div>
);

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
