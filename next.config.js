const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

module.exports = withBundleAnalyzer({
  analyzeBrowser: ["browser"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    browser: {
      analyzerMode: "static",
      reportFilename: "../bundles/client.html",
    },
  },

  trailingSlash: true,
  cssModules: true,
  output: "export",
  exportPathMap: function exportMap() {
    return {
      "/": { page: "/" },
      "/archive/registry": { page: "/archive/registry" },
      "/collaborate": { page: "/collaborate" },
      "/privacy": { page: "/privacy" },
      "/terms": { page: "/terms" },
      "/collaborators-terms": { page: "/collaborators-terms" },
      "/viewer": { page: "/viewer" },
      "/faq": { page: "/faq" },
    };
  },
  env: {
    INFURA_API_KEY: process.env.INFURA_API_KEY || "84842078b09946638c03157f83405213", // ethers package default api key, feel free to change
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY || "FK1x9CdE8NStKjVt236D_LP7B6MMCFOs", // default key works on ropsten
    TRUSTED_TLDS: process.env.TRUSTED_TLDS || "gov.sg,edu.sg",
    GA4_TAG_ID: process.env.GA4_TAG_ID || "G-JP12T2F01V",
  },
  // Variables passed to both server and client
  publicRuntimeConfig: {
    network: process.env.NET,
    legacyRendererUrl: process.env.LEGACY_RENDERER_URL,
    context: process.env.CONTEXT, // https://www.netlify.com/docs/continuous-deployment/?_ga=2.254249672.1986722564.1569467860-817711885.1562657089#build-environment-variables
  },
});
