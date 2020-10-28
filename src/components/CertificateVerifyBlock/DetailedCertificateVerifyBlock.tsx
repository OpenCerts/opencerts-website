import { VerificationFragment } from "@govtechsg/oa-verify";
import { isValid } from "@govtechsg/opencerts-verify";
import React, { ReactElement } from "react";
import { MESSAGES, TYPES } from "../../constants/VerificationErrorMessages";
import { certificateRevoked } from "../../services/fragment";

interface CheckStatusRowProps {
  message?: string;
  icon: ReactElement;
}
const CheckStatusRow: React.FunctionComponent<CheckStatusRowProps> = ({ message, icon }) => (
  <div className="flex flex-wrap">
    <div className="w-auto">{icon}</div>
    <div className="flex-1">{message}</div>
  </div>
);

interface DetailedCertificateVerifyBlockProps {
  verificationStatus: VerificationFragment[];
}
export const DetailedCertificateVerifyBlock: React.FunctionComponent<DetailedCertificateVerifyBlockProps> = (props) => {
  const borderColor = isValid(props.verificationStatus) ? "border-green" : "border-red";
  return (
    <div className={`verify-block w-full mx-w-20 top-0 bg-white p-3 shadow-md ${borderColor}`} style={{ left: "" }}>
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
              <i className="fas fa-check text-green mr-2" />
            ) : (
              <i className="fas fa-times text-red mr-2" />
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
              <i className="fas fa-check text-green mr-2" />
            ) : (
              <i className="fas fa-times text-red mr-2" />
            )
          }
        />
      </div>
    </div>
  );
};
