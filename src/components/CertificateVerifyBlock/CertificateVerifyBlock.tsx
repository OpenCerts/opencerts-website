import {
  utils,
  ValidDnsDidVerificationStatus,
  ValidDnsTxtVerificationStatus,
  VerificationFragment,
} from "@govtechsg/oa-verify";
import { getData, v2, WrappedDocument, utils as oaUtils, v3 } from "@govtechsg/open-attestation";
import {
  getOpencertsRegistryVerifierFragment,
  OpencertsRegistryVerificationValidData,
} from "@govtechsg/opencerts-verify";
import React, { useState } from "react";
import { WrappedOrSignedOpenCertsDocument } from "../../shared";
import { icons } from "../ViewerPageImages";
import { DetailedCertificateVerifyBlock } from "./DetailedCertificateVerifyBlock";

export const getV2IdentityVerificationText = (
  verificationStatus: VerificationFragment[],
  document: WrappedDocument<v2.OpenAttestationDocument>
): JSX.Element => {
  const data = getData(document);
  const registryFragment = getOpencertsRegistryVerifierFragment(verificationStatus);
  const dnsTxtFragment = utils.getOpenAttestationDnsTxtIdentityProofFragment(verificationStatus);
  const dnsDidFragment = utils.getOpenAttestationDnsDidIdentityProofFragment(verificationStatus);

  const identities = data.issuers
    .map((issuer, index): { name: string; location: string; from: "registry" | "dns-txt" | "dns-did" | "unknown" } => {
      // retrieve the issuer identity from the fragment. for each issuer, only one identity must be retrieved
      // 1. check registry fragment and return the location if the fragment is valid
      // 2. otherwise check dns fragment and return the location if the fragment is valid
      // 2. otherwise check did-dns fragment and return the location if the fragment is valid
      // 3. otherwise return default value
      const indexedRegistryFragment = Array.isArray(registryFragment?.data) ? registryFragment?.data[index] : undefined;
      const indexedDnsTxtFragment = Array.isArray(dnsTxtFragment?.data) ? dnsTxtFragment?.data[index] : undefined;
      const indexedDnsDidFragment = Array.isArray(dnsDidFragment?.data) ? dnsDidFragment?.data[index] : undefined;

      if (OpencertsRegistryVerificationValidData.guard(indexedRegistryFragment))
        return {
          name: indexedRegistryFragment.name.toUpperCase(),
          location: indexedRegistryFragment.value,
          from: "registry",
        };
      else if (ValidDnsTxtVerificationStatus.guard(indexedDnsTxtFragment))
        return {
          name: issuer.name.toUpperCase(),
          location: indexedDnsTxtFragment.location.toUpperCase(),
          from: "dns-txt",
        };
      else if (ValidDnsDidVerificationStatus.guard(indexedDnsDidFragment))
        return {
          name: issuer.name.toUpperCase(),
          location: indexedDnsDidFragment.location.toUpperCase(),
          from: "dns-did",
        };
      else return { name: "", location: "", from: "unknown" };
    })
    .filter((id) => id.from !== "unknown")
    // sort by registry first. then by location
    .sort((id1, id2) => {
      if (id1.from === "registry" && id2.from === "registry") return id1.name.localeCompare(id2.name);
      else if (id1.from === "registry") return -1;
      else if (id2.from === "registry") return 1;
      else return id1.location.localeCompare(id2.location);
    });

  if (identities.length > 0) {
    const isTrusted = (location: string): boolean => {
      const TRUSTED_TLDS = process.env.TRUSTED_TLDS?.split(",");
      return TRUSTED_TLDS ? TRUSTED_TLDS.some((tld) => location.toUpperCase().endsWith(tld.toUpperCase())) : false;
    };

    return (
      <ol>
        {identities.map((id, i) => {
          const props = { key: i, ...(i !== identities.length - 1 && { className: "my-2" }) };

          if (id.from === "registry") return <li {...props}>{id.name}</li>;
          else if (isTrusted(id.location))
            return (
              <li {...props}>
                {id.location}
                <br />
                {id.name}
              </li>
            );
          else return <li {...props}>{id.location}</li>;
        })}
      </ol>
    );
  }

  return <>Unknown</>;
};

export const getV3IdentityVerificationText = (document: WrappedDocument<v3.OpenAttestationDocument>): string => {
  return document.openAttestationMetadata.identityProof.identifier.toUpperCase();
};

interface SimpleVerifyBlockProps {
  detailedViewVisible: boolean;
  verificationStatus: VerificationFragment[];
  toggleDetailedViewVisible: () => void;
  document: WrappedOrSignedOpenCertsDocument;
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
            {oaUtils.isWrappedV2Document(props.document)
              ? getV2IdentityVerificationText(props.verificationStatus, props.document)
              : getV3IdentityVerificationText(props.document)}
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
  document: WrappedOrSignedOpenCertsDocument;
}
export const CertificateVerifyBlock: React.FunctionComponent<CertificateVerifyBlockProps> = (props) => {
  const [detailedViewVisible, setDetailedViewVisible] = useState(false);
  const toggleDetailedViewVisible = (): void => setDetailedViewVisible(!detailedViewVisible);

  const { verificationStatus } = props;
  return (
    <div className="relative mb-4 lg:mb-0">
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
