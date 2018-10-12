import Web3 from "web3";

const ProviderEngine = require("web3-provider-engine");
const WebsocketSubProvider = require("web3-provider-engine/subproviders/websocket.js");

export const types = {
  INFURA_MAINNET: "INFURA_MAINNET",
  INFURA_ROPSTEN: "INFURA_ROPSTEN",
  INJECTED: "INJECTED",
  CUSTOM: "CUSTOM",
  MOCK: "MOCK"
};

let web3Instance;
let web3InstanceType;

async function loadWeb3InfuraWebsocket(mainnet = true) {
  const rpcUrl = mainnet
    ? "wss://mainnet.infura.io/ws/GcUmThrFdoO47u9xsEXq"
    : "wss://ropsten.infura.io/ws/GcUmThrFdoO47u9xsEXq";

  const engine = new ProviderEngine();
  const web3 = new Web3(engine);
  const fetchProvider = new WebsocketSubProvider({ rpcUrl });
  engine.addProvider(fetchProvider);
  engine.start();

  return web3;
}

async function loadWeb3Injected() {
  let { web3 } = window;
  const alreadyInjected = typeof web3 !== "undefined";

  if (!alreadyInjected) throw new Error("Metamask cannot be found");

  web3 = new Web3(web3.currentProvider);

  return web3;
}

async function loadWeb3CustomRpc(rpc = "http://localhost:8545") {
  let { web3 } = window;

  const provider = new Web3.providers.HttpProvider(rpc);
  web3 = new Web3(provider);

  return web3;
}

async function loadWeb3Mock() {
  return {
    eth: {
      currentProvider: {},
      getAccounts: () => []
    }
  };
}

async function resolveWeb3(resolve, reject, t = types.INJECTED, config) {
  try {
    switch (t) {
      case types.INFURA_ROPSTEN:
        web3Instance = await loadWeb3InfuraWebsocket(false);
        break;
      case types.INFURA_MAINNET:
        web3Instance = await loadWeb3InfuraWebsocket();
        break;
      case types.INJECTED:
        web3Instance = await loadWeb3Injected();
        break;
      case types.CUSTOM:
        web3Instance = await loadWeb3CustomRpc(config);
        break;
      case types.MOCK:
        web3Instance = await loadWeb3Mock();
        break;
      default:
        web3Instance = await loadWeb3InfuraWebsocket();
    }
    web3InstanceType = t;
    resolve(web3Instance);
  } catch (e) {
    reject(e);
  }
}

export function setNewWeb3(t, config) {
  if (
    web3InstanceType === types.INFURA_MAINNET ||
    web3InstanceType === types.INFURA_ROPSTEN
  ) {
    // we need to kill the engine if the previous web3 instance has a ledger subprovider
    web3Instance.currentProvider.stop();
  }
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    // Server-side rendering fails when trying to access window
    if (typeof window !== "undefined") {
      window.addEventListener(`load`, () => {
        resolveWeb3(resolve, reject, t, config);
      });
      // If document has loaded already, try to get Web3 immediately.
      if (document.readyState === `complete`) {
        resolveWeb3(resolve, reject, t, config);
      }
    }
  });
}

export function getWeb3(t, config) {
  if (web3Instance) {
    return new Promise(resolve => {
      resolve(web3Instance);
    });
  }
  return setNewWeb3(t, config);
}

export default getWeb3;
