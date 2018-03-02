import Web3 from "web3";

const resolveWeb3 = resolve => {
  let { web3 } = window;
  const alreadyInjected = typeof web3 !== "undefined"; // i.e. Mist/Metamask
  const localProvider = `http://localhost:9545`;

  if (alreadyInjected) {
    web3 = new Web3(web3.currentProvider);
  } else {
    const provider = new Web3.providers.HttpProvider(localProvider);
    web3 = new Web3(provider);
  }
  resolve(web3);
};

export default () =>
  new Promise(resolve => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener(`load`, () => {
      resolveWeb3(resolve);
    });
    // If document has loaded already, try to get Web3 immediately.
    if (document.readyState === `complete`) {
      resolveWeb3(resolve);
    }
  });
