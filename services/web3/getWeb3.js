import Web3 from "web3";
import ProviderEngine from "web3-provider-engine";
import FetchSubprovider from "web3-provider-engine/subproviders/fetch";
import HookedWalletSubprovider from "web3-provider-engine/subproviders/hooked-wallet";
import LedgerWallet from "ledger-wallet-provider/lib/LedgerWallet";

export const types = {
  INJECTED: "INJECTED",
  LEDGER_MAIN: "LEDGER_MAIN",
  LEDGER_ROPSTEN: "LEDGER_ROPSTEN",
  CUSTOM: "CUSTOM",
  MOCK: "MOCK"
};

async function loadWeb3Ledger(mainnet = true) {
  let { web3 } = window;
  const networkId = mainnet ? 1 : 3;
  const rpcUrl = mainnet
    ? "https://mainnet.infura.io/GcUmThrFdoO47u9xsEXq"
    : "https://ropsten.infura.io/GcUmThrFdoO47u9xsEXq";
  const defaultDerivativePath = "44'/60'/0'/0";

  const engine = new ProviderEngine();
  web3 = new Web3(engine);

  const fetchProvider = new FetchSubprovider({ rpcUrl });

  const ledger = new LedgerWallet(() => networkId, defaultDerivativePath);
  await ledger.init();

  engine.addProvider(new HookedWalletSubprovider(ledger));
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
    let web3 = null;
    switch (t) {
      case types.INJECTED:
        web3 = await loadWeb3Injected();
        break;
      case types.LEDGER_MAIN:
        web3 = await loadWeb3Ledger(true);
        break;
      case types.LEDGER_ROPSTEN:
        web3 = await loadWeb3Ledger(false);
        break;
      case types.CUSTOM:
        web3 = await loadWeb3CustomRpc(config);
        break;
      case types.MOCK:
        web3 = await loadWeb3Mock();
        break;
      default:
        web3 = await loadWeb3Injected();
    }
    resolve(web3);
  } catch (e) {
    reject(e);
  }
}

export default (t, config) =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener(`load`, () => {
      resolveWeb3(resolve, reject, t, config);
    });
    // If document has loaded already, try to get Web3 immediately.
    if (document.readyState === `complete`) {
      resolveWeb3(resolve, reject, t, config);
    }
  });
