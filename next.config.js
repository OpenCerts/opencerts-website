const isProd = process.env.NODE_ENV === "production";

module.exports = {
  exportPathMap: function exportMap() {
    return {
      "/": { page: "/" },
      "/admin": { page: "/admin" }
    };
  },
  assetPrefix: isProd ? "/certificate-web-ui" : ""
};
