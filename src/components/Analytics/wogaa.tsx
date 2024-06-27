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

export const useWogaa = () => {
  const startTransactionalService: typeof window.wogaaCustom.startTransactionalService = (...args) => {
    if (typeof window !== undefined && window.wogaaCustom) {
      window.wogaaCustom.startTransactionalService(...args);
    } else {
      console.warn("window.wogaaCustom is not defined", "Ensure Wogaa script is properly installed/imported");
    }
  };

  const completeTransactionalService: typeof window.wogaaCustom.completeTransactionalService = (...args) => {
    if (typeof window !== undefined && window.wogaaCustom) {
      window.wogaaCustom.completeTransactionalService(...args);
    } else {
      console.warn("window.wogaaCustom is not defined", "Ensure Wogaa script is properly installed/imported");
    }
  };

  return { startTransactionalService, completeTransactionalService };
};

export const Wogaa = () => (
  <script
    src={
      // NODE_ENV is automatically set by Next.js: https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#good-to-know
      // The allowed values for NODE_ENV: "production", "development" or "test"
      // e.g. npm run dev -> NODE_ENV === "development"
      // e.g. npm run build -> NODE_ENV === "production"
      process.env.NODE_ENV === "production"
        ? "https://assets.wogaa.sg/scripts/wogaa.js"
        : "https://assets.dcube.cloud/scripts/wogaa.js"
    }
  />
);
