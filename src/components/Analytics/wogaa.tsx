import React from "react";

export const Wogaa = () =>
  // NODE_ENV is automatically set by Next.js: https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#good-to-know
  process.env.NODE_ENV === "production" ? (
    <script src="https://assets.wogaa.sg/scripts/wogaa.js" />
  ) : (
    <script src="https://assets.dcube.cloud/scripts/wogaa.js" />
  );
