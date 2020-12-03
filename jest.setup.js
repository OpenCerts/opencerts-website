import debug from "debug";
import { setConfig } from "next/config";
import { publicRuntimeConfig } from "./next.config";
import "@testing-library/jest-dom";

setConfig({ publicRuntimeConfig });

// Jest swallows stderr from debug, so if process is called with DEBUG then redirect debug to console.log
if (process.env.DEBUG) {
  debug.log = console.log.bind(console);
}
