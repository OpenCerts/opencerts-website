module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/.coverage/",
  "collectCoverageFrom": [
    "src/**/*.{js,jsx}"
  ]
};
