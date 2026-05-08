module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  collectCoverage: false,
  coverageDirectory: "<rootDir>/.coverage/",
  collectCoverageFrom: ["src/**/*.{js,jsx}", "scripts/**/*.{js,jsx}"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)test.[jt]s?(x)"],
  // Transform ESM-only packages using Babel (these have no CJS main and use ESM exports)
  transformIgnorePatterns: ["/node_modules/(?!(@digitalbazaar|base58-universal|base64url-universal|cborg|multiformats)/)"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/_mocks_/fileMock.js",
    "\\.(css|sass|scss)$": "<rootDir>/_mocks_/styleMock.js",
    axios: "<rootDir>/node_modules/axios/dist/node/axios.cjs",
    // we are using our own document loaders, jest does not tree shake these out and causing problem
    "node:process": "<rootDir>/_mocks_/jsonLdMiscsStub",
    "node:crypto": "<rootDir>/_mocks_/node-crypto.js",
    "node:stream": "<rootDir>/_mocks_/node-stream.js",
    "node:buffer": "<rootDir>/_mocks_/node-buffer.js",
    "node:util": "<rootDir>/_mocks_/node-util.js",
    "node:path": "<rootDir>/_mocks_/node-path.js",
    "node:fs": "<rootDir>/_mocks_/node-fs.js",
    "node:os": "<rootDir>/_mocks_/node-os.js",
    "node:http": "<rootDir>/_mocks_/node-http.js",
    "node:https": "<rootDir>/_mocks_/node-https.js",
    "node:url": "<rootDir>/_mocks_/node-url.js",
    "node:events": "<rootDir>/_mocks_/node-events.js",
    "node:net": "<rootDir>/_mocks_/node-net.js",
    "undici": "<rootDir>/_mocks_/jsonLdMiscsStub",
    "dotenv/config": "<rootDir>/_mocks_/jsonLdMiscsStub",
    // Jest 26 does not support package.json "exports" map — manually resolve subpath exports
    "@tradetrust-tt/token-registry-v5/contracts": "<rootDir>/node_modules/@tradetrust-tt/token-registry-v5/dist/contracts/index.js",
    "@tradetrust-tt/token-registry/contracts": "<rootDir>/node_modules/@tradetrust-tt/token-registry/dist/contracts/index.js",
    // @digitalbazaar ESM-only packages — point to actual lib/index.js so transformIgnorePatterns can transpile them
    "@digitalbazaar/bls12-381-multikey": "<rootDir>/node_modules/@digitalbazaar/bls12-381-multikey/lib/index.js",
    "@digitalbazaar/bbs-signatures": "<rootDir>/node_modules/@digitalbazaar/bbs-signatures/lib/index.js",
    "@digitalbazaar/ecdsa-multikey": "<rootDir>/node_modules/@digitalbazaar/ecdsa-multikey/lib/index.js",
    "@digitalbazaar/data-integrity": "<rootDir>/node_modules/@digitalbazaar/data-integrity/lib/index.js",
    "@digitalbazaar/ecdsa-sd-2023-cryptosuite": "<rootDir>/node_modules/@digitalbazaar/ecdsa-sd-2023-cryptosuite/lib/index.js",
    "@digitalbazaar/bbs-2023-cryptosuite": "<rootDir>/node_modules/@digitalbazaar/bbs-2023-cryptosuite/lib/index.js",
    "@digitalbazaar/di-sd-primitives": "<rootDir>/node_modules/@digitalbazaar/di-sd-primitives/lib/index.js",
    // ESM-only dependencies of @digitalbazaar packages
    cborg: "<rootDir>/node_modules/cborg/cborg.js",
    "base58-universal": "<rootDir>/node_modules/base58-universal/lib/index.js",
    "base64url-universal": "<rootDir>/node_modules/base64url-universal/lib/index.js",
  },
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
};
