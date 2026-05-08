import debug from "debug";
import { setConfig } from "next/config";
import { publicRuntimeConfig } from "./next.config";
import "@testing-library/jest-dom";

// Jest 26 (jsdom environment) does not include TextEncoder/TextDecoder
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.setImmediate =
  global.setImmediate ||
  ((callback, ...args) => {
    return setTimeout(callback, 0, ...args);
  });

setConfig({ publicRuntimeConfig });

// Jest swallows stderr from debug, so if process is called with DEBUG then redirect debug to console.log
if (process.env.DEBUG) {
  debug.log = console.log.bind(console);
}
