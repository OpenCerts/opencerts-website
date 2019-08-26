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
    // Variables passed to both server and client
    publicRuntimeConfig: {
      network: process.env.NET,
      legacyRendererUrl: process.env.LEGACY_RENDERER_URL
    }
  })
);
