import { formatCertName, formatCertID, formatDate } from "./functions";

import { IMG_LOGO_NP, IMG_CERTIFICATE_SEAL } from "./images";

import {
  fullWidthStyle,
  printTextStyle,
  nameTextStyle,
  titleTextStyle,
  singaporeTextStyle
} from "./styles";

// eslint-disable-next-line react/display-name
export const CertificateJoint = ({ logo, signatories }) => certificate => (
  <div>
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid" }}
    >
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "3rem" }}
      />
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-1" />
        <div className="col-5">
          <img style={fullWidthStyle} src={IMG_LOGO_NP} />
        </div>
        <div className="col-5">
          <img style={fullWidthStyle} src={logo} />
        </div>
        <div className="col-1" />
      </div>
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
      <div
        className="row d-flex justify-content-center align-items-end"
        style={{ marginTop: "8rem", marginBottom: "1rem" }}
      >
        <div className="col-6" />
        <div className="col-4">
          <div className="px-4">
            <img style={fullWidthStyle} src={signatories[0].signature} />
            <hr />
          </div>
          <div className="text-center">{signatories[0].name}</div>
          <div className="text-center">{signatories[0].position}</div>
          <div className="text-center">{signatories[0].organisation}</div>
        </div>
        <div className="col-2" />
      </div>
      <div
        className="row d-flex justify-content-center align-items-end"
        style={{ marginTop: "1rem", marginBottom: "2rem" }}
      >
        <div className="col-4">
          <img style={fullWidthStyle} src={IMG_CERTIFICATE_SEAL} />
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

        <div className="col-4">
          <div className="px-4">
            <img style={fullWidthStyle} src={signatories[2].signature} />
            <hr />
          </div>
          <div className="text-center">{signatories[2].name}</div>
          <div className="text-center">{signatories[2].position}</div>
          <div className="text-center">{signatories[2].organisation}</div>
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

// eslint-disable-next-line react/display-name
export const CertificateMain = ({ signatories }) => certificate => (
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
        style={{ marginTop: "2rem" }}
      >
        <p style={singaporeTextStyle}>SINGAPORE</p>
      </div>
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
      <div
        className="row d-flex justify-content-center align-items-end"
        style={{ marginTop: "8rem", marginBottom: "2rem" }}
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
