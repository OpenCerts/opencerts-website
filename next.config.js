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
    INFURA_API_KEY_PROVIDER: process.env.INFURA_API_KEY_PROVIDER, // Used by the verification provider
    INFURA_API_KEY_RESOLVER: process.env.INFURA_API_KEY_RESOLVER, // Used by the mainnet did:ethr resolver
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY, // The default/free key should not be used in production as they are rate-limited by the service provider
    TRUSTED_TLDS: process.env.TRUSTED_TLDS || "gov.sg,edu.sg",
    GA4_TAG_ID: process.env.GA4_TAG_ID || "G-JP12T2F01V",
    // Static export: these must be NEXT_PUBLIC_* at build time (set in deploy workflows).
    NEXT_PUBLIC_SENTRY_ENVIRONMENT: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.SENTRY_ENVIRONMENT || "",
    NEXT_PUBLIC_SENTRY_RELEASE: process.env.NEXT_PUBLIC_SENTRY_RELEASE || process.env.SENTRY_RELEASE || "",
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
    // @mattrglobal/bbs-signatures conditionally requires this native addon only in Node.js.
    // In the browser it uses WASM instead, so we stub it out to prevent webpack from failing.
    config.resolve.alias["@mattrglobal/node-bbs-signatures"] = false;
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

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

const hasSentryAuthToken = Boolean(String(process.env.SENTRY_AUTH_TOKEN || "").trim());
const uploadExplicitlyDisabled = process.env.SENTRY_UPLOAD_SOURCE_MAPS === "false";
const uploadExplicitlyEnabled = process.env.SENTRY_UPLOAD_SOURCE_MAPS === "true";
const skipSentryBuildUploadOnGithubActions = process.env.GITHUB_ACTIONS === "true" && !uploadExplicitlyEnabled;
const skipSentryBuildUpload = uploadExplicitlyDisabled || !hasSentryAuthToken || skipSentryBuildUploadOnGithubActions;

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "opencerts",
  project: "opencerts-website",

  ...(skipSentryBuildUpload
    ? {
        sourcemaps: { disable: true },
        release: { create: false, finalize: false },
      }
    : {}),

  telemetry: false,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  webpack: {
    automaticVercelMonitors: false,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
