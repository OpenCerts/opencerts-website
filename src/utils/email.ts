// Recipient rule for the email certificate API. This must match the backend exactly
// (OpenCerts/opencerts-functions src/email): anything the form accepts here the API must accept too,
// and vice versa, so a single plain address is the only thing that gets through. Lists, display
// names ("Someone <a@example.com>") and header-injection attempts are all rejected.
export const MAX_EMAIL_LENGTH = 254;
export const EMAIL_REGEX = /^[^\s@,;<>()[\]":\\]+@[^\s@,;<>()[\]":\\]+\.[^\s@,;<>()[\]":\\]+$/;

export const isValidRecipient = (to: unknown): to is string =>
  typeof to === "string" && to.length <= MAX_EMAIL_LENGTH && EMAIL_REGEX.test(to);
