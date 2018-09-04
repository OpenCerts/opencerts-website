const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
  },
  exportPathMap: function exportMap() {
    return {
      "/": { page: "/" }
    };
  }
});
