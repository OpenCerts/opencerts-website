import { types as Web3Types } from "../services/web3/getWeb3";

export const DEFAULT_NETWORK =
  process.env.ENV === "production"
    ? Web3Types.INFURA_MAINNET
    : Web3Types.INFURA_ROPSTEN;
export const CAPTCHA_CLIENT_KEY = "6LfiL3EUAAAAAHrfLvl2KhRAcXpanNXDqu6M0CCS";
export const EMAIL_API_URL =
  "https://ikeem3vgb5.execute-api.ap-southeast-1.amazonaws.com/dev";
