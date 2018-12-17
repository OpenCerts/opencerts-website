const withSass = require("@zeit/next-sass");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const fs = require("fs");
const { filter } = require("lodash");

const withTemplateBundling = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
        );
      }

      // if (typeof nextConfig.webpack === "function") {
      //   return nextConfig.webpack(config, options);
      // }

      // if (config.optimization.splitChunks) {
      //   config.optimization.splitChunks.cacheGroups = Object.assign(
      //     {},
      //     config.optimization.splitChunks.cacheGroups,
      //     {
      //       GovTech: {
      //         name: "templates-govtech",
      //         chunks: "all",
      //         enforce: true,
      //         priority: 11,
      //         test: ({ context }) => {
      //           const templateRegex = /\/components\/CertificateTemplates\/GovTech\/.*/;
      //           return templateRegex.test(context);
      //           // console.log("aee", templateRegex.test(context))
      //         }
      //       }
      //     }
      //   );
      // }
      console.log("wp config", config.optimization.splitChunks);
      const path = require("path");
      const TEMPLATE_PATH = "./src/components/CertificateTemplates";
      const getDirs = () =>
        filter(fs.readdirSync(TEMPLATE_PATH, { withFileTypes: true }), x =>
          x.isDirectory()
        ).map(x => x.name);

      const createFullPaths = dir => {
        return path.normalize(path.join(TEMPLATE_PATH, dir));
      };
      const dirs = getDirs();
      console.log("dirs", dirs);

      const createWebpackCacheGroups = aDirs => {
        let cacheGroups = dirs.map(dir => {
          return {
            name: `templates-${dir}`,
            chunks: "all",
            enforce: true,
            priority: 100,
            test: ({ context }) => {
              const templateRegex = new RegExp(`/${createFullPaths(dir)}/`);
              return templateRegex.test(context);
            }
          };
        });
        return cacheGroups;
      };

      const templatePathRegexes = dirs
        .map(createFullPaths)
        .map(templatePath => new RegExp(`/${templatePath}/`));

      console.log("gd", templatePathRegexes);

      // console.log("groups", createWebpackCacheGroups(dirs))
      let z = createWebpackCacheGroups(dirs)
      console.log(z.map(p => console.log(p.test.toString())))

      return config;
    }
  });
};
module.exports = withBundleAnalyzer(
  withSass(
    withTemplateBundling({
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
          "/faq": { page: "/faq" }
        };
      },
      // Variables passed to both server and client
      publicRuntimeConfig: {
        network: process.env.NET
      }
    })
  )
);
