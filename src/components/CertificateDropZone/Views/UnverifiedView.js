import PropTypes from "prop-types";
import Link from "next/link";
import { filter } from "lodash";
import css from "./viewerStyles.scss";

const View = ({
  resetData,
  issuerIdentityStatus,
  hashStatus,
  issuedStatus,
  notRevokedStatus
}) => {
  const errorMessages = [
    {
      title: "Certificate revoked",
      message:
        "This certificate has been revoked by your issuing institution. Please contact your issuing institution for more details.",
      error: !notRevokedStatus.verified
    },
    {
      title: "Certificate has been tampered with",
      message:
        "The contents of this certificate are inaccurate and have been tampered with.",
      error: !hashStatus.verified
    },
    {
      title: "Certificate not found",
      message:
        "This certificate has not been issued. Please contact your issuing institution for help or issue the certificate before trying again.",
      error: !issuedStatus.verified
    },
    {
      title: "Certificate from unregistered institution",
      message:
        "The institution that issued this certificate is unknown. Your institution has to register with OpenCerts first.",
      error: !issuerIdentityStatus.verified
    }
  ];

  const stack = filter(errorMessages, ["error", true]);
  console.log("STACK", stack);
  const error = stack.pop();
  console.log("ERROR", error);

  const isWarning =
    hashStatus.verified && issuedStatus.verified && notRevokedStatus.verified;
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
        {error !== null ? (
          <p className={css.messages}>
            {error.title}
            <br />
            {error.message}
          </p>
        ) : null}
      </div>
      {/* <div className={css.verifications}>
        {!hashStatus.verified ? (
          <p className={css.messages}>
            The certificate&#39;s contents are inaccurate
          </p>
        ) : null}

        {!issuedStatus.verified ? (
          <p className={css.messages}>The certificate records are not found</p>
        ) : null}

        {!notRevokedStatus.verified ? (
          <p className={css.messages}>The certificate has been revoked</p>
        ) : null}

        {!issuerIdentityStatus.verified ? (
          <div>
            <p className={css.messages}>
              Certificate from unregistered institution
            </p>
            <p>
              We are unable to verify the certificate as this institution has
              not registered with OpenCerts
            </p>
          </div>
        ) : null}
      </div> */}

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

  issuerIdentityStatus: PropTypes.object,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object
};

export default View;
