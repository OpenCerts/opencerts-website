import { get } from "lodash";
import { tz } from "moment-timezone";
import {
  IMG_CERTIFICATE_SEAL,
  IMG_CERT_FULL1_LOGO_ITE,
  IMG_CERT_NIEC1_LOGO_ITE,
  IMG_CERT_NIEC1ITE_LOGO_ITE
} from "./images";

export const TIMEZONE = "Asia/Singapore";

export const fullWidthStyle = {
  width: "100%",
  height: "auto"
};

export const halfWidthStyle = {
  width: "55%",
  height: "auto"
};

export const threeqartWidthStyle = {
  width: "75%",
  height: "auto"
};

export const arial16Pt = {
  fontFamily: "Arial",
  fontSize: "24px",
  textAlign: "center"
};

export const arial10Pt = {
  fontFamily: "Arial",
  fontSize: "16px",
  textAlign: "center",
  marginTop: "0",
  marginBottom: "0",
  marginLeft: "0",
  marginRight: "0"
};

export const arial5Pt = {
  fontFamily: "Arial",
  fontSize: "15px",
  textAlign: "start",
  marginTop: "0",
  marginBottom: "0"
};

export const timesNewRoman24Pt = {
  fontFamily: "Times New Roman",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "center",
  color: "black",
  marginTop: "0",
  marginBottom: "0"
};

export const timesNewRoman32Pt = {
  fontFamily: "Times New Roman",
  fontSize: "42px",
  fontStyle: "italic",
  fontWeight: "bold",
  textAlign: "center",
  color: "black",
  marginTop: "0",
  marginBottom: "0"
};

export const printTextStyle = {
  fontFamily: "TimesNewRoman",
  fontStyle: "Italic",
  fontWeight: "500!important",
  fontSize: "1.2rem",
  color: "#555",
  textAlign: "center"
};

export const COMTextStyle = {
  fontFamily: "Arial",
  color: "#111",
  fontSize: "5.0rem",
  fontWeight: "bold"
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

export const renderCOM = () => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "6rem" }}
  >
    <p style={COMTextStyle}>Certificate of Merit</p>
  </div>
);

export const renderLogoITE = () => (
  <div className="row d-flex justify-content-center">
    <div className="col-1" />
    <div className="col-10">
      <img style={halfWidthStyle} src={IMG_CERT_FULL1_LOGO_ITE} />
    </div>
    <div className="col-1" />
  </div>
);

export const renderLogoITEandPartner = () => (
  <div
    className="row d-flex justify-content-start align-items-end"
    style={{ marginTop: "3rem" }}
  >
    <div className="col-1" />
    <div className="col-5">
      <img style={fullWidthStyle} src={IMG_CERT_NIEC1_LOGO_ITE} />
    </div>
    <div className="col-5">
      <img style={fullWidthStyle} src={IMG_CERT_NIEC1ITE_LOGO_ITE} />
    </div>
    <div className="col-1" />
  </div>
);

export const renderSignatory = (certificate, count, certnbr, separ, stdid) => (
  <div
    className="col-4 justify-content-center"
    style={{ marginTop: "4rem", marginBottom: "0" }}
  >
    <div className="px-4">
      <img
        style={fullWidthStyle}
        src={get(
          certificate,
          `additionalData.certSignatories[${count}].signature`
        )}
      />
    </div>
    <div className="text-center">
      <strong>
        <p style={arial10Pt}>
          {get(
            certificate,
            `additionalData.certSignatories[${count}].designation`
          )}
        </p>
      </strong>
    </div>
    <p>
      <br />
    </p>
    <div className="text-center">
      <strong>
        <p style={timesNewRoman24Pt}>
          {certnbr}
          {separ}
          {stdid}
        </p>
      </strong>
    </div>
  </div>
);

export const renderTwoSignatures = certificate => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    <div className="col-4 justify-content-center">
      <div className="row justify-content-center align-items-center">
        <img style={threeqartWidthStyle} src={IMG_CERTIFICATE_SEAL} />
      </div>
    </div>

    {renderSignatory(certificate, 0, "", "", "")}
    {renderSignatory(
      certificate,
      1,
      certificate.id,
      "/",
      certificate.recipient.studentId
    )}
  </div>
);

export const renderITEFooter = certificate => (
  <div className="container">
    <div
      className="row d-flex justify-content-start align-items-start"
      style={{ marginTop: "1rem" }}
    >
      <div className="col-1" />
      <div className="col-10 text-left">
        <p style={arial5Pt}>{certificate.additionalData.footnoteLine1}</p>
        <div className="ml-3">
          <div className="pl-4">
            <p style={arial5Pt}>{certificate.additionalData.footnoteLine2}</p>
          </div>
        </div>
        <br />
        <br />
      </div>
      <div className="col-1" />
    </div>
  </div>
);

