import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      await import("./sentry.server.config");
    } catch (error) {
      console.error('Failed to load "./sentry.server.config" in instrumentation register()', error);
      throw error;
    }
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    try {
      await import("./sentry.edge.config");
    } catch (error) {
      console.error('Failed to load "./sentry.edge.config" in instrumentation register()', error);
      throw error;
    }
  }
}

export const onRequestError = Sentry.captureRequestError;
