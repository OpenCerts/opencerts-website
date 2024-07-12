/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { decryptString } from "@govtechsg/oa-encryption";
import { openAttestationVerifiers, verificationBuilder } from "@govtechsg/oa-verify";
import type { VerificationFragment, Verifier } from "@govtechsg/oa-verify";
import { utils, v2, v3 } from "@govtechsg/open-attestation";
import { isValid, registryVerifier } from "@govtechsg/opencerts-verify";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import Router from "next/router";
import { call, put, select, takeEvery } from "redux-saga/effects";
import "isomorphic-fetch";

import { triggerV2ErrorLogging, triggerV3ErrorLogging, triggerV4ErrorLogging } from "../components/Analytics";
import { NETWORK_NAME, IS_MAINNET } from "../config";
import {
  GENERATE_SHARE_LINK,
  generateShareLinkFailure,
  generateShareLinkReset,
  generateShareLinkSuccess,
  RETRIEVE_CERTIFICATE_BY_ACTION,
  retrieveCertificateByActionFailure,
  retrieveCertificateByActionPending,
  retrieveCertificateByActionSuccess,
  sendCertificateFailure,
  sendCertificateSuccess,
  SENDING_CERTIFICATE,
  UPDATE_CERTIFICATE,
  updateCertificate,
  verifyingCertificate,
  verifyingCertificateCompleted,
  verifyingCertificateErrored,
} from "../reducers/certificate.actions";
import { getCertificate } from "../reducers/certificate.selectors";
import { sendEmail } from "../services/email";
import { OAFailoverProvider } from "../services/failover-provider";
import {
  certificateNotIssued,
  certificateRevoked,
  contractNotFound,
  invalidArgument,
  serverError,
} from "../services/fragment";
import { generateLink } from "../services/link";
import { WrappedOrSignedOpenCertsDocument } from "../shared";
import { getLogger } from "../utils/logger";
import { opencertsGetData } from "../utils/utils";

const { trace } = getLogger("saga:certificate");

const getUrls = (options: {
  network: string;
  isProduction: boolean;
}): ConstructorParameters<typeof OAFailoverProvider>[0] => {
  const { network, isProduction } = options;

  if (isProduction) {
    /* Production Network Whitelist */
    switch (network) {
      // Ethereum mainnet/homestead
      case "mainnet":
      case "homestead":
        return [
          { url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}` },
          { url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}` },
          { url: `https://cloudflare-eth.com/` },
          { url: `https://ethereum-rpc.publicnode.com/` },
        ];
      // Polygon mainnet
      case "matic":
        return [
          { url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}` },
          { url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` },
        ];
      default:
        console.error(`Unrecognised network: ${network}`);
        throw new Error(`Unrecognised network: ${network}`);
    }
  } else {
    /* Non-production Network Whitelist */
    switch (network) {
      // Ethereum testnet
      case "sepolia":
        return [
          { url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}` },
          { url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` },
          { url: `https://ethereum-sepolia-rpc.publicnode.com/` },
        ];
      // Polygon testnet
      case "amoy":
        return [
          { url: `https://polygon-amoy.infura.io/v3/${process.env.INFURA_API_KEY}` },
          { url: `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` },
        ];
      default:
        console.error(`Unrecognised network: ${network}`);
        throw new Error(`Unrecognised network: ${network}`);
    }
  }
};

const getNetworkName = (certificate: WrappedOrSignedOpenCertsDocument) => {
  if (utils.isWrappedV4Document(certificate)) return NETWORK_NAME; // TODO: Need to update if we ever want to auto-detect network on an ETH-issued OA v4 document

  const data = opencertsGetData(certificate) as v2.OpenAttestationDocument | v3.WrappedDocument;

  if (IS_MAINNET) {
    /* Production Network Whitelist */
    switch (data.network?.chainId) {
      case "137":
        return "matic";
    }
  } else {
    /* Non-production Network Whitelist */
    switch (data.network?.chainId) {
      case "80002":
        return "amoy";
    }
  }

  // A network is specified in the certificate but not in the above whitelist
  if (data.network) {
    console.log(`"${JSON.stringify(data.network)}" is not a whitelisted network. Reverting back to "${NETWORK_NAME}".`);
  }

  return NETWORK_NAME;
};

