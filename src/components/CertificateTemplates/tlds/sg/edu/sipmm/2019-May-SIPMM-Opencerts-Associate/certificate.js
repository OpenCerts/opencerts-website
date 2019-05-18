import PropTypes from "prop-types";
import { get } from "lodash";
import { tz } from "moment-timezone";

import { logo, seal, qr } from "./resources";
import { TIMEZONE } from "../common";
import {
  colSixMobileClass,
  qrClass,
  wrapperContainerClass
} from "./styles.scss";

const getCertSignatures = certSignatories => (
  <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }}
  className={`col-6 my-5 text-center`}
  >
    {certSignatories.map((signatureData, key) => (
      <div className=" w-100 mb-3 mb-lg-3" key={key}>
        <img className="w-100" src={signatureData.signature} />
        <div style={{ fontSize: "1.4em" }}>{signatureData.position}</div>
      </div>
    ))}
  </div>
);

const getCertInfoSection = (id, issuedOn) => (
  <div className={`col-6 my-5 text-center`}>
    <div className="mb-3 mb-lg-3 text-center">
      <img className={qrClass} style={{ maxWidth: "20%" }} src={qr} />
    </div>
    <div className="mb-3 mb-lg-3 d-flex justify-content-center">
      Certificate No. {id}
    </div>
    {issuedOn && (
      <div className="mb-3 mb-lg-3 d-flex justify-content-center">
        Date of award: {tz(issuedOn, TIMEZONE).format("DD MMMM YYYY")}
      </div>
    )}
    <img style={{ maxWidth: "80%" }} src={seal} />
  </div>
);

const Template = ({ certificate }) => {
  const id = get(certificate, "id");
  const certificateName = get(certificate, "name");
  const description = get(certificate, "description");
  const issuedOn = get(certificate, "issuedOn");
  const studentName = get(certificate, "recipient.name");
  const additionalData = get(certificate, "additionalData", {});
  const certSignatories = get(additionalData, "certSignatories", []);
  const OverallGradeClassification = get(
    additionalData,
    "OverallGradeClassification"
  );

  return (
    <div
      className="container"
      style={{
        border: "2px solid #AAA",
        padding: "0",
        maxWidth: 1000
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
            height: "15px"
          }}
        />
        <div
          style={{
            width: "100%",
            backgroundColor: "#42c058",
            height: "15px"
          }}
        />
        <div
          style={{
            fontFamily: "'Noto Serif', serif",
            maxWidth: 900,
            fontSize: 14
          }}
          className={`container ${wrapperContainerClass}`}
        >
          <div className="my-5 m-lg-5 text-center">
            <img src={logo} className="w-100" style={{ maxWidth: 300 }} />
          </div>
          <div
            style={{
              margin: "0 auto",
              textAlign: "center",
              fontSize: "2.5em",
              maxWidth: 700
            }}
            className="h1 mb-4 mb-lg-5 d-flex justify-content-center"
          >
            <b>{certificateName}</b>
          </div>
          <div
            style={{ fontSize: "1.4em" }}
            className="mb-3 mb-lg-4 d-flex justify-content-center"
          >
            <p>This is to certify that</p>
          </div>
          <div
            style={{
              margin: "0 auto",
              textAlign: "center",
              fontSize: "2.5em"
            }}
            className="h2 mb-3 mb-lg-4 d-flex justify-content-center"
          >
            <b>{studentName}</b>
          </div>
          <div
            style={{
              margin: "0 auto",
              textAlign: "center",
              maxWidth: 700,
              fontSize: "1.4em"
            }}
            className="mb-3 mb-lg-4 d-flex justify-content-center"
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
              fontSize: "2em",
              maxWidth: 700
            }}
            className="h3 mb-3 mb-lg-4 d-flex justify-content-center"
          >
            <b>
              {certificateName}
              {OverallGradeClassification && ` (${OverallGradeClassification})`}
            </b>
          </div>
          <div
            style={{ fontSize: "1.4em" }}
            className="mb-3 mb-lg-4 d-flex text-center justify-content-center"
          >
            <p>and is entitled to use the post-nominal designatory letters</p>
          </div>
          <div
            style={{ fontSize: "2em" }}
            className="h3 mb-3 mb-lg-4 d-flex justify-content-center text-center"
          >
            <b>{description} (SIPMM)</b>
          </div>
          <div className="d-flex justify-content-between">
            {getCertInfoSection(id, issuedOn)}
            {certSignatories !== [] && getCertSignatures(certSignatories)}
          </div>
        </div>
        <div
          style={{
            width: "100%",
            backgroundColor: "#42c058",
            height: "15px"
          }}
        />
        <div
          style={{
            width: "100%",
            backgroundColor: "#568666",
            height: "15px"
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
