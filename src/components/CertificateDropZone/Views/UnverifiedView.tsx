import { VerificationFragment } from "@govtechsg/oa-verify";
import { isValid } from "@govtechsg/opencerts-verify";
import Link from "next/link";
import React from "react";
import { useDropzone } from "react-dropzone";
import { MESSAGES, TYPES } from "../../../constants/VerificationErrorMessages";
import {
  addressInvalid,
  certificateNotIssued,
  certificateRevoked,
  unhandledError,
  serverError,
  contractNotFound,
  invalidArgument,
} from "../../../services/fragment";

interface DetailedErrorsProps {
  verificationStatus: VerificationFragment[];
}
const DetailedErrors: React.FunctionComponent<DetailedErrorsProps> = ({ verificationStatus }) => {
  const errors = [];
  if (!isValid(verificationStatus, ["DOCUMENT_INTEGRITY"])) {
    errors.push(TYPES.HASH);
  }
  if (!isValid(verificationStatus, ["ISSUER_IDENTITY"])) {
    errors.push(TYPES.IDENTITY);
  }

  if (!isValid(verificationStatus, ["DOCUMENT_STATUS"])) {
    if (certificateRevoked(verificationStatus)) errors.push(TYPES.REVOKED);
    else if (addressInvalid(verificationStatus)) {
      // if the error is because the address is invalid, then get rid of all errors and only keep this one
      errors.splice(0, errors.length);
      errors.push(TYPES.ADDRESS_INVALID);
    } else if (contractNotFound(verificationStatus)) {
      // if the error is because the contract cannot be found, then get rid of all errors and only keep this one
      errors.splice(0, errors.length);
      errors.push(TYPES.CONTRACT_NOT_FOUND);
    } else if (serverError(verificationStatus)) {
      // if the error is because cannot connect to Ethereum, then get rid of all errors and only keep this one
      errors.splice(0, errors.length);
      errors.push(TYPES.SERVER_ERROR);
    } else if (invalidArgument(verificationStatus)) {
      // this error is caused when the merkle root is wrong, and should always be shown with the DOCUMENT_INTEGRITY error
      errors.push(TYPES.INVALID_ARGUMENT);
    } else if (certificateNotIssued(verificationStatus)) errors.push(TYPES.ISSUED);
    else {
      // if it's some unhandled error that we didn't foresee, then get rid of all errors and only keep this one
      errors.splice(0, errors.length);
      errors.push(TYPES.ETHERS_UNHANDLED_ERROR);
    }
  }
  const renderedError = errors.map((errorType, index) => (
    <div className="text-pink mt-4 mb-8" key={index}>
      <h4 className="font-bold">{MESSAGES[errorType].failureTitle}</h4>
      <p>{MESSAGES[errorType].failureMessage}</p>
    </div>
  ));
  return <div id="error-tab">{renderedError}</div>;
};

interface UnverifiedViewProps {
  resetData: () => void;
  verificationStatus: VerificationFragment[];
}
export const UnverifiedView: React.FunctionComponent<UnverifiedViewProps> = ({ resetData, verificationStatus }) => {
  let label = "This certificate is not valid";
  if (serverError(verificationStatus)) {
    label = "Connection error";
  } else if (unhandledError(verificationStatus)) {
    label = "Unhandled error";
  }

  return (
    <>
      <ErrorHeading title={label} />

      {<DetailedErrors verificationStatus={verificationStatus} />}

      <WhatShouldIDo />

      <TryAnother resetData={resetData} />
    </>
  );
};

interface ErrorHeadingProps {
  title: string;
}

export const ErrorHeading: React.FunctionComponent<ErrorHeadingProps> = ({ title }: ErrorHeadingProps) => {
  return (
    <div className="flex flex-nowrap items-center justify-center">
      <div className="w-auto mr-4">
        <img src="/static/images/dropzone/invalid.svg" />
      </div>
      <div className="w-auto">
        <h3 className="text-black">{title}</h3>
      </div>
    </div>
  );
};

export const WhatShouldIDo: React.FunctionComponent = () => {
  // see https://stackoverflow.com/questions/64091060/react-dropzone-prevent-inner-element-from-showing-file-picker
  const { getRootProps } = useDropzone({ noClick: true }); // doesn't work
  return (
    <Link href="/faq">
      <div
        className="button bg-pink hover:bg-pink-300 w-56 mx-auto mb-8"
        {...getRootProps({
          onClick: (event) => event.stopPropagation(), // this is bad, but we'll use it for now until there's a fix
        })}
      >
        What should I do?
      </div>
    </Link>
  );
};

interface TryAnotherProps {
  resetData: () => void;
}

export const TryAnother: React.FunctionComponent<TryAnotherProps> = ({ resetData }: TryAnotherProps) => {
  return (
    <div
      className="ease-colors text-gray-600 hover:text-gray-900 underline"
      onClick={() => {
        resetData();
      }}
      role="button"
    >
      Try another
    </div>
  );
};
