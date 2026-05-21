// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const serverDsn = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  enabled: Boolean(serverDsn),
  dsn: serverDsn,
  ...(process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ? { environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT } : {}),
  ...(process.env.NEXT_PUBLIC_SENTRY_RELEASE ? { release: process.env.NEXT_PUBLIC_SENTRY_RELEASE } : {}),

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,

  // Enable logs to be sent to Sentry
  enableLogs: process.env.NODE_ENV === "development",

  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: false,
});
