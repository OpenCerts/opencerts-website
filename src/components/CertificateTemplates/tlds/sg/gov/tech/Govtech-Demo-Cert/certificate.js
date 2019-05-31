import PropTypes from "prop-types";
import { format } from "date-fns";
import { get } from "lodash";
import { certificateBg } from "./common/backgrounds";

const Template = ({ certificate }) => (
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
          className="w-100"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div
        className="h5 mb-4 mb-lg-5 d-flex justify-content-center"
        style={{ fontSize: "4vw" }}
      >
        <i>This is to certify that</i>
      </div>
      <div
        className="h3 mb-4 mb-lg-5 d-flex justify-content-center"
        style={{ fontSize: "5vw" }}
      >
        <b>{certificate.recipient.name}</b>
      </div>
      <div
        className="h5 mb-4 mb-lg-5 d-flex justify-content-center"
        style={{ fontSize: "3vw" }}
      >
        <i>has successfully completed the</i>
      </div>
      <div
        className="h1 mb-4 mb-lg-5 d-flex justify-content-center"
        style={{ fontSize: "5vw" }}
      >
        OpenCerts Demo
      </div>
      <div
        className="h5 mb-4 mb-lg-5 d-flex justify-content-center"
        style={{ fontSize: "3vw" }}
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
        <div className="col text-center">
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
          <div style={{ fontSize: "2.5vw" }}>
            <b>{get(certificate, "additionalData.certSignatories[0].name")}</b>
            <br />
            {get(
              certificate,
              "additionalData.certSignatories[0].position"
            )},{" "}
            {get(certificate, "additionalData.certSignatories[0].organisation")}
          </div>
        </div>

        <div className="col" />

        <div
          className="d-flex flex-row-reverse col"
          style={{
            paddingTop: "5%",
            fontSize: "2.5vw"
          }}
        >
          Dated {format(certificate.issuedOn, "DD/MM/YYYY")}
        </div>
      </div>
    </div>
  </div>
);

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
