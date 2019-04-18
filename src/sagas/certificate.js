import {
  some,
  get,
  partition,
  compact,
  filter,
  isEmpty,
  mapKeys
} from "lodash";
import { put, all, call, select, takeEvery } from "redux-saga/effects";
import { certificateData, verifySignature } from "@govtechsg/open-certificate";
import { isValidAddress as isEthereumAddress } from "ethereumjs-util";
import Router from "next/router";
import { getLogger } from "../utils/logger";
import {
  types,
  verifyingCertificateIssuerSuccess,
  verifyingCertificateIssuerFailure,
  verifyingCertificateRevocationSuccess,
  verifyingCertificateRevocationFailure,
  verifyingCertificateIssuedSuccess,
  verifyingCertificateIssuedFailure,
  verifyingCertificateHashSuccess,
  verifyingCertificateHashFailure,
  getCertificate
} from "../reducers/certificate";
import { types as applicationTypes } from "../reducers/application";
import DocumentStoreDefinition from "../services/contracts/DocumentStore.json";
import fetchIssuers from "../services/issuers";
import { combinedHash } from "../utils";
import { ensResolveAddress, getText } from "../services/ens";
import sendEmail from "../services/email";
import { analyticsEvent } from "../components/Analytics";

import { getSelectedWeb3 } from "./application";

const { trace, error } = getLogger("saga:certificate");

const ANALYTICS_VERIFICATION_ERROR_CODE = {
  ISSUER_IDENTITY: 0,
  CERTIFICATE_HASH: 1,
  UNISSUED_CERTIFICATE: 2,
  REVOKED_CERTIFICATE: 3
};

export function* loadCertificateContracts({ payload }) {
  try {
    const data = certificateData(payload);
    trace(`Loading certificate: ${data}`);
    const unresolvedContractStoreAddresses = get(data, "issuers", []).map(
      issuer => issuer.certificateStore
    );
    const web3 = yield getSelectedWeb3();
    const contractStoreAddresses = yield all(
      unresolvedContractStoreAddresses.map(unresolvedAddress =>
        call(ensResolveAddress, unresolvedAddress)
      )
    );
    trace(`Resolved certificate's store addresses, ${contractStoreAddresses}`);

    const { abi } = DocumentStoreDefinition;

    const contracts = contractStoreAddresses.map(
      address => new web3.eth.Contract(abi, address)
    );

    yield put({
      type: types.LOADING_STORE_SUCCESS
    });
    return contracts;
  } catch (e) {
    yield put({
      type: types.LOADING_STORE_FAILURE,
      payload: e
    });
    return null;
  }
}

export function* verifyCertificateHash({ certificate }) {
  const verified = verifySignature(certificate);
  if (verified) {
    yield put(verifyingCertificateHashSuccess());
    return true;
  }
  yield put(
    verifyingCertificateHashFailure({
      error: "Certificate data does not match target hash",
      certificate: certificateData(certificate)
    })
  );
  return false;
}

export function* verifyCertificateIssued({ certificate, certificateStores }) {
  try {
    const merkleRoot = `0x${get(certificate, "signature.merkleRoot", "")}`;

    // Checks if certificate has been issued on ALL store
    const issuedStatuses = yield all(
      certificateStores.map(store => store.methods.isIssued(merkleRoot).call())
    );
    const isIssued = issuedStatuses.reduce((prev, curr) => prev && curr, true);
    if (!isIssued) throw new Error("Certificate has not been issued");
    yield put(verifyingCertificateIssuedSuccess());
    return true;
  } catch (e) {
    yield put(
      verifyingCertificateIssuedFailure({
        certificate: certificateData(certificate),
        error: e.message
      })
    );
    return false;
  }
}

export const getIntermediateHashes = (targetHash, proof = []) => {
  // Returns hash of all intermediate hashes from targetHash to merkleRoot
  const intermediateHashes = [`0x${targetHash}`];

  proof.reduce((accumulator, currentValue) => {
    const combined = combinedHash(accumulator, currentValue).toString("hex");
    intermediateHashes.push(`0x${combined}`);
    return combined;
  }, targetHash);

  return intermediateHashes;
};

