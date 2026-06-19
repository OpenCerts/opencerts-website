export const ANALYTICS_EVENTS = {
  CERTIFICATE_VIEWED: "certificate_viewed",
  CERTIFICATE_DETAILS: "certificate_details",
  CERTIFICATE_ERROR: "certificate_error",
  CERTIFICATE_RENDERER_TIMEOUT: "certificate_renderer_timeout",
  CERTIFICATE_PRINT: "certificate_print",
  DOCUMENT_VERIFICATION_COMPLETED: "document_verification_completed",
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
