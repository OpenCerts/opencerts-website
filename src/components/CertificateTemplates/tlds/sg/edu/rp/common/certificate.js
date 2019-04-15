import { get } from "lodash";
import { IMG_LOGO_RP, IMG_CERTIFICATE_SEAL } from "./images";
import { formatDate, formatDatePrefix, formatCertName } from "./functions";

export const logoLStyle = {
  textAlign: "left",
  width: "100%",
  height: "auto"
};
export const logoRStyle = {
  width: "100%",
  height: "auto",
  textAlign: "right"
};
export const fullWidthStyle = {
  width: "100%",
  height: "auto"
};
export const signatureTextStyle = {
  color: "#090",
  fontSize: "0.8rem"
};
export const printCertStyle = {
  fontFamily: "Old English Text MT",
  fontWeight: "500!important",
  fontSize: "3rem",
  color: "#555",
  textAlign: "center"
};

export const printRecipientStyle = {
  fontFamily: "Lucida Calligraphy",
  fontWeight: "500!important",
  fontSize: "3rem",
  color: "#555",
  textAlign: "center"
};

export const printTextStyle = {
  fontFamily: "Times New Roman",
  fontWeight: "500!important",
  fontSize: "2rem",
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
    <p style={singaporeTextStyle} />
  </div>
);

export const renderLogoRP = () => (
  <div className="row d-flex justify-content-center">
    <div className="col-2" />
    <div className="row d-flex justify-content-center">
      <img src={IMG_LOGO_RP} />
    </div>
    <div className="col-2" />
  </div>
);

export const renderLogoRPPartner = logo => (
  <div
    className="row d-flex justify-content-center align-items-center"
    style={{ marginTop: "3rem" }}
  >
    <div className="col-1" />
    <div className="col-5">
      <img style={fullWidthStyle} src={IMG_LOGO_RP} />
    </div>
    <div className="col-5">
      <img style={fullWidthStyle} src={logo} />
    </div>
    <div className="col-1" />
  </div>
);

export const renderTwoSignatures = certificate => (
  <div
    className="row d-flex justify-content-center align-items-end"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    <div className="col-4">
      <div className="px-4">
        <img
          style={logoLStyle}
          src={get(certificate, "additionalData.certSignatories[0].signature")}
        />
      </div>
      <div className="text-center">
        <span style={signatureTextStyle}>
          {get(certificate, "additionalData.certSignatories[0].position")}
        </span>
      </div>
    </div>

    <div className="col-1">&nbsp;</div>
    <div className="col-2">
      <img style={fullWidthStyle} src={IMG_CERTIFICATE_SEAL} />
    </div>
    <div className="col-1">&nbsp;</div>

    <div className="col-4">
      <div className="px-4">
        <img
          style={fullWidthStyle}
          src={get(certificate, "additionalData.certSignatories[1].signature")}
        />
      </div>
      <div className="text-center">
        <span style={signatureTextStyle}>
          {get(certificate, "additionalData.certSignatories[1].position")}
        </span>
      </div>
    </div>
  </div>
);

export const renderIssuingDate = certificate => (
  <span>
    {formatDatePrefix(get(certificate, "issuedOn"))}{" "}
    {formatDate(get(certificate, "issuedOn"))}
  </span>
);

export const renderAwardText = certificate => (
  <div>
    <div
      className="row d-flex justify-content-center"
      style={{ marginTop: "3rem" }}
    />
    <div style={printTextStyle}>The Board of Governors of the</div>

    <div style={printTextStyle}>Republic Polytechnic</div>

    <div style={printTextStyle}>On the recommendation of the Senate has</div>

    <div style={printTextStyle}>conferred</div>

    <div className="row d-flex justify-content-center">
      <p style={printRecipientStyle}>{get(certificate, "recipient.name")}</p>
    </div>

    <div style={printTextStyle}>the</div>

    <div className="row d-flex justify-content-center">
      <div style={printTextStyle}>
        <p style={printCertStyle}>{get(certificate, "name")}</p>
        {formatCertName(get(certificate, "additionalData.merit"))}
      </div>
    </div>
    <div style={printTextStyle}>with all of its privileges and obligations</div>

    <div className="row d-flex justify-content-center">
      <p style={printTextStyle}>Given this {renderIssuingDate(certificate)}.</p>
    </div>
  </div>
);

export const renderFooter = certificate => (
  <div className="container">
    <div className="row d-flex justify-content-center">
      <div className="col-6 text-left">&nbsp;</div>
      <div className="col-6 text-right">
        {get(certificate, "additionalData.additionalCertId")}
      </div>
    </div>
  </div>
);