export const renderTwoNiecSignatures = certificate => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "8rem", marginBottom: "0" }}
  >
    <div className="col-4 justify-content-center">
      <div className="row d-flex justify-content-center align-items-center">
        <img style={threeqartWidthStyle} src={IMG_CERTIFICATE_SEAL} />
      </div>
    </div>

    <div
      className="col-4 justify-content-center"
      style={{ marginTop: "4rem", marginBottom: "0" }}
    >
      <div className="px-4">
        <img
          style={fullWidthStyle}
          src={get(certificate, "additionalData.certSignatories[0].signature")}
        />
      </div>
      <div className="text-center">
        <strong>
          <p style={arial10Pt}>
            {get(certificate, "additionalData.certSignatories[0].designation")}
          </p>
        </strong>
      </div>
      <div className="text-center">
        <strong>
          <p style={arial10Pt}>
            {get(
              certificate,
              "additionalData.certSignatories[0].organisation"
            ).substring(0, 21)}
          </p>
        </strong>
      </div>
      <div className="text-center">
        <strong>
          <p style={arial10Pt}>
            {get(
              certificate,
              "additionalData.certSignatories[0].organisation"
            ).substring(22, 49)}
          </p>
        </strong>
      </div>
      <p>
        <br />
      </p>
    </div>

    <div
      className="col-4 justify-content-center"
      style={{ marginTop: "4rem", marginBottom: "0" }}
    >
      <div className="px-4">
        <img
          style={fullWidthStyle}
          src={get(certificate, "additionalData.certSignatories[1].signature")}
        />
      </div>
      <div className="text-center">
        <strong>
          <p style={arial10Pt}>
            {get(certificate, "additionalData.certSignatories[1].designation")}
          </p>
        </strong>
      </div>
      <div className="text-center">
        <strong>
          <p style={arial10Pt}>
            {get(certificate, "additionalData.certSignatories[1].organisation")}
          </p>
        </strong>
      </div>
      <p>
        <br />
      </p>
      <div className="text-center">
        <strong>
          <p style={timesNewRoman24Pt}>
            {certificate.id}/{certificate.recipient.studentId}
          </p>
        </strong>
      </div>
    </div>
  </div>
);

export const formatDateFullMonthProper = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return tz(date, TIMEZONE).format("D MMMM YYYY");
};

export const renderCertDescr = certificate => (
  <div>
    <p>
      <br />
    </p>
    <div className="ml-5">
      <div className="mr-5">
        <div className="row d-flex justify-content-center">
          <span style={timesNewRoman32Pt}>
            <p style={timesNewRoman32Pt}>{certificate.description}</p>
          </span>
        </div>
      </div>{" "}
    </div>
    <div className="ml-5">
      <div className="mr-5">
        <div className="row d-flex justify-content-center">
          <span style={timesNewRoman32Pt}>
            <p style={timesNewRoman32Pt}>in</p>
          </span>
        </div>
      </div>{" "}
    </div>
    <div className="ml-5">
      <div className="mr-5">
        <div className="row d-flex justify-content-center">
          <span style={timesNewRoman32Pt}>
            <p style={timesNewRoman32Pt}>
              {certificate.additionalData.courseDescription}
            </p>
          </span>
        </div>
      </div>{" "}
    </div>
    <div className="ml-5">
      <div className="mr-5">
        <div className="row d-flex justify-content-center">
          <span style={timesNewRoman32Pt}>
            <p style={timesNewRoman32Pt}>
              {certificate.additionalData.courseSpecialisation}
            </p>
          </span>
        </div>
      </div>{" "}
    </div>
    <div className="row d-flex justify-content-center">
      <span style={arial16Pt}>on</span>
    </div>
    <div className="row d-flex justify-content-center">
      <span style={timesNewRoman32Pt}>
        <p style={timesNewRoman32Pt}>
          {formatDateFullMonthProper(certificate.graduationDate)}
        </p>
      </span>
    </div>
  </div>
);

export const renderFullCertAwardText = certificate => (
  <div>
    <div
      className="row d-flex justify-content-center"
      style={{ marginTop: "10rem" }}
    >
      <span style={arial16Pt}>It is hereby certified that</span>
    </div>
    <div className="ml-3">
      <div className="mr-3">
        <div className="row d-flex justify-content-center">
          <span style={timesNewRoman32Pt}>{certificate.recipient.name}</span>
        </div>
      </div>{" "}
    </div>
    <div className="row d-flex justify-content-center">
      <span style={arial10Pt}>
        __________________________________________________________________________________________
      </span>
    </div>
    <p>
      <br />
    </p>
    <div className="row d-flex justify-content-center">
      <span style={arial16Pt}>
        having successfully completed the programme of study
      </span>
    </div>
    <div className="row d-flex justify-content-center">
      <span style={arial16Pt}>and passed the prescribed examinations</span>
    </div>
    <div className="row d-flex justify-content-center">
      <span style={arial16Pt}>was awarded the</span>
    </div>

    {renderCertDescr(certificate)}
  </div>
);

export const renderCOMAwardText = certificate => (
  <div>
    <div
      className="row d-flex justify-content-center"
      style={{ marginTop: "2rem" }}
    >
      <span style={arial16Pt}>It is hereby certified that</span>
    </div>
    <div className="ml-3">
      <div className="mr-3">
        <div className="row d-flex justify-content-center">
          <span style={timesNewRoman32Pt}>{certificate.recipient.name}</span>
        </div>
      </div>{" "}
    </div>
    <div className="row d-flex justify-content-center">
      <span style={arial10Pt}>
        __________________________________________________________________________________________
      </span>
    </div>
    <p>
      <br />
    </p>
    <div className="row d-flex justify-content-center">
      <span style={arial16Pt}>was awarded the Certificate of Merit</span>
    </div>
    <div className="row d-flex justify-content-center">
      <span style={arial16Pt}>for Outstanding Performance in the</span>
    </div>

    {renderCertDescr(certificate)}
  </div>
);

/* eslint-disable */
// Disabled eslint as there's no way to add proptypes to an anonymous function like this
export default () => ({ certificate }) => (
  <div>
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid" }}
    >
      {renderLogoITE()}
      {renderAwardText(certificate)}
      {renderTwoSignatures(certificate)}
	   {renderITEFooter(certificate)}
  </div>
  </div>
);
