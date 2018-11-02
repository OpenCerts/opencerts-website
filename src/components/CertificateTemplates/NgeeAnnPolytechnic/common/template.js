import { IMG_LOGO_NP, IMG_CERTIFICATE_SEAL } from "./images";

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

const singaporeTextStyle = {
  color: "#555",
  fontSize: "3rem"
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
  let daySup = "";
  switch (day % 10 === 1) {
    case 1:
      daySup = "st";
      break;
    case 2:
      daySup = "nd";
      break;
    case 3:
      daySup = "rd";
      break;
    default:
      daySup = "th";
  }

  const month = date.getMonth();
  const year = date.getUTCFullYear();

  return (
    <p>
      Dated this {day}
      <sup>{daySup}</sup> day of {months[month]} {year}
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

// eslint-disable-next-line react/display-name
export const Certificate = ({ logo, signatories }) => certificate => (
  <div>
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid" }}
    >
      {logo ? (
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ marginTop: "3rem" }}
        >
          <div className="col-1" />
          <div className="col-5">
            <img style={fullWidthStyle} src={IMG_LOGO_NP} />
          </div>
          <div className="col-5">
            <img style={fullWidthStyle} src={logo} />
          </div>
          <div className="col-1" />
        </div>
      ) : (
        <div className="row d-flex justify-content-center">
          <div className="col-2" />
          <div className="col-8">
            <img style={fullWidthStyle} src={IMG_LOGO_NP} />
          </div>
          <div className="col-2" />
        </div>
      )}

      {!logo ? (
        <div
          className="row d-flex justify-content-center"
          style={{ marginTop: "2rem" }}
        >
          <p style={singaporeTextStyle}>SINGAPORE</p>
        </div>
      ) : (
        ""
      )}

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
          having successfully completed the course of study <br />
          was awarded the
        </p>
      </div>
      <div className="row d-flex justify-content-center">
        <div style={titleTextStyle}>
          {formatCertName(certificate.name, certificate.additionalData.merit)}
        </div>
      </div>
      {signatories && signatories[2] ? (
        <div
          className="row d-flex justify-content-center align-items-end"
          style={{ marginTop: "8rem", marginBottom: "1rem" }}
        >
          <div className="col-6" />
          <div className="col-4">
            <div className="px-4">
              <img style={fullWidthStyle} src={signatories[2].signature} />
              <hr />
            </div>
            <div className="text-center">{signatories[2].name}</div>
            <div className="text-center">{signatories[2].position}</div>
            <div className="text-center">{signatories[2].organisation}</div>
          </div>
          <div className="col-2" />
        </div>
      ) : (
        ""
      )}
      <div
        className="row d-flex justify-content-center align-items-end"
        style={{ marginTop: logo ? "8rem" : "1rem", marginBottom: "2rem" }}
      >
        <div className="col-4">
          <img style={fullWidthStyle} src={IMG_CERTIFICATE_SEAL} />
        </div>

        <div className="col-4">
          <div className="px-4">
            <img style={fullWidthStyle} src={signatories[0].signature} />
            <hr />
          </div>
          <div className="text-center">{signatories[0].name}</div>
          <div className="text-center">{signatories[0].position}</div>
          <div className="text-center">{signatories[0].organisation}</div>
        </div>

        <div className="col-4">
          <div className="px-4">
            <img style={fullWidthStyle} src={signatories[1].signature} />
            <hr />
          </div>
          <div className="text-center">{signatories[1].name}</div>
          <div className="text-center">{signatories[1].position}</div>
          <div className="text-center">{signatories[1].organisation}</div>
        </div>
      </div>
      <div>
        <div>{formatDate(certificate.issuedOn)}</div>
      </div>
    </div>
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-6 text-left">
          {certificate.additionalData.additionalCertId}
        </div>
        <div className="col-6 text-right">{formatCertID(certificate.id)}</div>
      </div>
    </div>
  </div>
);
