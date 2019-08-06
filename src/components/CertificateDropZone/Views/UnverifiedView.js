import PropTypes from "prop-types";
import Link from "next/link";
import css from "./viewerStyles.scss";

const View = ({
  resetData,
  storeStatus,
  hashStatus,
  issuedStatus,
  issuerIdentityStatus,
  notRevokedStatus
}) => {
  /* Array of error messages with priority of error messages determined by a stack. 
  Error messages are first placed into the stack and the error message with the highest priority is popped off the stack
  and displayed.
  
  The priority of error messages are as follows:
  1. Invalid store
  2. Tampered
  3. Not issued
  4. Revoked */
  const errorMessages = [
    {
      title: "Certificate revoked",
      message:
        "This certificate has been revoked by your issuing institution. Please contact your issuing institution for more details.",
      error: !notRevokedStatus.verified
    },
    {
      title: "Certificate not issued",
      message:
        "This certificate cannot be found. Please contact your issuing institution for help or issue the certificate before trying again.",
      error: !issuedStatus.verified
    },
    {
      title: "Certificate has been tampered with",
      message:
        "The contents of this certificate are inaccurate and have been tampered with.",
      error: !hashStatus.verified
    },
    {
      title: "Certificate issuer identity invalid",
      message: "This certificate was issued by an invalid issuer.",
      error: !issuerIdentityStatus.verified
    },
    {
      title: "Certificate store address is invalid",
      message:
        "Please check that you have a valid smart contract with us and a correct certificate store address before proceeding.",
      error: !storeStatus.verified
    }
  ];

  const stack = errorMessages.filter(
    errorMessage => errorMessage.error === true
  );
  const error = stack.pop();

  const isWarning =
    hashStatus.verified &&
    issuedStatus.verified &&
    notRevokedStatus.verified &&
    issuerIdentityStatus.verified;
  return (
    <div
      className={`${css["viewer-container"]} ${
        isWarning ? css.warning : css.invalid
      }`}
      style={{
        backgroundColor: isWarning ? "#fbf6e9" : "#fbeae9",
        borderRadius: 10
      }}
    >
      <span className={css["message-container"]}>
        {isWarning ? (
          <img src="/static/images/dropzone/warning.svg" />
        ) : (
          <img src="/static/images/dropzone/invalid.svg" />
        )}
        <span
          className={`${isWarning ? "warning" : "invalid"} m-3`}
          style={{ fontSize: "1.5rem" }}
        >
          {isWarning
            ? "Certificate from unregistered institution"
            : "This certificate is not valid"}
        </span>
      </span>

      <div className={css.verifications}>
        {error !== undefined ? (
          <div>
            <p className={css.messages}>{error.title}</p>
            <p>{error.message}</p>
          </div>
        ) : null}
      </div>

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
        {isWarning ? (
          <span
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
            }}
          >
            <Link href="/viewer">
              <a id="certificate-view-anyway" className={css["text-link"]}>
                View certificate anyway
              </a>
            </Link>
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

View.propTypes = {
  handleRenderOverwrite: PropTypes.func,
  resetData: PropTypes.func,
  document: PropTypes.object,

  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  issuerIdentityStatus: PropTypes.object,
  storeStatus: PropTypes.object
};

export default View;
