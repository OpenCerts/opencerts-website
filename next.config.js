const withSass = require("@zeit/next-sass");

module.exports = withSass({
  cssModules: true,
  exportPathMap: function exportMap() {
    return {
      "/": { page: "/" },
      "/registry": { page: "/registry" },
      "/privacy": { page: "/privacy" },
      "/viewer": { page: "/viewer" },
      "/faq": { page: "/faq" }
    };
  },
  // Variables passed to both server and client
  publicRuntimeConfig: {
    network: process.env.NET
  }
});
