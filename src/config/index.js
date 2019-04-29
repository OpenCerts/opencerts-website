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

export const SEO = {
  default: {
    title: "An easy way to check and verify your certificates",
    titleTemplate: `OpenCerts - %s`,
    description:
      "Whether you're a student or an employer, OpenCerts lets you verify the certificates you have of anyone from any institution. All in one place.",
    openGraph: {
      type: "website",
      url: "https://opencerts.io",
      title: "OpenCerts - An easy way to check and verify your certificates",
      description:
        "Whether you're a student or an employer, OpenCerts lets you verify the certificates you have of anyone from any institution. All in one place.",
      images: [
        {
          url: "/static/images/opencerts.png",
          width: 800,
          height: 600,
          alt: "OpenCerts"
        }
      ]
    },
    twitter: {
      handle: "@handle",
      site: "@site",
      cardType: "summary_large_image"
    }
  },
  faq: {
    title: "Frequently Asked Questions",
    description:
      "Have some questions in mind? Here are a list of collated questions and answers that might answer your questions.",
    openGraph: {
      title: "OpenCerts - Frequently Asked Questions",
      description:
        "Have some questions in mind? Here are a list of collated questions and answers that might answer your questions.",
      url: "https://opencerts.io/faq"
    }
  },
  registry: {
    title: "Registry",
    description:
      "The registry is a list of recognised issuers with their certificate store addresses. Certificates from these issuers can be recognised and verified by our viewer.",
    openGraph: {
      title: "OpenCerts - Registry",
      description:
        "The registry is a list of recognised issuers with their certificate store addresses. Certificates from these issuers can be recognised and verified by our viewer.",
      url: "https://opencerts.io/registry"
    }
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "This is a Government Agency digital service that may use “cookies”, where a small data file is sent to your browser to store and track information about you when you enter our websites.",
    openGraph: {
      title: "OpenCerts - Privacy Policy",
      description:
        "This is a Government Agency digital service that may use “cookies”, where a small data file is sent to your browser to store and track information about you when you enter our websites.",
      url: "https://opencerts.io/privacy"
    }
  }
};

trace(`DEFAULT_NETWORK: ${DEFAULT_NETWORK}`);
trace(`CAPTCHA_CLIENT_KEY: ${CAPTCHA_CLIENT_KEY}`);
trace(`EMAIL_API_URL: ${EMAIL_API_URL}`);
