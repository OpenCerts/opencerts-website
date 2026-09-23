import { Resolver } from "@tradetrust-tt/tt-verify/node_modules/did-resolver";
import { getResolver } from "@tradetrust-tt/tt-verify/node_modules/ethr-did-resolver";
import {
  isWrappedV2Document,
  isWrappedV3Document,
  openAttestationVerifiers,
  v2,
  v3,
  verificationBuilder,
  w3cVerifiers,
} from "@trustvc/trustvc";
import { IS_MAINNET, NETWORK_NAME } from "../config";
import { WrappedOrSignedOpenCertsDocument } from "../shared";
import { opencertsGetData } from "../utils/utils";
import { OAFailoverProvider } from "./failover-provider";

type Network = ConstructorParameters<typeof OAFailoverProvider>[1];
type Urls = ConstructorParameters<typeof OAFailoverProvider>[0];

export const getUrls = (options: { network: Network; isProduction: boolean }): Urls => {
  const { network, isProduction } = options;
  const networkString =
    typeof network === "string" ? network : typeof network === "number" ? network.toString() : network.name;

  if (isProduction) {
    /* Production Network Whitelist */
    switch (networkString) {
      // Ethereum mainnet/homestead
      case "mainnet":
      case "homestead":
        return [
          { url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY_PROVIDER}` },
          { url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` },
          { url: `https://cloudflare-eth.com/` },
          { url: `https://ethereum-rpc.publicnode.com/` },
        ];
      // Polygon mainnet
      case "pol":
      case "matic":
      case "137":
        return [
          { url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY_PROVIDER}` },
          { url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` },
        ];
      default:
        console.error(`Unrecognised network: ${network}`);
        throw new Error(`Unrecognised network: ${network}`);
    }
  } else {
    /* Non-production Network Whitelist */
    switch (networkString) {
      // Ethereum testnet
      case "sepolia":
        return [
          { url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY_PROVIDER}` },
          { url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` },
          { url: `https://ethereum-sepolia-rpc.publicnode.com/` },
        ];
      // Polygon testnet
      case "amoy":
      case "80002":
        return [
          { url: `https://polygon-amoy.infura.io/v3/${process.env.INFURA_API_KEY_PROVIDER}` },
          { url: `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` },
          { url: `https://rpc-amoy.polygon.technology/` },
          { url: `https://polygon-amoy-bor-rpc.publicnode.com/` },
        ];
      default:
        console.error(`Unrecognised network: ${network}`);
        throw new Error(`Unrecognised network: ${network}`);
    }
  }
};

export const getNetworkName = (certificate: WrappedOrSignedOpenCertsDocument): Network => {
  const data = opencertsGetData(certificate) as v2.OpenAttestationDocument | v3.WrappedDocument;
  // W3C credentials store chainId in credentialStatus.tokenNetwork.chainId; OA v2 uses data.network.chainId
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chainId = data.network?.chainId ?? (certificate as any).credentialStatus?.tokenNetwork?.chainId?.toString();

  if (IS_MAINNET) {
    /* Production Network Whitelist */
    switch (chainId) {
      case "137":
        return "matic";
    }
  } else {
    /* Non-production Network Whitelist */
    switch (chainId) {
      case "80002":
        return { chainId: 80002, name: "amoy" };
    }
  }

  // A network is specified in the certificate but not in the above whitelist
  if (data.network) {
    console.log(`"${JSON.stringify(data.network)}" is not a whitelisted network. Reverting back to "${NETWORK_NAME}".`);
  }

  return NETWORK_NAME;
};

/**
 * The verifier for a document, with failover providers and a mainnet DID resolver.
 *
 * Extracted from the verification saga so the credential tabs of a Verifiable Presentation can
 * verify each embedded credential the same way the saga verifies a whole document — one
 * definition of "how OpenCerts verifies", not two.
 */
export const createDocumentVerifier = (certificate: WrappedOrSignedOpenCertsDocument) => {
  const network = getNetworkName(certificate);
  const urls = getUrls({ network, isProduction: IS_MAINNET });

  const providerWithFailover = new OAFailoverProvider(urls, network, { shuffle: false });
  const resolverWithFailover = new Resolver(
    /**
     * Regardless of mainnet or testnet, OA only uses mainnet DIDs
     * As such, resolver should always resolve against a mainnet provider
     * Specifying a static provider for resolver will also prevent unnecessary "eth_chainId" calls to providers
     * ✅ did:ethr:0x1245e5b64d785b25057f7438f715f4aa5d965733
     * ❌ did:ethr:sepolia:0x1245e5b64d785b25057f7438f715f4aa5d965733
     */
    getResolver({
      name: "mainnet",
      provider: new OAFailoverProvider(
        [
          { url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY_RESOLVER}` },
          { url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` },
        ],
        "mainnet",
        { shuffle: false }
      ),
    })
  );

  return isWrappedV2Document(certificate) || isWrappedV3Document(certificate)
    ? verificationBuilder(openAttestationVerifiers, {
        provider: providerWithFailover,
        resolver: resolverWithFailover,
      })
    : verificationBuilder(w3cVerifiers, {
        provider: providerWithFailover,
        resolver: resolverWithFailover,
      });
};
