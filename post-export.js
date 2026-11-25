// post-export.js
const { generateSitemap } = require("./generate-sitemap");
// Generate the sitemap and define the target folder
const SITE_URLS = {
  mainnet: "https://opencerts.io",
  sepolia: "https://dev.opencerts.io",
};
const URL = SITE_URLS[process.env.NET] ?? "https://rinkeby.opencerts.io";

generateSitemap(URL, "./out/static/").catch((error) => {
  console.error("Failed to generate sitemap:", error);
  process.exitCode = 1;
});
