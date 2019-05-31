const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

const TEMPLATE_PATH = "./src/components/CertificateTemplates";

module.exports = withBundleAnalyzer(
  withSass(
    withCss(
      {
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
            "/privacy": { page: "/privacy" },
            "/viewer": { page: "/viewer" },
            "/faq": { page: "/faq" },
            "/frameless-viewer": { page: "/frameless-viewer" }
          };
        },
        // Variables passed to both server and client
        publicRuntimeConfig: {
          network: process.env.NET
        }
      },
      TEMPLATE_PATH
    )
  )
);
