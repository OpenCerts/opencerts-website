import getConfig from "next/config";
import { types as Web3Types } from "../services/web3/getWeb3";
import { getLogger } from "../utils/logger";

const { trace } = getLogger("config");
const { publicRuntimeConfig } = getConfig();

const GA_PRODUCTION_ID = "UA-130492260-1";
const GA_DEVELOPMENT_ID = "UA-130492260-2";

export const DEFAULT_NETWORK =
  publicRuntimeConfig.network === "mainnet"
    ? Web3Types.INFURA_MAINNET
    : Web3Types.INFURA_ROPSTEN;
export const GA_ID =
  publicRuntimeConfig.network === "mainnet"
    ? GA_PRODUCTION_ID
    : GA_DEVELOPMENT_ID;
export const CAPTCHA_CLIENT_KEY = "6LfiL3EUAAAAAHrfLvl2KhRAcXpanNXDqu6M0CCS";
export const EMAIL_API_URL =
  "https://ikeem3vgb5.execute-api.ap-southeast-1.amazonaws.com/dev";

trace(`DEFAULT_NETWORK: ${DEFAULT_NETWORK}`);
trace(`CAPTCHA_CLIENT_KEY: ${CAPTCHA_CLIENT_KEY}`);
trace(`EMAIL_API_URL: ${EMAIL_API_URL}`);
