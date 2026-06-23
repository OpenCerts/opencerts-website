export interface GTMEvent {
  event: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer: GTMEvent[];
  }
}

/**
 * Pushes an event to the GTM dataLayer.
 * Safe to call from any context: silently no-ops in SSR, never throws.
 * Events pushed before GTM loads are queued and replayed when GTM initialises.
 */
export const pushGTMEvent = (eventData: GTMEvent): void => {
  try {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(eventData);
  } catch {
    // Analytics failures must never affect the application
  }
};
