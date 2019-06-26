import PropTypes from "prop-types";
import { format } from "date-fns";
import { get } from "lodash";
import { certificateBg } from "./common/backgrounds";
import css from "./common/demoStyles.scss";
import React, { useState, useEffect } from "react";

const Template = ({ certificate, updateParentHeight }) => {
  useEffect(() => {
    updateParentHeight();
  });

  return (
    <div
      className="p-2 container"
      style={{
        backgroundImage: `url('${certificateBg}')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        border: "10px solid #324353"
      }}
    >
      <div
        className="p-2"
        style={{
          border: "0px solid #324353"
        }}
      >
        <div className="my-5 m-lg-5 text-center">
          <img
            src="/static/images/opencertslogo.svg"
            style={{ width: "60%", height: "auto", maxWidth: "1000px" }}
          />
        </div>
        <div
          className={`mb-4 mb-lg-5 d-flex justify-content-center ${css.body}`}
          style={{ textAlign: "center" }}
        >
          <i>This is to certify that</i>
        </div>
        <div
          className={`mb-4 mb-lg-5 d-flex justify-content-center ${css.title}`}
        >
          <b>{certificate.recipient.name}</b>
        </div>
        <div
          className={`mb-4 mb-lg-5 d-flex justify-content-center ${css.body}`}
          style={{ textAlign: "center" }}
        >
          <i>has successfully completed the</i>
        </div>
        <div
          className={`mb-4 mb-lg-5 d-flex justify-content-center ${css.title}`}
          style={{ textAlign: "center" }}
        >
          OpenCerts Demo
        </div>
        <div
          className={`mb-4 mb-lg-5 d-flex justify-content-center ${css.body}`}
          style={{ textAlign: "center" }}
        >
          <i>certification through training administered by</i>
        </div>
        <div className="row">
          <div className="col" />
          <div className="col">
            <img
              className="w-100"
              style={{ width: "100%", height: "auto", minWidth: "100px" }}
              src="/static/images/logo-govtech.png"
            />
          </div>
          <div className="col" />
        </div>

        <div
          className="row"
          style={{
            paddingLeft: "8%",
            paddingTop: "5%"
          }}
        >
          <div className={`col text-center ${css.transcript}`}>
            <img
              style={{ width: "100%", height: "auto" }}
              src={get(
                certificate,
                "additionalData.certSignatories[0].signature"
              )}
            />
            <hr
              style={{
                border: "none",
                height: "1px",
                backgroundColor: "#333"
              }}
            />
            <div>
              <b>
                {get(certificate, "additionalData.certSignatories[0].name")}
              </b>
              <br />
              {get(
                certificate,
                "additionalData.certSignatories[0].position"
              )},{" "}
              {get(
                certificate,
                "additionalData.certSignatories[0].organisation"
              )}
            </div>
          </div>

          <div className="col" />

          <div
            className={`d-flex flex-row-reverse col ${css.transcript}`}
            style={{
              paddingTop: "5%",
              paddingRight: "5%"
            }}
          >
            Dated {format(certificate.issuedOn, "DD/MM/YYYY")}
          </div>
        </div>
      </div>
    </div>
  );
};

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
