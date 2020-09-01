import { VerificationFragment } from "@govtechsg/oa-verify";
import { isValid } from "@govtechsg/opencerts-verify";
import Link from "next/link";
import React from "react";
import { MESSAGES, TYPES } from "../../../constants/VerificationErrorMessages";
import {
  addressInvalid,
  certificateNotIssued,
  certificateRevoked,
  unhandledError,
  serverError,
  contractNotFound,
  invalidArgument,
} from "../../../services/fragment";
import css from "./viewerStyles.module.scss";

interface DetailedErrorsProps {
  verificationStatus: VerificationFragment[];
}
const DetailedErrors: React.FunctionComponent<DetailedErrorsProps> = ({ verificationStatus }) => {
  const errors = [];
  if (!isValid(verificationStatus, ["DOCUMENT_INTEGRITY"])) {
    errors.push(TYPES.HASH);
  }
  if (!isValid(verificationStatus, ["ISSUER_IDENTITY"])) {
    errors.push(TYPES.IDENTITY);
  }

  if (!isValid(verificationStatus, ["DOCUMENT_STATUS"])) {
    if (certificateNotIssued(verificationStatus)) errors.push(TYPES.ISSUED);
    else if (certificateRevoked(verificationStatus)) errors.push(TYPES.REVOKED);
    else if (addressInvalid(verificationStatus)) {
      // if the error is because the address is invalid, then get rid of all errors and only keep this one
      errors.splice(0, errors.length);
      errors.push(TYPES.ADDRESS_INVALID);
    } else if (contractNotFound(verificationStatus)) {
      // if the error is because the contract cannot be found, then get rid of all errors and only keep this one
      errors.splice(0, errors.length);
      errors.push(TYPES.CONTRACT_NOT_FOUND);
    } else if (serverError(verificationStatus)) {
      // if the error is because cannot connect to Ethereum, then get rid of all errors and only keep this one
      errors.splice(0, errors.length);
      errors.push(TYPES.SERVER_ERROR);
    } else if (invalidArgument(verificationStatus)) {
      // this error is caused when the merkle root is wrong, and should always be shown with the DOCUMENT_INTEGRITY error
      errors.push(TYPES.INVALID_ARGUMENT);
    } else {
      // if it's some unhandled error that we didn't foresee, then get rid of all errors and only keep this one
      errors.splice(0, errors.length);
      errors.push(TYPES.ETHERS_UNHANDLED_ERROR);
    }
  }
  const renderedError = errors.map((errorType, index) => (
    <div key={index}>
      <p className={css.messages}>{MESSAGES[errorType].failureTitle}</p>
      <p>{MESSAGES[errorType].failureMessage}</p>
    </div>
  ));
  return (
    <div id="error-tab" className={css.verifications}>
      {renderedError}
    </div>
  );
};

interface UnverifiedViewProps {
  resetData: () => void;
  verificationStatus: VerificationFragment[];
}
export const UnverifiedView: React.FunctionComponent<UnverifiedViewProps> = ({ resetData, verificationStatus }) => {
  let label = "This certificate is not valid";
  if (serverError(verificationStatus)) {
    label = "Connection error";
  } else if (unhandledError(verificationStatus)) {
    label = "Unhandled error";
  }

  return (
    <div
      className={`${css["viewer-container"]} ${css.invalid}`}
      style={{
        backgroundColor: "#fbeae9",
        borderRadius: 10,
      }}
    >
      <span className={css["message-container"]}>
        <img src="/static/images/dropzone/invalid.svg" />
        <span className="invalid m-3" style={{ fontSize: "1.5rem" }}>
          {label}
        </span>
      </span>

      {<DetailedErrors verificationStatus={verificationStatus} />}

      <Link href="/faq">
        <div className={css["unverified-btn"]}>What should I do?</div>
      </Link>

      <div className={css["secondary-links"]}>
        <span>
          <Link href="/">
            <a
              onClick={(e) => {
                e.preventDefault(); // why preventDefault?
                resetData();
              }}
              className={css["text-link"]}
            >
              Try another
            </a>
          </Link>
        </span>
      </div>
    </div>
  );
};
