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
          <div className="row" style={{ paddingLeft: "30px" }}>
            <h1>
              <b>{certificateName}</b>
            </h1>
          </div>

          <div
            className="row"
            style={{
              paddingTop: "25px",
              paddingLeft: "20px"
            }}
          >
            <div className="col">
              <div className="row">
                <div className="col-3">NAME</div>
                <div className="col-9">
                  :&nbsp;&nbsp;
                  {recipientName}
                </div>
              </div>
              <div className="row">
                <div className="col-3">COURSE</div>
                <div className="col-9">
                  :&nbsp;&nbsp;
                  {recipientCourse}
                </div>
              </div>
              <div className="row">
                <div className="col-3">NRIC/FIN</div>
                <div className="col-9">
                  :&nbsp;&nbsp;
                  {recipientNric}
                </div>
              </div>
              <div className="row">
                <div className="col-3">STUDENT ID</div>
                <div className="col-9">
                  :&nbsp;&nbsp;
                  {studentId}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-5">CERTIFICATE ID</div>
                <div className="col-6">
                  :&nbsp;&nbsp;
                  {certificateId}
                </div>
              </div>
              <div className="row">
                <div className="col-5">DATE OF ISSUANCE</div>
                <div className="col-6">
                  :&nbsp;&nbsp;
                  {formatDate(issuanceDate)}
                </div>
              </div>
              <div className="row">
                <div className="col-5">DATE OF ADMISSION</div>
                <div className="col-6">
                  :&nbsp;&nbsp;
                  {formatDate(admissionDate)}
                </div>
              </div>
              <div className="row">
                <div className="col-5">DATE OF GRADUATION</div>
                <div className="col-6">
                  :&nbsp;&nbsp;
                  {formatDate(graduationDate)}
                </div>
              </div>
            </div>
          </div>

          {transcriptData !== [] && (
            <div
              className="row mb-4"
              style={{ paddingLeft: "30px", paddingTop: "25px" }}
            >
              <h3 style={{ color: "black" }}>
                <b>Transcript</b>
              </h3>
              <table className="w-100">
                <tbody>
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
                  paddingTop: "45px",
                  paddingLeft: "20px",
                  minWidth: "200px"
                }}
                src="/static/images/logo-govtech.png"
              />
            </div>
            <div className="col" />
            <div
              className="col text-center"
              style={{ paddingTop: "30px", paddingRight: "30px" }}
            >
              <img
                className="w-100"
                src={get(
                  certificate,
                  "additionalData.certSignatories[0].signature"
                )}
              />
              <hr className="m-1" />
              <div>
                <b>
                  {get(certificate, "additionalData.certSignatories[0].name")}
                </b>
              </div>
              <div>
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
