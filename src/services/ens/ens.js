import debug from "debug";
import { stripHexPrefix, bufferToHex, keccak256 } from "ethereumjs-utils";
import { reduceRight } from "lodash";
import ensContractABI from "./contracts/ensContract.json";
import resolverABI from "./contracts/resolverContract.json";
import { getWeb3 } from "../web3";

const log = debug("ens");
const error = debug("ens:error");

// Well-known addresses for ENS registry contracts
const ensRegistryContractAddress = {
  1: {
    registry: "0x314159265dd8dbb310642f98f50c066173c1259b"
  },
  3: {
    registry: "0x112234455c3a32fd11230c42e7bccd4a84e02010"
  }
};

function keccak256String(label) {
  return bufferToHex(keccak256(label));
}

function appendHash(node, label) {
  return keccak256String(node + stripHexPrefix(keccak256String(label)));
}

export function getNamehash(name) {
  const rootHash =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
  if (name !== "") {
    const labels = name.split(".");
    return reduceRight(labels, appendHash, rootHash);
  }
  return rootHash;
}

const getResolverContract = async addr => {
  log("Instantiating resolver contract");
  const web3 = await getWeb3();
  const resolver = new web3.eth.Contract(resolverABI, addr);
  return {
    resolver
  };
};

const getENSContract = async () => {
  const web3 = await getWeb3();
  const networkId = await web3.eth.net.getId();
  log(`Instantiating ENS Contract for networkID: ${networkId}`);
  const ens = new web3.eth.Contract(
    ensContractABI,
    ensRegistryContractAddress[networkId].registry
  );
  return ens;
};

export const getAddr = async domain => {
  try {
    log(`Attempting to resolve: ${domain}`);
    const ens = await getENSContract();
    const node = await getNamehash(domain);
    const resolverContractAddress = await ens.methods.resolver(node).call();
    log(`Got resolver address for ${domain}: ${resolverContractAddress}`);
    const { resolver } = await getResolverContract(resolverContractAddress);
    const setAddrMethod = resolver.methods.addr(node);
    const address = await setAddrMethod.call();
    log(`Resolution of ${domain} resulted in: ${address}`);
    return address;
  } catch (err) {
    error(err);
    throw err;
  }
};

export const getName = async domain => {
  const resolverContractAddress = "0xcAcbE14d88380F8eb37ec0d7788ec226EE7b3434";
  const { resolver } = await getResolverContract(resolverContractAddress);
  const node = await getNamehash(domain);
  const setAddrMethod = resolver.methods.addr(node);
  return setAddrMethod.call();
};
