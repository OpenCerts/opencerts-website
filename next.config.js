const withSass = require("@zeit/next-sass");

module.exports = withSass({
  exportPathMap: function exportMap() {
    return {
      "/": { page: "/" },
      "/registry": { page: "/registry" },
      "/viewer": { page: "/viewer" }
    };
  }
});
