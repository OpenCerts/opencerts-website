import React from "react";
import { WOGAA_TRANSACTIONAL_SERVICE } from "../../config";

declare global {
  interface Window {
    wogaaCustom: {
      startTransactionalService: (
        trackingId: typeof WOGAA_TRANSACTIONAL_SERVICE[keyof typeof WOGAA_TRANSACTIONAL_SERVICE],
        uniqueTransactionId?: string
      ) => void;
      completeTransactionalService: (
        trackingId: typeof WOGAA_TRANSACTIONAL_SERVICE[keyof typeof WOGAA_TRANSACTIONAL_SERVICE],
        uniqueTransactionId?: string
      ) => void;
    };
  }
}

export const startTransactionalService: typeof window.wogaaCustom.startTransactionalService = (...args) => {
  if (typeof window !== undefined && window.wogaaCustom) {
    window.wogaaCustom.startTransactionalService(...args);
  } else {
    console.warn("window.wogaaCustom is not defined", "Ensure Wogaa script is properly installed/imported");
  }
};

export const completeTransactionalService: typeof window.wogaaCustom.completeTransactionalService = (...args) => {
  if (typeof window !== undefined && window.wogaaCustom) {
    window.wogaaCustom.completeTransactionalService(...args);
  } else {
    console.warn("window.wogaaCustom is not defined", "Ensure Wogaa script is properly installed/imported");
  }
};

export const Wogaa = () => (
  <script
    src={
      process.env.WOGAA_ENV === "production"
        ? "https://assets.wogaa.sg/scripts/wogaa.js"
        : "https://assets.dcube.cloud/scripts/wogaa.js"
    }
  />
);
