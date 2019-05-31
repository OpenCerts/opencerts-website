import PropTypes from "prop-types";
import { format } from "date-fns";
import { get } from "lodash";
import backgroundImg from "./common/resources";

const Template = ({ certificate }) => (
  <div
    className="p-2 container"
    style={{
      backgroundImage: `url('${backgroundImg}')`,
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
          style={{ minWidth: "300px" }}
        />
      </div>
      <div className="h5 mb-4 mb-lg-5 d-flex justify-content-center">
        <i>This is to certify that</i>
      </div>
      <div className="h3 mb-4 mb-lg-5 d-flex justify-content-center">
        <b>{certificate.recipient.name}</b>
      </div>
      <div className="h5 mb-4 mb-lg-5 d-flex justify-content-center">
        <i>has successfully completed the</i>
      </div>
      <div className="h1 mb-4 mb-lg-5 d-flex justify-content-center">
        OpenCerts Demo
      </div>
      <div className="h5 mb-4 mb-lg-5 d-flex justify-content-center">
        <i>certification through training administered by</i>
      </div>
      <div className="row">
        <div className="col" />
        <div className="col">
          <img
            className="w-100"
            style={{ minWidth: "300px" }}
            src="/static/images/logo-govtech.png"
          />
        </div>
        <div className="col" />
      </div>

      <div
        className="row"
        style={{
          paddingLeft: "50px",
          paddingRight: "50px",
          paddingTop: "30px"
        }}
      >
        <div className="col-4 text-center">
          <img
            className="w-100"
            src={get(
              certificate,
              "additionalData.certSignatories[0].signature"
            )}
          />
          <hr className="m-3" />
          <div>
            <b>{get(certificate, "additionalData.certSignatories[0].name")}</b>
          </div>
          <div>
            {get(certificate, "additionalData.certSignatories[0].position")},{" "}
            {get(certificate, "additionalData.certSignatories[0].organisation")}
          </div>
        </div>

        <div className="col-4" />

        <div
          className="d-flex flex-row-reverse col-4"
          style={{ paddingTop: "20px" }}
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
