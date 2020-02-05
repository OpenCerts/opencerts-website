import PropTypes from "prop-types";
import { isValid } from "@govtechsg/opencerts-verify";
import css from "./detailedCertificateBlock.scss";
import { MESSAGES, TYPES } from "../../constants/VerificationErrorMessages";
import { getRevokeFragment } from "../../services/fragment";

const SuccessIcon = () => <i className="fas fa-check text-success mr-2" />;
const FailureIcon = () => <i className="fas fa-times text-danger mr-2" />;

const CheckStatusRow = ({ message, icon }) => (
  <div className="row">
    <div className="col-2">{icon}</div>
    <div className="col-10">
      <div className="row">{message}</div>
    </div>
  </div>
);

const renderStatusCheckRow = (valid, messageSet) => (
  <CheckStatusRow
    message={valid ? messageSet.successTitle : messageSet.failureTitle}
    icon={valid ? SuccessIcon() : FailureIcon()}
  />
);

const renderStatuses = verificationStatus => {
  const revokeFragment = [getRevokeFragment(verificationStatus)];
  return (
    <div id="detailed-error">
      {renderStatusCheckRow(
        isValid(verificationStatus, ["DOCUMENT_INTEGRITY"]),
        MESSAGES[TYPES.HASH]
      )}
      {renderStatusCheckRow(
        isValid(revokeFragment, ["DOCUMENT_STATUS"]),
        MESSAGES[TYPES.REVOKED]
      )}
    </div>
  );
};

const DetailedCertificateVerifyBlock = props => {
  const borderColor = isValid(props.verificationStatus)
    ? "valid-border-color"
    : "invalid-border-color";
  return (
    <div
      className={`${css["detailed-certificate-block"]} ${
        css[borderColor]
      } bg-white p-3`}
    >
      <div className="mb-3">
        <h5>Details</h5>
      </div>
      {renderStatuses(props.verificationStatus)}
    </div>
  );
};

DetailedCertificateVerifyBlock.propTypes = {
  verificationStatus: PropTypes.array
};
CheckStatusRow.propTypes = {
  message: PropTypes.string,
  icon: PropTypes.element
};

export default DetailedCertificateVerifyBlock;
