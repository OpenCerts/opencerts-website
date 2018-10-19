import initContract from "truffle-contract";

export const getContract = async (web3, contractDefinition) => {
  const contract = initContract(contractDefinition);
  contract.setProvider(web3.currentProvider);

  // Dirty hack for web3@1.0.0 support for localhost testrpc
  // see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
  if (typeof contract.currentProvider.sendAsync !== "function") {
    contract.currentProvider.sendAsync = function applyArgs(...args) {
      // eslint-disable-next-line prefer-spread
      return contract.currentProvider.send.apply(
        contract.currentProvider,
        args
      );
    };
  }

  const instance = await contract.deployed();
  return instance;
};

export default getContract;
