import getConfig from "next/config";
import { getLogger } from "../utils/logger";

const { trace } = getLogger("config");
// https://github.com/vercel/next.js/issues/7713
const { publicRuntimeConfig = {} } = getConfig();

export const URL = "https://opencerts.io";
const API_MAIN_URL = "https://api.opencerts.io";
const API_ROPSTEN_URL = "https://api-ropsten.opencerts.io";
const API_RINKEBY_URL = "https://api-rinkeby.opencerts.io";

export const IS_MAINNET = publicRuntimeConfig.network === "mainnet";
export const SUPPORTED_NETWORK = IS_MAINNET ? ["homestead", "matic"] : ["sepolia", "amoy"];
export const NETWORK_NAME = SUPPORTED_NETWORK[0]; // expected by ethers

export const GA4_TAG_ID = process.env.GA4_TAG_ID;
export const CAPTCHA_CLIENT_KEY = "6LfiL3EUAAAAAHrfLvl2KhRAcXpanNXDqu6M0CCS";

const getApiUrl = (networkName: string): string => {
  if (networkName === "homestead") return API_MAIN_URL;
  else if (networkName === "rinkeby") return API_RINKEBY_URL;
  return API_ROPSTEN_URL;
};
export const EMAIL_API_URL = `${getApiUrl(NETWORK_NAME)}/email`;
export const SHARE_LINK_API_URL = `${getApiUrl(NETWORK_NAME)}/storage`;
export const SHARE_LINK_TTL = 1209600;

export const LEGACY_OPENCERTS_RENDERER = publicRuntimeConfig.legacyRendererUrl || "https://legacy.opencerts.io/";
export const ENVIRONMENT = publicRuntimeConfig.context === "production" ? "production" : "development";

export const DEFAULT_SEO = {
  title: "An easy way to check and verify your certificates",
  titleTemplate: `OpenCerts - %s`,
  description: "Whether you are a student or an employer, verify any OpenCerts certificate here.",
  openGraph: {
    type: "website",
    url: URL,
    title: "OpenCerts - An easy way to check and verify your OpenCerts certificates",
    description: "Whether you are a student or an employer, verify any OpenCerts certificate here.",
    images: [
      {
        url: `${URL}/static/images/opencerts.png`,
        width: 800,
        height: 600,
        alt: "OpenCerts",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

trace(`NETWORK: ${NETWORK_NAME}`);
trace(`CAPTCHA_CLIENT_KEY: ${CAPTCHA_CLIENT_KEY}`);
trace(`EMAIL_API_URL: ${EMAIL_API_URL}`);
