/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { decryptString } from "@govtechsg/oa-encryption";
import { VerificationFragment, utils as oaVerifyUtils, ErrorVerificationFragment } from "@govtechsg/oa-verify";
import { utils } from "@govtechsg/open-attestation";
import { isValid, verify } from "@govtechsg/opencerts-verify";
import { ethers } from "ethers";
import Router from "next/router";
import { call, put, select, takeEvery } from "redux-saga/effects";
import "isomorphic-fetch";
import { triggerV2ErrorLogging, triggerV3ErrorLogging } from "../components/Analytics";
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
const getProvider = (networkName: string, providerName: "infura" | "alchemy") => {
  if (providerName === "alchemy") {
    switch (networkName) {
      case "sepolia":
        // Handling sepolia network differently because ethers v5 AlchemyProvider doesn't support Sepolia
        // TODO: use ethers v6 AlchemyProvider once ethers version is able to be bumped
        return new ethers.providers.StaticJsonRpcProvider(
          `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
          networkName
        );
      default:
        return new ethers.providers.AlchemyProvider(networkName, process.env.ALCHEMY_API_KEY);
    }
  }
  return new ethers.providers.InfuraProvider(networkName, process.env.INFURA_API_KEY);
};

const getNetworkName = (certificate: WrappedOrSignedOpenCertsDocument) => {
  const data = opencertsGetData(certificate);

  if (IS_MAINNET) {
    switch (data.network?.chainId) {
      case "137":
        return "matic";
    }
  } else {
    switch (data.network?.chainId) {
      case "80001":
        return "maticmum";
    }
  }
  return NETWORK_NAME;
};

const fragmentsHaveCallException = (fragments: VerificationFragment[]) => {
  let result = false;
  fragments.forEach((fragment) => {
    if (oaVerifyUtils.isErrorFragment(fragment)) {
      const errFragment = fragment as ErrorVerificationFragment<{ code: string }>;
      if (errFragment.data?.code === "CALL_EXCEPTION") {
        result = true;
      }
    }
  });
  return result;
};

export function* verifyCertificate({ payload: certificate }: { payload: WrappedOrSignedOpenCertsDocument }) {
  try {
    yield put(verifyingCertificate());
    const networkName = getNetworkName(certificate);
    const infuraProvider = getProvider(networkName, "infura");
    // https://github.com/redux-saga/redux-saga/issues/884
    let fragments: VerificationFragment[] = yield call(verify({ provider: infuraProvider }), certificate);
    // manually call alchemy provider as backup if infura provider returns error fragment
    // https://docs.ethers.org/v5/api/providers/other/#FallbackProvider
    if (fragmentsHaveCallException(fragments)) {
      const alchemyProvider = getProvider(networkName, "alchemy");
      fragments = yield call(verify({ provider: alchemyProvider }), certificate);
    }
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
        } else {
          triggerV3ErrorLogging(certificate, errors);
        }
      }
    }
  } catch (e) {
    yield put(verifyingCertificateErrored(e.message));
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
    yield put(sendCertificateFailure(e.message));
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
    yield put(generateShareLinkFailure(e.message));
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
    yield put(retrieveCertificateByActionFailure(e.message));
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
