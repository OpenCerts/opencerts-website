import React, { Component } from "react";
import { get } from "lodash";
import PropTypes from "prop-types";
import SimplePrivacyFilterBanner from "template-commons/Privacy/SimplePrivacyFilterBanner";
import ObfuscatableValue from "template-commons/Privacy/ObfuscatableValue";

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
    const issuedOn = get(certificate, "issuedOn");
    const expiresOn = get(certificate, "expiresOn");
    const admissionDate = get(certificate, "admissionDate");
    const graduationDate = get(certificate, "graduationDate ");

    const recipientName = get(certificate, "recipient.name");
    const recipientDid = get(certificate, "recipient.did");
    const recipientEmail = get(certificate, "recipient.email");
    const recipientPhone = get(certificate, "recipient.phone");

    const issuerName = get(certificate, "issuers.0.name");
    const issuerAddress = get(certificate, "issuers.0.certificateStore");
    const issuerUrl = get(certificate, "issuers.0.url");
    const issuerEmail = get(certificate, "issuers.0.email");
    const issuerDid = get(certificate, "issuers.0.did");

    const transcriptData = get(certificate, "transcript", []);

    const transcriptSection = transcriptData.map((t, i) => (
      <tr key={i}>
        <td>
          <ObfuscatableValue
            editable={editable}
            field={`transcript[i].courseCode`}
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
      </tr>
    ));

    return (
      <div className="container">
        <SimplePrivacyFilterBanner
          toggleEditable={() => this.setState({ editable: !editable })}
        />
        <div className="row">
          <h1>{certificateName}</h1>
        </div>
        <div className="row mb-4">
          <div className="w-100">
            {certificateId && `Serial: ${certificateId}`}
          </div>
          <div className="w-100">{issuedOn && `Issued On: ${issuedOn}`}</div>
          <div className="w-100">{expiresOn && `Expires On: ${expiresOn}`}</div>
          <div className="w-100">
            {admissionDate && `Admission Date: ${admissionDate}`}
          </div>
          <div className="w-100">
            {graduationDate && `Graduation Date: ${graduationDate}`}
          </div>
        </div>
        <div className="row mb-4">
          <div className="col p-0">
            <h3>Recipient Info</h3>
            {recipientDid && <div>DID: {recipientDid}</div>}
            {recipientName && <div>Name: {recipientName}</div>}
            {recipientEmail && <div>Email: {recipientEmail}</div>}
            {recipientPhone && <div>Phone: {recipientPhone}</div>}
          </div>
          <div className="col p-0">
            <h3>Issuer Info</h3>
            {issuerAddress && <div>Certificate Store: {issuerAddress}</div>}
            {issuerDid && <div>DID: {issuerDid}</div>}
            {issuerName && <div>Name: {issuerName}</div>}
            {issuerUrl && <div>Url: {issuerUrl}</div>}
            {issuerEmail && <div>Email: {issuerEmail}</div>}
          </div>
        </div>
        {transcriptData !== [] && (
          <div className="row mb-4">
            <h3>Transcript</h3>
            <table className="w-100">
              <tbody>
                <tr>
                  <th>Course Code</th>
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Course Credit</th>
                </tr>
                {transcriptSection}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
Template.propTypes = {
  certificate: PropTypes.object.isRequired,
  handleObfuscation: PropTypes.func
};

export default Template;
