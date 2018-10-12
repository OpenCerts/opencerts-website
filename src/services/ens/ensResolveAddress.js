import debug from "debug";
import { getAddr } from "./ens";
import { isEthereumAddress } from "../../utils";

const log = debug("ens");

export const ensResolveAddress = async domain => {
  log(`Received request to resolve: ${domain}`);
  if (isEthereumAddress(domain)) {
    log(`${domain} is an ethereum address, no resolution needed.`);
    return domain;
  }
  return await getAddr(domain);
};
