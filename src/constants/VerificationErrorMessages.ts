export const TYPES = {
  REVOKED: "REVOKED",
  ISSUED: "ISSUED",
  HASH: "HASH",
  IDENTITY: "IDENTITY",
  ADDRESS_INVALID: "ADDRESS_INVALID",
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
};
