const path = require("path");
const fs = require("fs");
const { keyBy } = require("lodash");

const listDirs = directoryPath =>
  fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter(x => x.isDirectory())
    .map(x => x.name);

const createFullPaths = (basePath, dir) =>
  path.normalize(path.join(basePath, dir));

const createRegexFromDir = dir => new RegExp(`/${dir}/`);
const createWebpackCacheGroups = templatesPath => {
  const dirs = listDirs(templatesPath);

  const cacheGroups = dirs.map(dir => {
    const templateRegex = createRegexFromDir(
      createFullPaths(templatesPath, dir)
    );
    return {
      name: `templates-${dir}`,
      chunks: "all",
      enforce: true,
      priority: 100,
      test: ({ context }) => templateRegex.test(context)
    };
  });
  return keyBy(cacheGroups, "name");
};
const withSubdirectoryChunking = (nextConfig = {}, directoryPath) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
        );
      }

      if (config.optimization.splitChunks) {
        config.optimization.splitChunks.cacheGroups = Object.assign(
          {},
          config.optimization.splitChunks.cacheGroups,
          createWebpackCacheGroups(directoryPath)
        );
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      return config;
    }
  });

module.exports = withSubdirectoryChunking;
