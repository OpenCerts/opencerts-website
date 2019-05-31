import React, { Component } from "react";
import { get } from "lodash";
import PropTypes from "prop-types";
import SimplePrivacyFilterBanner from "template-commons/Privacy/SimplePrivacyFilterBanner";
import ObfuscatableValue from "template-commons/Privacy/ObfuscatableValue";
import { formatDate } from "./common/functions";
import { transcriptBg } from "./common/backgrounds";

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = { editable: false };
  }

  render() {
    const { editable } = this.state;
    const { certificate, handleObfuscation } = this.props;
    const certificateName = get(certificate, "name");
    const certificateId = get(certificate, "id");
    const issuanceDate = get(certificate, "issuedOn");
    const admissionDate = get(certificate, "admissionDate");
    const graduationDate = get(certificate, "graduationDate");

    const recipientName = get(certificate, "recipient.name");
    const recipientNric = get(certificate, "recipient.nric");
    const recipientCourse = get(certificate, "recipient.course");
    const studentId = get(certificate, "additionalData.studentId");

    const transcriptData = get(certificate, "transcript", []);

    const transcriptSection = transcriptData.map((t, i) => (
      <tr key={i}>
        <td>
          <ObfuscatableValue
            editable={editable}
            field={`transcript[${i}].courseCode`}
            value={t.courseCode}
            handleObfuscation={handleObfuscation}
          />
        </td>
        <td>
          <ObfuscatableValue
            editable={editable}
            field={`transcript[${i}].name`}
            value={t.name}
            handleObfuscation={handleObfuscation}
          />
        </td>
        <td>
          <ObfuscatableValue
            editable={editable}
            field={`transcript[${i}].grade`}
            value={t.grade}
            handleObfuscation={handleObfuscation}
          />
        </td>
        <td>
          <ObfuscatableValue
            editable={editable}
            field={`transcript[${i}].courseCredit`}
            value={t.courseCredit}
            handleObfuscation={handleObfuscation}
          />
        </td>
        <td>
          <ObfuscatableValue
            editable={editable}
            field={`transcript[${i}].semester`}
            value={t.semester}
            handleObfuscation={handleObfuscation}
          />
        </td>
      </tr>
    ));

    return (
      <div className="container">
        <SimplePrivacyFilterBanner
          toggleEditable={() => this.setState({ editable: !editable })}
        />
        <div
          className="p-2 container"
          style={{
            backgroundImage: `url('${transcriptBg}')`,
            backgroundRepeat: "repeat"
          }}
        >
          <div className="row" style={{ paddingLeft: "3%" }}>
            <h1 style={{ fontSize: "3vw" }}>
              <b>{certificateName}</b>
            </h1>
          </div>

          <div
            className="row"
            style={{
              paddingTop: "3%",
              paddingLeft: "2%",
              fontSize: "2vw"
            }}
          >
            <div className="col">
              <div className="row">
                <div className="col">NAME</div>
                <div className="col">
                  :&nbsp;&nbsp;
                  {recipientName}
                </div>
              </div>
              <div className="row">
                <div className="col">COURSE</div>
                <div className="col">
                  :&nbsp;&nbsp;
                  {recipientCourse}
                </div>
              </div>
              <div className="row">
                <div className="col">NRIC/FIN</div>
                <div className="col">
                  :&nbsp;&nbsp;
                  {recipientNric}
                </div>
              </div>
              <div className="row">
                <div className="col">STUDENT ID</div>
                <div className="col">
                  :&nbsp;&nbsp;
                  {studentId}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col">CERTIFICATE ID</div>
                <div className="col">
                  :&nbsp;&nbsp;
                  {certificateId}
                </div>
              </div>
              <div className="row">
                <div className="col">DATE OF ISSUANCE</div>
                <div className="col">
                  :&nbsp;&nbsp;
                  {formatDate(issuanceDate)}
                </div>
              </div>
              <div className="row">
                <div className="col">DATE OF ADMISSION</div>
                <div className="col">
                  :&nbsp;&nbsp;
                  {formatDate(admissionDate)}
                </div>
              </div>
              <div className="row">
                <div className="col">DATE OF GRADUATION</div>
                <div className="col">
                  :&nbsp;&nbsp;
                  {formatDate(graduationDate)}
                </div>
              </div>
            </div>
          </div>

          {transcriptData !== [] && (
            <div
              className="row mb-4"
              style={{ paddingLeft: "3%", paddingTop: "5%" }}
            >
              <h3 style={{ color: "black", fontSize: "3vw" }}>
                <b>Transcript</b>
              </h3>
              <table className="w-100">
                <tbody style={{ fontSize: "2vw" }}>
                  <tr>
                    <th>Course Code</th>
                    <th>Name</th>
                    <th>Grade</th>
                    <th>Units</th>
                    <th>Semester</th>
                  </tr>
                  {transcriptSection}
                </tbody>
              </table>
            </div>
          )}

          <div className="row">
            <div className="col">
              <img
                className="w-100"
                style={{
                  paddingTop: "40%",
                  paddingLeft: "5%",
                  width: "100%",
                  height: "auto"
                }}
                src="/static/images/logo-govtech.png"
              />
            </div>
            <div className="col" />
            <div
              className="col text-center"
              style={{
                paddingTop: "5%",
                paddingRight: "3%",
                width: "100%",
                height: "auto"
              }}
            >
              <img
                className="w-100"
                src={get(
                  certificate,
                  "additionalData.certSignatories[0].signature"
                )}
              />
              <hr className="m-1" />
              <div style={{ fontSize: "2.5vw" }}>
                <b>
                  {get(certificate, "additionalData.certSignatories[0].name")}
                </b>
                <br />
                {get(certificate, "additionalData.certSignatories[0].position")}
                ,{" "}
                {get(
                  certificate,
                  "additionalData.certSignatories[0].organisation"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Template.propTypes = {
  certificate: PropTypes.object.isRequired,
  handleObfuscation: PropTypes.func
};

export default Template;
