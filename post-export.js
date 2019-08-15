// post-export.js
const { generateSitemap } = require("./generate-sitemap");
// Generate the sitemap and define the target folder
// Don't forget to set the PUBLIC_DOMAIN secret in Netlify! 🕵️‍♀️
generateSitemap("https://opencerts.io", "./out/static/");
