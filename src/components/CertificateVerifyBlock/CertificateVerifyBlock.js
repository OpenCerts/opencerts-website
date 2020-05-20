import PropTypes from "prop-types";
import React, { useState } from "react";
import icons from "../ViewerPageImages";
import DetailedCertificateVerifyBlock from "./DetailedCertificateVerifyBlock";
import css from "./certificateVerifyBlock.scss";

const renderIcon = () => (
  <div className={`d-flex justify-content-center align-items-center ${css["verified-icon"]}`}>
    {icons.checkCircle()}
  </div>
);

export const getIdentityVerificationText = (verificationStatus) => {
  const registryFragmentName = "OpencertsRegistryVerifier";
  const registryFragment = verificationStatus.find((status) => status.name === registryFragmentName);
  // using concat to handle arrays and single element
  const registryIdentity =
    registryFragment &&
    registryFragment.data &&
    [].concat(registryFragment.data).find(({ status }) => status === "VALID");
  if (registryIdentity) {
    return `Certificate issued by ${registryIdentity.name.toUpperCase()}`;
  }

  const dnsFragmentName = "OpenAttestationDnsTxt";
  const dnsFragment = verificationStatus.find((status) => status.name === dnsFragmentName);
  // using concat to handle arrays and single element
  const dnsIdentity =
    dnsFragment &&
    dnsFragment.data &&
    []
      .concat(dnsFragment.data)
      .sort((obj1, obj2) => obj1.location.localeCompare(obj2.location))
      .find(({ status }) => status === "VALID");
  if (dnsIdentity) {
    return `Certificate issued by ${dnsIdentity.location.toUpperCase()}`;
  }
  return "Certificate issued by Unknown";
};

const renderText = (identityDetails) => (
  <div className={css["verification-text"]}>{getIdentityVerificationText(identityDetails)}</div>
);

const SimpleVerifyBlock = (props) => {
  const { verificationStatus } = props;
  const renderedIcon = renderIcon();
  const renderedText = renderText(verificationStatus);
  return (
    <div
      className={`p-2 pointer ${css["simple-verify-block"]} ${css.valid} ${
        props.detailedViewVisible ? css.active : ""
      }`}
      onClick={props.toggleDetailedViewVisible}
      id="certificate-status"
    >
      <div className="row justify-center" style={{ flexWrap: "inherit" }}>
        {renderedIcon}
        {renderedText}
        <span className={`d-flex justify-content-center align-items-center ${css.arrow}`}>{icons.arrow()}</span>
      </div>
    </div>
  );
};

const CertificateVerifyBlock = (props) => {
  const [detailedViewVisible, setDetailedViewVisible] = useState(false);
  const toggleDetailedViewVisible = () => setDetailedViewVisible(!detailedViewVisible);

  const { verificationStatus } = props;
  return (
    <div
      id="certificate-verify-block"
      className={`align-items-start flex-nowrap ${css["d-flex"]} ${css.verifyBlocksContainer} mb-md-0`}
    >
      <SimpleVerifyBlock
        verificationStatus={verificationStatus}
        toggleDetailedViewVisible={toggleDetailedViewVisible}
        detailedViewVisible={detailedViewVisible}
      />
      {detailedViewVisible ? <DetailedCertificateVerifyBlock verificationStatus={verificationStatus} /> : ""}
    </div>
  );
};

CertificateVerifyBlock.propTypes = {
  verificationStatus: PropTypes.array,
};

SimpleVerifyBlock.propTypes = {
  detailedViewVisible: PropTypes.bool,
  verificationStatus: PropTypes.array,
  toggleDetailedViewVisible: PropTypes.func,
};

export default CertificateVerifyBlock;
