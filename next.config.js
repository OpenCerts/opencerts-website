const withSass = require("@zeit/next-sass");

module.exports = withSass({
  cssModules: true,
  exportPathMap: function exportMap() {
    return {
      "/": { page: "/" },
      "/registry": { page: "/registry" },
      "/viewer": { page: "/viewer" }
    };
  }
});
