import PropTypes from "prop-types";
import { get } from "lodash";
import { tz } from "moment-timezone";
import { logo, seal, qr } from "./resources";
import { TIMEZONE } from "../common";

const getCertSignatures = certSignatories => (
  <div className="col-5 text-center">
    {certSignatories.map((signatureData, key) => (
      <div key={key}>
        <img className="w-100" src={signatureData.signature} />
        <div style={{ fontSize: "1.4rem" }}>{signatureData.position}</div>
      </div>
    ))}
  </div>
);

const getCertInfoSection = (id, issuedOn) => (
  <div className="col-5 my-5">
    <div className="mb-4 mb-lg-3 text-center">
      <img style={{ maxWidth: "40%" }} src={qr} />
    </div>
    <div className="mb-4 mb-lg-3 d-flex justify-content-center">
      Certificate No. {id}
    </div>
    {issuedOn && (
      <div className="mb-4 mb-lg-3 d-flex justify-content-center">
        Date of award: {tz(issuedOn, TIMEZONE).format("DD MMMM YYYY")}
      </div>
    )}
    <img className="w-100" src={seal} />
  </div>
);

const Template = ({ certificate }) => {
  const id = get(certificate, "id");
  const certificateName = get(certificate, "name");
  const issuedOn = get(certificate, "issuedOn");
  const studentName = get(certificate, "recipient.name");
  const additionalData = get(certificate, "additionalData", {});
  const certSignatories = get(additionalData, "certSignatories", []);
  const merit = get(additionalData, "merit");

  return (
    <div
      className="container"
      style={{
        border: "2px solid #AAA",
        padding: "0"
      }}
    >
      <link
        href="https://fonts.googleapis.com/css?family=Noto+Serif"
        rel="stylesheet"
      />
      <div
        className="container"
        style={{
          border: "5px solid #ffffff",
          padding: "0"
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "#568666",
            height: "20px"
          }}
        />
        <div
          style={{
            width: "100%",
            backgroundColor: "#42c058",
            height: "20px"
          }}
        />
        <div
          style={{ fontFamily: "'Noto Serif', serif", maxWidth: 900 }}
          className="container"
        >
          <div className="my-5 m-lg-5 text-center">
            <img src={logo} className="w-100" style={{ maxWidth: 300 }} />
          </div>
          <div
            style={{
              margin: "0 auto",
              textAlign: "center",
              fontSize: "3.5rem",
              maxWidth: 700
            }}
            className="h1 mb-4 mb-lg-5 d-flex justify-content-center"
          >
            <b>{certificateName}</b>
          </div>
          <div
            style={{ fontSize: "1.4rem" }}
            className="mb-4 mb-lg-5 d-flex justify-content-center"
          >
            <p>This is to certify that</p>
          </div>
          <div
            style={{
              margin: "0 auto",
              textAlign: "center",
              fontSize: "2.5rem"
            }}
            className="h2 mb-4 mb-lg-5 d-flex justify-content-center"
          >
            <b>{studentName}</b>
          </div>
          <div
            style={{
              margin: "0 auto",
              textAlign: "center",
              maxWidth: 700,
              fontSize: "1.4rem"
            }}
            className="mb-4 mb-lg-5 d-flex justify-content-center"
          >
            <p>
              has successfully completed the above course and has passed the
              prescribed examinations leading the award of the
            </p>
          </div>
          <div
            style={{
              margin: "0 auto",
              textAlign: "center",
              fontSize: "2rem",
              maxWidth: 700
            }}
            className="h3 mb-4 mb-lg-5 d-flex justify-content-center"
          >
            <b>
              {certificateName}
              {merit && ` (${merit})`}
            </b>
          </div>
          <div
            style={{ fontSize: "1.4rem" }}
            className="mb-4 mb-lg-5 d-flex text-center justify-content-center"
          >
            <p>and is entitled to use the post-nominal designatory letters</p>
          </div>
          <div
            style={{ fontSize: "2rem" }}
            className="h3 mb-4 mb-lg-5 d-flex justify-content-center"
          >
            <b>{""} (SIPMM)</b>
          </div>
          <div className="d-flex justify-content-between m-3 p-2 mb-5">
            {getCertInfoSection(id, issuedOn)}
            {certSignatories !== [] && getCertSignatures(certSignatories)}
          </div>
        </div>
        <div
          style={{
            width: "100%",
            backgroundColor: "#42c058",
            height: "20px"
          }}
        />
        <div
          style={{
            width: "100%",
            backgroundColor: "#568666",
            height: "20px"
          }}
        />
      </div>
    </div>
  );
};

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
