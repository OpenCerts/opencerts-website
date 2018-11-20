import { stripHexPrefix, bufferToHex, keccak256 } from "ethereumjs-util";
import { reduceRight } from "lodash";
import ensContractABI from "./contracts/ensContract.json";
import resolverABI from "./contracts/resolverContract.json";
import { getWeb3 } from "../web3";
import { getLogger } from "../../utils/logger";

const { trace, error } = getLogger("services:ens");

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
    const namehash = reduceRight(labels, appendHash, rootHash);
    trace(`Namehash for ${name} is ${namehash}`);
    return namehash;
  }
  return rootHash;
}

const getResolverContract = async addr => {
  trace("Instantiating resolver contract");
  const web3 = await getWeb3();
  const resolver = new web3.eth.Contract(resolverABI, addr);
  return {
    resolver
  };
};

const getENSContract = async () => {
  const web3 = await getWeb3();
  const networkId = await web3.eth.net.getId();
  trace(`Instantiating ENS Contract for networkID: ${networkId}`);
  const ens = new web3.eth.Contract(
    ensContractABI,
    ensRegistryContractAddress[networkId].registry
  );
  trace(`ENS Contract instantiated: ${ens}`);
  trace(ens);
  return ens;
};

const getResolverContractForDomain = async domain => {
  const ens = await getENSContract();
  const node = getNamehash(domain);
  const resolverContractAddress = await ens.methods.resolver(node).call();
  trace(`Got resolver address for ${domain}: ${resolverContractAddress}`);
  const { resolver } = await getResolverContract(resolverContractAddress);
  return resolver;
};

export const getAddr = async domain => {
  try {
    trace(`Attempting to resolve: ${domain}`);
    const node = getNamehash(domain);
    const resolver = await getResolverContractForDomain(domain);
    trace(resolver);
    const setAddrMethod = resolver.methods.addr(node);
    const address = await setAddrMethod.call();
    trace(`Resolution of ${domain} resulted in: ${address}`);
    return address;
  } catch (err) {
    error(err);
    throw err;
  }
};

export const getText = async (domain, recordType) => {
  try {
    // TODO: in uncontrolled environments should call supportsInterface("0x59d1d43c") to check if text records are supported on this resolver
    const node = getNamehash(domain);
    const resolver = await getResolverContractForDomain(domain);

    trace(`Calling getText:${recordType} on ENS for ${domain}`);
    const getTextMethod = resolver.methods.text(node, recordType);
    const text = await getTextMethod.call();
    trace(
      `Retrieving text record ${recordType} of ${domain} resulted in: ${text}`
    );
    return text;
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
