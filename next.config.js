const withSass = require("@zeit/next-sass");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

module.exports = withBundleAnalyzer(
  withSass({
    analyzeBrowser: ["browser"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      browser: {
        analyzerMode: "static",
        reportFilename: "../bundles/client.html"
      }
    },
    cssModules: true,
    exportPathMap: function exportMap() {
      return {
        "/": { page: "/" },
        "/registry": { page: "/registry" },
        "/collaborate": { page: "/collaborate" },
        "/privacy": { page: "/privacy" },
        "/terms": { page: "/terms" },
        "/viewer": { page: "/viewer" },
        "/faq": { page: "/faq" }
      };
    },
    // Variables passed to both server and client
    publicRuntimeConfig: {
      network: process.env.NET,
      legacyRendererUrl: process.env.LEGACY_RENDERER_URL
    }
  })
);
