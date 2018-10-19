import { getAddr } from "./ens";
import { isEthereumAddress } from "../../utils";
import { getLogger } from "../../utils/logger";

const { trace } = getLogger("services:ensResolveAddress");

export const ensResolveAddress = async domain => {
  trace(`Received request to resolve: ${domain}`);
  if (isEthereumAddress(domain)) {
    trace(`${domain} is an ethereum address, no resolution needed.`);
    return domain;
  }
  return getAddr(domain);
};

export default ensResolveAddress;
