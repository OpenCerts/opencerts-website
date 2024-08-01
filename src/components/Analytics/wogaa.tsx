import Script from "next/script";
import React from "react";
import { WOGAA_TRANSACTIONAL_SERVICE } from "../../config";

declare global {
  interface Window {
    wogaaCustom: {
      startTransactionalService: (
        trackingId: (typeof WOGAA_TRANSACTIONAL_SERVICE)[keyof typeof WOGAA_TRANSACTIONAL_SERVICE],
        uniqueTransactionId?: string
      ) => void;
      completeTransactionalService: (
        trackingId: (typeof WOGAA_TRANSACTIONAL_SERVICE)[keyof typeof WOGAA_TRANSACTIONAL_SERVICE],
        uniqueTransactionId?: string
      ) => void;
    };
  }
}

const MAX_CALL_QUEUE_LENGTH = 20;
// calls to Wogaa can happen before the Wogaa script is loaded
// this queue will hold the calls until the Wogaa script is loaded
const wogaaCallQueue: (
  | {
      name: "startTransactionalService";
      args: Parameters<typeof window.wogaaCustom.startTransactionalService>;
    }
  | {
      name: "completeTransactionalService";
      args: Parameters<typeof window.wogaaCustom.completeTransactionalService>;
    }
)[] = [];
export const startTransactionalService: typeof window.wogaaCustom.startTransactionalService = (...args) => {
  if (typeof window !== undefined && window.wogaaCustom) {
    window.wogaaCustom.startTransactionalService(...args);
  } else {
    console.warn(
      "window.wogaaCustom is not defined",
      "Ensure Wogaa script is properly installed/imported",
      "Pushed call to queue"
    );
    // just in case wogaa script is never loaded, we dont want to keep storing calls indefinitely
    if (wogaaCallQueue.length <= MAX_CALL_QUEUE_LENGTH) {
      wogaaCallQueue.push({ name: "startTransactionalService", args });
    }
  }
};

export const completeTransactionalService: typeof window.wogaaCustom.completeTransactionalService = (...args) => {
  if (typeof window !== undefined && window.wogaaCustom) {
    window.wogaaCustom.completeTransactionalService(...args);
  } else {
    console.warn(
      "window.wogaaCustom is not defined",
      "Ensure Wogaa script is properly installed/imported",
      "Pushed call to queue"
    );
    // just in case wogaa script is never loaded, we dont want to keep storing calls indefinitely
    if (wogaaCallQueue.length <= MAX_CALL_QUEUE_LENGTH) {
      wogaaCallQueue.push({ name: "completeTransactionalService", args });
    }
  }
};

export const Wogaa = () => (
  <Script
    src={
      process.env.WOGAA_ENV === "production"
        ? "https://assets.wogaa.sg/scripts/wogaa.js"
        : "https://assets.dcube.cloud/scripts/wogaa.js"
    }
  />
);
