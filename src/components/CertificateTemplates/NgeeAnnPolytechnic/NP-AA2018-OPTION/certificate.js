import { IMG_LOGO_NP } from "../common";

const fullWidthStyle = {
  width: "100%",
  height: "auto"
};

const printTextStyle = {
  fontWeight: "500!important",
  fontWize: "1.2rem",
  color: "#555",
  textAlign: "center"
};

const nameTextStyle = {
  fontSize: "3rem",
  textAlign: "center"
};

const titleTextStyle = {
  color: "rgb(30,93,200)",
  fontSize: "3rem",
  textAlign: "center"
};

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

export const formatCertID = certId => {
  if (!certId) return null;
  const arrayCertId = certId.split(":");
  return arrayCertId.length > 0 ? arrayCertId[0] : null;
};

const Template = certificate => (
  <div>
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid" }}
    >
      <div className="row d-flex justify-content-center">
        <div className="col-2" />
        <div className="col-8">
          <img style={fullWidthStyle} src={IMG_LOGO_NP} />
        </div>
        <div className="col-2" />
      </div>
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
      <div
        className="row d-flex justify-content-center align-items-end"
        style={{ marginTop: "8rem", marginBottom: "2rem" }}
      >
        <div className="col-1" />
        <div className="col-5">
          <div className="px-5">
            <div>{formatDate(certificate.issuedOn)}</div>
          </div>
          <br />
          <br />
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
    </div>
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-12 text-right">{formatCertID(certificate.id)}</div>
      </div>
    </div>
  </div>
);

export default Template;
