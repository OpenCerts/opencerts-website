import React from "react";

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
