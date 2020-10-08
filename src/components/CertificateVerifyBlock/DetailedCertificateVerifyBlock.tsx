import { VerificationFragment } from "@govtechsg/oa-verify";
import { isValid } from "@govtechsg/opencerts-verify";
import React, { ReactElement } from "react";
import { MESSAGES, TYPES } from "../../constants/VerificationErrorMessages";
import { certificateRevoked } from "../../services/fragment";
import css from "./detailedCertificateBlock.module.scss";

interface CheckStatusRowProps {
  message?: string;
  icon: ReactElement;
}
const CheckStatusRow: React.FunctionComponent<CheckStatusRowProps> = ({ message, icon }) => (
  <div className="row">
    <div className="col-2">{icon}</div>
    <div className="col-10">
      <div className="row">{message}</div>
    </div>
  </div>
);

interface DetailedCertificateVerifyBlockProps {
  verificationStatus: VerificationFragment[];
}
export const DetailedCertificateVerifyBlock: React.FunctionComponent<DetailedCertificateVerifyBlockProps> = (props) => {
  const borderColor = isValid(props.verificationStatus) ? "valid-border-color" : "invalid-border-color";
  return (
    <div className={`${css["detailed-certificate-block"]} ${css[borderColor]} bg-white p-3`}>
      <div className="mb-3">
        <h5>Details</h5>
      </div>
      <div id="detailed-error">
        <CheckStatusRow
          message={
            isValid(props.verificationStatus, ["DOCUMENT_INTEGRITY"])
              ? MESSAGES[TYPES.HASH].successTitle
              : MESSAGES[TYPES.HASH].failureTitle
          }
          icon={
            isValid(props.verificationStatus, ["DOCUMENT_INTEGRITY"]) ? (
              <i className="fas fa-check text-success mr-2" />
            ) : (
              <i className="fas fa-times text-danger mr-2" />
            )
          }
        />
        <CheckStatusRow
          message={
            isValid(props.verificationStatus, ["DOCUMENT_STATUS"]) || !certificateRevoked(props.verificationStatus)
              ? MESSAGES[TYPES.REVOKED].successTitle
              : MESSAGES[TYPES.REVOKED].failureTitle
          }
          icon={
            isValid(props.verificationStatus, ["DOCUMENT_STATUS"]) || !certificateRevoked(props.verificationStatus) ? (
              <i className="fas fa-check text-success mr-2" />
            ) : (
              <i className="fas fa-times text-danger mr-2" />
            )
          }
        />
      </div>
    </div>
  );
};
