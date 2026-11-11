export interface GTMEvent {
  event: string;
  [key: string]: unknown;
}

/** Issuer fields are cleared when absent so a blank name is not sent and does not stick from the previous document. */
const ISSUER_FIELD_KEYS = ["issuer_name", "issuer_identity"] as const;

type DataLayerReset = (this: { set: (key: string, value: undefined) => void }) => void;

declare global {
  interface Window {
    dataLayer: Array<GTMEvent | DataLayerReset>;
  }
}

const isBlank = (value: unknown): boolean => typeof value !== "string" || value.trim() === "";

/**
 * Pushes an event to the GTM dataLayer.
 * Safe to call from any context: silently no-ops in SSR, never throws.
 * Events pushed before GTM loads are queued and replayed when GTM initialises.
 * Blank issuer name and identity are omitted, and cleared on the data layer, so GTM does not record an empty value or reuse the previous document's.
 */
export const pushGTMEvent = (eventData: GTMEvent): void => {
  try {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer ?? [];

    const payload: GTMEvent = { ...eventData };
    const keysToClear: string[] = [];
    for (const key of ISSUER_FIELD_KEYS) {
      if (isBlank(payload[key])) {
        delete payload[key];
        keysToClear.push(key);
      }
    }

    if (keysToClear.length > 0) {
      const reset: DataLayerReset = function resetIssuerFields() {
        keysToClear.forEach((key) => this.set(key, undefined));
      };
      window.dataLayer.push(reset);
    }
    window.dataLayer.push(payload);
  } catch {
    // Analytics failures must never affect the application
  }
};