export function* verifyCertificateNotRevoked({
  certificate,
  certificateStores
}) {
  try {
    const targetHash = get(certificate, "signature.targetHash", null);
    const proof = get(certificate, "signature.proof", null);

    // Checks if certificate and path towards merkle root has been revoked
    const intermediateHashes = getIntermediateHashes(targetHash, proof);

    for (let i = 0; i < intermediateHashes.length; i += 1) {
      const hash = intermediateHashes[i];

      // Check if certificate is revoked on ALL store
      const revokedStatus = yield all(
        certificateStores.map(store => store.methods.isRevoked(hash).call())
      );
      const isRevoked = revokedStatus.reduce(
        (prev, curr) => prev || curr,
        false
      );
      if (isRevoked)
        throw new Error(`Certificate has been revoked, revoked hash: ${hash}`);
    }

    yield put(verifyingCertificateRevocationSuccess());
    return true;
  } catch (e) {
    yield put(
      verifyingCertificateRevocationFailure({
        certificate: certificateData(certificate),
        error: e.message
      })
    );
    return false;
  }
}

function isApprovedENSDomain(issuerAddress) {
  trace(`Checking if ${issuerAddress} is opencerts TLD`);
  const approvedENSDomains = [/(opencerts.eth)$/];
  return some(
    approvedENSDomains.map(domainMask =>
      domainMask.test(issuerAddress.toLowerCase())
    )
  );
}

export function* lookupEthereumAddresses(ethereumAddressIssuers) {
  const registeredIssuers = yield fetchIssuers();
  const issuersNormalised = mapKeys(registeredIssuers, (_, k) =>
    k.toUpperCase()
  );

  return ethereumAddressIssuers.map(store => {
    const identity = issuersNormalised[store.toUpperCase()];

    if (!identity) {
      throw new Error(`Issuer identity cannot be verified: ${store}`);
    }

    return identity;
  });
}

export function* resolveEnsNamesToText(ensNames) {
  trace("resolving ", ensNames);
  if (some(ensNames.map(ensName => !isApprovedENSDomain(ensName)))) {
    const invalidEns = filter(ensNames, !isApprovedENSDomain);

    const invalidEnsError = new Error(
      `Issuer identity cannot be verified: ${invalidEns}`
    );
    error(invalidEnsError);
    throw invalidEnsError;
  }

  const getTextResults = yield all(
    ensNames.map(ensName => call(getText, ensName, "issuerName"))
  );
  trace(`Got texts records for ${ensNames}`, getTextResults);
  trace(getTextResults);
  return getTextResults;
}

export function* verifyCertificateIssuer({ certificate }) {
  try {
    const data = certificateData(certificate);
    const contractStoreAddresses = get(data, "issuers", []).map(
      issuer => issuer.certificateStore
    );
    trace(
      `Attempting to verify certificate issuers: ${contractStoreAddresses}`
    );

    const [ethereumAddressIssuers, unresolvedEnsNames] = partition(
      contractStoreAddresses,
      isEthereumAddress
    );

    let resolvedEnsTexts = [];
    let issuerIdentitiesFromRegistry = [];

    trace("ethereumAddressIssuers", ethereumAddressIssuers);
    trace("unresolvedEnsNames", unresolvedEnsNames);
    if (!isEmpty(compact(unresolvedEnsNames))) {
      resolvedEnsTexts = yield call(resolveEnsNamesToText, unresolvedEnsNames);
      trace(`Resolved ens name ${unresolvedEnsNames} to ${resolvedEnsTexts}`);
    }
    if (!isEmpty(compact(ethereumAddressIssuers))) {
      issuerIdentitiesFromRegistry = yield call(
        lookupEthereumAddresses,
        ethereumAddressIssuers
      );
      trace(
        `Resolved ethereum address ${ethereumAddressIssuers} to ${issuerIdentitiesFromRegistry}`
      );
    }

    const combinedIssuerIdentities = compact(
      issuerIdentitiesFromRegistry.concat(resolvedEnsTexts)
    );

    if (combinedIssuerIdentities.length === 0) {
      throw new Error(`Issuer identity missing in certificate`);
    }

    trace("combinedIssuerIdentities", combinedIssuerIdentities);
    yield put(verifyingCertificateIssuerSuccess(combinedIssuerIdentities));
    return combinedIssuerIdentities;
  } catch (e) {
    error(e);
    yield put(
      verifyingCertificateIssuerFailure({
        error: e.message,
        certificate: certificateData(certificate)
      })
    );
    return false;
  }
}

