import { VerificationFragment, VerificationFragmentStatus, utils } from "@govtechsg/oa-verify";
import { getData, v2, WrappedDocument } from "@govtechsg/open-attestation";
import { OpencertsRegistryVerificationFragmentData } from "@govtechsg/opencerts-verify";
import React, { useState } from "react";
import { icons } from "../ViewerPageImages";
import { DetailedCertificateVerifyBlock } from "./DetailedCertificateVerifyBlock";

type DnsTxtFragment = { status: VerificationFragmentStatus; location?: string };
type DnsDidFragment = DnsTxtFragment;

export const getIdentityVerificationText = (
  verificationStatus: VerificationFragment[],
  document: WrappedDocument<v2.OpenAttestationDocument>
): string => {
  const data = getData(document);
  const registryFragment = utils.getFragmentByName("OpencertsRegistryVerifier")(verificationStatus);
  const dnsTxtFragment = utils.getOpenAttestationDnsTxtIdentityProofFragment(verificationStatus);
  const dnsDidFragment = utils.getOpenAttestationDnsDidIdentityProofFragment(verificationStatus);

  // using concat to handle arrays and single element
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore TODO fix oc verify :)
  const registryFragmentData: OpencertsRegistryVerificationFragmentData[] = [].concat(registryFragment?.data || []);
  const dnsTxtFragmentData: (DnsTxtFragment | undefined)[] = [].concat(dnsTxtFragment?.data || []);
  const dnsDidFragmentData: (DnsDidFragment | undefined)[] = [].concat(dnsDidFragment?.data || []);

  const identities = data.issuers
    .map((_, index) => {
      // retrieve the issuer identity from the fragment. for each issuer, only one identity must be retrieved
      // 1. check registry fragment and return the location if the fragment is valid
      // 2. otherwise check dns fragment and return the location if the fragment is valid
      // 2. otherwise check did-dns fragment and return the location if the fragment is valid
      // 3. otherwise return default value
      const registryFragment = registryFragmentData[index];
      const dnsTxtFragment = dnsTxtFragmentData[index];
      const dnsDidFragment = dnsDidFragmentData[index];
      if (registryFragment?.status === "VALID" && registryFragment?.name)
        return { location: registryFragment.name.toUpperCase(), from: "registry" };
      else if (dnsTxtFragment?.status === "VALID" && dnsTxtFragment?.location)
        return { location: dnsTxtFragment.location.toUpperCase(), from: "dns-txt" };
      else if (dnsDidFragment?.status === "VALID" && dnsDidFragment?.location)
        return { location: dnsDidFragment.location.toUpperCase(), from: "dns-did" };
      else return { location: "", from: "" };
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
    return `${identities.join(", ")}`;
  }
  return "Unknown";
};

interface SimpleVerifyBlockProps {
  detailedViewVisible: boolean;
  verificationStatus: VerificationFragment[];
  toggleDetailedViewVisible: () => void;
  document: WrappedDocument<v2.OpenAttestationDocument>;
}
const SimpleVerifyBlock: React.FunctionComponent<SimpleVerifyBlockProps> = (props) => {
  return (
    <div
      id="certificate-status"
      className={`p-2 pointer bg-white text-green border border-green rounded cursor-pointer transition-shadow duration-200 ease-out shadow-sm hover:shadow-md ${
        props.detailedViewVisible ? "rounded-bl-none rounded-br-none xl:rounded-tr-none xl:rounded-bl" : ""
      }`}
      onClick={props.toggleDetailedViewVisible}
    >
      <div className="flex flex-row items-center">
        <div className="px-2 w-auto">{icons.checkCircle()}</div>
        <div className="px-2 w-full font-bold">
          Certificate issued by
          <div className="break-all md:break-normal">
            {getIdentityVerificationText(props.verificationStatus, props.document)}
          </div>
        </div>
        <div className="px-2 w-auto">
          <div className="transform rotate-90 xl:rotate-0">{icons.arrow()}</div>
        </div>
      </div>
    </div>
  );
};

interface CertificateVerifyBlockProps {
  verificationStatus: VerificationFragment[];
  document: WrappedDocument<v2.OpenAttestationDocument>;
}
export const CertificateVerifyBlock: React.FunctionComponent<CertificateVerifyBlockProps> = (props) => {
  const [detailedViewVisible, setDetailedViewVisible] = useState(false);
  const toggleDetailedViewVisible = (): void => setDetailedViewVisible(!detailedViewVisible);

  const { verificationStatus } = props;
  return (
    <div className="relative mb-8 lg:mb-0">
      <SimpleVerifyBlock
        verificationStatus={verificationStatus}
        toggleDetailedViewVisible={toggleDetailedViewVisible}
        detailedViewVisible={detailedViewVisible}
        document={props.document}
      />
      {detailedViewVisible ? <DetailedCertificateVerifyBlock verificationStatus={verificationStatus} /> : ""}
    </div>
  );
};
