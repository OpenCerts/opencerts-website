import Link from "next/link";
import React from "react";
import css from "./viewerStyles.module.scss";

interface RetrievalErrorViewProps {
  resetData: () => void;
  retrieveCertificateByActionError: string;
}
export const RetrievalErrorView: React.FunctionComponent<RetrievalErrorViewProps> = ({
  resetData,
  retrieveCertificateByActionError,
}) => (
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
        {"The certificate can't be loaded"}
      </span>
    </span>

    <div>
      <p className={css.messages}>Unable to load certificate with the provided parameters</p>
      <p>{retrieveCertificateByActionError}</p>
    </div>
    <Link href="/faq">
      <div className={css["unverified-btn"]}>What should I do?</div>
    </Link>

    <div className={css["secondary-links"]}>
      <span>
        <Link href=" ">
          <a
            onClick={(e) => {
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
