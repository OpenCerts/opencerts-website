import PropTypes from "prop-types";
import Link from "next/link";
import { isValid } from "@govtechsg/opencerts-verify";
import { TYPES, MESSAGES } from "../../../constants/VerificationErrorMessages";
import css from "./viewerStyles.scss";

const DetailedErrors = ({
  verificationStatus,
  retrieveCertificateByActionError
}) => {
  const errors = [];
  const revokeFragmentName = "OpenAttestationEthereumDocumentStoreRevoked";
  const fragmentsWithoutRevoke = verificationStatus.filter(
    status => status.name !== revokeFragmentName
  );
  const revokeFragment = verificationStatus.filter(
    status => status.name === revokeFragmentName
  );
  if (!isValid(verificationStatus, ["DOCUMENT_INTEGRITY"])) {
    errors.push(TYPES.HASH);
  }
  if (!isValid(fragmentsWithoutRevoke, ["DOCUMENT_STATUS"])) {
    errors.push(TYPES.ISSUED);
  }
  if (!isValid(revokeFragment, ["DOCUMENT_STATUS"])) {
    errors.push(TYPES.REVOKED);
  }
  if (!isValid(verificationStatus, ["ISSUER_IDENTITY"])) {
    errors.push(TYPES.IDENTITY);
  }
  if (retrieveCertificateByActionError) {
    errors.push({
      failureTitle: "Unable to load certificate with the provided parameters",
      failureMessage: retrieveCertificateByActionError
    });
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

DetailedErrors.propTypes = {
  verificationStatus: PropTypes.array
};

export const UnverifiedView = ({
  resetData,
  verificationStatus,
  retrieveCertificateByActionError
}) => (
  <div
    className={`${css["viewer-container"]} ${css.invalid}`}
    style={{
      backgroundColor: "#fbeae9",
      borderRadius: 10
    }}
  >
    <span className={css["message-container"]}>
      <img src="/static/images/dropzone/invalid.svg" />
      <span className="invalid m-3" style={{ fontSize: "1.5rem" }}>
        {retrieveCertificateByActionError
          ? "The certificate can't be loaded"
          : "This certificate is not valid"}
      </span>
    </span>

    <DetailedErrors
      verificationStatus={verificationStatus}
      retrieveCertificateByActionError={retrieveCertificateByActionError}
    />

    <Link href="/faq">
      <div className={css["unverified-btn"]}>What should I do?</div>
    </Link>

    <div className={css["secondary-links"]}>
      <span>
        <Link href=" ">
          <a
            onClick={e => {
              e.preventDefault();
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

UnverifiedView.propTypes = {
  resetData: PropTypes.func,
  verificationStatus: PropTypes.array,
  retrieveCertificateByActionError: PropTypes.string
};
