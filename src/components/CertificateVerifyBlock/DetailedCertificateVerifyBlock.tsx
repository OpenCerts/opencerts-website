import { isValidOpenCert, VerificationFragment } from "@trustvc/trustvc";
import React, { ReactElement } from "react";
import { PRESENTATION_CHECK_MESSAGES } from "../../constants/PresentationErrorMessages";
import { MESSAGES, TYPES } from "../../constants/VerificationErrorMessages";
import { certificateRevoked } from "../../services/fragment";
import { WrappedOrSignedOpenCertsDocument } from "../../shared";
import { isVerifiablePresentation } from "../../utils/presentation";

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

const StatusIcon: React.FunctionComponent<{ valid: boolean }> = ({ valid }) =>
  valid ? <i className="fas fa-check text-green mr-2" /> : <i className="fas fa-times text-red mr-2" />;

/**
 * The checks reported for a presentation ENVELOPE.
 *
 * "Certificate has been issued" is deliberately absent: issuance belongs to each embedded
 * credential, which reports its own three checks on its tab. Asking it of the envelope would
 * answer a question about a bundle that only its contents can answer.
 */
const PresentationChecks: React.FunctionComponent<{ verificationStatus: VerificationFragment[] }> = ({
  verificationStatus,
}) => {
  const integrityValid = isValidOpenCert(verificationStatus, ["DOCUMENT_INTEGRITY"]);
  const holderValid = isValidOpenCert(verificationStatus, ["ISSUER_IDENTITY"]);
  return (
    <div id="detailed-error">
      <CheckStatusRow
        message={
          integrityValid
            ? PRESENTATION_CHECK_MESSAGES.INTEGRITY.successTitle
            : PRESENTATION_CHECK_MESSAGES.INTEGRITY.failureTitle
        }
        icon={<StatusIcon valid={integrityValid} />}
      />
      <CheckStatusRow
        message={
          holderValid
            ? PRESENTATION_CHECK_MESSAGES.HOLDER.successTitle
            : PRESENTATION_CHECK_MESSAGES.HOLDER.failureTitle
        }
        icon={<StatusIcon valid={holderValid} />}
      />
    </div>
  );
};

interface DetailedCertificateVerifyBlockProps {
  verificationStatus: VerificationFragment[];
  document?: WrappedOrSignedOpenCertsDocument;
}
export const DetailedCertificateVerifyBlock: React.FunctionComponent<DetailedCertificateVerifyBlockProps> = (props) => {
  const borderColor = isValidOpenCert(props.verificationStatus) ? "border-green" : "border-red";
  return (
    <div className={`verify-block w-full mx-w-20 top-0 bg-white p-3 shadow-md ${borderColor}`} style={{ left: "" }}>
      <div className="mb-3">
        <p className="text-sm mb-0">Details</p>
      </div>
      {isVerifiablePresentation(props.document) ? (
        <PresentationChecks verificationStatus={props.verificationStatus} />
      ) : (
        <div id="detailed-error">
          <CheckStatusRow
            message={
              isValidOpenCert(props.verificationStatus, ["DOCUMENT_INTEGRITY"])
                ? MESSAGES[TYPES.HASH].successTitle
                : MESSAGES[TYPES.HASH].failureTitle
            }
            icon={
              isValidOpenCert(props.verificationStatus, ["DOCUMENT_INTEGRITY"]) ? (
                <i className="fas fa-check text-green mr-2" />
              ) : (
                <i className="fas fa-times text-red mr-2" />
              )
            }
          />
          <CheckStatusRow
            message={
              isValidOpenCert(props.verificationStatus, ["DOCUMENT_STATUS"]) ||
              !certificateRevoked(props.verificationStatus)
                ? MESSAGES[TYPES.REVOKED].successTitle
                : MESSAGES[TYPES.REVOKED].failureTitle
            }
            icon={
              isValidOpenCert(props.verificationStatus, ["DOCUMENT_STATUS"]) ||
              !certificateRevoked(props.verificationStatus) ? (
                <i className="fas fa-check text-green mr-2" />
              ) : (
                <i className="fas fa-times text-red mr-2" />
              )
            }
          />
        </div>
      )}
    </div>
  );
};
