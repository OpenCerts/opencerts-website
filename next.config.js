const withSass = require("@zeit/next-sass");

module.exports = (phase, defaultConfig) => {
  console.log("config", defaultConfig);
  return withSass({
    // webpack: function(config, { isServer }) {
    //   console.log(
    //     "webpack",
    //     isServer,
    //     config.optimization.splitChunks.cacheGroups
    //   );
    //   if (!isServer) {
    //     config.optimization.splitChunks.cacheGroups.templates = {
    //       name: "templates",
    //       test: /src\/components\/CertificateTemplates/,
          
    //       chunks: "all",
    //       enforce: true
    //     };
    //   }
    //   return config;
    // },
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
};