export function* verifyCertificate({ payload }) {
  yield put({
    type: types.VERIFYING_CERTIFICATE
  });
  const certificateStores = yield call(loadCertificateContracts, { payload });
  const args = { certificateStores, certificate: payload };
  const verificationStatuses = yield all([
    call(verifyCertificateHash, args),
    call(verifyCertificateIssued, args),
    call(verifyCertificateNotRevoked, args),
    call(verifyCertificateIssuer, args)
  ]);
  const verified = verificationStatuses.reduce((prev, curr) => prev && curr);
  if (verified) {
    Router.push("/viewer");
  }
}

export function* sendCertificate({ payload }) {
  try {
    const certificate = yield select(getCertificate);
    const { email, captcha } = payload;
    const success = yield sendEmail({
      certificate,
      email,
      captcha
    });

    if (!success) {
      throw new Error("Fail to send certificate");
    }

    yield put({
      type: types.SENDING_CERTIFICATE_SUCCESS
    });
  } catch (e) {
    yield put({
      type: types.SENDING_CERTIFICATE_FAILURE,
      payload: e.message
    });
  }
}

export function* networkReset() {
  yield put({
    type: types.NETWORK_RESET
  });
}

export function* analyticsIssuerFail({ certificate }) {
  yield analyticsEvent(window, {
    category: "CERTIFICATE_ERROR",
    action: get(certificate, "issuers[0].certificateStore"),
    label: get(certificate, "id"),
    value: ANALYTICS_VERIFICATION_ERROR_CODE.ISSUER_IDENTITY
  });
}

export function* analyticsHashFail({ certificate }) {
  yield analyticsEvent(window, {
    category: "CERTIFICATE_ERROR",
    action: get(certificate, "issuers[0].certificateStore"),
    label: get(certificate, "id"),
    value: ANALYTICS_VERIFICATION_ERROR_CODE.CERTIFICATE_HASH
  });
}

export function* analyticsIssuedFail({ certificate }) {
  yield analyticsEvent(window, {
    category: "CERTIFICATE_ERROR",
    action: get(certificate, "issuers[0].certificateStore"),
    label: get(certificate, "id"),
    value: ANALYTICS_VERIFICATION_ERROR_CODE.UNISSUED_CERTIFICATE
  });
}

export function* analyticsRevocationFail({ certificate }) {
  yield analyticsEvent(window, {
    category: "CERTIFICATE_ERROR",
    action: get(certificate, "issuers[0].certificateStore"),
    label: get(certificate, "id"),
    value: ANALYTICS_VERIFICATION_ERROR_CODE.REVOKED_CERTIFICATE
  });
}

export default [
  takeEvery(types.UPDATE_CERTIFICATE, verifyCertificate),
  takeEvery(types.SENDING_CERTIFICATE, sendCertificate),
  takeEvery(applicationTypes.UPDATE_WEB3, networkReset),

  takeEvery(types.VERIFYING_CERTIFICATE_ISSUER_FAILURE, analyticsIssuerFail),
  takeEvery(
    types.VERIFYING_CERTIFICATE_REVOCATION_FAILURE,
    analyticsRevocationFail
  ),
  takeEvery(types.VERIFYING_CERTIFICATE_ISSUED_FAILURE, analyticsIssuedFail),
  takeEvery(types.VERIFYING_CERTIFICATE_HASH_FAILURE, analyticsHashFail)
];
