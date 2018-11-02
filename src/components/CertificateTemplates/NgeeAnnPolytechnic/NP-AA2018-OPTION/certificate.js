import {
  fullWidthStyle,
  printTextStyle,
  nameTextStyle,
  titleTextStyle,
  formatCertID,
  formatDate,
  IMG_LOGO_NP,
  IMG_SIG_MAH_BEE_WENG
} from "../common";

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
        <p style={printTextStyle}>has fulfilled an option in</p>
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
            <img style={fullWidthStyle} src={IMG_SIG_MAH_BEE_WENG} />
            <hr />
          </div>
          <div className="text-center">Mah Wee Beng</div>
          <div className="text-center">Registrar</div>
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
