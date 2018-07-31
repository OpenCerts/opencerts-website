const isProd = process.env.NODE_ENV === "production";

module.exports = {
  exportPathMap: function exportMap() {
    return {
      "/": { page: "/" },
      "/admin": { page: "/admin" }
    };
  },
  assetPrefix: isProd ? "/certificate-web-ui" : "",
  webpack: config => {
    config.module.rules.push({
      test: /\.handlebars$/,
      loader: "handlebars-loader"
    });
    return config;
  }
};
