const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

module.exports = withBundleAnalyzer({
  analyzeBrowser: ["browser"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    browser: {
      analyzerMode: "static",
      reportFilename: "../bundles/client.html",
    },
  },

  cssModules: true,
  exportPathMap: function exportMap() {
    return {
      "/": { page: "/" },
      "/registry": { page: "/registry" },
      "/collaborate": { page: "/collaborate" },
      "/privacy": { page: "/privacy" },
      "/terms": { page: "/terms" },
      "/collaborators-terms": { page: "/collaborators-terms" },
      "/viewer": { page: "/viewer" },
      "/faq": { page: "/faq" },
    };
  },
  env: {
    INFURA_API_KEY: process.env.INFURA_API_KEY || "01b3ed28c54f4ae49cb4e27df560c5e8", // nebulis personal api key, feel free to change
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY || "FK1x9CdE8NStKjVt236D_LP7B6MMCFOs", // default key works on ropsten
  },
  // Variables passed to both server and client
  publicRuntimeConfig: {
    network: process.env.NET,
    legacyRendererUrl: process.env.LEGACY_RENDERER_URL,
    context: process.env.CONTEXT, // https://www.netlify.com/docs/continuous-deployment/?_ga=2.254249672.1986722564.1569467860-817711885.1562657089#build-environment-variables
  },
});
