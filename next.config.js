const withCSS = require("@zeit/next-css");

const isProd = process.env.NODE_ENV === "production";

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
  },
  exportPathMap: function exportMap() {
    return {
      "/": { page: "/" },
      "/admin": { page: "/admin" }
    };
  },
  assetPrefix: isProd ? "/certificate-web-ui" : ""
});
