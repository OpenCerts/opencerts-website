import PropTypes from "prop-types";
import Link from "next/link";
import css from './viewerstyles.scss';

const View = ({
  issuerIdentityStatus,
  hashStatus,
  issuedStatus,
  notRevokedStatus
}) => {
  const isWarning =
    hashStatus.verified && issuedStatus.verified && notRevokedStatus.verified;
  return (
    <div
      // className="text-center h-100 d-flex flex-column justify-content-center p-4 text-brand-dark"
      className={`${css["viewer-container"]} ${isWarning ? css["warning"] : css["invalid"]}`}
      style={{
        backgroundColor: isWarning ? "#fbf6e9" : "#fbeae9",
        borderRadius: 10
      }}
    >
      <span className={css['message-container']}>
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
            ? "Certificate from unregistered body"
            : "This certificate is not valid"}
        </span>
      </span>

      <div className={css.verifications}>
        {!hashStatus.verified ? (
          <p className={css.messages}>The certificate has been tampered with</p>
        ) : null}

        {!issuedStatus.verified ? (
          <p className={css.messages}>The certificate has not been issued</p>
        ) : null}

        {!notRevokedStatus.verified ? (
          <p className={css.messages}>The certificate has been revoked</p>
        ) : null}

        {!issuerIdentityStatus.verified ? (
          <p className={css.messages}>The issuer&#39;s identity cannot be verified</p>
        ) : null}
      </div>

      <button className={css['unverified-btn']}>
        <span>
          <Link ref='/faq'>What should I do?</Link>
        </span>
      </button>

      <div className={css['secondary-links']}>
        <span>
          <Link ref=" ">Try another</Link>
        </span>
        {isWarning ? (
        
          <span
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
            }}
          >
            <Link href="/viewer"> View certificate anyway</Link>
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
  document: PropTypes.object,

  issuerIdentityStatus: PropTypes.object,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object
};

export default View;
