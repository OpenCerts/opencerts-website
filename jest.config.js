module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transform: {  // https://github.com/zeit/next.js/issues/5416#issuecomment-441589662
    "^.+\\.js$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
  },
  collectCoverage: false,
  coverageDirectory: "<rootDir>/.coverage/",
  collectCoverageFrom: ["src/**/*.{js,jsx}"]
};
