import { VerificationFragment } from "@govtechsg/oa-verify";
import { OpencertsRegistryVerificationFragmentData } from "@govtechsg/opencerts-verify";
import React, { useState } from "react";
import { icons } from "../ViewerPageImages";
import { DetailedCertificateVerifyBlock } from "./DetailedCertificateVerifyBlock";
import css from "./certificateVerifyBlock.module.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (str: any): str is string => str;

export const getIdentityVerificationText = (verificationStatus: VerificationFragment[]): string => {
  const identities: string[] = [];

  const registryFragmentName = "OpencertsRegistryVerifier";
  const registryFragment = verificationStatus.find((status) => status.name === registryFragmentName);
  // using concat to handle arrays and single element
  if (registryFragment && registryFragment.data) {
    const registryFragmentData:
      | OpencertsRegistryVerificationFragmentData
      | OpencertsRegistryVerificationFragmentData[] = registryFragment.data;
    const array: OpencertsRegistryVerificationFragmentData[] = []; // create a temporary array otherwise typescript complains on typings
    const registryIdentity = array
      .concat(registryFragmentData)
      .filter(({ status }) => status === "VALID")
      .map((fragment) => fragment.name?.toUpperCase())
      .filter(isString);
    identities.push(...registryIdentity.sort());
  }

  const dnsFragmentName = "OpenAttestationDnsTxt";
  const dnsFragment = verificationStatus.find((status) => status.name === dnsFragmentName);
  // using concat to handle arrays and single element
  if (dnsFragment && dnsFragment.data) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dnsFragmentData: any | any[] = dnsFragment.data;
    // TODO we need the typing for this
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const array: any[] = [];
    const dnsIdentity: string[] = array
      .concat(dnsFragmentData)
      .filter(({ status }) => status === "VALID")
      .map((fragment) => fragment.location?.toUpperCase());
    identities.push(...dnsIdentity.sort());
  }
  if (identities.length > 0) {
    return `Certificate issued by ${identities.join(", ")}`;
  }
  return "Certificate issued by Unknown";
};

interface SimpleVerifyBlockProps {
  detailedViewVisible: boolean;
  verificationStatus: VerificationFragment[];
  toggleDetailedViewVisible: () => void;
}
const SimpleVerifyBlock: React.FunctionComponent<SimpleVerifyBlockProps> = (props) => {
  const { verificationStatus } = props;
  return (
    <div
      className={`p-2 pointer ${css["simple-verify-block"]} ${css.valid} ${
        props.detailedViewVisible ? css.active : ""
      }`}
      onClick={props.toggleDetailedViewVisible}
      id="certificate-status"
    >
      <div className="row justify-center" style={{ flexWrap: "inherit" }}>
        <div className={`d-flex justify-content-center align-items-center ${css["verified-icon"]}`}>
          {icons.checkCircle()}
        </div>
        <div className={css["verification-text"]}>{getIdentityVerificationText(verificationStatus)}</div>
        <span className={`d-flex justify-content-center align-items-center ${css.arrow}`}>{icons.arrow()}</span>
      </div>
    </div>
  );
};

interface CertificateVerifyBlockProps {
  verificationStatus: VerificationFragment[];
}
export const CertificateVerifyBlock: React.FunctionComponent<CertificateVerifyBlockProps> = (props) => {
  const [detailedViewVisible, setDetailedViewVisible] = useState(false);
  const toggleDetailedViewVisible = (): void => setDetailedViewVisible(!detailedViewVisible);

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
