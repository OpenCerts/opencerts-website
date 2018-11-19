import { get } from "lodash";
import {
  renderHeader,
  renderGradingSystem,
  renderTranscript,
  renderSignature,
  renderFinalStatement
} from "../common/transcript";

import { formatDate } from "../common/functions";

const renderStudentInfo = certificate => (
  <div>
    <hr />
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="col-3">Name</div>
          <div className="col-9">
            :&nbsp;&nbsp;
            {get(certificate, "recipient.name")}
          </div>
        </div>
        <div className="row">
          <div className="col-3">COURSE</div>
          <div className="col-9">
            :&nbsp;&nbsp;
            {get(certificate, "description")}
          </div>
        </div>
        <div className="row">
          <div className="col-3">NRIC/FIN</div>
          <div className="col-9">
            :&nbsp;&nbsp;
            {get(certificate, "recipient.nric")}
          </div>
        </div>
        <div className="row">
          <div className="col-3">STUDENT NO</div>
          <div className="col-9">
            :&nbsp;&nbsp;
            {get(certificate, "additionalData.studentId")}
          </div>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <div className="col-12">&nbsp;</div>
        </div>
        <div className="row">
          <div className="col-12">&nbsp;</div>
        </div>
        <div className="row">
          <div className="col-12">&nbsp;</div>
        </div>
        <div className="row">
          <div className="col-5">DATE OF GRADUATION</div>
          <div className="col-7">
            :&nbsp;&nbsp;
            {formatDate(certificate.graduationDate)}
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div className="row">
      <div className="col-12" style={{ fontWeight: 700 }}>
        CERTIFICATE IN {get(certificate, "name", "").toUpperCase()}
      </div>
    </div>
  </div>
);

const Template = certificate => (
  <div className="container" style={{ fontSize: "0.9rem" }}>
    {renderHeader(certificate)}
    {renderGradingSystem()}
    {renderStudentInfo(certificate)}
    {renderTranscript(certificate)}
    {renderFinalStatement(certificate)}
    {renderSignature(certificate)}
    <hr />
  </div>
);

export default Template;
