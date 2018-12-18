import PropTypes from "prop-types";
import {
  renderLogoNP,
  renderFooter,
  fullWidthStyle,
  printTextStyle,
  nameTextStyle,
  titleTextStyle
} from "../common/certificate";

export const formatDate = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getUTCFullYear();

  return (
    <p>
      {" "}
      {day} {months[month]} {year}
    </p>
  );
};

export const formatCertName = (certName, meritFlag) => {
  let certDipDisplay = "";
  if (meritFlag === "Y") {
    certDipDisplay = "Diploma with Merit";
  } else {
    certDipDisplay = "Diploma";
  }

  return (
    <p>
      {certDipDisplay}
      <br />
      in
      <br />
      {certName}
    </p>
  );
};

const renderAwardText = certificate => (
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
      <p style={printTextStyle}>
        has fulfilled {certificate.additionalData.optionType} in
      </p>
    </div>
    <div className="row d-flex justify-content-center">
      <p style={printTextStyle}>
        <p style={titleTextStyle}>{certificate.additionalData.optionName}</p>
      </p>
    </div>
    <div className="row d-flex justify-content-center">
      <p style={printTextStyle}>as part of the course of study in the</p>
    </div>
    <div className="row d-flex justify-content-center">
      <p style={titleTextStyle}>
        {" "}
        Diploma
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
    style={{ marginTop: "8rem", marginBottom: "2rem" }}
  >
    <div className="col-1" />
    <div className="col-5">
      <div className="px-5">
        <div className="text-center">
          {formatDate(certificate.issuedOn)}
          <hr />
        </div>
      </div>
      <div className="text-center">Date</div>
      <div className="text-center">&nbsp;</div>
    </div>
    <div className="col-5">
      <div className="px-5">
        <img
          style={fullWidthStyle}
          src={certificate.additionalData.certSignatories[0].signature}
        />
        <hr />
      </div>
      <div className="text-center">
        {certificate.additionalData.certSignatories[0].name}
      </div>
      <div className="text-center">
        {certificate.additionalData.certSignatories[0].position}
      </div>
    </div>
    <div className="col-1" />
  </div>
);

const Template = ({ certificate }) => (
  <div>
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid" }}
    >
      {renderLogoNP()}
      {renderAwardText(certificate)}
      {renderSignatures(certificate)}
    </div>
    {renderFooter(certificate)}
  </div>
);

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
