/**
 * Failure copy for Verifiable Presentations.
 *
 * trustvc's fragments report a presentation failure on the same three fragment TYPES a
 * credential uses, so the existing credential copy in VerificationErrorMessages would be
 * applied to it unchanged — and it is wrong twice over. An expired credential inside a valid
 * presentation lands on DOCUMENT_STATUS and would read "Certificate not issued"; an issuer
 * whose DID cannot be resolved also fails the signature check and would read "Certificate has
 * been tampered with". Both send the holder to the wrong party.
 *
 * The rules below match on the verifier's own reason text instead. Order is behaviour, not
 * style — see PRESENTATION_FAILURES.
 */
export const PRESENTATION_TYPES = {
  NO_CREDENTIALS: "NO_CREDENTIALS",
  CREDENTIAL_REVOKED: "CREDENTIAL_REVOKED",
  CREDENTIAL_EXPIRED: "CREDENTIAL_EXPIRED",
  CREDENTIAL_NOT_YET_VALID: "CREDENTIAL_NOT_YET_VALID",
  REVOKED: "REVOKED",
  ISSUER_UNRESOLVED: "ISSUER_UNRESOLVED",
  TAMPERED: "TAMPERED",
  PRESENTATION_EXPIRED: "PRESENTATION_EXPIRED",
  UNSIGNED: "UNSIGNED",
  HOLDER_MISMATCH: "HOLDER_MISMATCH",
  UNKNOWN: "UNKNOWN",
};

export interface PresentationFailureMessage {
  failureTitle: string;
  failureMessage: string;
}

/**
 * `phrase` names the embedded credential(s) at fault, e.g. `Credential 2 ("DEGREE")`;
 * `plural` says whether more than one is named.
 */
type MessageBuilder = (phrase: string, plural: boolean) => PresentationFailureMessage;

export const PRESENTATION_MESSAGES: Record<string, PresentationFailureMessage | MessageBuilder> = {
  [PRESENTATION_TYPES.NO_CREDENTIALS]: {
    failureTitle: "Presentation contains no credentials",
    failureMessage:
      "This presentation is empty, so there is nothing to verify. Please ask the holder to present their credentials again.",
  },
  [PRESENTATION_TYPES.CREDENTIAL_REVOKED]: (phrase, plural) => ({
    failureTitle: `${plural ? "Credentials have" : "Credential has"} been revoked`,
    failureMessage: `${phrase} in this presentation ${plural ? "have" : "has"} been revoked by ${
      plural ? "their issuing institutions" : "its issuing institution"
    }. Please contact ${plural ? "them" : "the institution"} for more details.`,
  }),
  [PRESENTATION_TYPES.CREDENTIAL_EXPIRED]: (phrase, plural) => ({
    failureTitle: `${plural ? "Credentials have" : "Credential has"} expired`,
    failureMessage: `${phrase} in this presentation ${
      plural ? "have" : "has"
    } expired. Only the issuing institution can reissue ${plural ? "them" : "it"} — presenting ${
      plural ? "them" : "it"
    } again will not help.`,
  }),
  [PRESENTATION_TYPES.CREDENTIAL_NOT_YET_VALID]: (phrase, plural) => ({
    failureTitle: `${plural ? "Credentials are" : "Credential is"} not valid yet`,
    failureMessage: `${phrase} in this presentation ${
      plural ? "are" : "is"
    } not valid yet. Please check with the issuing institution when ${plural ? "they become" : "it becomes"} valid.`,
  }),
  [PRESENTATION_TYPES.REVOKED]: {
    failureTitle: "Presentation has been revoked",
    failureMessage: "This presentation has been revoked. Please contact the issuing institution for more details.",
  },
  [PRESENTATION_TYPES.ISSUER_UNRESOLVED]: (phrase, plural) => ({
    failureTitle: `${plural ? "Credential issuers are" : "Credential issuer is"} invalid`,
    failureMessage: `${phrase} in this presentation ${
      plural ? "name issuers" : "names an issuer"
    } that cannot be identified, so ${
      plural ? "they cannot" : "it cannot"
    } be verified. Please contact the issuing institution.`,
  }),
  [PRESENTATION_TYPES.TAMPERED]: {
    failureTitle: "Presentation has been tampered with",
    failureMessage: "The contents of this presentation are inaccurate and have been tampered with.",
  },
  [PRESENTATION_TYPES.PRESENTATION_EXPIRED]: {
    failureTitle: "Presentation has expired",
    failureMessage:
      "This presentation has expired and can no longer be used. Please ask the holder to present the credentials again.",
  },
  [PRESENTATION_TYPES.UNSIGNED]: {
    failureTitle: "Presentation is not signed",
    failureMessage: "This presentation is not signed, so the presenter cannot prove that they hold these credentials.",
  },
  [PRESENTATION_TYPES.HOLDER_MISMATCH]: {
    failureTitle: "Presentation was not signed by its holder",
    failureMessage:
      "This presentation was signed by someone other than the holder it names, so the presenter cannot prove these credentials are theirs.",
  },
  [PRESENTATION_TYPES.UNKNOWN]: {
    failureTitle: "This presentation is not valid",
    failureMessage: "We could not verify this presentation. Please ask the holder to present their credentials again.",
  },
};

/** Check rows shown for a presentation envelope, replacing the credential-shaped ones. */
export const PRESENTATION_CHECK_MESSAGES = {
  INTEGRITY: {
    successTitle: "Presentation has not been tampered with",
    failureTitle: "Presentation has been tampered with",
  },
  HOLDER: {
    successTitle: "Presenter's identity has been verified",
    failureTitle: "Presenter's identity is invalid",
  },
};
