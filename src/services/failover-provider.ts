/**
 * Temporary implementation of failover provider.
 * In future, failover provider should be provided by oa-verify library.
 */

import { providers, utils } from "ethers";

/**
 * A custom provider to acheive proper failover when a provider is down or rate-limited.
 * It extends StaticJsonRpcProvider where the backend (and consequently, the network) is
 * fixed so it never calls eth_chainId to verify its backend.
 *
 * Reminder: This is a solution specific to Ethers v5.s
 *
 */
export class OAFailoverProvider extends providers.StaticJsonRpcProvider {
  failoverProviders: providers.StaticJsonRpcProvider[];

  static readonly DEFAULT_NETWORK_URLS = {
    mainnet: [
      "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213", // Default API key from Ethers
      "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC", // Default API key from Ethers
      "https://cloudflare-eth.com/",
      "https://ethereum-rpc.publicnode.com/",
    ],
    sepolia: [
      "https://sepolia.infura.io/v3/84842078b09946638c03157f83405213", // Default API key from Ethers
      "https://eth-sepolia.g.alchemy.com/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC", // Default API key from Ethers
      "https://ethereum-sepolia-rpc.publicnode.com/", // The free Cloudflare endpoint does not support Sepolia (use Public Node instead)
    ],
    amoy: [
      "https://polygon-amoy.infura.io/v3/84842078b09946638c03157f83405213", // Default API key from Ethers
      "https://polygon-amoy.g.alchemy.com/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC", // Default API key from Ethers
    ],
  } as const;
  static readonly DEAFULT_CONNECTION_INFO: Partial<utils.ConnectionInfo> = {
    allowGzip: true,
    timeout: 4 * 1000, // 4 seconds timeout [Default - 2 mins]: https://github.com/ethers-io/ethers.js/blob/v5.7.2/packages/web/src.ts/index.ts#L122
    throttleLimit: 1, // Only attempt to reach provider once (no further retries in the event of a HTTP 429 throttle response) [Default - 12 retries]: https://github.com/ethers-io/ethers.js/blob/v5.7.2/packages/web/src.ts/index.ts#L99-L100
  } as const;

  /**
   *
   * @param urls An array of RPC endpoints
   * @param network E.g. "mainnet", "sepolia", "amoy"
   * @param options By default `options.shuffle = true` will randomise the order of providers to spread the load
   */
  constructor(urls?: utils.ConnectionInfo[], network = "mainnet", options: { shuffle: boolean } = { shuffle: true }) {
    // Assign defaults if not specified
    if (!urls) {
      // If unrecognised network, default to "mainnet"
      if (!Object.keys(OAFailoverProvider.DEFAULT_NETWORK_URLS).includes(network)) {
        network = "mainnet";
      }

      urls = OAFailoverProvider.DEFAULT_NETWORK_URLS[
        network as keyof typeof OAFailoverProvider.DEFAULT_NETWORK_URLS
      ].map((url: string) => ({ url, ...OAFailoverProvider.DEAFULT_CONNECTION_INFO }));
    }

    // Call parent constructor with first provider
    super(urls[0], network);

    // Initialise failover providers
    this.failoverProviders = urls
      .sort(() => (options.shuffle ? Math.random() - 0.5 : 0)) // Randomise order of providers to spread the load
      .map(
        (url) =>
          new providers.StaticJsonRpcProvider({ url: url.url, ...OAFailoverProvider.DEAFULT_CONNECTION_INFO }, network)
      );
  }

  async perform(method: string, params: any): Promise<any> {
    // Cycle through all specified providers
    for (let i = 0; i < this.failoverProviders.length; i++) {
      try {
        return await this.failoverProviders[i].perform(method, params);
      } catch (error) {
        // If last provider
        if (i === this.failoverProviders.length - 1) {
          throw error;
        }
        // Attempt the next provider
        else {
          continue;
        }
      }
    }
  }
}
