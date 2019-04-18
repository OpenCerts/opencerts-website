import getConfig from "next/config";
import { getLogger } from "../utils/logger";

const { trace } = getLogger("config");
const { publicRuntimeConfig } = getConfig();

export const NETWORK_TYPES = {
  INFURA_MAINNET: "INFURA_MAINNET",
  INFURA_ROPSTEN: "INFURA_ROPSTEN",
  INJECTED: "INJECTED",
  CUSTOM: "CUSTOM",
  MOCK: "MOCK"
};

const GA_PRODUCTION_ID = "UA-130492260-1";
const GA_DEVELOPMENT_ID = "UA-130492260-2";

const isMainnet = publicRuntimeConfig.network === "mainnet";

export const DEFAULT_NETWORK = isMainnet
  ? NETWORK_TYPES.INFURA_MAINNET
  : NETWORK_TYPES.INFURA_ROPSTEN;
export const GA_ID = isMainnet ? GA_PRODUCTION_ID : GA_DEVELOPMENT_ID;
export const CAPTCHA_CLIENT_KEY = "6LfiL3EUAAAAAHrfLvl2KhRAcXpanNXDqu6M0CCS";
export const EMAIL_API_URL = isMainnet
  ? "https://api.opencerts.io/email"
  : "https://api-ropsten.opencerts.io/email";
export const INFURA_PROJECT_ID = "1f1ff2b3fca04f8d99f67d465c59e4ef";

trace(`DEFAULT_NETWORK: ${DEFAULT_NETWORK}`);
trace(`CAPTCHA_CLIENT_KEY: ${CAPTCHA_CLIENT_KEY}`);
trace(`EMAIL_API_URL: ${EMAIL_API_URL}`);
