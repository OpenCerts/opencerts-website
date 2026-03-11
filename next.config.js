const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.BUNDLE_ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "export",
  transpilePackages: [
    "react-pdf",
    "pdfjs-dist",
    "@trustvc/trustvc",
    "@trustvc/w3c-vc",
    "@trustvc/w3c-issuer",
    "@trustvc/w3c-context",
    "@trustvc/w3c-credential-status",
  ],
  exportPathMap: function exportMap() {
    return {
      "/": { page: "/" },
      "/privacy": { page: "/privacy" },
      "/terms": { page: "/terms" },
      "/viewer": { page: "/viewer" },
      "/faq": { page: "/faq" },
      "/collaborator": { page: "/collaborator" },
    };
  },
  env: {
    INFURA_API_KEY: process.env.INFURA_API_KEY, // The default/free key should not be used in production as they are rate-limited by the service provider
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY, // The default/free key should not be used in production as they are rate-limited by the service provider
    TRUSTED_TLDS: process.env.TRUSTED_TLDS || "gov.sg,edu.sg",
    GA4_TAG_ID: process.env.GA4_TAG_ID || "G-JP12T2F01V",
  },
  // Variables passed to both server and client
  publicRuntimeConfig: {
    network: process.env.NET,
    legacyRendererUrl: process.env.LEGACY_RENDERER_URL,
    context: process.env.CONTEXT, // https://www.netlify.com/docs/continuous-deployment/?_ga=2.254249672.1986722564.1569467860-817711885.1562657089#build-environment-variables
  },
  experimental: {
    // workaround to for next to play nice with oa-verify's new version
    // might be related to https://github.com/vercel/next.js/issues/39375#issuecomment-1380266233
    esmExternals: false,
  },
  webpack: (config) => {
    // @trustvc/trustvc imports dotenv/config at the top level in its ESM build,
    // which is Node.js-only and cannot be resolved in a browser bundle.
    config.resolve.alias["dotenv/config"] = false;
    // @digitalbazaar/bbs-signatures uses `node:crypto` for webcrypto.
    // In the browser, the Web Crypto API is available as globalThis.crypto.
    // We provide a browser shim that re-exports webcrypto from the global.
    config.resolve.alias["@digitalbazaar/bbs-signatures/lib/crypto.js"] = path.resolve("./src/shims/bbs-crypto.js");
    // Force all packages to use the same React instance to prevent hook errors
    // when using local packages that have their own node_modules/react.
    config.resolve.alias["react"] = path.resolve("./node_modules/react");
    config.resolve.alias["react-dom"] = path.resolve("./node_modules/react-dom");
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
