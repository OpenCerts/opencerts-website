/**
 * Browser shim for @digitalbazaar/bbs-signatures/lib/crypto.js
 * The original exports `webcrypto` from `node:crypto`, which is Node.js-only.
 * In the browser, the Web Crypto API is available as globalThis.crypto.
 */
export const webcrypto = globalThis.crypto;
