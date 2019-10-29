// post-export.js
const { generateSitemap } = require("./generate-sitemap");
// Generate the sitemap and define the target folder
const URL =
  process.env.NET === "mainnet"
    ? "https://opencerts.io"
    : "https://dev.opencerts.io";
generateSitemap(URL, "./out/static/");
