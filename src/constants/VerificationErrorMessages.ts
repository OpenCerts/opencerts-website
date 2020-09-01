export const TYPES = {
  REVOKED: "REVOKED",
  ISSUED: "ISSUED",
  HASH: "HASH",
  IDENTITY: "IDENTITY",
  ADDRESS_INVALID: "ADDRESS_INVALID",
  CONTRACT_NOT_FOUND: "CONTRACT_NOT_FOUND",
  INVALID_ARGUMENT: "INVALID_ARGUMENT",
  SERVER_ERROR: "SERVER_ERROR",
  ETHERS_UNHANDLED_ERROR: "ETHERS_UNHANDLED_ERROR",
};

export const MESSAGES = {
  [TYPES.REVOKED]: {
    failureTitle: "Certificate has been revoked",
    successTitle: "Certificate has not been revoked",
    failureMessage:
      "This certificate has been revoked by your issuing institution. Please contact your issuing institution for more details.",
  },
  [TYPES.ISSUED]: {
    failureTitle: "Certificate not issued",
    successTitle: "Certificate has been issued",
    failureMessage:
      "This certificate cannot be found. Please contact your issuing institution for help or issue the certificate before trying again.",
  },
  [TYPES.HASH]: {
    failureTitle: "Certificate has been tampered with",
    successTitle: "Certificate has not been tampered with",
    failureMessage: "The contents of this certificate are inaccurate and have been tampered with.",
  },
  [TYPES.IDENTITY]: {
    failureTitle: "Certificate issuer identity is invalid",
    successTitle: "Certificate issuer has been identified",
    failureMessage: "This certificate was issued by an invalid issuer.",
  },
  [TYPES.ADDRESS_INVALID]: {
    failureTitle: "Certificate store address is invalid",
    failureMessage:
      "Please inform the issuer of this certificate that they have misconfigured their certificate store address.",
  },
  [TYPES.CONTRACT_NOT_FOUND]: {
    failureTitle: "Certificate store address cannot be found",
    failureMessage:
      "Please inform the issuer of this certificate that they have misconfigured their certificate store address.",
  },
  [TYPES.INVALID_ARGUMENT]: {
    failureTitle: "Certificate's merkle root is invalid",
    failureMessage:
      "Please inform the issuer of this certificate that the merkle root is invalid, or it may have been tampered with.",
  },
  [TYPES.SERVER_ERROR]: {
    failureTitle: "Unable to connect to the Ethereum network",
    failureMessage:
      "We are unable to connect to the Ethereum network, please try again later. If this issue persists, contact us using the feedback link below.",
  },
  [TYPES.ETHERS_UNHANDLED_ERROR]: {
    failureTitle: "Whoops! It's not you, it's us",
    failureMessage:
      "We encountered an internal error and cannot determine the cause, please try again later. If this issue persists, contact us using the feedback link below.",
  },
};
