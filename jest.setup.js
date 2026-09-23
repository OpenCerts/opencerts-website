import debug from "debug";
import { setConfig } from "next/config";
import { publicRuntimeConfig } from "./next.config";
import "@testing-library/jest-dom";

// Jest 26 (jsdom environment) does not include TextEncoder/TextDecoder
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Jest 26 runs each test file in its own vm context, which has no CryptoKey global — and Node
// exposes the constructor nowhere else (crypto.webcrypto does not re-export it). The
// data-integrity key libraries guard on `publicKey instanceof CryptoKey`, so without this every
// W3C signature check fails with "Right-hand side of 'instanceof' is not an object": a
// verification that looks broken while the document is fine. The stand-in answers instanceof
// the way the real constructor would, which is all those guards ask of it.
if (typeof global.CryptoKey === "undefined") {
  global.CryptoKey = {
    [Symbol.hasInstance]: (value) => value?.constructor?.name === "CryptoKey",
  };
}

setConfig({ publicRuntimeConfig });

// Jest swallows stderr from debug, so if process is called with DEBUG then redirect debug to console.log
if (process.env.DEBUG) {
  debug.log = console.log.bind(console);
}
