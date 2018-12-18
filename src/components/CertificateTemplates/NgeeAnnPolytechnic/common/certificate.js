import { get } from "lodash";
import { IMG_LOGO_NP, IMG_CERTIFICATE_SEAL } from "./images";
import {
  formatDate,
  formatDatePrefix,
  formatCertName,
  formatCertID
} from "./functions";

export const fullWidthStyle = {
  width: "100%",
  height: "auto"
};

export const printTextStyle = {
  fontWeight: "500!important",
  fontWize: "1.2rem",
  color: "#555",
  textAlign: "center"
};

export const singaporeTextStyle = {
  color: "#555",
  fontSize: "3rem"
};

export const nameTextStyle = {
  fontSize: "3rem",
  textAlign: "center"
};

export const titleTextStyle = {
  color: "rgb(30,93,200)",
  fontSize: "3rem",
  textAlign: "center"
};

export const renderSingapore = () => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "2rem" }}
  >
    <p style={singaporeTextStyle}>SINGAPORE</p>
  </div>
);

export const renderLogoNP = () => (
  <div className="row d-flex justify-content-center">
    <div className="col-2" />
    <div className="col-8">
      <img style={fullWidthStyle} src={IMG_LOGO_NP} />
    </div>
    <div className="col-2" />
  </div>
);

export const renderLogoNPPartner = logo => (
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
);

export const renderThreeSignatures = certificate => (
  <div>
    <div
      className="row d-flex justify-content-center align-items-end"
      style={{ marginTop: "8rem", marginBottom: "1rem" }}
    >
      <div className="col-6" />
      <div className="col-4">
        <div className="px-4">
          <img
            style={fullWidthStyle}
            src={get(
              certificate,
              "additionalData.certSignatories[0].signature"
            )}
          />
          <hr />
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[0].name")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[0].position")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[0].organisation")}
        </div>
      </div>
      <div className="col-2" />
    </div>
    <div
      className="row d-flex justify-content-center align-items-end"
      style={{ marginTop: "1rem", marginBottom: "1rem" }}
    >
      <div className="col-4">
        <img style={fullWidthStyle} src={IMG_CERTIFICATE_SEAL} />
      </div>

      <div className="col-4">
        <div className="px-4">
          <img
            style={fullWidthStyle}
            src={get(
              certificate,
              "additionalData.certSignatories[1].signature"
            )}
          />
          <hr />
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[1].name")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[1].position")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[1].organisation")}
        </div>
      </div>

      <div className="col-4">
        <div className="px-4">
          <img
            style={fullWidthStyle}
            src={get(
              certificate,
              "additionalData.certSignatories[2].signature"
            )}
          />
          <hr />
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[2].name")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[2].position")}
        </div>
        <div className="text-center">
          {get(certificate, "additionalData.certSignatories[2].organisation")}
        </div>
      </div>
    </div>
  </div>
);

export const renderTwoSignatures = certificate => (
  <div
    className="row d-flex justify-content-center align-items-end"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    <div className="col-4">
      <img style={fullWidthStyle} src={IMG_CERTIFICATE_SEAL} />
    </div>

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
      <div className="text-center">
        {get(certificate, "additionalData.certSignatories[0].organisation")}
      </div>
    </div>

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
      <div className="text-center">
        {get(certificate, "additionalData.certSignatories[1].organisation")}
      </div>
    </div>
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
        having successfully completed the course of study <br />
        was awarded the
      </p>
    </div>
    <div className="row d-flex justify-content-center">
      <div style={titleTextStyle}>
        {formatCertName(certificate.name, certificate.additionalData.merit)}
      </div>
    </div>
  </div>
);

export const renderIssuingDate = certificate => (
  <div>
    <p>
      {formatDatePrefix(certificate.issuedOn)}{" "}
      {formatDate(certificate.issuedOn)}
    </p>
  </div>
);

export const renderFooter = certificate => (
  <div className="container">
    <div className="row d-flex justify-content-center">
      <div className="col-6 text-left">
        {get(certificate, "additionalData.additionalCertId")}
      </div>
      <div className="col-6 text-right">{formatCertID(certificate.id)}</div>
    </div>
  </div>
);

/* eslint-disable */
// Disabled eslint as there's no way to add proptypes to an anonymous function like this
export default ({ logo }) => ({ certificate }) => (
  <div>
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid" }}
    >
      {logo ? renderLogoNPPartner(logo) : renderLogoNP()}
      {!logo ? renderSingapore() : ""}
      {renderAwardText(certificate)}
      {certificate.additionalData.certSignatories &&
      certificate.additionalData.certSignatories[2]
        ? renderThreeSignatures(certificate)
        : renderTwoSignatures(certificate)}
      {renderIssuingDate(certificate)}
    </div>
    {renderFooter(certificate)}
  </div>
);
