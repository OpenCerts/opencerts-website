import PropTypes from "prop-types";
import Link from "next/link";
import css from "./viewerStyles.scss";

const View = ({
  resetData,
  issuerIdentityStatus,
  hashStatus,
  issuedStatus,
  notRevokedStatus,
  storeStatus
}) => {
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
        {!issuerIdentityStatus.verified ? (
          <p className={css.messages}>
            Certificate from unregistered institution
          </p>
        ) : null}

        {!notRevokedStatus.verified ? (
          <p className={css.messages}>Certificate revoked</p>
        ) : null}

        {!hashStatus.verified ? (
          <p className={css.messages}>Certificate has been tampered with</p>
        ) : null}

        {!issuedStatus.verified ? (
          <p className={css.messages}>Certificate not issued</p>
        ) : null}

        {!storeStatus.verified ? (
          <p className={css.messages}>Certificate store address is invalid</p>
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

  issuerIdentityStatus: PropTypes.object,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  storeStatus: PropTypes.object
};

export default View;
