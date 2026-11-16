export const CERTIFICATE_VERIFICATION_FAILED_HEADING = "This certificate could not be verified";

/** Shown instead of the provider exception, which can include a request URL. */
export const CERTIFICATE_VERIFICATION_FAILED_MESSAGE =
  "We couldn't reach the network to check this certificate. Please check your connection and try again.";

export const ignoredFilesMessage = (fileName: string): string =>
  `Only one certificate can be checked at a time; we checked ${fileName}.`;
