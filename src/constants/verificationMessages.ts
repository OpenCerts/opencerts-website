export const CERTIFICATE_VERIFICATION_FAILED_HEADING = "This certificate could not be verified";

/** Network and provider failures. Other verification errors use the generic message. */
export const CERTIFICATE_VERIFICATION_NETWORK_MESSAGE =
  "We couldn't reach the network to check this certificate. Please check your connection and try again.";

export const CERTIFICATE_VERIFICATION_GENERIC_MESSAGE = "This certificate could not be verified. Please try again.";

export const DEMO_CERTIFICATE_LOAD_MESSAGE = "The demo certificate could not be loaded. Please try again.";

const SAFE_VERIFICATION_MESSAGES = new Set<string>([
  CERTIFICATE_VERIFICATION_NETWORK_MESSAGE,
  CERTIFICATE_VERIFICATION_GENERIC_MESSAGE,
]);

const NETWORK_OR_PROVIDER_FAILURE =
  /failed to fetch|load failed|networkerror|network request failed|timeout|timed out|etimedout|econnreset|econnrefused|enotfound|missing response|call_exception|server_error|bad gateway|gateway timeout/i;

export const verificationFailureMessage = (error: unknown): string => {
  const text = error instanceof Error ? `${error.name} ${error.message}` : String(error);
  return NETWORK_OR_PROVIDER_FAILURE.test(text)
    ? CERTIFICATE_VERIFICATION_NETWORK_MESSAGE
    : CERTIFICATE_VERIFICATION_GENERIC_MESSAGE;
};

/** Never render a stored provider exception. Unknown text falls back to the generic message. */
export const displayedVerificationMessage = (stored: string): string =>
  SAFE_VERIFICATION_MESSAGES.has(stored) ? stored : CERTIFICATE_VERIFICATION_GENERIC_MESSAGE;

export const ignoredFilesMessage = (fileName: string): string =>
  `Only one certificate can be checked at a time; we checked ${fileName}.`;
