/**
 * Presentation copy.
 *
 * The failure titles and messages used to live here, as a local table keyed by a local
 * `PRESENTATION_TYPES` vocabulary. They now come from `@trustvc/trustvc`, resolved from the
 * machine-readable `reason.code` each presentation fragment carries, so every consumer of the
 * library shows the same words for the same failure.
 *
 * What remains is the CHECK ROWS, which are this UI's own: they describe the two checks the
 * envelope card shows, not a failure.
 */
export interface PresentationFailureMessage {
  failureTitle: string;
  failureMessage: string;
}

/** Check rows shown for a presentation envelope, replacing the credential-shaped ones. */
export const PRESENTATION_CHECK_MESSAGES = {
  INTEGRITY: {
    successTitle: "Presentation has not been tampered with",
    failureTitle: "Presentation has been tampered with",
  },
  HOLDER: {
    successTitle: "Presenter has been identified",
    failureTitle: "Presenter could not be identified",
  },
};