export function* verifyCertificate({ payload: certificate }: { payload: WrappedOrSignedOpenCertsDocument }) {
  try {
    yield put(verifyingCertificate());

    const network = getNetworkName(certificate);
    const urls = getUrls({ network, isProduction: IS_MAINNET });

    const providerWithFailover = new OAFailoverProvider(urls, network);
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
        provider: new OAFailoverProvider(getUrls({ network: "mainnet", isProduction: true }), "mainnet"),
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const verify = verificationBuilder([...openAttestationVerifiers, registryVerifier] as Verifier<any>[], {
      provider: providerWithFailover,
      resolver: resolverWithFailover,
    });

    // https://github.com/redux-saga/redux-saga/issues/884
    const fragments: VerificationFragment[] = yield call(verify, certificate);
    trace(`Verification Status: ${JSON.stringify(fragments)}`);
    yield put(verifyingCertificateCompleted(fragments));

    if (isValid(fragments)) {
      Router.push("/viewer");
    } else {
      const errors: string[] = [];
      if (!isValid(fragments, ["DOCUMENT_INTEGRITY"])) {
        errors.push("CERTIFICATE_HASH");
      }

      if (!isValid(fragments, ["DOCUMENT_STATUS"])) {
        if (certificateNotIssued(fragments)) errors.push("UNISSUED_CERTIFICATE");
        else if (certificateRevoked(fragments)) errors.push("REVOKED_CERTIFICATE");
        else if (serverError(fragments)) errors.push("SERVER_ERROR");
        else if (invalidArgument(fragments)) errors.push("INVALID_ARGUMENT");
        else if (contractNotFound(fragments)) errors.push("CERTIFICATE_STORE_NOT_FOUND");
        else errors.push("ETHERS_UNHANDLED_ERROR");
      }

      if (!isValid(fragments, ["ISSUER_IDENTITY"])) {
        errors.push("ISSUER_IDENTITY");
      }

      // if the document is not valid
      if (!utils.isWrappedV2Document(certificate) && !utils.isWrappedV3Document(certificate)) {
        errors.splice(0, errors.length);
        errors.push("INVALID_DOCUMENT");
      }

      if (errors.length > 0) {
        if (utils.isWrappedV2Document(certificate)) {
          triggerV2ErrorLogging(certificate, errors);
        } else if (utils.isWrappedV3Document(certificate)) {
          triggerV3ErrorLogging(certificate, errors);
        } else {
          triggerV4ErrorLogging(certificate, errors);
        }
      }
    }
  } catch (e) {
    if (e instanceof Error) yield put(verifyingCertificateErrored(e.message));
    else yield put(verifyingCertificateErrored(JSON.stringify(e)));
  }
}

export function* sendCertificate({ payload }: { payload: { email: string; captcha: string } }) {
  try {
    // https://github.com/redux-saga/redux-saga/issues/884
    const certificate: ReturnType<typeof getCertificate> = yield select(getCertificate);
    if (!certificate) throw new Error("No certificate");
    const { email, captcha } = payload;
    const success: boolean = yield sendEmail({
      certificate,
      email,
      captcha,
    });

    if (!success) {
      throw new Error("Fail to send certificate");
    }

    yield put(sendCertificateSuccess());
  } catch (e) {
    if (e instanceof Error) yield put(sendCertificateFailure(e.message));
    else yield put(sendCertificateFailure(JSON.stringify(e)));
  }
}
type Await<T> = T extends PromiseLike<infer U> ? U : T;

export function* generateShareLink() {
  try {
    yield put(generateShareLinkReset());
    // https://github.com/redux-saga/redux-saga/issues/884
    const certificate: ReturnType<typeof getCertificate> = yield select(getCertificate);
    if (!certificate) {
      throw new Error("No certificate");
    }
    const success: Await<ReturnType<typeof generateLink>> = yield generateLink(certificate);

    if (!success) {
      throw new Error("Fail to generate certificate share link");
    }

    yield put(generateShareLinkSuccess(success));
  } catch (e) {
    if (e instanceof Error) yield put(generateShareLinkFailure(e.message));
    else yield put(generateShareLinkFailure(JSON.stringify(e)));
  }
}

export function* retrieveCertificateByAction({
  payload: { uri, key: payloadKey },
  anchor: { key: anchorKey },
}: {
  payload: { uri: string; key?: string };
  anchor: { key?: string };
}) {
  try {
    yield put(retrieveCertificateByActionPending());

    // TODO fix the type :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let certificate: Record<string, any> = yield window.fetch(uri).then((response) => {
      if (response.status >= 400 && response.status < 600) {
        throw new Error(`Unable to load the certificate from ${uri}`);
      }
      return response.json();
    });
    certificate = certificate.document || certificate; // opencerts-function returns the document in a nested document object

    if (!certificate) {
      throw new Error(`Certificate at address ${uri} is empty`);
    }
    // if there is a key and the type is "OPEN-ATTESTATION-TYPE-1", let's use oa-encryption
    const key = anchorKey || payloadKey;
    if (key && certificate.type === "OPEN-ATTESTATION-TYPE-1") {
      certificate = JSON.parse(
        decryptString({
          tag: certificate.tag,
          cipherText: certificate.cipherText,
          iv: certificate.iv,
          key,
          type: certificate.type,
        })
      );
    } else if (key || certificate.type) {
      throw new Error(`Unable to decrypt certificate with key=${key} and type=${certificate.type}`);
    }

    yield put(updateCertificate(certificate as WrappedOrSignedOpenCertsDocument));
    yield put(retrieveCertificateByActionSuccess());
  } catch (e) {
    if (e instanceof Error) yield put(retrieveCertificateByActionFailure(e.message));
    else yield put(retrieveCertificateByActionFailure(JSON.stringify(e)));
  }
}

// TODO https://github.com/redux-saga/redux-saga/issues/1883
export const sagas = [
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  takeEvery(RETRIEVE_CERTIFICATE_BY_ACTION, retrieveCertificateByAction),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  takeEvery(UPDATE_CERTIFICATE, verifyCertificate),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  takeEvery(SENDING_CERTIFICATE, sendCertificate),
  takeEvery(GENERATE_SHARE_LINK, generateShareLink),
];
