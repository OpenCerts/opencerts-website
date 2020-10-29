import { VerificationFragment, VerificationFragmentStatus } from "@govtechsg/oa-verify";
import { OpencertsRegistryVerificationFragmentData } from "@govtechsg/opencerts-verify";
import React, { useState } from "react";
import { icons } from "../ViewerPageImages";
import { DetailedCertificateVerifyBlock } from "./DetailedCertificateVerifyBlock";
import css from "./certificateVerifyBlock.module.scss";

type DnsFragment = { status: VerificationFragmentStatus; location?: string };

export const getIdentityVerificationText = (verificationStatus: VerificationFragment[]): string => {
  const registryFragmentName = "OpencertsRegistryVerifier";
  const registryFragment = verificationStatus.find((status) => status.name === registryFragmentName);
  const dnsFragmentName = "OpenAttestationDnsTxt";
  const dnsFragment = verificationStatus.find((status) => status.name === dnsFragmentName);
  if (!registryFragment || !registryFragment.data || !dnsFragment)
    throw new Error("Unable to retrieve the issuer identity");

  // using concat to handle arrays and single element
  const registryFragmentData: OpencertsRegistryVerificationFragmentData[] = [].concat(registryFragment.data);
  const dnsFragmentData: (DnsFragment | undefined)[] = [].concat(dnsFragment.data);

  const identities = registryFragmentData
    .map((registryFragment, index) => {
      const dnsFragment = dnsFragmentData[index];
      return registryFragment.status === "VALID" && registryFragment.name
        ? { location: registryFragment.name.toUpperCase(), from: "registry" }
        : dnsFragment?.status === "VALID" && dnsFragment?.location
        ? { location: dnsFragment.location.toUpperCase(), from: "dns" }
        : { location: "", from: "" };
    })
    .filter((identity) => identity.location)
    // sort by registry first. then by location
    .sort((location1, location2) => {
      if (location1.from === location2.from) return location1.location.localeCompare(location2.location);
      else if (location1.from === "registry") return -1;
      else return 1;
    })
    .map((identity) => identity.location);

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
