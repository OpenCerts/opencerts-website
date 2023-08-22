// post-export.js
const { generateSitemap } = require("./generate-sitemap");
// Generate the sitemap and define the target folder
const URL =
  process.env.NET === "mainnet"
    ? "https://opencerts.io"
    : process.env.NET === "sepolia"
    ? "https://dev.opencerts.io"
    : "https://rinkeby.opencerts.io";
generateSitemap(URL, "./out/static/");
